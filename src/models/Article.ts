import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
  title: { en: string; tr: string };
  content: { en: string; tr: string };
  excerpt: { en: string; tr: string };
  slug: { en: string; tr: string };
  featuredImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  author: mongoose.Types.ObjectId;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    excerpt: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    slug: {
      en: { type: String, required: true, unique: true },
      tr: { type: String, required: true, unique: true },
    },
    featuredImage: String,
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

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
