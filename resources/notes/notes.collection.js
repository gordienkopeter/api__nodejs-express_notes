const Collection = require('../base/collection');

class NotesCollection extends Collection {
  transform() {
    const { uuid: id, title, content, createdAt, updatedAt } = this.model;

    return { id, title, content, createdAt, updatedAt };
  }
}

module.exports = NotesCollection;
