'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const locale = (params.locale as string) || 'en';

  const [titleEn, setTitleEn] = useState('');
  const [titleTr, setTitleTr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentTr, setContentTr] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/articles/${id}`);
        const data = await res.json();
        if (res.ok) {
          setTitleEn(data.article?.title?.en || '');
          setTitleTr(data.article?.title?.tr || '');
          setContentEn(data.article?.content?.en || '');
          setContentTr(data.article?.content?.tr || '');
        } else {
          setError(data.error || 'Failed to load');
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: { en: titleEn, tr: titleTr }, content: { en: contentEn, tr: contentTr } }),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push(`/${locale}/admin/articles`);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm('Delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      router.push(`/${locale}/admin/articles`);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Article</h1>
        <button onClick={onDelete} className="text-red-600">Delete</button>
      </div>
      <form onSubmit={onSave} className="space-y-4 max-w-2xl">
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
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}


