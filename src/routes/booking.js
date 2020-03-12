import { Router } from 'express';
import bookAccomodation from '../controllers/booking';
import verifyToken from '../middlewares/checkAuth';

const bookingRouter = Router();
bookingRouter.get('/bookings', verifyToken.auth, bookAccomodation.myBookings);
export default bookingRouter;
