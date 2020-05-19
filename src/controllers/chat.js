import models from '../db/models';

const { Chats } = models;
export default class chatController {
  static async getChats(req, res) {
    const findChats = await Chats.findAll({
      attributes: {
        exclude: ['senderId', 'updatedAt'],
      },
    });
    return res.status(200).json({
      data: findChats,
    });
  }
}
