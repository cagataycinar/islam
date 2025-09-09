import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hadith from '@/models/Hadith';
import { getCurrentUser } from '@/lib/cookies';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles?.includes('admin')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = 20;
    const filter = q ? { $or: [{ 'text.en': { $regex: q, $options: 'i' } }, { 'text.tr': { $regex: q, $options: 'i' } }, { category: { $regex: q, $options: 'i' } }] } : {};
    const [items, total] = await Promise.all([
      Hadith.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize),
      Hadith.countDocuments(filter),
    ]);
    return NextResponse.json({ success: true, items, total, page, pageSize });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', details: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles?.includes('admin')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const body = await req.json();
    const doc = await Hadith.create(body);
    return NextResponse.json({ success: true, hadith: doc });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', details: (error as Error).message }, { status: 500 });
  }
}


