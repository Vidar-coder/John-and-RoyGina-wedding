"use client"

import type { CSSProperties } from "react"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const TEXT_WHITE = "#ffffff"
const TEXT_WHITE_SOFT = "color-mix(in srgb, #ffffff 82%, transparent)"
const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"

const scriptGlow = {
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.35), 0 0 12px rgba(0, 0, 0, 0.2)",
} as const

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${dividerFade}, transparent)`,
} as const

const dividerLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${dividerFade}, transparent)`,
} as const

const ct = {
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
} as const

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: dividerFade }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={dividerLineStyleLeft} />
    </div>
  )
}

function RegistryTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as CSSProperties
      }
    >
      <span className="sr-only">Gift Guide — with gratitude</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: TEXT_WHITE,
        }}
      >
        Gift Guide
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2 sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: TEXT_WHITE,
          ...scriptGlow,
        }}
      >
        with gratitude
      </span>
    </h2>
  )
}

export function Registry() {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple

  return (
    <section
      id="registry"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 w-full overflow-hidden bg-[#0a1410] px-3 pt-8 pb-8 sm:px-5 sm:pt-10 sm:pb-10 md:px-6 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={cornerTextureBackgroundStyle}
        aria-hidden
      />

      <div className="relative z-10 mx-auto mb-8 max-w-3xl text-center @container/registry sm:mb-10 md:mb-12">
        <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
          <OutsideDivider />
        </div>
        <p
          className={`${cinzel.className} mx-auto mt-4 max-w-[20rem] px-2 text-[0.6875rem] font-semibold leading-snug tracking-[0.12em] min-[400px]:max-w-none min-[400px]:text-[0.75rem] min-[400px]:tracking-[0.16em] sm:mt-6 sm:text-[0.9375rem] sm:tracking-[0.2em] md:text-base md:tracking-[0.22em]`}
          style={{ color: TEXT_WHITE }}
        >
          A token of love
        </p>
        <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
          <RegistryTitle />
        </div>
        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
          style={{ color: TEXT_WHITE_SOFT }}
        >
          Your presence on our wedding day is the greatest gift we could ask for.
        </p>
        <div className="mt-4 flex items-center justify-center sm:mt-5">
          <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-2 pb-4 text-center sm:px-4 md:px-6 md:pb-8">
        <div className={`font-goudy-italic mx-auto max-w-xl space-y-4 ${ct.bodyLg}`} style={{ color: TEXT_WHITE_SOFT }}>
          <p>
            Should you wish to bless us with a gift, we would be grateful for a monetary gift as we begin
            this new chapter together.
          </p>
          <p>
            If you prefer to give something tangible, please feel free to surprise us in your own special
            way—we will cherish it just the same.
          </p>
        </div>

        <div className="mx-auto my-6 h-px w-16 sm:my-7 sm:w-24" style={dividerLineStyle} />

        <div className="space-y-3">
          <p className={`font-goudy-italic ${ct.body}`} style={{ color: TEXT_WHITE_SOFT }}>
            Thank you from the bottom of our hearts.
          </p>
          <p className={`${aboveTheBeyond.className} ${sectionType.script}`} style={{ color: TEXT_WHITE, ...scriptGlow }}>
            With love,
          </p>
          <p
            className={`${cinzel.className} ${sectionType.subheader} font-semibold tracking-[0.12em] sm:tracking-[0.16em]`}
            style={{ color: TEXT_WHITE }}
          >
            {groomNickname} &amp; {brideNickname}
          </p>
        </div>
      </div>
    </section>
  )
}
