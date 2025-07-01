import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import OwnerSection from "@/components/OwnerSection";
import OurAgents from "@/components/OurAgents";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PropertiesSection />
        <OwnerSection />
        <OurAgents />
      </main>
      <WhatsAppPopup />
      <Footer />
    </div>
  );
};

export default Index;
