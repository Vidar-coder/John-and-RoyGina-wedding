"use client"

import { useMemo, useState, type CSSProperties, type ReactNode } from "react"
import type { SiteConfig } from "@/lib/site-config"
import { ChevronDown } from "lucide-react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
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

const MOTIF_BURGUNDY = "#531314"
const MOTIF_FOREST = "#052312"
const IVORY = "#fffaf4"
const MOTIF_CREAM = "#f4f0e8"

const borderMuted = `color-mix(in srgb, ${MOTIF_BURGUNDY} 28%, transparent)`
const borderSoft = `color-mix(in srgb, ${MOTIF_BURGUNDY} 16%, transparent)`

const TEXT_WHITE = "#ffffff"
const dividerFadeLight = "color-mix(in srgb, #ffffff 42%, transparent)"

const palette = {
  body: `color-mix(in srgb, ${MOTIF_FOREST} 78%, #4a5c4e)`,
  heading: MOTIF_FOREST,
  label: MOTIF_BURGUNDY,
  accent: MOTIF_BURGUNDY,
} as const

const scriptGlowOnDark = {
  textShadow: "0 1px 12px rgba(0, 0, 0, 0.55)",
} as const

const scriptGlow = {
  textShadow:
    "0 1px 0 color-mix(in srgb, #fffaf4 95%, white), 0 0 10px color-mix(in srgb, #531314 18%, transparent)",
} as const

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${MOTIF_BURGUNDY}, transparent)`,
} as const

const dividerLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${MOTIF_BURGUNDY}, transparent)`,
} as const

const panelStyle = {
  background: IVORY,
  borderColor: borderMuted,
} as const

const panelStyleOpen = {
  background: `color-mix(in srgb, ${IVORY} 96%, ${MOTIF_CREAM})`,
  borderColor: MOTIF_BURGUNDY,
  boxShadow: "0 10px 28px color-mix(in srgb, #531314 12%, transparent)",
} as const

const ct = {
  label: sectionType.label,
  body: sectionType.textRelaxed,
  bodyLg: sectionType.textRelaxed,
  question: sectionType.text,
} as const

const linkClass = "underline font-semibold transition-colors hover:opacity-80"

interface FAQItem {
  question: string
  answer: string | ReactNode
}

function OutsideDivider({ tone = "burgundy" }: { tone?: "burgundy" | "light" }) {
  const line = tone === "light" ? dividerFadeLight : dividerLineStyle.background
  const lineLeft = tone === "light" ? dividerFadeLight : dividerLineStyleLeft.background
  const dot =
    tone === "light" ? dividerFadeLight : `color-mix(in srgb, ${MOTIF_BURGUNDY} 55%, transparent)`

  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={{ background: line }} aria-hidden />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: dot }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={{ background: lineLeft }} aria-hidden />
    </div>
  )
}

function FaqTitle({ onDark = false }: { onDark?: boolean }) {
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
      <span className="sr-only">Frequently Asked Questions — everything you need to know</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: onDark ? TEXT_WHITE : palette.heading,
          textShadow: onDark ? "0 1px 10px rgba(0, 0, 0, 0.45)" : undefined,
        }}
      >
        Frequently Asked Questions
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2 sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: onDark ? IVORY : palette.accent,
          ...(onDark ? scriptGlowOnDark : scriptGlow),
        }}
      >
        everything you need to know
      </span>
    </h2>
  )
}

function getFaqItems(siteConfig: SiteConfig): FAQItem[] {
  const rsvpPhone = siteConfig.details.rsvp.phone.trim()
  const showRsvpPhone =
    rsvpPhone.length > 0 && !/to be announced/i.test(rsvpPhone)

  return [
    {
      question: "How do I RSVP?",
      answer: (
        <>
          Please RSVP using the{" "}
          <a
            href="#guest-list"
            className={linkClass}
            style={{ color: palette.accent }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            guest list
          </a>{" "}
          on this invitation: search for your name and confirm your attendance.
          {"\n\n"}
          Please respond by {siteConfig.details.rsvp.deadline.replace(/\.\s*$/, "")}.
          {showRsvpPhone
            ? `\n\nIf you have questions, please contact ${siteConfig.details.rsvp.coordinator} at ${rsvpPhone}.`
            : `\n\nIf you have questions, please contact ${siteConfig.details.rsvp.coordinator}.`}
        </>
      ),
    },
    {
      question: 'Do we really need to RSVP? We already said "Yes" to the couple.',
      answer:
        "Yes, please. We will be needing your formal RSVP to consolidate guest details and finalize the headcount for catering and seating purposes.",
    },
    {
      question: "May we choose our own seats at the reception?",
      answer:
        "We kindly ask that you take the place reserved for you. Each seat has been arranged with care so everyone may be comfortably seated with those we hoped you would share the evening with.",
    },
    {
      question: 'Can I bring a "Plus One" to the event?',
      answer:
        "As much as we would love to accommodate all our friends and family, we have a limited number of guests. Please understand that this event is strictly by invitation only.",
    },
    {
      question: "Can I bring my child to the event?",
      answer:
        "If your invitation includes your child or children, they are warmly welcome to celebrate with us. Please RSVP with the correct number of guests in your party so we can prepare accordingly.",
    },
    {
      question:
        'I said "No" to the RSVP but I had a change of plans—I can attend now! What should I do?',
      answer:
        "Please check with us first as we have a strict guest list. If seats become available, we will let you know as soon as possible. Please do not attend unannounced, as we may not have any available seats for you.",
    },
    {
      question: "What if I RSVP'd but cannot attend?",
      answer:
        "We would love to have you at our wedding, but we understand that there are circumstances beyond our control. However, please let us know as soon as possible so we can reallocate your seat/s.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, parking is available at both the ceremony and reception venues. Please arrive a little early so you have time to park comfortably.",
    },
    {
      question: "Can I take photos or videos during the reception?",
      answer:
        "Yes. We would love for you to capture the joy throughout the reception. We prepared this celebration wholeheartedly and we want everyone to enjoy it fully.",
    },
    {
      question: "When would it be most thoughtful to take our leave?",
      answer:
        "It would mean so much if you could stay with us through the end of the program. We have prepared the evening with love, and we hope you will laugh, take photos, and celebrate until the night draws to a close.",
    },
    {
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
    },
    {
      question: "How can I help the couple have a great time during their wedding?",
      answer:
        "• Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress according to the attire guide and color palette.\n\n• Arrive on time.\n\n• Follow the seating arrangement at the reception.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
    },
  ]
}

function FaqAnswer({ answer }: { answer: string | ReactNode }) {
  if (typeof answer !== "string") {
    return (
      <div
        className={`font-goudy-italic ${ct.body} whitespace-pre-line`}
        style={{ color: palette.body }}
      >
        {answer}
      </div>
    )
  }

  return (
    <p className={`font-goudy-italic ${ct.body} whitespace-pre-line`} style={{ color: palette.body }}>
      {answer}
    </p>
  )
}

export function FAQ() {
  const siteConfig = useSiteConfig()
  const faqItems = useMemo(() => getFaqItems(siteConfig), [siteConfig])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
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

      <div className="relative z-10 mx-auto mb-8 max-w-3xl px-5 text-center @container/faq sm:mb-10 sm:px-8 md:mb-12 md:px-10 lg:px-12">
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
          A few notes
        </p>
        <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
          <FaqTitle onDark />
        </div>
        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
          style={{
            color: "color-mix(in srgb, #ffffff 90%, transparent)",
            textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)",
          }}
        >
          Helpful notes so you can simply arrive, celebrate, and enjoy this day with us.
        </p>
        <div className="mt-4 flex items-center justify-center sm:mt-5">
          <span className="h-px w-16 sm:w-24 md:w-32" style={{ background: dividerFadeLight }} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-5 pb-4 sm:px-8 md:max-w-3xl md:px-10 md:pb-8 lg:px-12">
        <div className="space-y-2 sm:space-y-2.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            const contentId = `faq-item-${index}`
            const itemStyle = isOpen ? panelStyleOpen : panelStyle
            return (
              <div
                key={index}
                className="relative rounded-xl border transition-all duration-300"
                style={{
                  borderColor: itemStyle.borderColor,
                  backgroundColor: itemStyle.background,
                  boxShadow: isOpen && "boxShadow" in itemStyle ? itemStyle.boxShadow : undefined,
                }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="group flex w-full items-center justify-between px-3 py-2.5 text-left outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4 sm:py-3 md:px-5"
                  style={{ outlineColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 45%, transparent)` }}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span
                    className={`${cinzel.className} ${ct.question} pr-3 font-semibold leading-snug transition-colors duration-200`}
                    style={{ color: isOpen ? palette.heading : palette.body }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 sm:h-5 sm:w-5 ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: palette.accent }}
                    aria-hidden
                  />
                </button>

                <div
                  id={contentId}
                  role="region"
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className="border-t px-3 pb-3 pt-2 sm:px-4 sm:pb-4 md:px-5"
                      style={{ borderColor: borderSoft }}
                    >
                      <FaqAnswer answer={item.answer} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
