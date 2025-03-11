// Plugin para transformar _id a id y eliminar __v
export const formatDoc = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  });

  schema.set("toObject", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  });
};
