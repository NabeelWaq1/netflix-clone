import express from 'express';
import { getTrendingMovie, getMovieTrailers, getSimilarMovies, getMovieByCategory, getMovieDetails } from '../Controllers/movie.controller.js';

const router = express.Router();

router.get('/trending',getTrendingMovie);

router.get('/:id/trailers',getMovieTrailers);

router.get('/:id/details',getMovieDetails);

router.get('/:id/similar',getSimilarMovies);

router.get('/:category',getMovieByCategory);

export default router;