const notesRouter = require('express').Router();
const NotesController = require('../controllers/notes.controller');
const NotesMiddlewares = require('../middlewares/notes.middlewares');

/**
 * Notes endpoint middleware list.
 */
notesRouter.post('/', (req, res, next) => NotesMiddlewares.create(req, res, next));
notesRouter.post('/:id', (req, res, next) => NotesMiddlewares.update(req, res, next));

/**
 * Notes endpoint list.
 */
notesRouter
  .route('/')
  .get((req, res) => NotesController.callAction('all', req, res))
  .post((req, res) => NotesController.callAction('create', req, res));

notesRouter
  .route('/:id')
  .get((req, res) => NotesController.callAction('show', req, res))
  .post((req, res) => NotesController.callAction('update', req, res))
  .delete((req, res) => NotesController.callAction('destroy', req, res));

module.exports = notesRouter;
