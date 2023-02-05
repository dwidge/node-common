function safeEnv(env) {
  switch (env) {
    case "test":
      return "test";
    case "development":
      return "development";
    default:
      return "production";
  }
}
module.exports = safeEnv;
