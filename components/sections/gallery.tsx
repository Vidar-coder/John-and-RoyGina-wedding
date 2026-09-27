"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import localFont from "next/font/local"
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { Cinzel } from "next/font/google"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"
import { sectionType } from "@/lib/section-typography"

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
const LIGHTBOX_TEXT = "#ffffff"

const dividerFade = `color-mix(in srgb, ${MOTIF_BURGUNDY} 55%, transparent)`
const lightboxBorder = "color-mix(in srgb, #ffffff 28%, transparent)"

const TEXT_WHITE = "#ffffff"
const dividerFadeLight = "color-mix(in srgb, #ffffff 42%, transparent)"

const detailText = {
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

const galleryTitleSize = {
  main: "clamp(1.65rem, 8.5vw, 4.5rem)",
  script: "clamp(0.95rem, 4.8vw, 2.7rem)",
} as const

function GalleryTitle({ onDark = false }: { onDark?: boolean }) {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": galleryTitleSize.main,
          "--script-size": galleryTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">Gallery — our favorite moments</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: onDark ? TEXT_WHITE : detailText.heading,
          textShadow: onDark ? "0 1px 10px rgba(0, 0, 0, 0.45)" : undefined,
        }}
      >
        Gallery
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
        our favorite moments
      </span>
    </h2>
  )
}

const galleryItems = [
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },
  { image: "/image/coming-soon.png", text: " " },

]

export function Gallery() {

  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const pointerStart = useRef({ x: 0, y: 0, dragging: false })
  const swipeConsumed = useRef(false)

  const resetZoom = useCallback(() => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    resetZoom()
  }, [resetZoom])

  const openLightbox = useCallback((item: (typeof galleryItems)[0], index: number) => {
    if (pointerStart.current.dragging) return
    setSelectedImage(item)
    setCurrentIndex(index)
    resetZoom()
  }, [resetZoom])

  const handleThumbPointerDown = (event: React.PointerEvent) => {
    pointerStart.current = { x: event.clientX, y: event.clientY, dragging: false }
  }

  const handleThumbPointerMove = (event: React.PointerEvent) => {
    const dx = event.clientX - pointerStart.current.x
    const dy = event.clientY - pointerStart.current.y
    if (dx * dx + dy * dy > 64) pointerStart.current.dragging = true
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        direction === 'next'
          ? (prevIndex + 1) % galleryItems.length
          : (prevIndex - 1 + galleryItems.length) % galleryItems.length
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
    resetZoom()
  }, [resetZoom])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateImage('prev')
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        navigateImage('next')
      }
      if (e.key === 'Escape') closeLightbox()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, navigateImage, closeLightbox])

  useEffect(() => {
    if (!selectedImage) return
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      const next = new window.Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new window.Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))

  return (
    <>
    <section
      id="gallery"
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

      {/* Header */}
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
          Our moments
        </p>
        <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
          <GalleryTitle onDark />
        </div>
        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
          style={{
            color: "color-mix(in srgb, #ffffff 90%, transparent)",
            textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)",
          }}
        >
          Snapshots from our journey together—moments of laughter, faith, and love we hold close.
        </p>

        <div className="mt-4 flex items-center justify-center gap-1.5 sm:mt-5">
          <span className="h-px w-8 sm:w-12 md:w-16" style={{ background: dividerFadeLight }} />
          <Camera
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            style={{ color: TEXT_WHITE }}
            aria-hidden
          />
          <span className="h-px w-8 sm:w-12 md:w-16" style={{ background: dividerFadeLight }} />
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-2 sm:px-8 sm:pb-3 md:px-10 lg:px-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
            <div
              className="h-12 w-12 animate-spin rounded-full border-[3px]"
              style={{
                borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 22%, transparent)`,
                borderTopColor: MOTIF_BURGUNDY,
              }}
            />
          </div>
        ) : (
          <>
            {/* Mobile: swipeable sliding gallery (scroll-snap carousel) */}
            <div className="sm:hidden">
              <div
                className="flex gap-3 overflow-x-auto px-1 pb-3 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Gallery carousel"
              >
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className="group relative snap-center shrink-0 w-[82%] overflow-hidden rounded-lg transition-all duration-300"
                    onPointerDown={handleThumbPointerDown}
                    onPointerMove={handleThumbPointerMove}
                    onClick={() => openLightbox(item, index)}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <div
                      className="absolute -inset-0.5 rounded-lg opacity-0 blur-sm transition-opacity duration-300 group-active:opacity-100"
                      style={{
                        background: dividerFade,
                      }}
                    />

                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        fill
                        sizes="82vw"
                        className="object-cover transition-transform duration-500 group-active:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div
                      className="absolute top-2 right-2 rounded-full px-2 py-1 backdrop-blur-sm"
                      style={{
                        backgroundColor: "color-mix(in srgb, #531314 72%, transparent)",
                      }}
                    >
                      <span className="text-xs font-medium" style={{ color: TEXT_ON_BURGUNDY }}>
                        {index + 1}/{galleryItems.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <p
                className={`${cinzel.className} mt-2 text-center tracking-[0.16em] uppercase ${sectionType.label}`}
                style={{ color: detailText.label }}
              >
                Swipe to explore
              </p>
            </div>

            {/* Tablet/Desktop: grid */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
              {galleryItems.map((item, index) => (
                <button
                  key={item.image + index}
                  type="button"
                  className="group relative w-full overflow-hidden rounded-xl transition-all duration-300"
                  onPointerDown={handleThumbPointerDown}
                  onPointerMove={handleThumbPointerMove}
                  onClick={() => openLightbox(item, index)}
                  aria-label={`Open image ${index + 1}`}
                >
                  <div
                    className="absolute -inset-0.5 rounded-xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: dividerFade,
                    }}
                  />

                  <div className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.text || `Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div
                    className="absolute top-2 right-2 rounded-full px-2 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundColor: "color-mix(in srgb, #531314 72%, transparent)",
                    }}
                  >
                    <span className="text-xs font-medium" style={{ color: TEXT_ON_BURGUNDY }}>
                      {index + 1}/{galleryItems.length}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 md:mt-14 flex justify-center">
              <Link
                href="/gallery"
                className={`${cinzel.className} inline-flex items-center justify-center rounded-full border px-8 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.18em] shadow-[0_8px_18px_color-mix(in_srgb,#531314_35%,transparent)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] sm:text-[0.6875rem] sm:tracking-[0.22em]`}
                style={{
                  backgroundColor: MOTIF_BURGUNDY,
                  borderColor: `color-mix(in srgb, ${MOTIF_FOREST} 32%, transparent)`,
                  color: TEXT_ON_BURGUNDY,
                }}
              >
                View Full Gallery
              </Link>
            </div>
          </>
        )}
      </div>
    </section>

      {isMounted && selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm animate-in fade-in duration-200 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          onClick={() => {
            if (swipeConsumed.current) {
              swipeConsumed.current = false
              return
            }
            closeLightbox()
          }}
        >
          <div
            className="relative flex h-full w-full items-center justify-center"
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                const now = Date.now()
                if (now - lastTap < 300) {
                  e.preventDefault()
                  setZoomScale((s) => (s > 1 ? 1 : 2))
                  setPan({ x: 0, y: 0 })
                }
                setLastTap(now)
                const t = e.touches[0]
                setTouchStartX(t.clientX)
                setTouchDeltaX(0)
                if (zoomScale > 1) {
                  setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                }
              }
              if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                setPinchStartDist(Math.hypot(dx, dy))
                setPinchStartScale(zoomScale)
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2 && pinchStartDist) {
                e.preventDefault()
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                setZoomScale(clamp((dist / pinchStartDist) * pinchStartScale, 1, 3))
              } else if (e.touches.length === 1) {
                const t = e.touches[0]
                if (zoomScale > 1 && panStart) {
                  e.preventDefault()
                  setPan({ x: panStart.panX + (t.clientX - panStart.x), y: panStart.panY + (t.clientY - panStart.y) })
                } else if (touchStartX !== null) {
                  setTouchDeltaX(t.clientX - touchStartX)
                }
              }
            }}
            onTouchEnd={() => {
              setPinchStartDist(null)
              setPanStart(null)
              if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                swipeConsumed.current = true
                navigateImage(touchDeltaX > 0 ? "prev" : "next")
              }
              setTouchStartX(null)
              setTouchDeltaX(0)
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between p-4 sm:p-6">
              <div
                className="pointer-events-auto rounded-full border px-4 py-2 backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(0,0,0,0.45)",
                  borderColor: lightboxBorder,
                }}
              >
                <span className="text-sm font-medium sm:text-base" style={{ color: LIGHTBOX_TEXT }}>
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  closeLightbox()
                }}
                className="pointer-events-auto rounded-full border border-white/20 bg-black/40 p-2 backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-black/60 sm:p-3"
                aria-label="Close lightbox"
              >
                <X size={20} className="text-white sm:h-6 sm:w-6" />
              </button>
            </div>

            {galleryItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("prev")
                  }}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-black/60 sm:left-4 sm:p-4"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-white sm:h-7 sm:w-7" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("next")
                  }}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-black/60 sm:right-4 sm:p-4"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-white sm:h-7 sm:w-7" />
                </button>
              </>
            )}

            <div
              className="relative flex max-h-[82dvh] max-w-[92vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.text.trim() || `Gallery image ${currentIndex + 1}`}
                width={1600}
                height={2000}
                sizes="100vw"
                priority
                style={{
                  transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                  transition: pinchStartDist ? "none" : "transform 200ms ease-out",
                }}
                className="h-auto max-h-[82dvh] w-auto max-w-[92vw] rounded-lg object-contain shadow-2xl will-change-transform"
              />
              {zoomScale > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetZoom()
                  }}
                  className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-black/80"
                >
                  Reset Zoom
                </button>
              )}
            </div>

            {galleryItems.length > 1 && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 sm:hidden">
                <p className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}