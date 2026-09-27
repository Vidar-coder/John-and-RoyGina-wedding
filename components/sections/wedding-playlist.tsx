"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useSiteConfig } from "@/hooks/use-site-config"
import { useAudio } from "@/contexts/audio-context"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Music2 } from "lucide-react"

interface SpotifyPlaybackUpdate {
  playingURI: string
  isPaused: boolean
  isBuffering: boolean
  duration: number
  position: number
}

interface SpotifyEmbedController {
  addListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  removeListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  destroy: () => void
}

interface SpotifyIframeApi {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIframeApi) => void
  }
}

let cachedSpotifyIframeApi: SpotifyIframeApi | null = null
const spotifyApiReadyQueue: Array<(api: SpotifyIframeApi) => void> = []

function getSpotifyParts(spotifyUrl: string) {
  const match = spotifyUrl.match(
    /open\.spotify\.com\/(?:embed\/)?(playlist|album|track|episode)\/([^/?]+)/
  )
  if (!match) return null
  return { type: match[1], id: match[2] }
}

function getSpotifyUri(spotifyUrl: string): string {
  const parts = getSpotifyParts(spotifyUrl)
  if (!parts) return spotifyUrl
  return `spotify:${parts.type}:${parts.id}`
}

function getSpotifyOpenUrl(spotifyUrl: string): string {
  const parts = getSpotifyParts(spotifyUrl)
  if (!parts) return spotifyUrl
  return `https://open.spotify.com/${parts.type}/${parts.id}`
}

function loadSpotifyIframeApi(onReady: (api: SpotifyIframeApi) => void) {
  if (cachedSpotifyIframeApi) {
    onReady(cachedSpotifyIframeApi)
    return
  }

  spotifyApiReadyQueue.push(onReady)

  if (spotifyApiReadyQueue.length > 1) return

  const previousReady = window.onSpotifyIframeApiReady
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    cachedSpotifyIframeApi = IFrameAPI
    previousReady?.(IFrameAPI)
    spotifyApiReadyQueue.splice(0).forEach((callback) => callback(IFrameAPI))
  }

  const existingScript = document.querySelector(
    'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
  )
  if (!existingScript) {
    const script = document.createElement("script")
    script.src = "https://open.spotify.com/embed/iframe-api/v1"
    script.async = true
    document.body.appendChild(script)
  }
}

const MOTIF_BURGUNDY = "#531314"
const MOTIF_FOREST = "#052312"
const IVORY = "#fffaf4"
const MOTIF_CREAM = "#f4f0e8"
const TEXT_WHITE = "#ffffff"
const TEXT_WHITE_SOFT = "color-mix(in srgb, #ffffff 82%, transparent)"
const TEXT_ON_BURGUNDY = IVORY
const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"
const containerBorder = `color-mix(in srgb, ${MOTIF_BURGUNDY} 32%, transparent)`

/** Section header — white on invitation backdrop */
const palette = {
  body: TEXT_WHITE_SOFT,
  heading: TEXT_WHITE,
  label: TEXT_WHITE_SOFT,
  accent: TEXT_WHITE,
} as const

/** Inside ivory playlist card */
const containerPalette = {
  body: `color-mix(in srgb, ${MOTIF_FOREST} 78%, #4a5c4e)`,
  heading: MOTIF_FOREST,
  label: MOTIF_BURGUNDY,
  accent: MOTIF_BURGUNDY,
} as const

const scriptGlow = {
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.35), 0 0 12px rgba(0, 0, 0, 0.2)",
} as const

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${dividerFade}, transparent)`,
} as const

const dividerLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${dividerFade}, transparent)`,
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

const ct = {
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  btn: "text-[0.625rem] sm:text-[0.6875rem] md:text-xs",
} as const

const cardStyle = {
  background: IVORY,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: containerBorder,
  boxShadow: "0 10px 28px color-mix(in srgb, #052312 10%, transparent)",
} as const

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: dividerFade }}
        aria-hidden
      />
      <span className="h-px w-6 sm:w-10" style={dividerLineStyleLeft} />
    </div>
  )
}

function PlaylistTitle({ title, script }: { title: string; script: string }) {
  return (
    <h2
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.1rem, 4.5vw, 2.25rem)",
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.15em] md:tracking-[0.18em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: palette.heading,
        }}
      >
        {title}
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: palette.accent,
          ...scriptGlow,
        }}
      >
        {script}
      </span>
      <span className="sr-only">{script}</span>
    </h2>
  )
}

export function WeddingPlaylist() {
  const siteConfig = useSiteConfig()
  const { title, subtitle, playlistName, spotifyUrl } = siteConfig.playlist
  const spotifyUri = getSpotifyUri(spotifyUrl)
  const spotifyOpenUrl = getSpotifyOpenUrl(spotifyUrl)
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const embedContainerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyEmbedController | null>(null)
  const playbackStateRef = useRef<"playing" | "paused">("paused")
  const { pauseMusic, resumeMusic } = useAudio()

  useEffect(() => {
    let cancelled = false
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyOpenUrl)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { thumbnail_url?: string } | null) => {
        if (!cancelled && data?.thumbnail_url) setCoverUrl(data.thumbnail_url)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [spotifyOpenUrl])

  useEffect(() => {
    const container = embedContainerRef.current
    if (!container) return

    let mounted = true

    const handlePlaybackStateChange = (isPlaying: boolean) => {
      if (isPlaying && playbackStateRef.current !== "playing") {
        playbackStateRef.current = "playing"
        pauseMusic()
      } else if (!isPlaying && playbackStateRef.current === "playing") {
        playbackStateRef.current = "paused"
        resumeMusic()
      }
    }

    const initController = (IFrameAPI: SpotifyIframeApi) => {
      if (!mounted || !embedContainerRef.current) return

      IFrameAPI.createController(
        embedContainerRef.current,
        {
          uri: spotifyUri,
          width: "100%",
          height: "352",
        },
        (EmbedController) => {
          if (!mounted) return

          controllerRef.current = EmbedController

          const handlePlaybackUpdate = (event: { data: SpotifyPlaybackUpdate }) => {
            handlePlaybackStateChange(!event.data.isPaused)
          }

          const handlePlaybackStarted = () => {
            handlePlaybackStateChange(true)
          }

          EmbedController.addListener("playback_update", handlePlaybackUpdate)
          EmbedController.addListener("playback_started", handlePlaybackStarted)
        }
      )
    }

    loadSpotifyIframeApi(initController)

    return () => {
      mounted = false
      if (playbackStateRef.current === "playing") {
        resumeMusic()
      }
      playbackStateRef.current = "paused"
      controllerRef.current?.destroy()
      controllerRef.current = null
    }
  }, [pauseMusic, resumeMusic, spotifyUri])

  return (
    <section
      id="playlist"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 w-full scroll-mt-16 overflow-hidden bg-transparent pb-16 pt-16 sm:scroll-mt-20 sm:pb-20 sm:pt-20 md:scroll-mt-24 md:pb-24 md:pt-24`}
    >
      <div className="relative z-20 mx-auto max-w-3xl px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="relative z-20 text-center">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OutsideDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <PlaylistTitle title={title} script={playlistName} />
          </div>
          <p
            className={`font-goudy-italic ${ct.bodyLg} mx-auto mt-4 max-w-lg leading-relaxed px-2 sm:mt-5 md:mt-6`}
            style={{ color: palette.body }}
          >
            {subtitle}
          </p>
          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
          </div>
        </div>

        <div
          className="relative mt-6 overflow-hidden rounded-[1.85rem] border sm:mt-8 md:mt-10"
          style={cardStyle}
        >
          <div className="relative z-20 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            {/* <div className="mx-auto mb-5 w-[min(68%,13.5rem)] sm:mb-6 sm:w-56 md:w-64">
              <div
                className="relative aspect-square overflow-hidden rounded-2xl border shadow-[0_12px_28px_color-mix(in_srgb,#052312_14%,transparent)]"
                style={{ borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 28%, transparent)` }}
              >
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={`${playlistName} cover`}
                    fill
                    sizes="(max-width: 640px) 68vw, 256px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, ${IVORY} 82%, ${MOTIF_CREAM})` }}
                  >
                    <Music2 className="h-8 w-8" style={{ color: MOTIF_BURGUNDY }} aria-hidden />
                  </div>
                )}
              </div>
            </div> */}

            <p
              className={`${cinzel.className} mb-4 text-center text-[0.625rem] font-semibold uppercase tracking-[0.2em] sm:mb-5 sm:text-[0.6875rem] sm:tracking-[0.24em] md:text-xs`}
              style={{ color: containerPalette.label }}
            >
              {playlistName}
            </p>

            <div
              ref={embedContainerRef}
              title={`${playlistName} — Spotify playlist`}
              className="h-[352px] w-full overflow-hidden rounded-xl border [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
              style={{
                borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 18%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${IVORY} 90%, ${MOTIF_CREAM})`,
              }}
            />

            <div className="mt-5 flex justify-center sm:mt-6">
              <a
                href={spotifyOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cinzel.className} group inline-flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 font-semibold uppercase tracking-[0.2em] shadow-[0_8px_18px_color-mix(in_srgb,#531314_35%,transparent)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,#531314_25%,transparent)] focus-visible:ring-offset-2 sm:px-8 sm:py-3 sm:tracking-[0.24em] md:px-10 md:py-3.5 md:tracking-[0.28em] ${ct.btn}`}
                style={{
                  backgroundColor: MOTIF_BURGUNDY,
                  borderColor: `color-mix(in srgb, ${MOTIF_FOREST} 32%, transparent)`,
                  color: TEXT_ON_BURGUNDY,
                }}
              >
                <Music2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                Open in Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
