"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import localFont from "next/font/local"
import Image from "next/image"
import React from "react"

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

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[220px] lg:max-w-[260px]"

const TEXT_WHITE = "#ffffff"
const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"

const palette = {
  body: "color-mix(in srgb, #ffffff 90%, transparent)",
  heading: TEXT_WHITE,
  accent: "color-mix(in srgb, #fffaf4 96%, white)",
} as const

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
}

// YouTube Player API types
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={{ background: dividerFade }} aria-hidden />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: dividerFade }}
        aria-hidden
      />
      <span className="h-px w-6 sm:w-10" style={{ background: dividerFade }} aria-hidden />
    </div>
  )
}

function CoupleVideoTitle() {
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
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: palette.heading,
          textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)",
        }}
      >
        A Glimpse of Our Love
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2 sm:leading-[0.9] md:mt-2.5`}
        style={{
          fontSize: "var(--script-size)",
          color: palette.accent,
          textShadow: "0 1px 12px rgba(0, 0, 0, 0.55)",
        }}
      >
        Our Journey Together
      </span>
      <span className="sr-only">Our Journey Together</span>
    </h2>
  )
}

export function CoupleVideo() {
  const [hasClicked, setHasClicked] = useState(false)
  const playerRef = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { pauseMusic, resumeMusic } = useAudio()
  // https://youtu.be/cH-cndt3U3c
  const videoId = "cH-cndt3U3c"

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }
  }, [])

  useEffect(() => {
    if (!hasClicked || !iframeRef.current) return

    const initPlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (_event: any) => {
              pauseMusic()
            },
            onStateChange: (event: any) => {
              if (event.data === 1) {
                pauseMusic()
              } else if (event.data === 2 || event.data === 0) {
                resumeMusic()
              }
            },
          },
        })
      }
    }

    const timer = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initPlayer()
      } else {
        window.onYouTubeIframeAPIReady = initPlayer
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch {
          // Ignore errors during cleanup
        }
      }
    }
  }, [hasClicked, pauseMusic, resumeMusic, videoId])

  const handleThumbnailClick = () => {
    setHasClicked(true)
    pauseMusic()
  }

  return (
    <>
      <style jsx global>{`
        .youtube-embed-wrapper iframe {
          pointer-events: auto;
        }

        .youtube-mask-container {
          position: relative;
        }

        .youtube-mask-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        }

        .youtube-mask-container::after {
          content: "";
          position: absolute;
          top: 8px;
          right: 8px;
          width: 100px;
          height: 50px;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>

      <section
        id="couple-video"
        className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative overflow-hidden bg-[#0a1410] px-4 pb-10 pt-8 sm:pb-12 sm:pt-10 md:pb-16 md:pt-12`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={cornerTextureBackgroundStyle}
          aria-hidden
        />
        <div className="pointer-events-none absolute left-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/deco/left-top-corner.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute right-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/deco/right-top-corner.png"
            alt=""
            className="block h-auto w-auto max-w-[220px] sm:max-w-[160px] md:max-w-[220px] lg:max-w-[260px]"
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <img
            src="/decoration/decorations/botto-left-corner.png"
            alt=""
            className={CORNER_DECO_CLASS}
          /> */}
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <img
            src="/decoration/decorations/botto-right-corner.png"
            alt=""
            className={CORNER_DECO_CLASS}
          /> */}
        </div>

        <div className="relative z-20 mx-auto max-w-5xl @container/couple-video">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
              <OrnamentalDivider />
            </div>
            <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
              <CoupleVideoTitle />
            </div>
            <p
              className={`font-goudy-italic mx-auto mt-4 max-w-xl sm:mt-5 md:mt-6 ${sectionType.textSnug}`}
              style={{ color: palette.body, textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)" }}
            >
              Watch the journey that brought our hearts together
            </p>
          </div>

          {/* Video Container */}
          <div className="mt-6 sm:mt-8 md:mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <div
                className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_12px_36px_color-mix(in_srgb,var(--color-motif-deep)_10%,transparent)]"
                style={cardStyle}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-white/8 to-transparent"
                  aria-hidden
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-5 top-0 z-10 h-px sm:inset-x-8"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--color-motif-yellow), transparent)",
                  }}
                />

                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  {!hasClicked && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 cursor-pointer overflow-hidden rounded-[inherit]"
                      onClick={handleThumbnailClick}
                    >
                      <Image
                        src="/corner/thumnail.png"
                        alt="Video thumbnail"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        priority
                      />

                      <div
                        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
                        style={{
                          background:
                            "linear-gradient(to top, color-mix(in srgb, var(--color-welcome-navy) 25%, transparent), transparent 50%)",
                        }}
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          <div
                            className="absolute inset-0 scale-150 rounded-full blur-2xl transition-all duration-300 group-hover:scale-[1.7]"
                            style={{
                              backgroundColor:
                                "color-mix(in srgb, var(--color-welcome-green) 45%, transparent)",
                            }}
                          />

                          <div
                            className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-md transition-all duration-300 sm:h-20 sm:w-20 md:h-24 md:w-24"
                            style={{
                              backgroundColor: "var(--color-welcome-green)",
                              border:
                                "1px solid color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                              boxShadow:
                                "0 8px 24px color-mix(in srgb, var(--color-motif-deep) 15%, transparent)",
                            }}
                          >
                            <Play
                              className="ml-1 h-8 w-8 fill-current sm:h-10 sm:w-10 md:h-12 md:w-12"
                              style={{ color: "var(--color-welcome-bg)" }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {hasClicked && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="youtube-embed-wrapper absolute inset-0"
                    >
                      <div className="youtube-mask-container relative h-full w-full overflow-hidden">
                        <iframe
                          ref={iframeRef}
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
                          className="absolute inset-0 h-full w-full"
                          style={{ border: 0 }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          title="Wedding Video"
                        />

                        <div
                          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-16"
                          style={{
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
                          }}
                        />

                        <div
                          className="pointer-events-none absolute right-2 top-2 z-10 h-12 w-24 bg-black/60 blur-xl"
                          style={{ mixBlendMode: "multiply" }}
                        />

                        <div
                          className="pointer-events-none absolute inset-0 z-[5]"
                          style={{
                            background:
                              "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.02) 100%)",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 text-center sm:mt-8 md:mt-10"
            >
              <div className="mx-auto mb-4 sm:mb-5">
                <OrnamentalDivider />
              </div>
              <p
                className={`font-goudy-italic mx-auto max-w-lg px-4 ${sectionType.textSnug}`}
                style={{ color: palette.body, textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)" }}
              >
                A glimpse into the moments that made our hearts one
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
