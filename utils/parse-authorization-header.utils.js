const regExp = /(\S+)\s+(\S+)/;

const parseAuthorizationHeader = hdrValue => {
  if (typeof hdrValue !== 'string') {
    return null;
  }

  const [origin, sheme, value] = hdrValue.match(regExp);

  return sheme && value && { sheme, value };
};

module.exports = parseAuthorizationHeader;
