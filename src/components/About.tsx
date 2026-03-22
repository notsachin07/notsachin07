'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '@/data/portfolio.json';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-text-line', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-content', start: 'top 80%' }
      });

      gsap.fromTo('.about-image', { scale: 1.2, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-image', start: 'top 80%' }
      });

      gsap.to('.about-image', {
        y: -50, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section about">
      <div className="bg-gradient-primary" />
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="about-label">About Me</span>
            <h2 className="about-title">
              Building the<br />
              <span className="gradient-text">Future of Web</span>
            </h2>
            <div>
              {portfolioData.about.description.map((paragraph, index) => (
                <p key={index} className="about-text about-text-line">{paragraph}</p>
              ))}
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number gradient-text">{portfolioData.about.stats.yearsExperience}</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number gradient-text">{portfolioData.about.stats.projectsCompleted}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number gradient-text">{portfolioData.about.stats.happyClients}</span>
                <span className="stat-label">Clients</span>
              </div>
            </div>
          </div>

          <div className="about-image-wrapper">
            <div className="about-image">
              <div className="about-image-inner">
                <div className="about-image-container">
                  <img 
                    src={portfolioData.personal.avatar} 
                    alt={portfolioData.personal.name} 
                    className="about-avatar-image"
                    style={{
                      width: '100%',
                      height: '448px',
                    }}
                  />
                </div>
              </div>
              <div className="about-image-border-1" />
              <div className="about-image-border-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
