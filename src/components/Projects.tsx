'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '@/data/portfolio.json';

function ProjectCard({ project, index }: { project: typeof portfolioData.projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && cardRef.current) {
        gsap.fromTo(cardRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: 'power2.out'
        });
      }
    }, { threshold: 0.2 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className="project-card">
      <div onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.4, ease: 'power2.out' })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: 'power2.out' })}>
        <div className="project-image">
          <div className="project-image">
            {/* The actual image tag */}
            <img 
              src={project.image} 
              alt={project.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // This ensures it fills the space without stretching
                display: 'block'
              }}
            />
            
            <div className="project-image-overlay" />
          </div>
          <div className="project-image-overlay" />
        </div>
        <div className="project-content">
          <span className="project-category">{project.category}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-tech">
            {project.tech.map((tech) => (<span key={tech} className="project-tech-tag">{tech}</span>))}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            View Project
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section projects">
      <div className="bg-gradient-primary" />
      <div className="container">
        <div className="text-center">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        </div>
        <div className="projects-grid">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
