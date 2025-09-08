import mongoose, { Document, Schema } from 'mongoose';

export interface IHadith extends Document {
  text: { en: string; tr: string };
  source: { en: string; tr: string };
  narrator: { en: string; tr: string };
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  author: mongoose.Types.ObjectId;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const HadithSchema = new Schema<IHadith>(
  {
    text: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    source: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    narrator: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    category: { type: String, required: true },
    tags: [String],
    published: { type: Boolean, default: false },
    publishedAt: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Hadith || mongoose.model<IHadith>('Hadith', HadithSchema);
