const validator = require('validator');
const Middleware = require('./middleware');
const NotesModel = require('../database/models/note.model');

/**
 * This class validates notes endpoint list.
 */
class NotesMiddlewares extends Middleware {
  /**
   * This method validates content field data.
   *
   * @param {*} content
   * @param {*} errors
   * @param {*} res
   * @param {*} next
   */
  static next(content, errors, res, next) {
    if (!content) {
      errors.content = 'Contect field is required!';
    }

    if (this.isErrors(errors)) {
      return this.sendErrors(errors, res);
    }

    next();
  }

  /**
   * This method validates create note endpoint.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static create(req, res, next) {
    const { content, title } = req.body;
    const errors = {};

    if (!title) {
      errors.title = 'Title field is required!';
    }

    this.next(content, errors, next);
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
    const { body: { content }, params: { id }, user: { uuid } } = req;
    const errors = {};
    const { userUuid } = (await NotesModel.findById(id)) || {};

    if (userUuid !== uuid) {
      return res.status(403).send();
    }

    this.next(content, errors, res, next);
  }
}

module.exports = NotesMiddlewares;
