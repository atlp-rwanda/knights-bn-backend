import { config } from 'dotenv';
import _ from 'lodash';
import models, { Accommodation, Bookings } from '../db/models';
import Accomodation from '../helpers/queries';

config();
export default class accomodationFacility {
  static async getAllAccommodations(req, res) {
    try {
      const accommodations = await Accommodation.findAll();
      return res.status(200).json({ status: 200, data: accommodations });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }

  static async getSingleAccommodation(req, res) {
    const accommodationId = req.params.id;
    const singleAccommodation = await Accommodation
      .findOne({ where: { id: accommodationId } });
    if (singleAccommodation === null) {
      return res.status(404)
        .json({ status: 404, errorMessage: 'accommmodation not found' });
    }
    return res.status(200).json({ status: 200, data: singleAccommodation });
  }

  static editAccommodation(req, res) {
    if (Object.keys(req.body).length === 0) return res.status(400).json({ status: 400, errorMessage: 'You are sending with empty fields' });
    models.Accommodation.update(req.body, { where: { id: req.params.id, userId: req.user.id } })
      .then(() => Accommodation.findOne({ where: { id: req.params.id, userId: req.user.id } })
        .then((accommodation) => {
          if (accommodation === null) return res.status(404).json({ status: 404, errorMessage: 'Accommodation not found' });
          return res.status(200).json({ status: 200, data: accommodation });
        })).catch((error) => res.status(500).json(error));
  }

  static uploadBuildingImage(req, res) {
    if (typeof req.file === 'undefined') return res.status(400).json({ status: 400, errorMessage: 'You forget to chose image' });
    req.body.imageOfBuilding = `${process.env.HOST_NAME}/${req.file.path}`;
    models.Accommodation.update(req.body, { where: { id: req.params.id, userId: req.user.id } })
      .then(() => Accommodation.findOne({ where: { id: req.params.id, userId: req.user.id } }))
      .then((accommodation) => {
        if (accommodation === null) return res.status(404).json({ status: 404, errorMessage: 'Accommodation not found' });
        res.status(200).json({ status: 200, message: 'image uploaded successfully' });
      }).catch((error) => res.status(500).json(error));
  }

  static async createAccomodation(req, res) {
    try {
      req.body.imageOfBuilding = (typeof req.file === 'undefined') ? null : `${process.env.HOST_NAME}/${req.file.path}`;
      req.body.userId = req.user.id;
      const accommodation = await Accommodation.create(req.body);
      return res.status(201).json({ status: 200, data: accommodation });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }

  static async availableRooms(req, res) {
    const { id } = req.params;
    try {
      if (isNaN(id)) {
        return res.status(401).json({ error: 'id must be a number' });
      }
      const findAccomodation = await Accomodation.getAccommodation('id', id, Accommodation);
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
      const findAccomodation = await Accomodation.getAccommodation('id', accomodationId, Accommodation);
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
}
