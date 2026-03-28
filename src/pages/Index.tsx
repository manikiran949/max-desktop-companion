import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecretCodesSection from "@/components/SecretCodesSection";
import LoreSection from "@/components/LoreSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-[#03030a]">
      {/* Background Effects */}
      <div className="space-wrap">
        <div className="nebula-glow" />
        <div className="stars-layer-1" />
        <div className="stars-layer-2" />
        <div className="stars-layer-3" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <ShowcaseSection />
        <FeaturesSection />
        <SecretCodesSection />
        <LoreSection />
        <FAQSection />
        <TeamSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
