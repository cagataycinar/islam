import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  title: { en: string; tr: string };
  body: { en: string; tr: string };
  type: 'daily' | 'new_content' | 'general';
  sent: boolean;
  sentAt?: Date;
  recipients: string[]; // expo push tokens
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    body: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    type: {
      type: String,
      enum: ['daily', 'new_content', 'general'],
      required: true,
    },
    sent: { type: Boolean, default: false },
    sentAt: Date,
    recipients: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
