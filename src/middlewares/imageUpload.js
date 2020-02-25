import multer from 'multer';
import { storage, fileFilter } from '../helpers/imageHelpers';

export default multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});
