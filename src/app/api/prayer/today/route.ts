import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PrayerCache from '@/models/PrayerCache';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat') || '');
    const lng = parseFloat(searchParams.get('lng') || '');
    const method = searchParams.get('method') || 'MWL';
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 });
    }
    const today = new Date();
    const date = today.toISOString().slice(0, 10);

    await connectDB();
    const cached = await PrayerCache.findOne({ 'coordinates.lat': lat, 'coordinates.lng': lng, date });
    if (cached) return NextResponse.json({ success: true, source: 'cache', ...cached.toObject() });

    // Simple demo using aladhan API
    const apiUrl = `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=2`;
    const resp = await fetch(apiUrl);
    const json = await resp.json();
    const t = json?.data?.timings || {};
    const times = { fajr: t.Fajr, dhuhr: t.Dhuhr, asr: t.Asr, maghrib: t.Maghrib, isha: t.Isha };

    const saved = await PrayerCache.create({ coordinates: { lat, lng }, date, times, method });
    return NextResponse.json({ success: true, source: 'api', ...saved.toObject() });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', details: (error as Error).message }, { status: 500 });
  }
}


