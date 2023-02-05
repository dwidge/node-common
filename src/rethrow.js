// add Error stack traces to s3, fs, ...

const rethrow = (f) => {
  try {
    return f();
  } catch (e) {
    throw new Error(e.message);
  }
};
exports.rethrow = rethrow;

const rethrowAsync = async (f) => {
  try {
    return await f();
  } catch (e) {
    throw new Error(e.message);
  }
};
exports.rethrowAsync = rethrowAsync;
