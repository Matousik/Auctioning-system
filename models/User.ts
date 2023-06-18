import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUserSchema extends Document {
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

const User: Model<IUserSchema> = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
