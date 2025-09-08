import { env } from './env';

export interface ExpoPushMessage {
  to: string | string[];
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: 'default' | null;
  badge?: number;
  channelId?: string;
}

export interface ExpoPushResponse {
  data: Array<{
    status: 'ok' | 'error';
    id?: string;
    message?: string;
    details?: unknown;
  }>;
}

export async function sendPushNotification(message: ExpoPushMessage): Promise<ExpoPushResponse> {
  const response = await fetch(env.EXPO_PUSH_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(`Expo push notification failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function sendBulkPushNotifications(messages: ExpoPushMessage[]): Promise<ExpoPushResponse> {
  const response = await fetch(env.EXPO_PUSH_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  if (!response.ok) {
    throw new Error(`Expo bulk push notification failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
