const Controller = require('./controller');
const NoteModel = require('../database/models/note.model');

/**
 * This class describes notes endpoint list.
 */
class NotesController extends Controller {
  /**
   * This property returns NotesModel.
   */
  static get model() {
    return NoteModel;
  }

  /**
   * This method returns NotesModel list by user id.
   *
   * @param {*} req
   * @param {*} res
   */
  static async all(req, res) {
    const { user: { uuid } } = req;

    return res.send(await this.model.findAll({ where: { userUuid: uuid } }));
  }

  /**
   * This method creates note.
   *
   * @param {*} req
   * @param {*} res
   * @example Request {
   *   "content": "text"
   * }
   * @example Response {
   *   "uuid": "uuid4",
   *   "content": "text",
   *   "createdAt": "timestamp",
   *   "updatedAt": "timestamp"
   * }
   */
  static async create(req, res) {
    const { body, user: { uuid } } = req;

    return res.send(await this.model.create({ ...body, userUuid: uuid }));
  }
}

module.exports = NotesController;
