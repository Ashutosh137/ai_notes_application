"use client";
import HomePageHeader from "./_component/HomePageHeader";
import Hero from "./_component/Hero";
import SolutionSection from "./_component/solution";
import TestimonialSection from "./_component/testimonial";
import FeatureSection from "./_component/features";
import FooterSection from "./_component/footer";

export default function Home() {
  return (
    <div className="container mx-auto ">
      <HomePageHeader />
      <Hero />
      <SolutionSection />
      <TestimonialSection />
      <FeatureSection />
      <FooterSection />
    </div>
  );
}
