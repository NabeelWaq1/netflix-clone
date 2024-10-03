import express from 'express';
import { deleteSearchHistory, searchHistory, searchMovie, searchPerson, searchTv } from '../Controllers/search.controller.js';

const router = express.Router();

router.get('/person/:query',searchPerson);

router.get('/movie/:query',searchMovie);

router.get('/tv/:query',searchTv);

router.get('/history',searchHistory);

router.delete('/history/:id',deleteSearchHistory);

export default router;