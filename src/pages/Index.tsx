
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AssetCards from "@/components/AssetCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground digital-grid">
      <Header />
      <Hero />
      <Features />
      <AssetCards />
      <Footer />
    </div>
  );
};

export default Index;
