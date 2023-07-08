/**
 * This module defines and exports an 'AuctionItem' model for MongoDB using Mongoose. 
 * The 'IAuctionItemSchema' interface shapes the AuctionItem documents, including an array of 'IBid' subdocuments.
 * The 'AuctionItemSchema' describes the structure of AuctionItem documents, referencing 'User' and 'AuctionEvent' collections. 
 * The module exports a 'AuctionItem' model based on 'AuctionItemSchema', reusing the model if it already exists.
 */

import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBid {
  amount: number;
  bidBy: Schema.Types.ObjectId;
  bidAt: Date;
}

interface IAuctionItemSchema extends Document {
  title: string;
  description: string;
  startPrice: number;
  currentPrice: number;
  bids: IBid[];
  auction: Schema.Types.ObjectId;
}

const AuctionItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  bids: [{
    amount: { type: Number, required: true },
    bidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bidAt: { type: Date, default: Date.now },
  }],
  auction: { type: mongoose.Schema.Types.ObjectId, ref: 'AuctionEvent', required: true },
}, { timestamps: true });

const AuctionItem: Model<IAuctionItemSchema> = mongoose.models.AuctionItem || mongoose.model('AuctionItem', AuctionItemSchema);

export default AuctionItem;
