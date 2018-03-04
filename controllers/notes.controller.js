const NoteModel = require('../database/models/note.model');
const NotesCollection = require('../resources/notes/notes.collection');
const NoteResource = require('../resources/notes/notes.resource');

/**
 * This class describes notes endpoint list.
 */
class NotesController {
  /**
   * This method returns NotesModel list by user id.
   *
   * @param {*} req
   * @param {*} res
   */
  static async all(req, res) {
    const noteCollection = await req.user.getNotes();

    return res.send(new NotesCollection().make(noteCollection));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async show(req, res) {
    const { params: { id } } = req;
    const noteModel = await NoteModel.findById(id);

    return res.send(new NoteResource().make(noteModel));
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
    const noteModel = await NoteModel.create({ ...body, userUuid: uuid });

    return res.send(new NoteResource().make(noteModel));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async update(req, res) {
    const { params: { id }, body } = req;
    const noteModel = await NoteModel.findById(id);

    await noteModel.update(body);

    return res.send(new NoteResource().make(noteModel));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async destroy(req, res) {
    const { params: { id } } = req;
    const noteModel = await NoteModel.findById(id);

    await noteModel.destroy();

    return res.send(true);
  }
}

module.exports = NotesController;
