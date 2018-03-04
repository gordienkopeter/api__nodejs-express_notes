const JsonResource = require('./json-resource');

class Collection extends JsonResource {
  make(resource) {
    this.collection = resource;

    return this.response();
  }

  response() {
    const transformCollection = this.collection.map((model) => {
      this.model = model;

      return this.transform();
    });

    const items = [...transformCollection];

    return {
      [this.wrap]: { items },
      total: this.collection.length,
    };
  }

  transform() {
    return this.model;
  }
}

module.exports = Collection;
