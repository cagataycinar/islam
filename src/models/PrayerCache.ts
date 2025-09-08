import mongoose, { Document, Schema } from 'mongoose';

export interface IPrayerCache extends Document {
  coordinates: {
    lat: number;
    lng: number;
  };
  date: string; // YYYY-MM-DD format
  times: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  method: string;
  createdAt: Date;
  updatedAt: Date;
}

const PrayerCacheSchema = new Schema<IPrayerCache>(
  {
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    date: { type: String, required: true },
    times: {
      fajr: { type: String, required: true },
      dhuhr: { type: String, required: true },
      asr: { type: String, required: true },
      maghrib: { type: String, required: true },
      isha: { type: String, required: true },
    },
    method: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
PrayerCacheSchema.index({ coordinates: 1, date: 1 }, { unique: true });

export default mongoose.models.PrayerCache || mongoose.model<IPrayerCache>('PrayerCache', PrayerCacheSchema);
