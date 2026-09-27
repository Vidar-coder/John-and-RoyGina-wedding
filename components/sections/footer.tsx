"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import { motion } from "motion/react"
import localFont from "next/font/local"
import { Instagram, Twitter, Facebook, Music2 } from "lucide-react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"
import { sectionType } from "@/lib/section-typography"
import { Cinzel } from "next/font/google"
import Image from "next/image"

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

const MOTIF_BURGUNDY = "#531314"
const IVORY = "#fffaf4"
const TEXT_ON_BURGUNDY = IVORY
const TEXT_WHITE = "#ffffff"
const dividerFadeLight = "color-mix(in srgb, #ffffff 42%, transparent)"
const textShadowSoft = "0 1px 10px rgba(0, 0, 0, 0.45)"

const containerBorder = `color-mix(in srgb, #ffffff 28%, transparent)`
const borderSoft = `color-mix(in srgb, #ffffff 18%, transparent)`

const MOTIF_BTN = `linear-gradient(180deg, color-mix(in srgb, ${MOTIF_BURGUNDY} 90%, #000) 0%, ${MOTIF_BURGUNDY} 52%, color-mix(in srgb, ${MOTIF_BURGUNDY} 88%, #000) 100%)`

const palette = {
  body: "color-mix(in srgb, #ffffff 90%, transparent)",
  heading: TEXT_WHITE,
  label: "color-mix(in srgb, #fffaf4 92%, white)",
  accent: IVORY,
} as const

const ct = {
  label: sectionType.label,
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
  title: `${sectionType.subheader} lg:text-3xl`,
  cardTitle: sectionType.subheader,
} as const

const cardStyle = {
  background: "color-mix(in srgb, #ffffff 9%, transparent)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: containerBorder,
  boxShadow: "0 12px 32px color-mix(in srgb, #000 28%, transparent)",
  backdropFilter: "blur(6px)",
} as const

const socialLinkStyle = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: borderSoft,
  backgroundColor: "color-mix(in srgb, #ffffff 10%, transparent)",
  color: TEXT_WHITE,
  boxShadow: "0 4px 14px color-mix(in srgb, #000 22%, transparent)",
} as const

const FOOTER_QUOTES = [
  `"I have found the one whom my soul loves." – Song of Solomon 3:4`,
  "Welcome to our wedding website! We've found a love that's a true blessing, and we give thanks to God for writing the beautiful story of our journey together.",
  "Thank you for your love, prayers, and support. We can't wait to celebrate this joyful day together!",
] as const

const LONGEST_FOOTER_QUOTE = FOOTER_QUOTES.reduce((longest, quote) =>
  quote.length > longest.length ? quote : longest
)

function FooterCoupleNames({ groom, bride }: { groom: string; bride: string }) {
  return (
    <h2
      className={`${cinzel.className} mx-auto whitespace-nowrap text-center ${sectionType.subheader} font-semibold tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.18em]`}
      style={{ color: palette.heading, textShadow: textShadowSoft }}
    >
      {groom}
      <span
        className={`${aboveTheBeyond.className} mx-2 inline-block normal-case tracking-normal sm:mx-2.5`}
        style={{
          fontSize: "1.35em",
          color: palette.accent,
          textShadow: textShadowSoft,
          verticalAlign: "middle",
        }}
        aria-hidden
      >
        &
      </span>
      {bride}
    </h2>
  )
}

function FooterCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative w-full min-w-0 rounded-[1.85rem] p-4 transition-all duration-300 hover:shadow-[0_14px_36px_color-mix(in_srgb,#000_32%,transparent)] sm:p-5 md:p-6 ${className}`}
      style={cardStyle}
    >
      <div className="relative z-[1] min-w-0">{children}</div>
    </div>
  )
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="space-y-0.5">
      <p
        className={`${cinzel.className} ${ct.label} uppercase tracking-[0.14em] font-semibold`}
        style={{ color: palette.label, textShadow: textShadowSoft }}
      >
        {label}
      </p>
      <p
        className={`font-goudy-italic ${ct.body}`}
        style={{ color: palette.body, textShadow: textShadowSoft }}
      >
        {value}
      </p>
    </div>
  )
}

export function Footer() {
  const siteConfig = useSiteConfig()
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date

  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const coupleDisplayName = `${groomName} & ${brideName}`

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => setIsPaused(false), 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      }
      setIsDeleting(false)
      setCurrentQuoteIndex((prev) => (prev + 1) % FOOTER_QUOTES.length)
      return
    }

    const currentQuote = FOOTER_QUOTES[currentQuoteIndex]
    if (displayedText.length < currentQuote.length) {
      const typeTimeout = setTimeout(() => {
        setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(typeTimeout)
    }

    setIsPaused(true)
    setIsDeleting(true)
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex])

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.15 } },
  }

  const nav = useMemo(
    () =>
      [
        { label: "Home", href: "#home" },
        { label: "Events", href: "#details" },
        { label: "Stay", href: "#hotel" },
        { label: "RSVP", href: "#guest-list" },
        { label: "Messages", href: "#messages" },
      ] as const,
    []
  )

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full overflow-hidden bg-[#0a1410]`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={cornerTextureBackgroundStyle}
        aria-hidden
      />
      <img
        src="/corner/left-top-corner.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[1] h-auto w-[min(30vw,7.5rem)] object-contain object-left-top sm:w-[min(26vw,9rem)] md:w-[min(22vw,11rem)] lg:w-[min(18vw,12.5rem)]"
      />
      <img
        src="/corner/right-top-corner.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-[1] h-auto w-[min(30vw,7.5rem)] object-contain object-right-top sm:w-[min(26vw,9rem)] md:w-[min(22vw,11rem)] lg:w-[min(18vw,12.5rem)]"
      />
      <img
        src="/corner/left-bottom-corner.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[1] h-auto w-[min(30vw,7.5rem)] object-contain object-left-bottom sm:w-[min(26vw,9rem)] md:w-[min(22vw,11rem)] lg:w-[min(18vw,12.5rem)]"
      />
      <img
        src="/corner/right-bottom-corner.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-[1] h-auto w-[min(30vw,7.5rem)] object-contain object-right-bottom sm:w-[min(26vw,9rem)] md:w-[min(22vw,11rem)] lg:w-[min(18vw,12.5rem)]"
      />

      <footer className="relative z-20 pb-16 pt-16 sm:pb-20 sm:pt-20 md:pb-24 md:pt-24">
        <div className="relative z-10 mb-6 flex flex-col items-center px-6 sm:mb-8 md:mb-10 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
              <Image
                src={siteConfig.couple.monogram}
                alt={`${coupleDisplayName} monogram`}
                fill
                className="object-contain"
                style={{ filter: "brightness(0) invert(1) drop-shadow(0 2px 14px rgba(0, 0, 0, 0.45))" }}
              />
            </div>
          </motion.div>

          <div className="mt-4 max-w-md text-center sm:mt-5 md:mt-6">
            {/* <FooterCoupleNames groom={groomName} bride={brideName} /> */}
          </div>

          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32" style={{ background: dividerFadeLight }} />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl min-w-0 flex-col items-center px-4 pb-4 @container/footer sm:px-6 sm:pb-6 md:px-8">
          <motion.div
            className="mb-8 grid grid-cols-1 items-start gap-5 sm:mb-10 sm:gap-6 md:gap-8 lg:grid-cols-4"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div className="min-w-0 lg:col-span-2" variants={fadeInUp}>
              <div className="mb-5 sm:mb-6">
                <h3
                  className={`${cinzel.className} ${ct.title} mb-4 font-semibold leading-tight`}
                  style={{ color: palette.heading, textShadow: textShadowSoft }}
                >
                  {coupleDisplayName}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <DetailRow label="Wedding Date" value={ceremonyDate} />
                </div>
              </div>

              <FooterCard>
                <p
                  className={`${cinzel.className} ${ct.label} mb-3 font-semibold uppercase tracking-[0.14em]`}
                  style={{ color: palette.label, textShadow: textShadowSoft }}
                >
                  A Note From Us
                </p>
                <blockquote className={`relative font-goudy-italic ${ct.bodyLg}`}>
                  <span className="invisible block select-none" aria-hidden="true">
                    &ldquo;{LONGEST_FOOTER_QUOTE}&rdquo;
                  </span>
                  <span
                    className="absolute inset-0"
                    style={{ color: palette.body, textShadow: textShadowSoft }}
                    aria-live="polite"
                  >
                    &ldquo;{displayedText}
                    <span
                      className="ml-1 inline-block h-4 w-0.5 animate-pulse align-middle sm:h-5"
                      style={{ backgroundColor: TEXT_WHITE }}
                    />
                    &rdquo;
                  </span>
                </blockquote>
                <div className="mt-3 flex items-center gap-1.5 sm:mt-4">
                  {FOOTER_QUOTES.map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full transition-opacity sm:h-2 sm:w-2"
                      style={{
                        backgroundColor: TEXT_WHITE,
                        opacity: i === currentQuoteIndex ? 1 : 0.35,
                      }}
                    />
                  ))}
                </div>
              </FooterCard>
            </motion.div>

            <motion.div className="min-w-0 space-y-4 sm:space-y-5" variants={fadeInUp}>
              <FooterCard>
                <h4
                  className={`${cinzel.className} ${ct.cardTitle} mb-3 font-semibold`}
                  style={{ color: palette.heading, textShadow: textShadowSoft }}
                >
                  RSVP Deadline
                </h4>
                <div className="space-y-2">
                  <DetailRow label="Please respond by" value={siteConfig.details.rsvp.deadline} />
                  <p
                    className={`font-goudy-italic ${ct.body} opacity-90`}
                    style={{ color: palette.body, textShadow: textShadowSoft }}
                  >
                    Please confirm your attendance by this date.
                  </p>
                  <a
                    href="#guest-list"
                    onClick={(event) => {
                      event.preventDefault()
                      document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }}
                    className={`${cinzel.className} ${ct.label} mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-full px-5 py-2.5 font-semibold uppercase tracking-[0.12em] shadow-[0_8px_18px_color-mix(in_srgb,#531314_28%,transparent)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:tracking-[0.14em]`}
                    style={{
                      background: MOTIF_BTN,
                      color: TEXT_ON_BURGUNDY,
                    }}
                  >
                    Tap here to respond
                  </a>
                </div>
              </FooterCard>
            </motion.div>

            <motion.div className="min-w-0 space-y-5 sm:space-y-6" variants={fadeInUp}>
              <div>
                <h4
                  className={`${cinzel.className} ${ct.cardTitle} mb-3 flex items-center gap-2 font-semibold sm:mb-4`}
                  style={{ color: palette.heading, textShadow: textShadowSoft }}
                >
                  <span
                    className="h-6 w-1.5 flex-shrink-0 rounded-full sm:h-7"
                    style={{ backgroundColor: "color-mix(in srgb, #ffffff 75%, transparent)" }}
                  />
                  Follow Us
                </h4>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {(
                    [
                      { href: "https://www.facebook.com", Icon: Facebook, label: "Facebook" },
                      { href: "https://www.instagram.com/", Icon: Instagram, label: "Instagram" },
                      { href: "https://www.youtube.com", Icon: Music2, label: "YouTube" },
                      { href: "https://x.com/", Icon: Twitter, label: "Twitter" },
                    ] as const
                  ).map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 sm:h-11 sm:w-11"
                      style={socialLinkStyle}
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4 sm:w-5 sm:h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h5
                  className={`${cinzel.className} ${ct.label} mb-2.5 font-semibold uppercase tracking-[0.14em] sm:mb-3`}
                  style={{ color: palette.label, textShadow: textShadowSoft }}
                >
                  Quick Links
                </h5>
                <div className="space-y-1.5 sm:space-y-2">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`font-goudy-italic block ${ct.body} transition-colors duration-200 hover:text-white hover:opacity-100`}
                      style={{ color: palette.body, textShadow: textShadowSoft }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t pt-6 sm:pt-8"
            style={{ borderColor: borderSoft }}
            variants={fadeInUp}
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
              <div className="min-w-0 text-center md:text-left">
                <p
                  className={`font-goudy-italic ${ct.body}`}
                  style={{ color: palette.body, textShadow: textShadowSoft }}
                >
                  © {year} {coupleDisplayName} — crafted with love, prayers, and gratitude.
                </p>
                <p
                  className={`font-goudy-italic ${ct.body} mt-1 opacity-90`}
                  style={{ color: palette.body, textShadow: textShadowSoft }}
                >
                  This celebration site was designed to share our story and joy with you.
                </p>
              </div>
              <div className="min-w-0 space-y-1 text-center md:text-right">
                <p
                  className={`font-goudy-italic ${ct.body} opacity-90`}
                  style={{ color: palette.body, textShadow: textShadowSoft }}
                >
                  Developed by{" "}
                  <a
                    href="https://lance28-beep.github.io/portfolio-website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-white/50 underline-offset-2 transition-colors hover:text-white"
                    style={{ color: TEXT_WHITE }}
                  >
                    Lance Valle
                  </a>
                </p>
                <p
                  className={`font-goudy-italic ${ct.body} opacity-90`}
                  style={{ color: palette.body, textShadow: textShadowSoft }}
                >
                  Want a website like this? Visit{" "}
                  <a
                    href="https://www.facebook.com/WeddingInvitationNaga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-white/50 underline-offset-2 transition-colors hover:text-white"
                    style={{ color: TEXT_WHITE }}
                  >
                    Wedding Invitation Naga
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
