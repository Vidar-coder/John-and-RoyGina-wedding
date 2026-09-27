"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Cinzel, Playfair_Display } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"
import { parseWeddingDate } from "@/lib/wedding-date"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hero-cinzel",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
})

const entryEase = [0.22, 1, 0.36, 1] as const

const TEXT_WHITE = "#ffffff"
const IVORY = "#fffaf4"
const MOTIF_BURGUNDY = "#531314"
const MOTIF_BTN = `linear-gradient(180deg, color-mix(in srgb, ${MOTIF_BURGUNDY} 90%, #000) 0%, ${MOTIF_BURGUNDY} 52%, color-mix(in srgb, ${MOTIF_BURGUNDY} 88%, #000) 100%)`
const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function VenueDivider() {
  return (
    <div className="mt-3 flex w-full items-center justify-center gap-1.5 sm:mt-3.5">
      <span
        className="h-px w-12 sm:w-16"
        style={{ background: dividerFade }}
        aria-hidden
      />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: dividerFade }}
        aria-hidden
      />
      <span
        className="h-px w-12 sm:w-16"
        style={{ background: dividerFade }}
        aria-hidden
      />
    </div>
  )
}

export function Hero() {
  const siteConfig = useSiteConfig()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 40)
    return () => window.clearTimeout(id)
  }, [])

  const coupleAlt = `${siteConfig.couple.groomNickname} and ${siteConfig.couple.brideNickname}`

  const ceremonyMeta = useMemo(() => {
    const ceremonyDate = siteConfig.ceremony.date ?? siteConfig.wedding.date
    const parsedDate = parseWeddingDate(ceremonyDate)
    const ceremonyTimeDisplay = siteConfig.ceremony.time ?? siteConfig.wedding.time
    const timeStr = ceremonyTimeDisplay.split(",")[0].trim()
    const ceremonyDay = siteConfig.ceremony.day || parsedDate.dayOfWeek
    const ceremonyDayShort = ceremonyDay.slice(0, 3).toUpperCase()
    const ceremonyWhere =
      siteConfig.ceremony.location?.trim() ||
      siteConfig.ceremony.venue?.trim() ||
      siteConfig.wedding.venue?.trim() ||
      ""

    return {
      month: parsedDate.month.toUpperCase(),
      dayNumber: parsedDate.day,
      year: parsedDate.year,
      dayShort: ceremonyDayShort,
      timeStr,
      venueUpper: ceremonyWhere.toUpperCase(),
    }
  }, [siteConfig])

  const fadeUp = (delay: number) => {
    if (reduceMotion) {
      return { initial: false as const, animate: { opacity: 1, y: 0 } }
    }
    return {
      initial: { opacity: 0, y: 14 },
      animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
      transition: { duration: 0.9, delay, ease: entryEase },
    }
  }

  const lineMuted = dividerFade

  return (
    <section
      id="home"
      className={`${cinzel.variable} relative -mt-12 flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#0a1410] sm:-mt-14 md:-mt-16`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={cornerTextureBackgroundStyle}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(clamp(3.25rem,11vw,4.5rem),calc(2.5rem+env(safe-area-inset-top)))] sm:max-w-xl sm:px-6 md:max-w-2xl">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.p
            {...fadeUp(0.04)}
            className={`${playfair.className} mx-auto mt-4 max-w-[19rem] text-[clamp(0.8rem,3.4vw,0.95rem)] font-normal italic leading-[1.65] sm:mt-5 sm:max-w-xs md:max-w-sm`}
            style={{
              color: "color-mix(in srgb, #ffffff 92%, transparent)",
              textShadow: "0 1px 12px rgba(0, 0, 0, 0.65)",
            }}
          >
            Together with our families, we joyfully invite you to witness our union.
          </motion.p>

          <motion.div
            {...fadeUp(0.18)}
            className="mt-7 flex w-full justify-center sm:mt-8 md:mt-9"
          >
            <Image
              src="/deco/couple-name.png"
              alt={coupleAlt}
              width={1493}
              height={838}
              priority
              sizes="(min-width: 768px) 420px, 90vw"
              className="h-auto w-[min(90vw,20.5rem)] max-w-full object-contain object-center sm:w-[min(88vw,24rem)] md:w-[min(42vw,28rem)]"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0 2px 14px rgba(0, 0, 0, 0.5))",
              }}
            />
          </motion.div>

          <motion.div
            {...fadeUp(0.26)}
            className={`${cinzel.className} mt-8 flex w-full max-w-md flex-col items-center gap-1.5 font-bold sm:mt-9 sm:gap-2 md:mt-10`}
            style={{ color: TEXT_WHITE }}
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
                  className={`${cinzel.className} mt-4 max-w-[17rem] text-[0.56rem] font-semibold uppercase leading-relaxed tracking-[0.16em] sm:mt-5 sm:max-w-xs sm:text-[0.6rem] sm:tracking-[0.2em] md:max-w-sm`}
                  style={{
                    color: TEXT_WHITE,
                    textShadow: "0 1px 8px rgba(0, 0, 0, 0.45)",
                  }}
                >
                  {ceremonyMeta.venueUpper}
                </p>
                <VenueDivider />
              </>
            ) : null}
          </motion.div>

          <motion.p
            {...fadeUp(0.34)}
            className={`${playfair.className} mx-auto mt-5 max-w-[18rem] text-[clamp(0.78rem,3.2vw,0.92rem)] font-normal italic leading-[1.65] sm:mt-6 sm:max-w-xs`}
            style={{
              color: "color-mix(in srgb, #ffffff 90%, transparent)",
              textShadow: "0 1px 10px rgba(0, 0, 0, 0.55)",
            }}
          >
            Your presence, prayers, and love will mean the world to us.
          </motion.p>

          <motion.div
            {...fadeUp(0.42)}
            className="mt-7 flex w-full max-w-[min(100%,20.5rem)] flex-row justify-center gap-2.5 sm:mt-8 sm:max-w-md sm:gap-3.5"
          >
            <a
              href="#guest-list"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection("guest-list")
              }}
              className={`${cinzel.className} inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:text-[0.68rem] sm:tracking-[0.16em]`}
              style={{
                background: MOTIF_BTN,
                color: IVORY,
              }}
            >
              RSVP
            </a>
            <a
              href="#messages"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection("messages")
              }}
              className={`${cinzel.className} inline-flex min-h-11 flex-1 items-center justify-center rounded-full border px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-[2px] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:text-[0.68rem] sm:tracking-[0.16em]`}
              style={{
                borderColor: "color-mix(in srgb, #ffffff 42%, transparent)",
                background: "color-mix(in srgb, #ffffff 10%, transparent)",
                color: TEXT_WHITE,
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.28)",
              }}
            >
              Message
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
