'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import portfolioData from '@/data/portfolio.json';

const HeroSphere = dynamic(() => import('./Three/HeroSphere'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="loading-spinner" />
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 0);
    gsap.registerPlugin(ScrollTrigger);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0);
      tl.fromTo('.hero-title', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1 }, 0.2);
      tl.fromTo('.hero-description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
      tl.fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8);
      tl.fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.2);
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="hero">
      <div className="hero-bg">
        <HeroSphere />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="hero-subtitle"
        >
          {portfolioData.personal.title}
        </motion.p>

        <h1 className="hero-title">
          <span>Crafting Digital</span>
          <span className="gradient-text">Experiences</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-description"
        >
          {portfolioData.personal.tagline}
        </motion.p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in Touch
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hero-scroll"
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
