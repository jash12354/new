import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustStatsSection from '@/components/TrustStatsSection';
import ServicesSection from '@/components/ServicesSection';
import BridalSection from '@/components/BridalSection';
import WeddingEventSection from '@/components/WeddingEventSection';
import PortfolioGallery from '@/components/PortfolioGallery';
import BeforeAfterStain from '@/components/BeforeAfterStain';
import WhyChooseSection from '@/components/WhyChooseSection';
import AcademySection from '@/components/AcademySection';
import BookingSystem from '@/components/BookingSystem';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-50 text-mehndi-950 font-sans selection:bg-gold-400 selection:text-mehndi-950">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <TrustStatsSection />
      <ServicesSection />
      <BridalSection />
      <WeddingEventSection />
      <PortfolioGallery />
      <BeforeAfterStain />
      <WhyChooseSection />
      <AcademySection />
      <BookingSystem />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </main>
  );
}
