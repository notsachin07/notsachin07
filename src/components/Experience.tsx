'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '@/data/portfolio.json';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-card', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' }
      });
      gsap.fromTo('.timeline-line', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: timelineRef.current, start: 'top center', end: 'bottom center', scrub: 1 }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section experience">
      <div className="bg-gradient-primary" />
      <div className="container">
        <div className="text-center">
          <span className="section-label">Career Journey</span>
          <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
        </div>
        <div ref={timelineRef} className="timeline">
          <div className="timeline-line" />
          {portfolioData.experience.map((exp, index) => (
            <div key={exp.id} className="timeline-item exp-card">
              <div className="timeline-dot" />
              <div className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                <span className="timeline-year">{exp.year}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-description">{exp.description}</p>
                <ul className="timeline-highlights">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>
                      <span className={index % 2 === 0 ? 'ml-auto' : ''}>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
