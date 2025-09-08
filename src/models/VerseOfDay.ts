import mongoose, { Document, Schema } from 'mongoose';

export interface IVerseOfDay extends Document {
  verse: { en: string; tr: string };
  translation: { en: string; tr: string };
  surah: string;
  ayah: number;
  date: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VerseOfDaySchema = new Schema<IVerseOfDay>(
  {
    verse: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    translation: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    surah: { type: String, required: true },
    ayah: { type: Number, required: true },
    date: { type: Date, required: true, unique: true },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.VerseOfDay || mongoose.model<IVerseOfDay>('VerseOfDay', VerseOfDaySchema);
