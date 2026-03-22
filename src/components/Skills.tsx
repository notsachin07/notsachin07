'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '@/data/portfolio.json';

const categories = ['All', 'Backend', 'Database', 'Languages', 'Systems', 'Tools', 'Hardware', 'Mobile'];

function CircularProgress({ level, name, delay }: { level: number; name: string; delay: number }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && circleRef.current) {
        const circumference = 2 * Math.PI * 45;
        gsap.fromTo(circleRef.current, { strokeDashoffset: circumference }, {
          strokeDashoffset: circumference * (1 - level / 100),
          duration: 1.5, delay: delay / 1000, ease: 'elastic.out(1, 0.5)'
        });
      }
    }, { threshold: 0.5 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={containerRef} className="skill-item">
      <div className="skill-circle">
        <svg viewBox="0 0 100 100">
          <circle className="skill-circle-bg" cx="50" cy="50" r="45" />
          <circle ref={circleRef} className="skill-circle-progress" cx="50" cy="50" r="45"
            strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45} />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="skill-circle-value">{level}%</div>
      </div>
      <span className="skill-name">{name}</span>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filteredSkills = activeCategory === 'All'
    ? portfolioData.skills
    : portfolioData.skills.filter((skill) => skill.category === activeCategory);

  return (
    <section ref={sectionRef} id="skills" className="section skills">
      <div className="bg-gradient-secondary" />
      <div className="container skills-center">
        <span className="section-label">Skills & Expertise</span>
        <h2 className="section-title">My <span className="gradient-text">Tech Stack</span></h2>

        <div className="skills-filter">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={skill.name} className="skill-card"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: 'power2.out' })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' })}>
              <CircularProgress level={skill.level} name={skill.name} delay={index * 100} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
