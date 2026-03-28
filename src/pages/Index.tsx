import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecretCodesSection from "@/components/SecretCodesSection";
import LoreSection from "@/components/LoreSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <div className="starfield" />
      <HeroSection />
      <FeaturesSection />
      <SecretCodesSection />
      <LoreSection />
      <TeamSection />
      <FooterSection />
    </div>
  );
};

export default Index;
