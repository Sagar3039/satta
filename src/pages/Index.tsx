
import MainLayout from "@/layout/MainLayout";
import HeroSection from "@/components/HeroSection";
import FeaturedGames from "@/components/FeaturedGames";
import LatestResults from "@/components/LatestResults";
import InfoSection from "@/components/InfoSection";
// import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedGames />
      <LatestResults />
      <InfoSection />
      {/* <CTASection /> */}
    </MainLayout>
  );
};

export default Index;
