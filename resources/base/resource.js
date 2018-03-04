const JsonResource = require('./json-resource');

class Resource extends JsonResource {
  make(resource) {
    this.model = resource;

    return this.response();
  }

  response() {
    const item = this.transform();

    return { [this.wrap]: { item } };
  }

  transform() {
    return this.model;
  }
}

module.exports = Resource;
