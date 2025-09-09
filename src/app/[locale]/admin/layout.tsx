import AdminSidebar from '@/components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar locale={locale} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
