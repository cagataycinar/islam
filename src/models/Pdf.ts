import mongoose, { Document, Schema } from 'mongoose';

export interface IPdf extends Document {
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  slug: { en: string; tr: string };
  fileUrl: string;
  fileSize: number;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  author: mongoose.Types.ObjectId;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

const PdfSchema = new Schema<IPdf>(
  {
    title: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    slug: {
      en: { type: String, required: true, unique: true },
      tr: { type: String, required: true, unique: true },
    },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [String],
    published: { type: Boolean, default: false },
    publishedAt: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    downloads: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pdf || mongoose.model<IPdf>('Pdf', PdfSchema);
