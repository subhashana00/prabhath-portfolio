import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPReveal(selector: string, options?: gsap.TweenVars) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.97, ...options?.from },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            ...options,
          }
        );
      });
    });

    return () => ctx.revert();
  }, [selector]);
}

export function useGSAPHorizontalScroll(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      const panels = gsap.utils.toArray<HTMLElement>(".h-scroll-panel", container);

      if (panels.length === 0) return;

      const totalWidth = panels.reduce((acc, el) => acc + el.offsetWidth, 0);

      // Only create horizontal scroll on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${totalWidth - window.innerWidth + 200}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
        });
      });

      return () => mm.revert();
    }, containerRef.current);

    return () => ctx.revert();
  }, [containerRef]);
}

export function useGSAPParallax(ref: React.RefObject<HTMLElement>, strength = 0.15) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.to(ref.current!, {
          yPercent: -strength * 100,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current!,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, strength]);
}

export function useGSAPStagger(containerRef: React.RefObject<HTMLElement>, childSelector: string) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(childSelector, containerRef.current!);

      gsap.fromTo(
        items,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, childSelector]);
}

export function useGSAPTextReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!,
        { y: 80, opacity: 0, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current!,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}

export { gsap, ScrollTrigger };
