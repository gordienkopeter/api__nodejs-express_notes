/**
 * This class is ATD for CRUD
 */
class Controller {
  /**
   * This method returns model.
   * This method method is abstract.
   */
  static get model() {
    throw new TypeError('Abstract method.');
  }

  /**
   * This method returns model list.
   *
   * @param {*} req
   * @param {*} res
   */
  static async all(req, res) {
    return res.send(await this.model.findAll());
  }

  /**
   * This method returns model by id
   *
   * @param {*} req
   * @param {*} res
   */
  static async show(req, res) {
    const { params: { id } } = req;

    return res.send(await this.model.findById(id));
  }

  /**
   * This method creates model.
   *
   * @param {*} req
   * @param {*} res
   */
  static async create(req, res) {
    const { body } = req;

    return res.send(await this.model.create(body));
  }

  /**
   * This method updates model.
   *
   * @param {*} req
   * @param {*} res
   */
  static async update(req, res) {
    const { params: { id }, body } = req;
    const model = await this.model.findById(id);

    await model.update(body);

    return res.send(model);
  }

  /**
   * This method destroys model.
   *
   * @param {*} req
   * @param {*} res
   */
  static async destroy(req, res) {
    const { parems: { id } } = req;
    const model = await this.model.findById(id);

    return res.send(await model.destroy());
  }

  /**
   * This method describes call the action.
   * Uses for catches exception.
   *
   * @param {*} req
   * @param {*} res
   */
  static async callAction(action, req, res) {
    try {
      await this[action](req, res);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

module.exports = Controller;
