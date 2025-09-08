import mongoose, { Document, Schema } from 'mongoose';

export interface IHadithOfDay extends Document {
  text: { en: string; tr: string };
  source: { en: string; tr: string };
  narrator: { en: string; tr: string };
  date: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HadithOfDaySchema = new Schema<IHadithOfDay>(
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
    date: { type: Date, required: true, unique: true },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.HadithOfDay || mongoose.model<IHadithOfDay>('HadithOfDay', HadithOfDaySchema);
