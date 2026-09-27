"use client"

import type React from "react"
import { useSiteConfig } from "@/hooks/use-site-config"
import type { SiteConfig } from "@/lib/site-config"
import { motion } from "motion/react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
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

const TEXT_WHITE = "#ffffff"
const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"
const entryEase = [0.22, 1, 0.36, 1] as const

const scriptGlow = {
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.35), 0 0 12px rgba(0, 0, 0, 0.2)",
} as const

const TIMELINE_SVG_STROKE = TEXT_WHITE

/** Renders timeline PNG icons as white silhouettes on the dark backdrop */
const timelineImageFilter =
  "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.35))"

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${dividerFade}, transparent)`,
} as const

const dividerLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${dividerFade}, transparent)`,
} as const

const connectorLineStyle = {
  background: `linear-gradient(to right, transparent, ${dividerFade})`,
} as const

const connectorLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${dividerFade})`,
} as const

type TimelineIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface TimelineEvent {
  time: string
  title: string
  description?: string
  location?: string
  icon: TimelineIcon
  imageSrc?: string
}

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: dividerFade }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={dividerLineStyleLeft} />
    </div>
  )
}

const timelineType = {
  label: "text-[0.5625rem] sm:text-[0.6875rem] md:text-xs",
  text: "text-[0.75rem] sm:text-[0.875rem] md:text-[0.9375rem]",
  textRelaxed: "text-[0.75rem] sm:text-[0.875rem] md:text-[0.9375rem] leading-[1.55] sm:leading-[1.65]",
} as const

const timelineTitleSize = {
  main: "clamp(2.15rem, 11.5vw, 4.95rem)",
  script: "clamp(1.15rem, 5.8vw, 2.55rem)",
} as const

function TimelineKicker() {
  return (
    <p
      className={`${cinzel.className} mx-auto mt-4 max-w-[20rem] px-2 text-[0.6875rem] font-semibold leading-snug tracking-[0.12em] min-[400px]:max-w-none min-[400px]:text-[0.75rem] min-[400px]:tracking-[0.16em] sm:mt-6 sm:text-[0.875rem] sm:tracking-[0.2em] md:text-[0.9375rem] md:tracking-[0.22em]`}
      style={{ color: TEXT_WHITE }}
    >
      Our schedule for the celebration
    </p>
  )
}

function TimelineTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": timelineTitleSize.main,
          "--script-size": timelineTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">Timeline — our wedding day</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: TEXT_WHITE,
        }}
      >
        Timeline
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-[min(100%,22rem)] px-1 leading-[0.88] sm:mt-2 sm:max-w-none sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: TEXT_WHITE,
          ...scriptGlow,
        }}
      >
        on our wedding day
      </span>
    </h2>
  )
}

function buildTimelineEvents(siteConfig: SiteConfig): TimelineEvent[] {
  const ceremonyVenue = siteConfig.ceremony.location
  const receptionVenue = siteConfig.reception.location

  return [
    {
      time: "9:00 AM",
      title: "Arrival at Church",
      location: ceremonyVenue,
      icon: ArrivalIcon,
      imageSrc: "/weddingtimeline/arrival.png",
    },
    {
      time: "9:30 AM",
      title: "Wedding Ceremony",
      location: ceremonyVenue,
      icon: RingsIcon,
      imageSrc: "/weddingtimeline/WeddingCeremony.png",
    },
    {
      time: "11:30 AM",
      title: "Departure at St. Benedict",
      location: ceremonyVenue,
      icon: DepartureIcon,
      imageSrc: "/weddingtimeline/SendOff.png",
    },
    {
      time: "12:00 noon",
      title: "Cocktail Hour",
      location: receptionVenue,
      icon: CocktailIcon,
      imageSrc: "/weddingtimeline/CockTailHour.png",
    },
    {
      time: "1:30 PM",
      title: "Reception Program Proper",
      location: receptionVenue,
      icon: FireworksIcon,
      imageSrc: "/weddingtimeline/reception welcom.png",
    },
    {
      time: "4:30 PM",
      title: "After Party",
      location: receptionVenue,
      icon: DanceIcon,
      imageSrc: "/weddingtimeline/dance.png",
    },
  ]
}

export function WeddingTimeline() {
  const siteConfig = useSiteConfig()
  const timelineEvents = buildTimelineEvents(siteConfig)

  return (
    <section
      id="wedding-timeline"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 overflow-hidden bg-transparent px-3 py-10 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:py-20`}
    >
      {/* Header */}
      <div className="relative z-20 mx-auto mb-8 max-w-5xl px-3 text-center @container/timeline sm:mb-10 sm:px-4 md:mb-12">
        <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
          <OutsideDivider />
        </div>
        <div className="mx-auto">
          <TimelineKicker />
        </div>
        <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
          <TimelineTitle />
        </div>
        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${timelineType.textRelaxed}`}
          style={{ color: TEXT_WHITE }}
        >
          From arrival through ceremony and reception, here is how we hope to spend the day with you.
        </p>
        <div className="mt-4 flex items-center justify-center sm:mt-5">
          <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-20 mx-auto max-w-6xl px-3 sm:px-5 lg:px-8">
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px origin-top -translate-x-1/2"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 1.2, ease: entryEase }}
          style={{
            background: `linear-gradient(to bottom, transparent, ${dividerFade}, transparent)`,
          }}
        />

        <div className="space-y-7 sm:space-y-8 md:space-y-10 lg:space-y-12">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={`${event.title}-${event.time}-${index}`} event={event} index={index} />
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-8 max-w-xl px-3 text-center sm:mt-10 md:mt-12">
        <div className="mb-5 flex items-center justify-center sm:mb-6">
          <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
        </div>
        <blockquote>
          <p
            className={`font-goudy-italic ${timelineType.textRelaxed} italic leading-relaxed`}
            style={{ color: TEXT_WHITE }}
          >
            &ldquo;At the right time, I, the Lord, will make it happen.&rdquo;
          </p>
          <footer
            className={`${cinzel.className} mt-2 sm:mt-3 ${timelineType.label} not-italic uppercase tracking-[0.2em]`}
            style={{ color: TEXT_WHITE }}
          >
            Isaiah 60:22
          </footer>
        </blockquote>
      </div>
    </section>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const Icon = event.icon
  const isEven = index % 2 === 0
  const fromX = isEven ? -36 : 36

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.78, ease: entryEase }}
      className="relative z-10"
    >
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-x-10 lg:gap-x-14">
        <div className={isEven ? "" : "text-right"}>
          <div className="flex items-center justify-end gap-4">
            {!isEven ? (
              <TimelineText event={event} align="right" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} />
            )}
            <div className="hidden h-px w-10 lg:block" style={connectorLineStyle} />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <span className="absolute h-4 w-4 rounded-full" style={{ background: dividerFade }} />
          <div className="relative h-2 w-2 rounded-full" style={{ background: TEXT_WHITE }} />
        </div>

        <div>
          <div className="flex items-center justify-start gap-4">
            <div className="hidden h-px w-10 lg:block" style={connectorLineStyleLeft} />
            {isEven ? (
              <TimelineText event={event} align="left" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-6 md:hidden">
        <div className={isEven ? "" : "text-right"}>
          <div className="flex items-center justify-end gap-3">
            {!isEven ? (
              <TimelineText event={event} align="right" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} mobile />
            )}
            <div className="h-px w-6" style={connectorLineStyle} />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <span className="absolute h-4 w-4 rounded-full" style={{ background: dividerFade }} />
          <div className="relative h-2 w-2 rounded-full" style={{ background: TEXT_WHITE }} />
        </div>

        <div>
          <div className="flex items-center justify-start gap-3">
            <div className="h-px w-6" style={connectorLineStyleLeft} />
            {isEven ? (
              <TimelineText event={event} align="left" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} mobile />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineText({
  event,
  align,
}: {
  event: TimelineEvent
  align: "left" | "right"
}) {
  const textAlign = align === "right" ? "text-right" : "text-left"

  return (
    <div className={`max-w-md ${textAlign} ${align === "right" ? "ml-auto" : "mr-auto"}`}>
      <p
        className={`${cinzel.className} ${timelineType.label} font-semibold tracking-[0.2em] uppercase`}
        style={{ color: TEXT_WHITE }}
      >
        {event.time}
      </p>
      <p
        className={`${theSeasons.className} mt-1 text-[0.95rem] leading-tight tracking-[0.04em] sm:text-[1.175rem]`}
        style={{ color: TEXT_WHITE }}
      >
        {event.title}
      </p>

      {event.description && (
        <p
          className={`font-goudy-italic ${timelineType.textRelaxed} mt-1.5`}
          style={{ color: TEXT_WHITE }}
        >
          {event.description}
        </p>
      )}

      {event.location && (
        <p
          className={`font-goudy-italic ${timelineType.text} mt-1.5 leading-relaxed opacity-90`}
          style={{ color: TEXT_WHITE }}
        >
          {event.location}
        </p>
      )}
    </div>
  )
}

function IconMark({
  Icon,
  mobile,
  imageSrc,
}: {
  Icon: TimelineIcon
  mobile?: boolean
  imageSrc?: string
}) {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt=""
        width={96}
        height={96}
        className={`${
          mobile ? "h-16 w-16" : "h-18 w-18 lg:h-22 lg:w-22"
        } object-contain`}
        style={{ filter: timelineImageFilter }}
      />
    )
  }

  return (
    <div
      className={`${
        mobile ? "h-14 w-14" : "h-16 w-16 lg:h-18 lg:w-18"
      } flex items-center justify-center rounded-full border`}
      style={{
        background: "transparent",
        borderColor: dividerFade,
      }}
    >
      <Icon
        className={`${mobile ? "h-7 w-7" : "h-8 w-8 lg:h-9 lg:w-9"}`}
        style={{ color: TEXT_WHITE }}
      />
    </div>
  )
}

const iconStroke = TIMELINE_SVG_STROKE

function ArrivalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 28V14L16 6l10 8v14" />
      <path d="M12 28v-8h8v8" />
      <path d="M16 6v-2" />
    </svg>
  )
}

function DepartureIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 20h18l4-6H11l-2 3H5v3Z" />
      <circle cx="11" cy="23" r="2" />
      <circle cx="21" cy="23" r="2" />
      <path d="M5 20v3h3" />
    </svg>
  )
}

function RingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="20" r="6" />
      <circle cx="20" cy="20" r="6" />
      <path d="M14 9 16 5l2 4" />
      <path d="M13 7h6" />
    </svg>
  )
}

function FireworksIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 5v4" />
      <path d="M9 7l2.5 2.5" />
      <path d="M23 7 20.5 9.5" />
      <path d="M8 14h4" />
      <path d="M20 14h4" />
      <path d="M11 21 8 24" />
      <path d="M21 21 24 24" />
      <circle cx="16" cy="14" r="3" />
    </svg>
  )
}

function CocktailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 28h16" />
      <path d="M16 28V12" />
      <path d="M10 12h12l-1-4H11l-1 4Z" />
      <circle cx="16" cy="8" r="2" />
      <path d="M12 16h8" />
    </svg>
  )
}

function DanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="10" cy="12" r="3" />
      <circle cx="22" cy="12" r="3" />
      <path d="M10 15v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
      <path d="M12 23v2" />
      <path d="M20 23v2" />
      <path d="M8 18h16" />
      <path d="M16 5v4" />
      <path d="M13 7l3-2 3 2" />
    </svg>
  )
}
