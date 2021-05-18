module.exports.getCastomError = (name, message) => {
  const err = new Error(message);
  err.name = name;
  return err;
}