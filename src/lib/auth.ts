import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from './env';
import User from '@/models/User';

export interface JWTPayload {
  userId: string;
  email: string;
  roles: string[];
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function createUser(email: string, password: string, locale: 'en' | 'tr' = 'en') {
  const passwordHash = await hashPassword(password);
  
  const user = new User({
    email,
    passwordHash,
    locale,
    roles: ['user'],
  });

  return await user.save();
}

export async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email }).select('+passwordHash');
  
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  
  if (!isValid) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    locale: user.locale,
    roles: user.roles,
  };
}
