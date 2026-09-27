"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
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
const MOTIF_BURGUNDY = "#531314"
const MOTIF_FOREST = "#052312"
const IVORY = "#fffaf4"
const MOTIF_CREAM = "#f4f0e8"
const TEXT_ON_BURGUNDY = IVORY

const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"
const containerBorder = `color-mix(in srgb, ${MOTIF_BURGUNDY} 32%, transparent)`
const inputBorderIdle = `color-mix(in srgb, ${MOTIF_BURGUNDY} 22%, transparent)`
const inputBg = `color-mix(in srgb, ${IVORY} 96%, ${MOTIF_CREAM})`

const scriptGlow = {
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.35), 0 0 12px rgba(0, 0, 0, 0.2)",
} as const

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${dividerFade}, transparent)`,
} as const

const dividerLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${dividerFade}, transparent)`,
} as const

/** Motif palette — used inside form/message containers only */
const containerPalette = {
  body: `color-mix(in srgb, ${MOTIF_FOREST} 78%, #4a5c4e)`,
  heading: MOTIF_FOREST,
  label: MOTIF_BURGUNDY,
  accent: MOTIF_BURGUNDY,
} as const

const formShellStyle = {
  background: IVORY,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: containerBorder,
  boxShadow: "0 10px 28px color-mix(in srgb, #052312 10%, transparent)",
} as const

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: (message: Message) => void
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

function MessagesTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">Love Notes and Prayers — Share your love with us</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: TEXT_WHITE,
        }}
      >
        Love Notes
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
        and prayers
      </span>
    </h2>
  )
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameValue.trim()
    const message = messageValue.trim()
    if (!name || !message) return

    setIsSubmitting(true)

    const sentMessage: Message = {
      timestamp: new Date().toISOString(),
      name,
      message,
    }

    onMessageSent?.(sentMessage)
    setIsSubmitted(true)
    setNameValue("")
    setMessageValue("")
    formRef.current?.reset()
    window.setTimeout(() => setIsSubmitted(false), 900)

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(siteConfig.googleAPI.messageForm, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      })

      toast({
        title: "Message sent",
        description: "Thank you for your kind words.",
        duration: 3000,
      })

      onSuccess?.()
    } catch {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBorder = (field: string) =>
    focusedField === field ? MOTIF_BURGUNDY : inputBorderIdle

  const inputClass = (field: string) =>
    `message-form-input w-full rounded-lg border px-3 py-2 font-goudy-italic ${sectionType.text} transition-all duration-300 focus:ring-2 focus:ring-[color-mix(in_srgb,#531314_18%,transparent)] sm:px-4 sm:py-2.5 md:py-3 ${
      focusedField === field ? "shadow-[0_4px_14px_color-mix(in_srgb,#531314_12%,transparent)]" : ""
    }`

  return (
    <div className="relative mx-auto w-full max-w-md px-3 sm:px-0">
      <style>{`
        .message-form-input::placeholder,
        .message-form-textarea::placeholder {
          color: color-mix(in srgb, #052312 42%, transparent) !important;
          opacity: 1 !important;
        }
      `}</style>

      <Card
        className={`relative w-full overflow-hidden rounded-[1.85rem] border transition-all duration-500 ${
          isFocused ? "scale-[1.01]" : ""
        } ${isSubmitted ? "animate-bounce" : ""}`}
        style={formShellStyle}
      >
        {isSubmitted && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none backdrop-blur-[2px]"
            style={{ backgroundColor: "color-mix(in srgb, #fffaf4 88%, transparent)" }}
          >
            <p
              className={`${cinzel.className} font-semibold uppercase tracking-[0.14em] ${sectionType.subheader}`}
              style={{ color: containerPalette.accent }}
            >
              Sent!
            </p>
          </div>
        )}

        <CardContent className="relative p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="mb-4 text-center sm:mb-5 md:mb-6">
            <h3
              className={`${theSeasons.className} ${sectionType.subheader} mb-1.5 font-semibold tracking-[0.08em] uppercase`}
              style={{ color: containerPalette.heading }}
            >
              Share Your Love
            </h3>
            <p className={`font-goudy-italic ${sectionType.text}`} style={{ color: containerPalette.body }}>
              Leave a note for {coupleDisplayName} to read and keep.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="space-y-1.5 sm:space-y-2">
              <label
                className={`${cinzel.className} ${sectionType.label} font-semibold uppercase tracking-[0.16em]`}
                style={{ color: containerPalette.label }}
              >
                Your Name
              </label>
              <Input
                name="name"
                required
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Full name"
                className={inputClass("name")}
                style={{
                  color: containerPalette.heading,
                  backgroundColor: inputBg,
                  borderColor: inputBorder("name"),
                }}
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  className={`${cinzel.className} ${sectionType.label} font-semibold uppercase tracking-[0.16em]`}
                  style={{ color: containerPalette.label }}
                >
                  Your Message
                </label>
                {messageValue && (
                  <span
                    className={`${sectionType.label} ${messageValue.length > 500 ? "text-red-600" : ""}`}
                    style={messageValue.length <= 500 ? { color: containerPalette.accent } : undefined}
                  >
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <Textarea
                name="message"
                required
                value={messageValue}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setMessageValue(e.target.value)
                  }
                }}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder={`Write your wishes, prayer, or kind words for ${coupleDisplayName}...`}
                className={`message-form-textarea ${inputClass("message")} min-h-[90px] resize-none placeholder:leading-relaxed sm:min-h-[110px] md:min-h-[130px]`}
                style={{
                  color: containerPalette.heading,
                  backgroundColor: inputBg,
                  borderColor: inputBorder("message"),
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className={`${cinzel.className} group relative w-full rounded-full border px-5 py-2.5 ${sectionType.label} font-semibold uppercase tracking-[0.16em] shadow-[0_8px_18px_color-mix(in_srgb,#531314_35%,transparent)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none sm:py-3 sm:tracking-[0.18em]`}
              style={{
                backgroundColor: MOTIF_BURGUNDY,
                borderColor: `color-mix(in srgb, ${MOTIF_FOREST} 32%, transparent)`,
                color: TEXT_ON_BURGUNDY,
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [freshKey, setFreshKey] = useState<string | null>(null)

  const messageKey = (m: Message) =>
    `${m.name.trim().toLowerCase()}|${m.message.trim().toLowerCase()}`

  const fetchMessages = useCallback((silent = false) => {
    if (!silent) setLoading(true)
    fetch("/api/messages", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          if (!silent) setMessages([])
          setLoading(false)
          return
        }
        const parsed = data.filter((m: Message) => m.name || m.message || m.timestamp).reverse()
        setMessages((prev) => {
          const serverKeys = new Set(parsed.map(messageKey))
          const pending = prev.filter((local) => !serverKeys.has(messageKey(local)))
          return [...pending, ...parsed]
        })
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  const handleMessageSent = useCallback((message: Message) => {
    setMessages((prev) => {
      if (prev.some((item) => messageKey(item) === messageKey(message))) return prev
      return [message, ...prev]
    })
    setFreshKey(messageKey(message))
    window.setTimeout(() => setFreshKey(null), 1200)
    window.setTimeout(() => fetchMessages(true), 2200)
  }, [fetchMessages])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <section
      id="messages"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 w-full bg-transparent px-3 pt-8 pb-8 sm:px-5 sm:pt-10 sm:pb-10 md:px-6 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14`}
    >
      <div className="relative mx-auto max-w-4xl @container/messages">
        <div className="mb-6 text-center sm:mb-8 md:mb-10">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OutsideDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <MessagesTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-2xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
            style={{ color: TEXT_WHITE_SOFT }}
          >
            Share a short note, wish, or prayer for {coupleDisplayName}. Every message becomes part of our story.
          </p>
          <div className="mt-4 flex items-center justify-center sm:mt-5">
            <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
          </div>
        </div>

        {/* Form container */}
        <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
          <div className="relative w-full max-w-xl">
            <MessageForm onMessageSent={handleMessageSent} />
          </div>
        </div>

     
        <div className="relative mx-auto max-w-3xl pb-2 sm:pb-3">
          <div className="mb-4 text-center sm:mb-6 md:mb-8">
            <h3
              className={`${theSeasons.className} mb-1.5 font-semibold tracking-[0.08em] uppercase sm:mb-2 ${sectionType.subheader}`}
              style={{ color: TEXT_WHITE }}
            >
              Messages from Loved Ones
            </h3>
            <p className={`font-goudy-italic ${sectionType.text}`} style={{ color: TEXT_WHITE_SOFT }}>
              Warm words from family and friends
            </p>
            <div className="mt-4 flex items-center justify-center sm:mt-5">
              <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
            </div>
          </div>

          <MessageWallDisplay
            messages={messages}
            loading={loading && messages.length === 0}
            freshKey={freshKey}
          />
        </div>
      </div>
    </section>
  )
}
