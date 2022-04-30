/**
 * contains repo calls that would be made regardless of model
 */ async function findById(model, param) {
  const object = await model.findOne({
    where: {
      id: param,
    },
  });
  return object;
}

module.exports = { findById };
