import mongoose, { Document, Schema } from 'mongoose';

export interface ISirahSection extends Document {
  title: { en: string; tr: string };
  content: { en: string; tr: string };
  slug: { en: string; tr: string };
  order: number;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  author: mongoose.Types.ObjectId;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const SirahSectionSchema = new Schema<ISirahSection>(
  {
    title: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    slug: {
      en: { type: String, required: true, unique: true },
      tr: { type: String, required: true, unique: true },
    },
    order: { type: Number, required: true },
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

export default mongoose.models.SirahSection || mongoose.model<ISirahSection>('SirahSection', SirahSectionSchema);
