"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useRef, useState } from "react"
import { Cinzel } from "next/font/google"
import { sectionType } from "@/lib/section-typography"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const MOTIF_BURGUNDY = "#531314"
const MOTIF_FOREST = "#052312"
const IVORY = "#fffaf4"
const MOTIF_CREAM = "#f4f0e8"
const TEXT_ON_BURGUNDY = IVORY

const containerPalette = {
  body: `color-mix(in srgb, ${MOTIF_FOREST} 78%, #4a5c4e)`,
  heading: MOTIF_FOREST,
  label: MOTIF_BURGUNDY,
  accent: MOTIF_BURGUNDY,
} as const

const messageCardStyle = {
  background: IVORY,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 28%, transparent)`,
  boxShadow: "0 6px 20px color-mix(in srgb, #052312 8%, transparent)",
} as const

const skeletonBg = `color-mix(in srgb, ${MOTIF_BURGUNDY} 12%, ${MOTIF_CREAM})`

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
  freshKey?: string | null
}

function messageKey(msg: Message) {
  return `${msg.name.trim().toLowerCase()}|${msg.message.trim().toLowerCase()}`
}

const INITIAL_VISIBLE = 3

export default function MessageWallDisplay({ messages, loading, freshKey = null }: MessageWallDisplayProps) {
  const seenKeys = useRef(new Set<string>())
  const initialized = useRef(false)
  const listRef = useRef<HTMLDivElement>(null)
  const [newKeys, setNewKeys] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const keys = messages.map((msg) => messageKey(msg))

    if (!initialized.current) {
      keys.forEach((key) => seenKeys.current.add(key))
      initialized.current = messages.length > 0 || !loading
      return
    }

    const incoming = keys.filter((key) => !seenKeys.current.has(key))
    if (incoming.length === 0) return

    incoming.forEach((key) => seenKeys.current.add(key))
    setNewKeys(new Set(incoming))
    const timer = window.setTimeout(() => setNewKeys(new Set()), 900)
    return () => window.clearTimeout(timer)
  }, [messages, loading])

  if (loading) {
    return (
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-[1.35rem] border sm:rounded-[1.5rem]" style={messageCardStyle}>
            <CardContent className="p-3 sm:p-4 md:p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full sm:h-9 sm:w-9" style={{ backgroundColor: skeletonBg }} />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24 sm:w-32" style={{ backgroundColor: skeletonBg }} />
                    <Skeleton className="h-2.5 w-20" style={{ backgroundColor: skeletonBg }} />
                  </div>
                </div>
              </div>
              <Skeleton className="h-14 w-full rounded-lg sm:h-16" style={{ backgroundColor: skeletonBg }} />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div
        className="rounded-[1.85rem] border px-4 py-8 text-center sm:px-6 sm:py-12 md:py-16"
        style={messageCardStyle}
      >
        <h3
          className={`${cinzel.className} mb-2 font-semibold uppercase tracking-[0.16em] sm:mb-3 ${sectionType.subheader}`}
          style={{ color: containerPalette.heading }}
        >
          No messages yet
        </h3>
        <p
          className={`font-goudy-italic mx-auto mb-5 max-w-md sm:mb-6 ${sectionType.textRelaxed}`}
          style={{ color: containerPalette.body }}
        >
          Be the first to leave a note for the happy couple.
        </p>
        <div className="flex justify-center">
          <span
            className={`${cinzel.className} ${sectionType.label} rounded-full border px-4 py-2 font-semibold uppercase tracking-[0.16em]`}
            style={{
              color: containerPalette.label,
              backgroundColor: `color-mix(in srgb, ${IVORY} 90%, ${MOTIF_CREAM})`,
              borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 24%, transparent)`,
            }}
          >
            Your message will appear here
          </span>
        </div>
      </div>
    )
  }

  const hasMore = messages.length > INITIAL_VISIBLE
  const visibleMessages = expanded ? messages : messages.slice(0, INITIAL_VISIBLE)

  const handleToggleMore = () => {
    if (expanded) {
      setExpanded(false)
      requestAnimationFrame(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
      return
    }
    setExpanded(true)
  }

  return (
    <div ref={listRef} className="space-y-2.5 scroll-mt-16 sm:space-y-3 sm:scroll-mt-20 md:space-y-4">
      {visibleMessages.map((msg, index) => {
        const key = `${messageKey(msg)}-${index}`
        const isNew = Boolean(freshKey && messageKey(msg) === freshKey) || newKeys.has(messageKey(msg))
        return (
          <Card
            key={key}
            className={`group relative transform overflow-hidden rounded-[1.35rem] border transition-all duration-300 hover:scale-[1.01] sm:rounded-[1.5rem] ${
              isNew ? "animate-in fade-in slide-in-from-top-3 zoom-in-95 duration-300 fill-mode-both" : ""
            }`}
            style={{
              ...messageCardStyle,
              borderColor: isNew
                ? MOTIF_BURGUNDY
                : messageCardStyle.borderColor,
              boxShadow: isNew
                ? "0 10px 28px color-mix(in srgb, #531314 18%, transparent)"
                : messageCardStyle.boxShadow,
            }}
          >
            <div
              className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 transform transition-transform duration-500 group-hover:scale-x-100"
              style={{
                background: `linear-gradient(to right, transparent, ${MOTIF_BURGUNDY}, transparent)`,
              }}
            />

            <CardContent className="relative p-3 sm:p-4 md:p-5">
              <div className="mb-2 flex items-start justify-between sm:mb-3">
                <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10"
                    style={{
                      backgroundColor: MOTIF_BURGUNDY,
                      boxShadow: "0 6px 14px color-mix(in srgb, #531314 28%, transparent)",
                      border: `1px solid color-mix(in srgb, ${MOTIF_FOREST} 22%, transparent)`,
                    }}
                  >
                    <span
                      className={`${cinzel.className} ${sectionType.label} font-semibold`}
                      style={{ color: TEXT_ON_BURGUNDY }}
                    >
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`${cinzel.className} ${sectionType.text} truncate font-semibold tracking-[0.04em]`}
                      style={{ color: containerPalette.heading }}
                    >
                      {msg.name}
                    </h4>
                    <span
                      className={`${cinzel.className} ${sectionType.label} uppercase tracking-[0.12em]`}
                      style={{ color: containerPalette.label }}
                    >
                      {new Date(msg.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative border-t py-2 pl-5 pr-2 sm:py-2.5 sm:pl-6 sm:pr-4" style={{ borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 14%, transparent)` }}>
                <span
                  className="font-goudy-italic absolute left-0 top-1 select-none text-2xl leading-none sm:top-1.5 sm:text-3xl"
                  style={{ color: containerPalette.accent, opacity: 0.35 }}
                >
                  &ldquo;
                </span>
                <p
                  className={`font-goudy-italic relative z-10 italic leading-relaxed ${sectionType.textRelaxed}`}
                  style={{ color: containerPalette.body }}
                >
                  {msg.message}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {hasMore && (
        <div className="flex justify-center pt-2 sm:pt-3">
          <button
            type="button"
            onClick={handleToggleMore}
            className={`${cinzel.className} ${sectionType.label} inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-2.5 font-semibold uppercase tracking-[0.12em] shadow-[0_8px_18px_color-mix(in_srgb,#531314_28%,transparent)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:tracking-[0.14em]`}
            style={{
              backgroundColor: MOTIF_BURGUNDY,
              borderColor: `color-mix(in srgb, ${MOTIF_FOREST} 32%, transparent)`,
              color: TEXT_ON_BURGUNDY,
            }}
          >
            {expanded ? "Show less" : "View more"}
          </button>
        </div>
      )}
    </div>
  )
}
