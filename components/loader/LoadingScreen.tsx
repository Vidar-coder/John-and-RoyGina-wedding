'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Cinzel } from 'next/font/google';
import { useReducedMotion } from 'motion/react';
import { useAudio } from '@/contexts/audio-context';
import { useSiteConfig } from '@/hooks/use-site-config';
import { cornerTextureBackgroundStyle } from '@/lib/corner-texture-background';
import { parseWeddingDate } from '@/lib/wedding-date';

const TEXT_WHITE = '#ffffff';
const dividerFade = 'color-mix(in srgb, #ffffff 42%, transparent)';

function VenueDivider() {
  return (
    <div className="mt-3 flex w-full items-center justify-center gap-1.5 sm:mt-3.5">
      <span className="h-px w-12 sm:w-16" style={{ background: dividerFade }} aria-hidden />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: dividerFade }}
        aria-hidden
      />
      <span className="h-px w-12 sm:w-16" style={{ background: dividerFade }} aria-hidden />
    </div>
  );
}

const loadingCinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-loading-cinzel',
});

interface LoadingScreenProps {
  onComplete: () => void;
  onFadeStart?: () => void;
}

const LOADING_MS = 9000;
const FADE_OUT_MS = 1400;

const INFINITY_PATH =
  'M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z';

function InfinityLoader() {
  return (
    <div
      className="relative mx-auto h-9 w-[4.5rem] sm:h-11 sm:w-24 md:h-12 md:w-28 lg:h-14 lg:w-32"
      aria-hidden
    >
      <svg
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 187.3 93.7"
      >
        <path
          d={INFINITY_PATH}
          fill="none"
          stroke="#d4af37"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          opacity={0.15}
        />
        <path
          className="loading-infinity-outline"
          d={INFINITY_PATH}
          fill="none"
          stroke="#f5e6a8"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
      </svg>
    </div>
  );
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onFadeStart }) => {
  const siteConfig = useSiteConfig();
  const { audioRef } = useAudio();
  const reduceMotion = useReducedMotion();
  const [fadeOut, setFadeOut] = useState(false);

  const coupleAlt = `${siteConfig.couple.groomNickname} and ${siteConfig.couple.brideNickname}`;

  const ceremonyMeta = useMemo(() => {
    const ceremonyDate = siteConfig.ceremony.date ?? siteConfig.wedding.date;
    const parsedDate = parseWeddingDate(ceremonyDate);
    const ceremonyTimeDisplay = siteConfig.ceremony.time ?? siteConfig.wedding.time;
    const timeStr = ceremonyTimeDisplay.split(',')[0].trim();
    const ceremonyDay = siteConfig.ceremony.day || parsedDate.dayOfWeek;
    const ceremonyDayShort = ceremonyDay.slice(0, 3).toUpperCase();
    const ceremonyWhere =
      siteConfig.ceremony.location?.trim() ||
      siteConfig.ceremony.venue?.trim() ||
      siteConfig.wedding.venue?.trim() ||
      '';

    return {
      month: parsedDate.month.toUpperCase(),
      dayNumber: parsedDate.day,
      year: parsedDate.year,
      dayShort: ceremonyDayShort,
      timeStr,
      venueUpper: ceremonyWhere.toUpperCase(),
    };
  }, [siteConfig]);

  const lineMuted = dividerFade;

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    audioEl.loop = true;

    const startMusic = async () => {
      try {
        await audioEl.play();
      } catch {
        audioEl.muted = true;
        try {
          await audioEl.play();
        } catch {
          audioEl.muted = false;
        }
      }
    };

    void startMusic();
  }, [audioRef]);

  useEffect(() => {
    const loadingMs = reduceMotion ? 2000 : LOADING_MS;
    const fadeMs = reduceMotion ? 200 : FADE_OUT_MS;

    const completeTimer = setTimeout(() => {
      onFadeStart?.();
      setFadeOut(true);
      setTimeout(onComplete, fadeMs);
    }, loadingMs);

    return () => clearTimeout(completeTimer);
  }, [onComplete, onFadeStart, reduceMotion]);

  return (
    <div
      className={`${loadingCinzel.variable} loading-screen-fade fixed inset-0 z-50 flex flex-col overflow-hidden${fadeOut ? ' is-fading' : ''}`}
      aria-live="polite"
      aria-busy={!fadeOut}
      aria-label="Loading invitation"
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      <style>{`
        .loading-font-cinzel {
          font-family: var(--font-loading-cinzel), var(--font-cinzel), 'Cinzel', serif;
        }
        .loading-text-glow {
          text-shadow:
            0 1px 0 rgba(139, 105, 20, 0.55),
            0 2px 6px rgba(0, 0, 0, 0.95),
            0 0 16px rgba(212, 175, 55, 0.35);
        }
        @keyframes loading-fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .loading-screen-fade {
          transition: opacity 1.4s ease;
        }
        .loading-screen-fade.is-fading {
          opacity: 0;
        }
        .loading-content-enter {
          animation: loading-fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .loading-infinity-outline {
          stroke-dasharray: 2.42777px, 242.77666px;
          stroke-dashoffset: 0;
          animation: loading-infinity-anim 1.6s linear infinite;
        }
        @keyframes loading-infinity-anim {
          12.5% {
            stroke-dasharray: 33.98873px, 242.77666px;
            stroke-dashoffset: -26.70543px;
          }
          43.75% {
            stroke-dasharray: 84.97183px, 242.77666px;
            stroke-dashoffset: -84.97183px;
          }
          100% {
            stroke-dasharray: 2.42777px, 242.77666px;
            stroke-dashoffset: -240.34889px;
          }
        }
        .loading-deco-main {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          min-height: 0;
          padding-top: clamp(2rem, 10.5vh, 4.75rem);
          padding-bottom: clamp(0.5rem, 2vh, 1rem);
        }
        .loading-deco-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: min(92vw, 26rem);
          margin-inline: auto;
        }
        .loading-deco-stack img {
          display: block;
          height: auto;
          max-width: 100%;
          object-fit: contain;
        }
        .loading-img-monogram {
          width: min(26vw, 6.25rem);
          margin-bottom: clamp(0.85rem, 2.8vh, 1.65rem);
        }
        .loading-img-save-the-date {
          width: min(72vw, 17.25rem);
          margin-bottom: clamp(0.65rem, 2.2vh, 1.15rem);
        }
        .loading-couple-name-wrap {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          margin-top: clamp(0.85rem, 3.2vh, 1.75rem);
          margin-bottom: clamp(1.85rem, 6.5vh, 3.5rem);
        }
        .loading-img-couple-name {
          width: min(90vw, 24.5rem);
          margin-inline: auto;
          object-position: center center;
        }
        .loading-deco-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          text-align: center;
        }
        @media (max-width: 767px) {
          .loading-deco-main {
            padding-top: clamp(1.75rem, 9.5vh, 3.5rem);
          }
          .loading-deco-stack {
            max-width: min(90vw, 23.5rem);
          }
          .loading-img-monogram {
            width: min(24vw, 5.75rem);
            margin-bottom: clamp(0.75rem, 2.5vh, 1.35rem);
          }
          .loading-img-save-the-date {
            width: min(70vw, 16.5rem);
            margin-bottom: clamp(0.55rem, 1.9vh, 0.95rem);
          }
          .loading-couple-name-wrap {
            margin-top: clamp(1rem, 3.8vh, 2rem);
            margin-bottom: clamp(2rem, 7vh, 3.75rem);
          }
          .loading-img-couple-name {
            width: min(88vw, 22.5rem);
          }
        }
        @media (min-width: 768px) {
          .loading-deco-main {
            justify-content: center;
            padding-top: clamp(1.5rem, 6vh, 3rem);
            padding-bottom: clamp(1rem, 3vh, 2rem);
          }
          .loading-deco-stack {
            max-width: min(36rem, 58vw);
          }
          .loading-img-monogram {
            width: min(18vw, 7.75rem);
            margin-bottom: clamp(1rem, 3.2vh, 2rem);
          }
          .loading-img-save-the-date {
            width: min(42vw, 22rem);
            margin-bottom: clamp(0.75rem, 2.4vh, 1.25rem);
          }
          .loading-img-couple-name {
            width: min(52vw, 32rem);
          }
          .loading-couple-name-wrap {
            margin-top: clamp(1rem, 3.5vh, 2rem);
            margin-bottom: clamp(2.35rem, 7.5vh, 4.5rem);
          }
        }
        @media (min-width: 1280px) {
          .loading-deco-stack {
            max-width: min(40rem, 52vw);
          }
          .loading-img-monogram {
            width: min(14vw, 8.5rem);
          }
          .loading-img-save-the-date {
            width: min(36vw, 24rem);
          }
          .loading-img-couple-name {
            width: min(46vw, 34rem);
          }
        }
        @media (max-height: 680px) {
          .loading-deco-main {
            padding-top: clamp(1rem, 5vh, 1.75rem);
          }
          .loading-img-monogram {
            width: min(22vw, 5rem);
            margin-bottom: clamp(0.45rem, 1.6vh, 0.75rem);
          }
          .loading-img-save-the-date {
            width: min(64vw, 14.5rem);
            margin-bottom: clamp(0.35rem, 1.1vh, 0.55rem);
          }
          .loading-img-couple-name {
            width: min(84vw, 19.5rem);
          }
          .loading-couple-name-wrap {
            margin-top: clamp(0.55rem, 2.2vh, 1rem);
            margin-bottom: clamp(1.15rem, 4.5vh, 2.1rem);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-infinity-outline,
          .loading-content-enter {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="absolute inset-0"
        style={cornerTextureBackgroundStyle}
        aria-hidden
      />

      <div className="relative z-30 flex min-h-[100dvh] flex-1 flex-col px-3 pb-[calc(6.75rem+env(safe-area-inset-bottom))] pt-[max(0.875rem,env(safe-area-inset-top))] sm:px-6 md:px-10 md:pb-[calc(7.5rem+env(safe-area-inset-bottom))] lg:px-14">
        <div className="loading-deco-main">
          <div className="loading-content-enter loading-deco-stack">
          <img
            src="/deco/monogram.png"
            alt=""
            aria-hidden
            className="loading-img-monogram h-auto max-w-full object-contain"
          />
          <img
            src="/deco/save-the-date.png"
            alt="Save the Date"
            className="loading-img-save-the-date h-auto max-w-full object-contain"
          />
          <div className="loading-couple-name-wrap">
            <img
              src="/deco/couple-name.png"
              alt={coupleAlt}
              className="loading-img-couple-name h-auto max-w-full object-contain object-center"
              style={{ animationDelay: '0.08s' }}
            />
          </div>
          <div
            className={`loading-deco-details loading-font-cinzel flex w-full max-w-md flex-col items-center gap-1.5 font-bold sm:gap-2`}
            style={{ color: TEXT_WHITE, animationDelay: '0.14s' }}
          >
            <span className="text-[0.62rem] uppercase tracking-[0.38em] sm:text-[0.68rem] sm:tracking-[0.44em]">
              {ceremonyMeta.month}
            </span>

            <div className="flex w-full items-center gap-1.5 sm:gap-3">
              <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
                <span className="h-[0.5px] flex-1" style={{ background: lineMuted }} />
                <span className="text-[0.58rem] uppercase tracking-[0.28em] sm:text-[0.65rem] sm:tracking-[0.34em]">
                  {ceremonyMeta.dayShort}
                </span>
                <span className="h-[0.5px] w-5 sm:w-7" style={{ background: lineMuted }} />
              </div>

              <div className="relative flex shrink-0 items-center justify-center px-2 sm:px-3">
                <span
                  className="pointer-events-none absolute inset-0 -z-10 m-auto h-[3.25rem] w-[3.25rem] rounded-full bg-white/20 blur-xl sm:h-[4.5rem] sm:w-[4.5rem] md:h-[5rem] md:w-[5rem]"
                  aria-hidden
                />
                <span className="relative text-[clamp(2.75rem,14vw,4.25rem)] font-bold leading-none tracking-wider sm:text-[4rem] md:text-[4.75rem]">
                  {ceremonyMeta.dayNumber}
                </span>
              </div>

              <div className="flex flex-1 items-center gap-1.5 sm:gap-2">
                <span className="h-[0.5px] w-5 sm:w-7" style={{ background: lineMuted }} />
                <span className="text-[0.58rem] uppercase tracking-[0.22em] sm:text-[0.65rem] sm:tracking-[0.28em]">
                  {ceremonyMeta.timeStr}
                </span>
                <span className="h-[0.5px] flex-1" style={{ background: lineMuted }} />
              </div>
            </div>

            <span className="text-[0.62rem] uppercase tracking-[0.38em] sm:text-[0.68rem] sm:tracking-[0.44em]">
              {ceremonyMeta.year}
            </span>

            {ceremonyMeta.venueUpper ? (
              <>
                <p
                  className="loading-font-cinzel mt-4 max-w-[17rem] text-[0.56rem] font-semibold uppercase leading-relaxed tracking-[0.16em] sm:mt-5 sm:max-w-xs sm:text-[0.6rem] sm:tracking-[0.2em] md:max-w-sm"
                  style={{
                    color: TEXT_WHITE,
                    textShadow: '0 1px 8px rgba(0, 0, 0, 0.45)',
                  }}
                >
                  {ceremonyMeta.venueUpper}
                </p>
                <VenueDivider />
              </>
            ) : null}
          </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center px-5 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2 sm:px-8 md:px-12 md:pb-7 md:pt-4 lg:pb-9"
        role="progressbar"
        aria-valuetext="Loading invitation"
        aria-label="Loading invitation"
      >
        <p className="loading-font-cinzel loading-text-glow mb-1.5 text-center text-[9px] font-medium uppercase tracking-[0.34em] text-[#f5e6a8] sm:text-[10px] sm:tracking-[0.4em]">
          Opening your invitation
        </p>
        <InfinityLoader />
      </div>
    </div>
  );
};
