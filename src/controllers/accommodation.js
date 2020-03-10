import { config } from 'dotenv';
import models from '../db/models';

config();
export default class accomodationFacility {
  static async getAllAccommodations(req, res) {
    try {
      const accommodations = await models.Accommodation.findAll();
      return res.status(200).json({ status: 200, data: accommodations });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }

  static async getSingleAccommodation(req, res) {
    const accommodationId = req.params.id;
    const singleAccommodation = await models.Accommodation
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
      .then(() => models.Accommodation.findOne({ where: { id: req.params.id, userId: req.user.id } })
        .then((accommodation) => {
          if (accommodation === null) return res.status(404).json({ status: 404, errorMessage: 'Accommodation not found' });
          return res.status(200).json({ status: 200, data: accommodation });
        })).catch((error) => res.status(500).json(error));
  }

  static uploadBuildingImage(req, res) {
    if (typeof req.file === 'undefined') return res.status(400).json({ status: 400, errorMessage: 'You forget to chose image' });
    req.body.imageOfBuilding = `${process.env.HOST_NAME}/${req.file.path}`;
    models.Accommodation.update(req.body, { where: { id: req.params.id, userId: req.user.id } })
      .then(() => models.Accommodation.findOne({ where: { id: req.params.id, userId: req.user.id } }))
      .then((accommodation) => {
        if (accommodation === null) return res.status(404).json({ status: 404, errorMessage: 'Accommodation not found' });
        res.status(200).json({ status: 200, message: 'image uploaded successfully' });
      }).catch((error) => res.status(500).json(error));
  }

  static async createAccomodation(req, res) {
    try {
      req.body.imageOfBuilding = (typeof req.file === 'undefined') ? null : `${process.env.HOST_NAME}/${req.file.path}`;
      req.body.userId = req.user.id;
      const accommodation = await models.Accommodation.create(req.body);
      return res.status(201).json({ status: 200, data: accommodation });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }
}
