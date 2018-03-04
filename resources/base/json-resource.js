/**
 * This class describes ATD for response api resource
 */
class JsonResource {
  get wrap() {
    return this._wrap || 'data';
  }

  set wrap(wrap = 'data') {
    this._wrap = wrap;
  }

  make(resource) {
    throw new Error('Abstract method');
  }

  response() {
    throw new Error('Abstract method');
  }

  transform() {
    throw new Error('Abstract method');
  }
}

module.exports = JsonResource;
