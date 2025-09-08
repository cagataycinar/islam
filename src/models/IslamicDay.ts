import mongoose, { Document, Schema } from 'mongoose';

export interface IIslamicDay extends Document {
  name: { en: string; tr: string };
  description: { en: string; tr: string };
  date: Date;
  hijriDate: string;
  category: string;
  importance: 'low' | 'medium' | 'high';
  published: boolean;
  publishedAt?: Date;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const IslamicDaySchema = new Schema<IIslamicDay>(
  {
    name: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    date: { type: Date, required: true },
    hijriDate: { type: String, required: true },
    category: { type: String, required: true },
    importance: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    published: { type: Boolean, default: false },
    publishedAt: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.IslamicDay || mongoose.model<IIslamicDay>('IslamicDay', IslamicDaySchema);
