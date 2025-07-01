import multer from "multer";
//middleware that ll add the image file in request
const upload = multer({storage: multer.diskStorage({})})

export default upload