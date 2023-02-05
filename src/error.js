class GenericError extends Error {
  constructor(message = "") {
    super(message);
    this.name = this.constructor.name;
  }
}

function parse(s) {
  try {
    return JSON.parse(s);
  } catch (e) {}
}

class NetworkError extends GenericError {
  constructor(e) {
    super(e.message);
    this.status = 500;
    this.request = {
      url: e.config?.url,
      headers: e.config?.headers,
      data: parse(e.config?.data) ?? e.config?.data?.toString?.(),
    };
    this.response = { status: e.response?.status, data: e.response?.data };
  }
}

class AssertError extends GenericError {
  constructor(m, context) {
    super(m);
    this.status = 500;
    this.context = context;
  }
}

module.exports = {
  GenericError,
  NetworkError,
  AssertError,
};
