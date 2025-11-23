import express from 'express';
import { Signup ,Login} from '../controllers/authcontroller.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post('/signup', upload.single('profileImage'), Signup);
router.post('/login', Login);

export default router;
