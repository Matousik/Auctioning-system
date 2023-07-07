/**
 * This module defines and exports a 'User' model for MongoDB using Mongoose. 
 * It declares an 'IUserSchema' interface, which shapes User documents. 
 * Then, it specifies a 'UserSchema', outlining the structure and data types of User documents. 
 * Finally, it compiles and exports a 'User' model based on 'UserSchema', avoiding recompilation if the model already exists.
 */

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserSchema extends Document {
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
