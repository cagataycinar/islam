import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { env } from '@/lib/env';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    if (env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
    }

    await connectDB();

    const existing = await User.findOne({ email: env.ADMIN_EMAIL });
    if (existing) {
      if (!existing.roles.includes('admin')) {
        existing.roles.push('admin');
        await existing.save();
      }
      return NextResponse.json({ success: true, message: 'Admin ensured', email: env.ADMIN_EMAIL });
    }

    const passwordHash = await hashPassword(env.ADMIN_PASSWORD);
    const user = new User({
      email: env.ADMIN_EMAIL,
      passwordHash,
      roles: ['admin', 'user'],
      locale: env.DEFAULT_LOCALE,
    });

    await user.save();
    return NextResponse.json({ success: true, message: 'Admin created', email: env.ADMIN_EMAIL });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', details: (error as Error).message }, { status: 500 });
  }
}


