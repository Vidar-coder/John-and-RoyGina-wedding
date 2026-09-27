"use client"

import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { motion } from "motion/react"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const TEXT_WHITE = "#ffffff"
const entryEase = [0.22, 1, 0.36, 1] as const

const titleSize = "clamp(2.85rem, 13.5vw, 6.75rem)"
const titleShadow =
  "0 1px 0 rgba(255, 255, 255, 0.35), 0 2px 14px rgba(0, 0, 0, 0.55), 0 0 24px rgba(0, 0, 0, 0.25)"

export function SeeYouThere() {
  return (
    <section
      id="see-you-there"
      className={`${theSeasons.variable} relative isolate w-full overflow-hidden bg-[#0a1410]`}
    >
      <div className="relative min-h-[100svh] w-full">
        <div
          className="pointer-events-none absolute inset-0"
          style={cornerTextureBackgroundStyle}
          aria-hidden
        />

        <div className="absolute inset-0 flex items-center justify-center px-5 pb-[18vh] pt-16 sm:pb-[14vh]">
          <motion.h2
            className="relative text-center"
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: entryEase }}
          >
            <span className="sr-only">See you there!</span>
            <span
              aria-hidden
              className={`${theSeasons.className} block uppercase leading-[0.88] tracking-[0.06em] sm:tracking-[0.08em]`}
              style={{
                fontSize: titleSize,
                color: TEXT_WHITE,
                textShadow: titleShadow,
              }}
            >
              See you
              <br />
              there
              <span
                className={`${cinzel.className} relative -top-[0.06em] ml-[0.04em] inline-block font-normal tracking-normal`}
              >
                !
              </span>
            </span>
          </motion.h2>
        </div>
      </div>
    </section>
  )
}
