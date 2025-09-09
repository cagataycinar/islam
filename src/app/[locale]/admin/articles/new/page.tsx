'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function NewArticlePage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || 'en';

  const [titleEn, setTitleEn] = useState('');
  const [titleTr, setTitleTr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentTr, setContentTr] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: { en: titleEn, tr: titleTr },
          content: { en: contentEn, tr: contentTr },
          published: false,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create');
      }
      router.push(`/${locale}/admin/articles`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Article</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title (EN)</label>
          <input value={titleEn} onChange={e => setTitleEn(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title (TR)</label>
          <input value={titleTr} onChange={e => setTitleTr(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content (EN)</label>
          <textarea value={contentEn} onChange={e => setContentEn(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 h-40" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content (TR)</label>
          <textarea value={contentTr} onChange={e => setContentTr(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 h-40" required />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex gap-3">
          <button disabled={saving} type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50">
            {saving ? 'Saving...' : 'Create'}
          </button>
          <button type="button" onClick={() => router.push(`/${locale}/admin/articles`)} className="px-4 py-2 rounded-md border">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


