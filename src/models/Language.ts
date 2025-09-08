import mongoose, { Document, Schema } from 'mongoose';

export interface ILanguage extends Document {
  code: string; // 'en', 'tr', etc.
  name: { en: string; tr: string };
  nativeName: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LanguageSchema = new Schema<ILanguage>(
  {
    code: { type: String, required: true, unique: true },
    name: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    nativeName: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Language || mongoose.model<ILanguage>('Language', LanguageSchema);
