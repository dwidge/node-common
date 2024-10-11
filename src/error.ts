export class GenericError extends Error {
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

export class NetworkError extends GenericError {
  public status = 500;
  public request = {};
  public response = {};
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

export class AssertError extends GenericError {
  public status = 500;
  public context = {};
  constructor(m, context) {
    super(m);
    this.status = 500;
    this.context = context;
  }
}
