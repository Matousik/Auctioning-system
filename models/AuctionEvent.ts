/**
 * This module defines and exports an 'AuctionEvent' model for MongoDB using Mongoose. 
 * The 'IAuctionEventSchema' interface outlines the AuctionEvent documents, including an array of 'items'.
 * 'AuctionEventSchema' structures the AuctionEvent documents in MongoDB, referencing 'AuctionItem' collection for 'items'. 
 * The module exports an 'AuctionEvent' model based on 'AuctionEventSchema', reusing the model if it already exists.
 */

import mongoose, { Document, Model, Schema } from 'mongoose';

interface IAuctionEventSchema extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  items: Schema.Types.ObjectId[];
}

const AuctionEventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuctionItem' }],
}, { timestamps: true });

const AuctionEvent: Model<IAuctionEventSchema> = mongoose.models.AuctionEvent || mongoose.model('AuctionEvent', AuctionEventSchema);

export default AuctionEvent;
