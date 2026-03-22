'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseGsapAnimationOptions {
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scale' | 'custom';
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  customAnimation?: (ctx: gsap.Context) => gsap.core.Tween | gsap.core.Timeline;
}

export function useGsapAnimation(
  element: React.RefObject<HTMLElement | null>,
  options: UseGsapAnimationOptions = {}
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!element.current) return;

    const {
      animation = 'fadeIn',
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      customAnimation,
    } = options;

    const ctx = gsap.context(() => {
      if (customAnimation) {
        customAnimation(ctx);
        return;
      }

      const animations: Record<string, () => gsap.core.Tween> = {
        fadeIn: () =>
          gsap.fromTo(
            element.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' }
          ),
        slideUp: () =>
          gsap.fromTo(
            element.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          ),
        slideInLeft: () =>
          gsap.fromTo(
            element.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          ),
        slideInRight: () =>
          gsap.fromTo(
            element.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          ),
        scale: () =>
          gsap.fromTo(
            element.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out' }
          ),
      };

      const anim = animations[animation]();

      if (trigger) {
        ScrollTrigger.create({
          trigger: trigger || element.current,
          start,
          end,
          scrub,
          markers,
          animation: anim,
        });
      }
    }, element.current);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
  }, [element, options]);

  return ctxRef;
}

export function useParallax(
  element: React.RefObject<HTMLElement | null>,
  speed: number = 0.5
) {
  useEffect(() => {
    if (!element.current) return;

    const ctx = gsap.context(() => {
      gsap.to(element.current, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, element.current);

    return () => {
      ctx.revert();
    };
  }, [element, speed]);

  return element;
}
