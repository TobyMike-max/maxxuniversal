'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%', // 3x viewport scroll
          scrub: true,
          pin: true,
        },
      });

      slidesRef.current.forEach((slide, i) => {
        timeline.fromTo(
          slide,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          i // stagger each at step i
        ).to(
          slide,
          { opacity: 0, y: -50, duration: 1 },
          i + 0.75 // fade out before the next
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-white text-black flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-20 text-center text-4xl font-bold">
        {['We Create', 'We Animate', 'We Innovate'].map((text, index) => (
          <div
            key={index}
            ref={(el) => {slidesRef.current[index] = el!}}
            className="absolute"
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
