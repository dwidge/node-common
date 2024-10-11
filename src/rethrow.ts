// add Error stack traces to s3, fs, ...

export const rethrow = (f) => {
  try {
    return f();
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : `${e}`);
  }
};

export const rethrowAsync = async (f) => {
  try {
    return await f();
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : `${e}`);
  }
};
