import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecretCodesSection from "@/components/SecretCodesSection";
import LoreSection from "@/components/LoreSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <div className="starfield" />
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SecretCodesSection />
      <LoreSection />
      <FAQSection />
      <TeamSection />
      <FooterSection />
    </div>
  );
};

export default Index;
