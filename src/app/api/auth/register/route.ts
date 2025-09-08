import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import { createUser, generateToken } from '@/lib/auth';
import { setAuthCookie } from '@/lib/cookies';
import User from '@/models/User';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  locale: z.enum(['en', 'tr']).optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, locale } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser(email, password, locale);

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles,
    });

    // Set cookie
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        locale: user.locale,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
