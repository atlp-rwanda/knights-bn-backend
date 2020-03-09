import multer from 'multer';

export const storage = multer.diskStorage({
  destination: (request, file, callBack) => {
    callBack(null, 'uploads/');
  },
  filename: (req, file, cback) => {
    cback(null, new Date().toISOString() + file.originalname);
  },
});
export const fileFilter = (req, file, callBack) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callBack(null, true);
  } else {
    callBack(new Error('Chose jpeg or png images'), false);
  }
};
