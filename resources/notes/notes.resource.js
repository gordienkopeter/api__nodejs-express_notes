const Resource = require('../base/resource');

class NotesResource extends Resource {
  transform() {
    const { uuid: id, title, content, createdAt, updatedAt } = this.model;

    return { id, title, content, createdAt, updatedAt };
  }
}

module.exports = NotesResource;
