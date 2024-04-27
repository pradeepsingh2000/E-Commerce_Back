
const validator = (schema, property) => async (req, res, next) => {
    const { error } = schema.validate(req[property || 'body']);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;    
      console.log(details[0]);
      return res.status(400).json({mesaage:details[0]});
    }
  };
  module.exports =  validator;
  
  