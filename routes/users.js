import express from 'express';
import { getUsers, createUser, deleteUser, getUserInfo } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/find/:id', getUserInfo);



export default router;