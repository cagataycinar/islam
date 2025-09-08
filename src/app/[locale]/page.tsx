import Hero from '@/components/Hero';
import VerseOfDay from '@/components/VerseOfDay';
import HadithOfDay from '@/components/HadithOfDay';
import ArticlesSection from '@/components/ArticlesSection';
import BlogSection from '@/components/BlogSection';
import LibrarySection from '@/components/LibrarySection';
import HadithSection from '@/components/HadithSection';
import SirahSection from '@/components/SirahSection';
import ImportantDaysSection from '@/components/ImportantDaysSection';
import PrayerTimesWidget from '@/components/PrayerTimesWidget';
import AskAICTA from '@/components/AskAICTA';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <VerseOfDay />
            <HadithOfDay />
            <ArticlesSection />
            <BlogSection />
            <LibrarySection />
            <HadithSection />
            <SirahSection />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <ImportantDaysSection />
            <PrayerTimesWidget />
            <AskAICTA />
          </div>
        </div>
      </div>
    </div>
  );
}
