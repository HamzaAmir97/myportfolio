'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export type TechItem = {
  name: string;
  iconClass?: string; // مثال: "devicon-react-original"
};

export type StackSection = {
  key: string;
  title: string;
  blurb?: string;
  techs?: TechItem[];
};

type Props = {
  sections: StackSection[];
  /** المدة بين كل تبديل (ms). الافتراضي: 2000 */
  intervalMs?: number;
  /** مدة ترانزيشن GSAP (sec). الافتراضي: 0.5 */
  transitionSec?: number;
  /** إيقاف التشغيل عند تمرير الماوس فوق المنطقة */
  pauseOnHover?: boolean;
  /** classes إضافية للرابر */
  className?: string;
};

const StackRotator: React.FC<Props> = ({
  sections,
  intervalMs = 2000,
  transitionSec = 0.5,
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  // ✅ اجعلها number بوضوح (متصفح):
  const intervalRef = useRef<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const panels = panelsRef.current;
    if (panels.length === 0) return;

    // تهيئة
    panels.forEach((p, i) => {
      gsap.set(p, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
      p.style.pointerEvents = i === 0 ? 'auto' : 'none';
    });

    const show = (nextIndex: number) => {
      const current = panels[indexRef.current];
      const next = panels[nextIndex];
      if (!current || !next || current === next) return;

      gsap.to(current, {
        autoAlpha: 0,
        y: -20,
        duration: transitionSec,
        ease: 'power2.out',
        onStart: () => { current.style.pointerEvents = 'none'; },
      });

      gsap.fromTo(
        next,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: transitionSec,
          ease: 'power2.out',
          onComplete: () => { next.style.pointerEvents = 'auto'; },
        }
      );

      indexRef.current = nextIndex;
    };

    const start = () => {
      stop();
      if (typeof window === 'undefined') return; // حماية SSR
      intervalRef.current = window.setInterval(() => {
        const next = (indexRef.current + 1) % panels.length;
        show(next);
      }, intervalMs) as unknown as number; // ضمان النوع number
    };

    const stop = () => {
      if (intervalRef.current !== null) {
        if (typeof window !== 'undefined') {
          window.clearInterval(intervalRef.current);
        }
        intervalRef.current = null;
      }
    };

    start();

    // إيقاف عند hover لو مفعل
    const c = containerRef.current;
    if (pauseOnHover && c) {
      const onEnter = () => stop();
      const onLeave = () => start();
      c.addEventListener('mouseenter', onEnter);
      c.addEventListener('mouseleave', onLeave);
      return () => {
        stop();
        c.removeEventListener('mouseenter', onEnter);
        c.removeEventListener('mouseleave', onLeave);
      };
    }

    return () => stop();
  }, [intervalMs, transitionSec, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={['relative w-full', className].filter(Boolean).join(' ')}
      aria-roledescription="carousel"
    >
      <div className="relative h-[420px] sm:h-[480px] md:h-[520px] overflow-hidden">
        {sections.map((s, idx) => (
          <div
            key={s.key}
            ref={(el) => { if (el) panelsRef.current[idx] = el; }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden={idx !== 0}
          >
            <div className="w-full max-w-4xl text-center px-6">
              <h2 className="m-0 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                {s.title}
              </h2>

              {s.blurb && (
                <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-400">
                  {s.blurb}
                </p>
              )}

              {!!s.techs?.length && (
                <div className="mt-5 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {s.techs.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2 hover:border-white/20 transition"
                      title={t.name}
                    >
                      {t.iconClass ? (
                        <i className={`${t.iconClass} text-2xl`} />
                      ) : (
                        <span className="text-xl">•</span>
                      )}
                      <span className="text-sm font-semibold">{t.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {sections.map((_, i) => (
          <span key={i} className="h-1.5 w-4 rounded-full bg-white/20" />
        ))}
      </div>
    </div>
  );
};

export default StackRotator;
