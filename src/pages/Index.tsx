
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AssetCards from "@/components/AssetCards";
import HowToStart from "@/components/HowToStart";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground digital-grid">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="features">
        <Features />
        <AssetCards />
      </div>
      <div id="how-to-start">
        <HowToStart />
      </div>
      <div id="about">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
