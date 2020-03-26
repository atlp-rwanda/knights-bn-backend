import Accomodation from '../helpers/queries';
import { Bookings } from '../db/models';

export default class bookAccomodation {
  static async myBookings(req, res) {
    const { id } = req.user;
    try {
      const allBookings = await Accomodation.getAccommodation('getAll', id, Bookings);
      if (allBookings) {
        return res.status(200).json({ message: ' My bookings', allBookings });
      }
      return res.status(404).json({ message: 'No Booking found' });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
