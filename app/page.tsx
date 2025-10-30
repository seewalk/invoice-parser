// Server Component - renders schemas in static HTML
import { getFAQsByCategory } from './lib/faqData';
import HomePageSchema from './components/home-page/HomePageSchema';
import HomeContent from './HomeContent';

export default function Home() {
  // Get FAQs for schema generation (server-side)
  const faqs = getFAQsByCategory('Invoice Automation').slice(0, 10);
  
  return (
    <>
      {/* Server-side schemas - will be in static HTML */}
      <HomePageSchema faqs={faqs} />
      
      {/* Client component for interactive features */}
      <HomeContent />
    </>
  );
}
