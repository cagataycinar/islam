import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { Types } from 'mongoose';
import { getCurrentUser } from '@/lib/cookies';

// GET: list articles (admin only)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = 20;
    const filter = q
      ? { $or: [{ 'title.en': { $regex: q, $options: 'i' } }, { 'title.tr': { $regex: q, $options: 'i' } }, { tags: { $in: [q] } }] }
      : {};

    const [items, total] = await Promise.all([
      Article.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize),
      Article.countDocuments(filter),
    ]);
    return NextResponse.json({ success: true, items, total, page, pageSize });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', details: (error as Error).message }, { status: 500 });
  }
}

// POST: create article (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const doc = await Article.create(body);
    return NextResponse.json({ success: true, article: doc });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', details: (error as Error).message }, { status: 500 });
  }
}


