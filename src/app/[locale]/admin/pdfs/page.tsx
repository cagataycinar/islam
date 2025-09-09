import Link from 'next/link';

async function fetchPdfs(searchParams: { q?: string; page?: string }) {
  try {
    const query = new URLSearchParams();
    if (searchParams.q) query.set('q', searchParams.q);
    if (searchParams.page) query.set('page', searchParams.page);
    const res = await fetch(`/api/admin/pdfs?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) return { items: [], total: 0, page: 1, pageSize: 20 };
    const data = await res.json();
    return { items: data.items ?? [], total: data.total ?? 0, page: data.page ?? 1, pageSize: data.pageSize ?? 20 };
  } catch {
    return { items: [], total: 0, page: 1, pageSize: 20 };
  }
}

export default async function AdminPdfsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const params = await searchParams;
  const { items, total, page, pageSize } = await fetchPdfs(params || {});
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">PDF Library</h1>
        <Link href="./pdfs/new" className="bg-green-600 text-white px-4 py-2 rounded-md">New PDF</Link>
      </div>

      <div className="flex items-center gap-3">
        <form className="flex-1">
          <input name="q" defaultValue={params?.q || ''} placeholder="Search..." className="w-full border rounded-md px-3 py-2" />
        </form>
      </div>

      <div className="bg-white rounded-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title (EN)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title (TR)</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((a: any) => (
              <tr key={a._id}>
                <td className="px-4 py-3">{a.title?.en}</td>
                <td className="px-4 py-3">{a.title?.tr}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`./pdfs/${a._id}`} className="text-green-600 hover:text-green-800">Edit</Link>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={3}>No PDFs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Total: {total}</div>
        <div className="flex gap-2">
          <Link href={`?${new URLSearchParams({ ...(params?.q ? { q: params.q } : {}), page: String(Math.max(1, (page || 1) - 1)) })}`} className="px-3 py-1 border rounded-md">Prev</Link>
          <span className="px-2">{page} / {totalPages}</span>
          <Link href={`?${new URLSearchParams({ ...(params?.q ? { q: params.q } : {}), page: String(Math.min(totalPages, (page || 1) + 1)) })}`} className="px-3 py-1 border rounded-md">Next</Link>
        </div>
      </div>
    </div>
  );
}


