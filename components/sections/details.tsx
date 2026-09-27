"use client"

import { useState, useEffect, type ReactNode } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"
import { sectionType } from "@/lib/section-typography"
import Image from "next/image"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import {
  Shirt,
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"

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
const MOTIF_FOREST = "#052312"
const IVORY = "#fffaf4"
const MOTIF_CREAM = "#f4f0e8"
const TEXT_ON_BURGUNDY = IVORY

const dividerFade = `color-mix(in srgb, ${MOTIF_BURGUNDY} 55%, transparent)`
const QR_BG = IVORY
const QR_FG = MOTIF_FOREST

const TEXT_WHITE = "#ffffff"
const dividerFadeLight = "color-mix(in srgb, #ffffff 42%, transparent)"

const scriptGlowOnDark = {
  textShadow: "0 1px 12px rgba(0, 0, 0, 0.55)",
} as const

const scriptGlow = {
  textShadow:
    "0 1px 0 color-mix(in srgb, #fffaf4 95%, white), 0 0 10px color-mix(in srgb, #531314 18%, transparent)",
} as const

const detailText = {
  body: `color-mix(in srgb, ${MOTIF_FOREST} 78%, #4a5c4e)`,
  heading: MOTIF_FOREST,
  label: MOTIF_BURGUNDY,
  accent: MOTIF_BURGUNDY,
} as const

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${MOTIF_BURGUNDY}, transparent)`,
} as const

const dividerLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${MOTIF_BURGUNDY}, transparent)`,
} as const

const cardStyle = {
  background: IVORY,
  borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 32%, transparent)`,
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow: "0 10px 28px color-mix(in srgb, #052312 10%, transparent)",
} as const

const softPanelStyle = {
  borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 16%, transparent)`,
  backgroundColor: `color-mix(in srgb, ${IVORY} 90%, ${MOTIF_CREAM})`,
} as const

const accentPanelStyle = {
  borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 28%, transparent)`,
  backgroundColor: `color-mix(in srgb, ${IVORY} 94%, ${MOTIF_CREAM})`,
} as const

function SectionIconDivider({
  icon,
  tone = "burgundy",
}: {
  icon: React.ReactNode
  tone?: "burgundy" | "light"
}) {
  const line =
    tone === "light" ? { background: dividerFadeLight } : dividerLineStyle
  const lineLeft =
    tone === "light" ? { background: dividerFadeLight } : dividerLineStyleLeft

  return (
    <div className="flex items-center justify-center gap-1.5 pt-1 sm:pt-2">
      <span className="h-px w-6 sm:w-10" style={line} aria-hidden />
      {icon}
      <span className="h-px w-6 sm:w-10" style={lineLeft} aria-hidden />
    </div>
  )
}

function StyledAddress({ text }: { text: string }) {
  const parts = text.split(/([0-9]+|[^\p{L}\s]+)/u)

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null
        const isSpecial = /^[0-9]+$/.test(part) || /^[^\p{L}\s]+$/u.test(part)
        if (!isSpecial) return <span key={`${part}-${index}`}>{part}</span>
        return (
          <span
            key={`${part}-${index}`}
            className={`${cinzel.className} inline font-medium not-italic tracking-normal`}
          >
            {part}
          </span>
        )
      })}
    </>
  )
}

function OutsideDivider({ tone = "burgundy" }: { tone?: "burgundy" | "light" }) {
  const line = tone === "light" ? dividerFadeLight : dividerLineStyle.background
  const lineLeft = tone === "light" ? dividerFadeLight : dividerLineStyleLeft.background
  const dot = tone === "light" ? dividerFadeLight : dividerFade

  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={{ background: line }} aria-hidden />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: dot }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={{ background: lineLeft }} aria-hidden />
    </div>
  )
}

const detailsTitleSize = {
  main: "clamp(1.65rem, 8.5vw, 4.5rem)",
  script: "clamp(0.95rem, 4.8vw, 2.7rem)",
} as const

function DetailsTitle({ onDark = false }: { onDark?: boolean }) {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": detailsTitleSize.main,
          "--script-size": detailsTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">Event Details — our special day</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: onDark ? TEXT_WHITE : detailText.heading,
          textShadow: onDark ? "0 1px 10px rgba(0, 0, 0, 0.45)" : undefined,
        }}
      >
        Event Details
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2 sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: onDark ? IVORY : detailText.accent,
          ...(onDark ? scriptGlowOnDark : scriptGlow),
        }}
      >
        our special day
      </span>
    </h2>
  )
}

// Slightly compact type inside card containers (not the page header)
const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  labelSm: "text-[10px] sm:text-[11px] md:text-xs",
  body: "text-sm sm:text-sm md:text-base",
  bodyMd: "text-sm sm:text-sm md:text-base lg:text-lg",
  bodyLg: "text-sm sm:text-base md:text-lg",
  subhead: "text-sm sm:text-sm md:text-base lg:text-lg",
  time: "text-sm sm:text-sm md:text-base lg:text-xl",
  cardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlayTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlaySub: "text-xs sm:text-sm md:text-base",
  month: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  dayNum: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl",
  year: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  sectionTitle: "text-base sm:text-lg md:text-xl lg:text-2xl",
  attireCardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  btn: "text-xs sm:text-sm md:text-base",
  noteTitle: "text-xl sm:text-2xl md:text-3xl",
  reminderHead: "text-base sm:text-lg md:text-xl",
  reminderBody: "text-sm sm:text-base md:text-base lg:text-lg",
} as const

const GUEST_ATTIRE_PALETTE = [
  "#325F4B",
  "#444F25",
  "#727C47",
  "#651810",
  "#664126",
] as const

function ColorPalette({
  colors,
  className = "",
}: {
  colors: readonly string[]
  className?: string
}) {
  return (
    <div
      className={`mx-auto flex w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 ${className}`}
      role="img"
      aria-label="Suggested color palette"
    >
      {colors.map((color, i) => (
        <span
          key={color + i}
          className="h-5 w-5 shrink-0 rounded-full sm:h-6 sm:w-6 md:h-7 md:w-7"
          style={{
            backgroundColor: color,
            boxShadow: "inset 0 0 0 1px color-mix(in srgb, black 10%, transparent)",
          }}
        />
      ))}
    </div>
  )
}

function ReminderCard({
  title,
  children,
  variant = "soft",
}: {
  title: string
  children: ReactNode
  variant?: "soft" | "accent"
}) {
  const panelStyle = variant === "accent" ? accentPanelStyle : softPanelStyle

  return (
    <div
      className="rounded-xl border p-4 shadow-sm sm:rounded-2xl sm:p-5"
      style={panelStyle}
    >
      <h4
        className={`${cinzel.className} ${ct.reminderHead} mb-2 font-semibold uppercase tracking-[0.08em] sm:mb-2.5`}
        style={{ color: detailText.heading }}
      >
        {title}
      </h4>
      <div
        className={`font-goudy-italic ${ct.reminderBody} leading-relaxed`}
        style={{ color: detailText.body }}
      >
        {children}
      </div>
    </div>
  )
}

function DressCodePalette() {
  const siteConfig = useSiteConfig()
  const themeLabel =
    siteConfig.dressCode?.theme?.trim() ||
    siteConfig.wedding.theme?.trim() ||
    "Formal celebration attire"

  return (
    <div
      className="relative mx-auto mb-8 max-w-3xl overflow-hidden rounded-2xl border shadow-sm sm:mb-10 md:rounded-3xl"
      style={cardStyle}
    >
      <div className="px-5 pb-4 pt-6 text-center sm:px-8 sm:pb-5 sm:pt-8">
        <p
          className={`${cinzel.className} text-[0.625rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.6rem] sm:tracking-[0.36em]`}
          style={{ color: detailText.label }}
        >
          Guest Attire
        </p>
        <h3
          className={`${aboveTheBeyond.className} mt-1 block px-1 text-[1.5rem] leading-tight sm:text-[1.95rem]`}
          style={{ color: detailText.accent, ...scriptGlow }}
        >
          {themeLabel}
        </h3>

        <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
          <span className="h-px flex-1" style={dividerLineStyle} />
          <Heart
            className="h-2 w-2 sm:h-2.5 sm:w-2.5"
            style={{ color: MOTIF_BURGUNDY, fill: "currentColor" }}
            aria-hidden
          />
          <span className="h-px flex-1" style={dividerLineStyleLeft} />
        </div>
      </div>

      <div className="space-y-6 px-5 pb-8 sm:space-y-7 sm:px-8 sm:pb-10">
        <Image
          src="/image/guestAttire.png"
          alt="Guest attire guide"
          width={1536}
          height={1024}
          className="mx-auto h-auto w-full max-w-2xl object-contain"
          sizes="(max-width: 768px) 100vw, 672px"
        />
        <ColorPalette colors={GUEST_ATTIRE_PALETTE} className="max-w-sm sm:max-w-md" />
        <p
          className={`font-goudy-italic ${ct.body} mx-auto max-w-lg leading-relaxed`}
          style={{ color: detailText.body }}
        >
          Please dress in the suggested colors above so we can celebrate together in harmony with our
          wedding palette.
        </p>
      </div>
    </div>
  )
}

type EventVenueCardProps = {
  badge: string
  images: string[]
  activeImageIndex: number
  locationName: string
  venueAddress: string
  venueDetail?: string
  day: string
  dateString: string
  time: string
  venueSectionLabel: string
  mapsLink: string
  copyId: string
  fullVenue: string
  copiedItems: Set<string>
  onCopy: (text: string, id: string) => void
  onOpenMaps: (link: string) => void
  showDateDetails?: boolean
}

function EventVenueCard({
  badge,
  images,
  activeImageIndex,
  locationName,
  venueAddress,
  venueDetail,
  day,
  dateString,
  time,
  venueSectionLabel,
  mapsLink,
  copyId,
  fullVenue,
  copiedItems,
  onCopy,
  onOpenMaps,
  showDateDetails = true,
}: EventVenueCardProps) {
  const eventDate = showDateDetails ? new Date(dateString) : null

  return (
    <div className="relative group">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to bottom right, ${dividerFade}, transparent)`,
        }}
      />

      <div
        className="relative overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl"
        style={cardStyle}
      >
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
          {images.length === 1 ? (
            <Image
              src={images[0]}
              alt={locationName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              priority
            />
          ) : (
            images.map((src, index) => {
              const isActive = index === activeImageIndex
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
                    isActive
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={src}
                    alt={locationName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              )
            })
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20 pointer-events-none" />

          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-30">
            <span className={`${cinzel.className} inline-block mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white border border-white/30`}>
              {badge}
            </span>
            <h3 className={`${theSeasons.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-1.5 drop-shadow-lg uppercase tracking-[0.12em] leading-tight`}>
              {locationName}
            </h3>
            <p className={`${theSeasons.className} text-xs sm:text-xs md:text-sm lg:text-base text-white/95 drop-shadow-md tracking-[0.06em] leading-snug`}>
              <StyledAddress text={venueAddress} />
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-5 md:p-7 lg:p-9">
          <div className="text-center mb-5 sm:mb-8 md:mb-10 space-y-2 sm:space-y-2.5 md:space-y-3">
            {showDateDetails && eventDate && (
              <>
                <p
                  className={`${cinzel.className} ${ct.label} font-semibold uppercase tracking-[0.2em]`}
                  style={{ color: detailText.heading }}
                >
                  {day}
                </p>

                <p
                  className={`${cinzel.className} ${ct.month} font-semibold leading-none`}
                  style={{ color: detailText.heading }}
                >
                  {eventDate.toLocaleString("default", { month: "long" })}
                </p>

                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 py-1 sm:py-2">
                  <p
                    className={`${cinzel.className} ${ct.dayNum} font-semibold leading-none`}
                    style={{ color: detailText.accent }}
                  >
                    {eventDate.getDate()}
                  </p>
                  <div
                    className="h-10 sm:h-12 md:h-14 w-[2px] rounded-full"
                    style={{ backgroundColor: dividerFade }}
                  />
                  <p
                    className={`${cinzel.className} ${ct.year} font-semibold leading-none`}
                    style={{ color: detailText.heading }}
                  >
                    {eventDate.getFullYear()}
                  </p>
                </div>
              </>
            )}

            <p
              className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.14em] uppercase ${showDateDetails ? "" : "py-2 sm:py-3"}`}
              style={{ color: detailText.heading }}
            >
              At {time}
            </p>
          </div>

          <div className="rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border" style={softPanelStyle}>
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" style={{ color: detailText.accent }} />
              <div className="flex-1 min-w-0">
                <p className={`${cinzel.className} ${ct.label} font-semibold mb-1.5 sm:mb-2 uppercase tracking-wide`} style={{ color: detailText.label }}>
                  {venueSectionLabel}
                </p>
                <p className={`${theSeasons.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-snug tracking-[0.06em] uppercase`} style={{ color: detailText.heading }}>
                  {locationName}
                </p>
                {venueDetail && (
                  <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-wide`} style={{ color: detailText.label }}>
                    {venueDetail}
                  </p>
                )}
                <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-[0.04em]`} style={{ color: detailText.body }}>
                  <StyledAddress text={venueAddress} />
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <div
                  className="p-1.5 sm:p-2 md:p-2.5 rounded-lg border shadow-sm"
                  style={{
                    backgroundColor: QR_BG,
                    borderColor: dividerFade,
                  }}
                >
                  <QRCodeSVG
                    value={mapsLink}
                    size={80}
                    level="M"
                    includeMargin={false}
                    fgColor={QR_FG}
                    bgColor={QR_BG}
                  />
                </div>
                <p className={`font-goudy-italic ${ct.label} text-center max-w-[90px]`} style={{ color: detailText.label }}>
                  Scan for directions
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => onOpenMaps(mapsLink)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 rounded-full border font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                backgroundColor: MOTIF_BURGUNDY,
                borderColor: `color-mix(in srgb, ${MOTIF_FOREST} 32%, transparent)`,
                color: TEXT_ON_BURGUNDY,
                boxShadow: "0 8px 18px color-mix(in srgb, #531314 35%, transparent)",
              }}
              aria-label={`Get directions to ${badge.toLowerCase()} venue`}
            >
              <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Get Directions</span>
            </button>
            <button
              type="button"
              onClick={() => onCopy(fullVenue, copyId)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 border-2 rounded-full font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                color: MOTIF_FOREST,
                backgroundColor: IVORY,
                borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 32%, transparent)`,
              }}
              aria-label={`Copy ${badge.toLowerCase()} venue address`}
            >
              {copiedItems.has(copyId) ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: MOTIF_BURGUNDY }} />
              ) : (
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              )}
              <span>{copiedItems.has(copyId) ? "Copied!" : "Copy Address"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Details() {
  const siteConfig = useSiteConfig()
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [currentCeremonyImageIndex, setCurrentCeremonyImageIndex] = useState(0)
  const [currentReceptionImageIndex, setCurrentReceptionImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  const ceremonyImages = siteConfig.ceremony.image
  const receptionImages = siteConfig.reception.image

  useEffect(() => {
    if (ceremonyImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentCeremonyImageIndex((prev) => (prev + 1) % ceremonyImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [ceremonyImages.length])

  useEffect(() => {
    if (receptionImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentReceptionImageIndex((prev) => (prev + 1) % receptionImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [receptionImages.length])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = siteConfig.ceremony.map

  const receptionVenueName = siteConfig.reception.location
  const receptionVenueDetail = ""
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink =
    siteConfig.reception.map ||
    `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  // Aliases used in the image modal
  const ceremonyLocationFormatted = ceremonyVenueName
  const receptionLocationFormatted = receptionVenueName
  const ceremonyLocation = ceremonyVenue
  const receptionLocation = receptionVenue
  const formattedCeremonyDate = siteConfig.ceremony.date
  const formattedReceptionDate = siteConfig.reception.date

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <>
      <section
        id="details"
        className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 w-full scroll-mt-16 overflow-hidden bg-[#0a1410] pb-16 pt-16 sm:scroll-mt-20 sm:pb-20 sm:pt-20 md:scroll-mt-24 md:pb-24 md:pt-24`}
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

        <div className="relative z-20 mx-auto mb-8 max-w-7xl px-5 text-center sm:mb-10 sm:px-8 md:mb-12 md:px-10 lg:px-12">
          <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
            <OutsideDivider tone="light" />
          </div>
          <p
            className={`${cinzel.className} mx-auto mt-4 max-w-[20rem] px-2 text-[0.6875rem] font-semibold leading-snug tracking-[0.12em] min-[400px]:max-w-none min-[400px]:text-[0.75rem] min-[400px]:tracking-[0.16em] sm:mt-6 sm:text-[0.9375rem] sm:tracking-[0.2em] md:text-base md:tracking-[0.22em]`}
            style={{
              color: "color-mix(in srgb, #ffffff 88%, transparent)",
              textShadow: "0 1px 8px rgba(0, 0, 0, 0.45)",
            }}
          >
            Our celebration
          </p>
          <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
            <DetailsTitle onDark />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
            style={{
              color: "color-mix(in srgb, #ffffff 90%, transparent)",
              textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)",
            }}
          >
            Ceremony, reception, attire, and gentle reminders for the day.
          </p>
          <div className="mt-4 flex items-center justify-center sm:mt-5">
            <span className="h-px w-16 sm:w-24 md:w-32" style={{ background: dividerFadeLight }} />
          </div>
        </div>

      {/* Venue and Event Information */}
      <div className="relative z-20 mx-auto mb-8 max-w-7xl space-y-6 px-5 sm:mb-10 sm:space-y-10 sm:px-8 md:mb-12 md:space-y-14 md:px-10 lg:px-12">
        <EventVenueCard
          badge="Ceremony"
          images={ceremonyImages}
          activeImageIndex={currentCeremonyImageIndex}
          locationName={ceremonyVenueName}
          venueAddress={ceremonyAddress}
          venueDetail={ceremonyVenueDetail}
          day={siteConfig.ceremony.day}
          dateString={siteConfig.ceremony.date}
          time={siteConfig.ceremony.time}
          venueSectionLabel="Ceremony Venue"
          mapsLink={ceremonyMapsLink}
          copyId="ceremony"
          fullVenue={ceremonyVenue}
          copiedItems={copiedItems}
          onCopy={copyToClipboard}
          onOpenMaps={openInMaps}
        />

        <EventVenueCard
          badge="Reception"
          images={receptionImages}
          activeImageIndex={currentReceptionImageIndex}
          locationName={receptionVenueName}
          venueAddress={receptionAddress}
          venueDetail={receptionVenueDetail}
          day={siteConfig.reception.day}
          dateString={siteConfig.reception.date}
          time={siteConfig.reception.time}
          showDateDetails={false}
          venueSectionLabel="Reception Venue"
          mapsLink={receptionMapsLink}
          copyId="reception"
          fullVenue={receptionVenue}
          copiedItems={copiedItems}
          onCopy={copyToClipboard}
          onOpenMaps={openInMaps}
        />
       
      </div>

      {/* Attire Guidelines */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <SectionIconDivider
            tone="light"
            icon={
              <Shirt
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: TEXT_WHITE }}
                aria-hidden
              />
            }
          />
          <h3
            className={`${theSeasons.className} ${ct.sectionTitle} mt-3 uppercase font-semibold leading-tight tracking-[0.12em] sm:mt-4 md:tracking-[0.15em]`}
            style={{
              color: TEXT_WHITE,
              textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)",
            }}
          >
            Attire Guidelines
          </h3>
          <p
            className={`font-goudy-italic ${ct.bodyLg} mt-3 leading-relaxed sm:mt-4`}
            style={{
              color: "color-mix(in srgb, #ffffff 92%, transparent)",
              textShadow: "0 1px 8px rgba(0, 0, 0, 0.45)",
            }}
          >
            Kindly follow the look below.
          </p>
        </div>

        {/* Dress Code Palette */}
        <DressCodePalette />

        {/* <div
          className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border shadow-sm"
          style={cardStyle}
        >
          <p className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] text-center mb-3 sm:mb-4 font-semibold`} style={{ color: detailText.label }}>
            Note to Sponsors, Entourage & Guests
          </p>
          <ul className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
            <li className="flex gap-3 items-start">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: GOLD }}
              />
              <p className={`font-goudy-italic ${ct.body} leading-relaxed`} style={{ color: detailText.body }}>
                Please wear comfortable footwear fit for outdoor reception.
              </p>
            </li>
          </ul>
        </div> */}

        {/* Gentle Reminders */}
        <div className="relative mx-auto mt-6 max-w-4xl px-3 sm:mt-8 sm:px-5">
          <div
            className="relative overflow-hidden rounded-xl border sm:rounded-2xl"
            style={cardStyle}
          >
            <div className="relative z-10 px-4 py-5 text-center sm:px-6 sm:py-6">
              <h3
                className={`${theSeasons.className} ${ct.sectionTitle} uppercase font-semibold tracking-[0.12em] md:tracking-[0.15em]`}
                style={{ color: detailText.heading }}
              >
                Gentle Reminders
              </h3>
              <p
                className={`font-goudy-italic ${ct.body} mx-auto mt-2 max-w-lg leading-relaxed`}
                style={{ color: detailText.body }}
              >
                A few notes for the day.
              </p>

              <div className="mx-auto mt-4 max-w-2xl space-y-3 sm:mt-5 sm:space-y-4">
                <ReminderCard title="Adults-Only Celebration" variant="accent">
                  <p>This celebration is for adults only. Thank you for your understanding.</p>
                </ReminderCard>

                <ReminderCard title="Unplugged Ceremony">
                  <p>
                    We kindly invite you to keep your phones away and be fully present with us as our
                    photographers capture the moments. Photos will be shared afterward.
                  </p>
                </ReminderCard>

                <ReminderCard title="Guest Attire" variant="accent">
                  <p>
                    Kindly follow our suggested attire and color palette above to match our wedding
                    theme. Please refrain from wearing rubber shoes.
                  </p>
                </ReminderCard>

                <ReminderCard title="Arrival">
                  <p>
                    We kindly invite you to arrive by {siteConfig.ceremony.guestsTime}, so you can
                    settle in before our ceremony begins at {siteConfig.ceremony.time}.
                  </p>
                </ReminderCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(94, 81, 68, 0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#E8D5A3", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#E8D5A3", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-[#5E5144] rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "#E8D5A3" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, #E8D5A3, #E8D5A3, #5E5144)" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-[#6E6256] backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "#5E5144", borderColor: "#E8D5A3", color: "#E8D5A3" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "#5E5144", borderColor: "#E8D5A3" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="#E8D5A3" style={{ color: "#E8D5A3" }} />
                    <span className="text-xs sm:text-sm font-bold text-[#E8D5A3]">
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-[#E8D5A3]" />
                    <span className="text-xs sm:text-sm font-bold text-[#E8D5A3]">
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "#5E5144" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={
                  showImageModal === "ceremony"
                    ? ceremonyImages[currentCeremonyImageIndex] ?? ceremonyImages[0]
                    : receptionImages[currentReceptionImageIndex] ?? receptionImages[0]
                }
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className="relative border-t-2 p-5 sm:p-6 md:p-8 bg-[#5E5144] backdrop-blur-sm"
              style={{ borderColor: "#E8D5A3" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#E8D5A3]/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "#E8D5A3" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6 text-[#E8D5A3]" fill="#E8D5A3" />
                      ) : (
                        <Utensils className="w-6 h-6 text-[#E8D5A3]" />
                      )}
                      {showImageModal === "ceremony"
                        ? <StyledAddress text={siteConfig.ceremony.venue} />
                        : <StyledAddress text={siteConfig.reception.venue} />}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70 text-[#E8D5A3]">
                      <MapPin className="w-4 h-4 text-[#E8D5A3]" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#E8D5A3",
                          backgroundColor: "#5E5144",
                          opacity: 0.9,
                          borderColor: "#E8D5A3",
                        }}
                      >
                        <Clock className="w-4 h-4 text-[#E8D5A3] shrink-0" />
                        <span>
                          {formattedCeremonyDate} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#E8D5A3",
                          backgroundColor: "#5E5144",
                          opacity: 0.9,
                          borderColor: "#E8D5A3",
                        }}
                      >
                        <Clock className="w-4 h-4 text-[#E8D5A3]" />
                        <span>
                          {formattedReceptionDate} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#5E5144] border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#6E6256] whitespace-nowrap text-[#E8D5A3]"
                      title="Copy address"
                      style={{ borderColor: "#E8D5A3" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap bg-[#E8D5A3] text-[#5E5144]"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                  <div className="flex items-center gap-2 text-xs opacity-65 text-[#E8D5A3]">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </section>
    </>
  )
}