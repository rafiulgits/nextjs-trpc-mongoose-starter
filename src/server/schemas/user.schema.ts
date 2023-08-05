import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

userSchema.set("toJSON", { virtuals: true });

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);