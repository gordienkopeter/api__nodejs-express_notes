/**
 * This class is ATD for middleware list.
 */
class Middleware {
  /**
   * This method checks error count.
   *
   * @param {*} errors
   */
  static isErrors(errors) {
    for (let _ in errors) return true;

    return false;
  }

  /**
   * This method sends messages about invalid request data.
   *
   * @param {*} errors
   * @param {*} res
   */
  static sendErrors(errors, res) {
    res.status(400).send({ messages: errors });
  }

  static buildError(errors = {}, field = '', message = '') {
    if (!field) {
      return message;
    }

    const error = errors[field];

    return error && Array.isArray(error) ? error.concat(message) : [message];
  }
}

module.exports = Middleware;
