const notesRouter = require('express').Router();
const NotesController = require('../controllers/notes.controller');
const NotesMiddlewares = require('../middlewares/notes.middlewares');

/**
 * Notes endpoint middleware list.
 */
notesRouter.post('/', (req, res, next) => NotesMiddlewares.create(req, res, next));
notesRouter.post('/:id', (req, res, next) => NotesMiddlewares.update(req, res, next));
notesRouter.delete('/:id', (req, res, next) => NotesMiddlewares.destroy(req, res, next));

/**
 * Notes endpoint list.
 */
notesRouter
  .route('/')
  .get((req, res) => NotesController.all(req, res))
  .post((req, res) => NotesController.create(req, res));

notesRouter
  .route('/:id')
  .get((req, res) => NotesController.show(req, res))
  .post((req, res) => NotesController.update(req, res))
  .delete((req, res) => NotesController.destroy(req, res));

module.exports = notesRouter;
