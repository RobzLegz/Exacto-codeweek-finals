import React from "react";
import PageModule from "../PageModule";
import HeroSection from "../../components/home/HeroSection";
import BlogsSection from "../../components/home/BlogsSection";
import EventsSection from "../../components/home/EventsSection";
import PartnersSection from "../../components/home/PartnersSection";
import ContactFormSection from "../../components/home/ContactFormSection";

const Home = () => {
  return (
    <PageModule title="Exacto" description="Exacto">
      <HeroSection />

      <BlogsSection />

      <EventsSection />

      <ContactFormSection />

      <PartnersSection />
    </PageModule>
  );
};

export default Home;
