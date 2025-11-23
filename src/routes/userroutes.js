import express from 'express';
import { getUserProfile } from '../controllers/userControllers.js';
import { auth,requireAdmin } from '../middleware/authmiddleware.js';
import upload from '../middleware/upload.js';
import { updateUserProfile,deleteUserProfile, deleteUserById } from '../controllers/userControllers.js';
const router1 = express.Router();

router1.get('/me', auth, getUserProfile);
router1.put('/me', auth, upload.single('profileImage'), updateUserProfile);
router1.delete('/me', auth, deleteUserProfile);
router1.delete('/:id', auth,requireAdmin, deleteUserById);

export default router1;

