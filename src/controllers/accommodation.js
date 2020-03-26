import { config } from 'dotenv';
import _ from 'lodash';
import {
  Accommodation, Bookings, Comment, sequelize,
} from '../db/models';
import accommodation from '../helpers/queries';

config();
export default class accomodationFacility {
  static async getAllAccommodations(req, res) {
    try {
      const accommodations = await Accommodation.findAll({
        include: [{ model: Comment, attributes: ['commenterId', 'comment', 'createdAt', 'updatedAt'] }],
      });
      return res.status(200).json({ status: 200, data: accommodations });
    } catch (error) {
      return res.status(500).json({ error: error.name, errorMessage: 'your inputs are violating our system' });
    }
  }

  static async getSingleAccommodation(req, res) {
    try {
      const singleAccommodation = await Accommodation
        .findOne({
          where: { id: req.params.id },
          include: [{
            model: Comment,
            attributes: ['commenterId', 'comment', 'createdAt', 'updatedAt'],
          }],
        });
      if (singleAccommodation === null) {
        return res.status(404)
          .json({ status: 404, errorMessage: 'accommmodation not found' });
      }
      return res.status(200).json({ status: 200, data: singleAccommodation });
    } catch (error) {
      return res.status(500)
        .json({ error: error.name, errorMessage: 'your inputs are violating our system' });
    }
  }

  static async editAccommodation(req, res) {
    return Accommodation
      .update(req.body, { where: { id: req.params.id, userId: req.user.id } })
      .then(() => {
        res.status(200).json({ status: 200, data: req.accommodation });
      }).catch((error) => res.status(500).json({ error: error.name, errorMessage: 'your inputs are violating our system' }));
  }

  static async uploadBuildingImage(req, res) {
    try {
      if (typeof req.file === 'undefined') {
        return res.status(400)
          .json({ status: 400, errorMessage: 'You forget to chose image' });
      }
      req.body.imageOfBuilding = req.file.url;
      await accommodation.update(req.body, { id: req.params.id }, Accommodation);
      return res.status(200).json({ status: 200, message: 'image uploaded successfully' });
    } catch (error) {
      return res.status(500).json(error.name);
    }
  }

  static async createAccomodation(req, res) {
    try {
      req.body.imageOfBuilding = (typeof req.file === 'undefined') ? 'image' : req.file.url;
      req.body.userId = req.user.id;
      const newAccommodation = await Accommodation.create(req.body);
      return res.status(201).json({ status: 200, data: newAccommodation });
    } catch (error) {
      return res.status(500).json({ error: error.name, errorMessage: 'your inputs are violating our system' });
    }
  }

  static async availableRooms(req, res) {
    const { id } = req.params;
    try {
      if (isNaN(id)) {
        return res.status(401).json({ error: 'id must be a number' });
      }
      const findAccomodation = await accommodation.getAccommodation('id', id, Accommodation);
      if (findAccomodation.availableRooms === null || !findAccomodation) {
        return res.status(404).json({ status: 404, message: 'accomodation not available' });
      }
      const array = [];
      findAccomodation.availableRooms.map((item) => {
        if (item.available === 'true') {
          array.push(item);
        }
        return item;
      });
      return res.status(200).json({ ..._.pull(array) });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }

  static async bookAccomodation(req, res) {
    req.body.userId = req.user.id;
    const { accomodationId, roomName } = req.body;
    try {
      const findAccomodation = await accommodation.getAccommodation('id', accomodationId, Accommodation);
      if (!findAccomodation || findAccomodation.availableRooms === null) {
        return res.status(404).json({ status: 404, message: 'accomodation not found' });
      }
      let count = 0;
      findAccomodation.availableRooms.map((item) => {
        if (item.roomName === roomName && item.available === 'true') {
          count += 1;
          item.available = 'false';
        }
      });
      const newRooms = findAccomodation.availableRooms;
      if (count === 1) {
        const book = await Bookings.create(req.body);
        await Accommodation.update({ availableRooms: newRooms }, { where: { id: accomodationId } });
        return res.status(200).json({ status: 200, message: 'accomodation booked successfully', ..._.omit(book.dataValues, ['updatedAt', 'createdAt', 'userId']) });
      }
      return res.status(404).json({ status: 404, message: 'Room not available' });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }

  static async accommodationFeedBack(req, res) {
    try {
      const newComment = {
        commenterId: req.user.id,
        comment: req.body.comment,
        accommodationId: req.params.id,
      };
      return Comment.create(newComment).then((accomm) => {
        const { commenterId, comment, createdAt } = accomm;
        res.status(201).json({
          status: 201,
          commenterId,
          comment,
          createdAt,
        });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }

  static async mostTraveled(req, res) {
    try {
      const traveledCentre = await Bookings.findAll({
        include: [
          {
            model: Accommodation,
            attributes: ['accommodationName', 'locationName'],
          },
        ],
        attributes: ['accomodationId', [sequelize.fn('COUNT', sequelize.col('accomodationId')), 'numberofvisits']],
        group: ['Bookings.accomodationId', 'Accommodation.id'],
        raw: true,
        order: sequelize.literal('numberofvisits DESC'),
      });
      return res.status(200).json({ status: 200, mostTraveled: traveledCentre });
    } catch (error) {
      return res.status(500).json({ error: error.name, errorMessage: 'your inputs are violating our system' });
    }
  }

  static likeAccommodation(req, res) {
    const accommId = req.params.id;
    Accommodation
      .findOne({ where: { id: accommId } }).then((accomm) => {
        const { likes } = accomm;
        return Accommodation.update(
          {
            likesUsers: sequelize.fn('array_append', sequelize.col('likesUsers'), req.user.id),
            likes: likes + 1,
          },
          { where: { id: accommId } },
        ).then(() => res.status(201).json({ likes: likes + 1 }));
      }).catch((error) => res.status(500)
        .json({ error: error.name, errorMessage: 'your inputs are violating our system' }));
  }

  static async dislikeAccommodation(req, res) {
    try {
      const accommId = req.params.id;
      const { dislikes } = await accommodation
        .verifyAccom({ id: accommId }, Accommodation);
      await accommodation.update(
        {
          dislikeUsers: sequelize.fn('array_append', sequelize.col('dislikeUsers'), req.user.id),
          dislikes: dislikes + 1,
        }, { id: accommId }, Accommodation,
      );
      return res.status(201).json({ dislikes: dislikes + 1 });
    } catch (error) {
      return res.status(500)
        .json({ error: error.name, errorMessage: 'your inputs are violating our system' });
    }
  }
}

