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
