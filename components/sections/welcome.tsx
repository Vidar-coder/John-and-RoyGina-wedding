"use client"

import localFont from "next/font/local"
import { motion } from "motion/react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { sectionType, welcomeTitleSize } from "@/lib/section-typography"
import { Cinzel } from "next/font/google"

const MOTIF_BURGUNDY = "#531314"
const MOTIF_FOREST = "#052312"
const IVORY = "#fffaf4"

const palette = {
  body: `color-mix(in srgb, ${MOTIF_FOREST} 78%, #4a5c4e)`,
  heading: MOTIF_FOREST,
  label: MOTIF_BURGUNDY,
  accent: MOTIF_BURGUNDY,
} as const

const welcomeCardStyle = {
  background: IVORY,
  border: `1px solid color-mix(in srgb, ${MOTIF_BURGUNDY} 34%, transparent)`,
  boxShadow: "0 10px 28px color-mix(in srgb, #052312 10%, transparent)",
} as const

const scriptGlow = {
  textShadow:
    "0 1px 0 color-mix(in srgb, #fffaf4 95%, white), 0 0 10px color-mix(in srgb, #531314 18%, transparent)",
} as const

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

function OrnamentalDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background: `linear-gradient(to right, transparent, ${MOTIF_BURGUNDY}, transparent)`,
        }}
      />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 55%, transparent)` }}
        aria-hidden
      />
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background: `linear-gradient(to left, transparent, ${MOTIF_BURGUNDY}, transparent)`,
        }}
      />
    </div>
  )
}

function LayeredWelcomeTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--welcome-size": welcomeTitleSize.main,
          "--script-size": welcomeTitleSize.script,
          "--script-overlap": welcomeTitleSize.overlap,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--welcome-size)",
          color: palette.heading,
        }}
      >
        Welcome
      </span>

      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: palette.accent,
          ...scriptGlow,
        }}
      >
        to our wedding day
      </span>

      <span className="sr-only"> to our wedding day</span>
    </h2>
  )
}

export function Welcome() {
  const siteConfig = useSiteConfig()
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom

  const ceremonyWhen = [siteConfig.ceremony.date ?? siteConfig.wedding.date, siteConfig.ceremony.time ?? siteConfig.wedding.time]
    .filter(Boolean)
    .join(" · ")
  const ceremonyWhere =
    siteConfig.ceremony.location?.trim() ||
    siteConfig.ceremony.venue?.trim() ||
    siteConfig.wedding.venue?.trim()

  return (
    <section
      id="welcome"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative scroll-mt-16 overflow-visible bg-transparent px-5 pb-16 pt-16 sm:scroll-mt-20 sm:px-8 sm:pb-20 sm:pt-20 md:scroll-mt-24 md:pb-24 md:pt-24`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative mx-auto w-full max-w-3xl @container/welcome lg:max-w-4xl xl:max-w-[44rem]"
      >
        <div
          className="relative w-full overflow-visible rounded-[1.85rem] px-6 pb-12 pt-10 text-center sm:px-9 sm:pb-14 sm:pt-12 md:px-11 md:pb-16 md:pt-14"
          style={welcomeCardStyle}
        >
          <header className="relative space-y-3 overflow-visible pb-6 sm:space-y-3.5 sm:pb-7 md:space-y-4 md:pb-8">
            <LayeredWelcomeTitle />
            <div className="pt-2 sm:pt-2.5">
              <OrnamentalDivider compact />
            </div>
          </header>

          <div className="relative mx-auto max-w-2xl space-y-5 sm:space-y-6 md:max-w-none md:space-y-7 lg:max-w-3xl">
            <figure className="px-1 sm:px-2">
              <blockquote>
                <p className={`font-goudy-italic ${sectionType.textSnug}`} style={{ color: palette.body }}>
                  &ldquo;He has made everything beautiful in His time.&rdquo;
                </p>
                <figcaption className="mt-2 sm:mt-2.5">
                  <cite
                    className={`${cinzel.className} ${sectionType.label} not-italic uppercase tracking-[0.2em] sm:tracking-[0.24em]`}
                    style={{ color: palette.label }}
                  >
                    Ecclesiastes 3:11
                  </cite>
                </figcaption>
              </blockquote>
            </figure>

            <div
              className={`font-goudy-italic space-y-3 px-1 text-center sm:space-y-3.5 sm:px-2 md:space-y-4 ${sectionType.textRelaxed}`}
              style={{ color: palette.body }}
            >
              <p>
                Dear family and friends, we are grateful to God for the love that brought us together—and
                honored to invite you to witness our marriage and celebrate with us.
              </p>
              {ceremonyWhen || ceremonyWhere ? (
                <p>
                  {ceremonyWhen ? (
                    <>
                      We look forward to gathering on <span className="not-italic">{ceremonyWhen}</span>
                      {ceremonyWhere ? (
                        <>
                          {" "}
                          at <span className="not-italic">{ceremonyWhere}</span>.
                        </>
                      ) : (
                        "."
                      )}
                    </>
                  ) : (
                    <>
                      We look forward to celebrating with you at{" "}
                      <span className="not-italic">{ceremonyWhere}</span>.
                    </>
                  )}
                </p>
              ) : null}
              <p>
                Throughout this invitation you&apos;ll find our schedule, venue details, and RSVP—everything
                you may need as you plan for the day. Whether near or far, your presence, prayers, and warm
                wishes will mean more to us than words can say.
              </p>
              <p>Thank you for being part of our story. We cannot wait to share this day with you.</p>
            </div>

            <footer className="space-y-2 px-1 pt-4 pb-1 sm:space-y-2.5 sm:px-2 sm:pt-5 sm:pb-2 md:pt-6">
              <p
                className={`${aboveTheBeyond.className} ${sectionType.script}`}
                style={{
                  color: palette.accent,
                  ...scriptGlow,
                }}
              >
                With love and gratitude,
              </p>
              <p
                className={`${cinzel.className} ${sectionType.subheader} font-semibold tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.18em]`}
                style={{ color: palette.heading }}
              >
                {groomName} &amp; {brideName}
              </p>
            </footer>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
