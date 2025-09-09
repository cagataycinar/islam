import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { getCurrentUser } from '@/lib/cookies';

interface ProtectedAdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function ProtectedAdminLayout({ children, params }: ProtectedAdminLayoutProps) {
  const { locale } = await params;

  const user = await getCurrentUser();
  if (!user || !user.roles?.includes('admin')) {
    redirect(`/${locale}/admin/login`);
  }

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


