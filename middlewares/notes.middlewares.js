const validator = require('validator');
const Middleware = require('./middleware');
const NotesModel = require('../database/models/note.model');

/**
 * This class validates notes endpoint list.
 */
class NotesMiddlewares extends Middleware {
  /**
   * This method validates create note endpoint.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async create(req, res, next) {
    const { body: { content, title }, user: { uuid: userUuid } } = req;
    const errors = {};

    if (!title) {
      errors.title = this.buildError(errors, 'title', 'Title field is required!');
    }

    // checks unique the user note by title
    if (await NotesModel.findOne({ where: { title, userUuid } })) {
      errors.title = this.buildError(errors, 'title', 'Title is exists!');
    }

    if (!content) {
      errors.content = this.buildError(errors, 'content', 'Content field is required!');
    }

    if (this.isErrors(errors)) {
      return this.sendErrors(errors, res);
    }

    next();
  }

  /**
   * This method validates update note endpoint.
   * Main rule is checking author the note.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async update(req, res, next) {
    const { params: { id }, user: { uuid: userUuid } } = req;
    const errors = {};

    const noteModel = await NotesModel.findById(id);

    if (!noteModel) {
      return res.status(404).send();
    }

    if (userUuid !== noteModel.userUuid) {
      return res.status(403).send();
    }

    next();
  }

  static async destroy(req, res, next) {
    const { id } = req.params;

    if (await NotesModel.findById(id)) {
      return next();
    }

    return res.status(404).send();
  }
}

module.exports = NotesMiddlewares;
