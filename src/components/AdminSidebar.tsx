'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import { useCallback } from 'react';

interface AdminSidebarProps {
  locale: string;
}

export default function AdminSidebar({ locale }: AdminSidebarProps) {
  const t = getTranslations(locale as 'en' | 'tr');
  const pathname = usePathname();

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = `/${locale}`;
    } catch {
      // eslint-disable-next-line no-console
      console.error('Logout failed');
    }
  }, [locale]);

  const navigation = [
    { name: t.admin.dashboard, href: `/${locale}/admin`, icon: '📊' },
    { name: t.admin.articles, href: `/${locale}/admin/articles`, icon: '📝' },
    { name: t.admin.blogs, href: `/${locale}/admin/blogs`, icon: '✍️' },
    { name: t.admin.pdfs, href: `/${locale}/admin/pdfs`, icon: '📄' },
    { name: t.admin.hadiths, href: `/${locale}/admin/hadiths`, icon: '💬' },
    { name: t.admin.sirah, href: `/${locale}/admin/sirah`, icon: '👤' },
    { name: t.admin.calendar, href: `/${locale}/admin/calendar`, icon: '📅' },
    { name: t.admin.dailyContent, href: `/${locale}/admin/daily-content`, icon: '⭐' },
    { name: t.admin.users, href: `/${locale}/admin/users`, icon: '👥' },
    { name: t.admin.settings, href: `/${locale}/admin/settings`, icon: '⚙️' },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-green-600">Admin Panel</h1>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? 'bg-green-100 text-green-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex w-full items-center justify-between">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              ← {t.admin.backToSite}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              {locale === 'tr' ? 'Çıkış Yap' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
