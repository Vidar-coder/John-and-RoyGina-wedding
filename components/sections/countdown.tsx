"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import Counter from "@/components/Counter"
import Image from "next/image"
import { parseWeddingDate } from "@/lib/wedding-date"

const TEXT_WHITE = "#ffffff"

const palette = {
  body: TEXT_WHITE,
  heading: TEXT_WHITE,
  label: TEXT_WHITE,
  accent: TEXT_WHITE,
} as const

const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"

const scriptGlow = {
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.35), 0 0 12px rgba(0, 0, 0, 0.2)",
} as const

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${dividerFade}, transparent)`,
} as const

const dividerLineStyleLeft = {
  background: `linear-gradient(to left, transparent, ${dividerFade}, transparent)`,
} as const

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownUnitProps {
  value: number
  label: string
}

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

function CountdownTitle() {
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
        className={`${theSeasons.className} block pb-1 uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:pb-1.5 sm:tracking-[0.15em] md:tracking-[0.18em]`}
        style={{
          fontSize: "var(--title-size)",
          color: palette.heading,
        }}
      >
        Counting Down
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto mt-2 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2.5 sm:leading-[0.9] md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: palette.accent,
          ...scriptGlow,
        }}
      >
        until our wedding day
      </span>
      <span className="sr-only">until our wedding day</span>
    </h2>
  )
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const places = value >= 100 ? [100, 10, 1] : [10, 1]

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="relative w-full max-w-[88px] sm:max-w-[96px] md:max-w-[110px] lg:max-w-[120px]">
        <div className="relative flex items-center justify-center px-2.5 py-2.5 sm:px-3.5 sm:py-3.5 md:px-4 md:py-4">
            <Counter
              value={value}
              places={places}
              fontSize={26}
              padding={4}
              gap={2}
              textColor={palette.heading}
              fontWeight={800}
              borderRadius={6}
              horizontalPadding={3}
              gradientHeight={0}
              gradientFrom="transparent"
              gradientTo="transparent"
              counterStyle={{
                backgroundColor: "transparent",
              }}
              digitStyle={{
                minWidth: "1.15ch",
                fontFamily: "Arial, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: palette.heading,
              }}
            />
        </div>
      </div>

      <span
        className={`${cinzel.className} text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-xs md:text-sm`}
        style={{ color: palette.label }}
      >
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const siteConfig = useSiteConfig()
  const ceremonyDate = siteConfig.ceremony.date ?? siteConfig.wedding.date
  const ceremonyTimeDisplay = siteConfig.ceremony.time ?? siteConfig.wedding.time
  const parsedDate = parseWeddingDate(ceremonyDate)
  const ceremonyMonth = parsedDate.month
  const ceremonyDayNumber = parsedDate.day
  const ceremonyYear = parsedDate.year
  const { brideNickname, groomNickname } = siteConfig.couple
  const ceremonyDay = siteConfig.ceremony.day || parsedDate.dayOfWeek
  const ceremonyDayShort = ceremonyDay.slice(0, 3).toUpperCase()
  const ceremonyWhere =
    siteConfig.ceremony.location?.trim() ||
    siteConfig.ceremony.venue?.trim() ||
    siteConfig.wedding.venue?.trim()

  const timeStr = ceremonyTimeDisplay.split(",")[0].trim()

  const monthMap: { [key: string]: string } = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  }
  const monthNum =
    monthMap[ceremonyMonth.charAt(0) + ceremonyMonth.slice(1).toLowerCase()] || "12"
  const dayNum = ceremonyDayNumber

  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 15
  let minutes = 0

  if (timeMatch) {
    hour = parseInt(timeMatch[1], 10)
    minutes = parseInt(timeMatch[2], 10)
    const ampm = timeMatch[3].toUpperCase()
    if (ampm === "PM" && hour !== 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0
  }

  const parsedTargetDate = new Date(
    Date.UTC(
      parseInt(ceremonyYear, 10),
      parseInt(monthNum, 10) - 1,
      parseInt(dayNum, 10),
      hour - 8,
      minutes,
      0
    )
  )

  const targetTimestamp = Number.isNaN(parsedTargetDate.getTime())
    ? new Date(Date.UTC(2026, 11, 2, 6, 30, 0)).getTime()
    : parsedTargetDate.getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetTimestamp - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetTimestamp])

  const lineMuted = dividerFade

  return (
    <section
      id="countdown"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative bg-transparent px-3 py-5 sm:px-5 sm:py-7 md:px-6 md:py-9`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative mx-auto w-full max-w-xl sm:max-w-2xl"
      >
          <div className="relative flex justify-center pt-2 sm:pt-3 md:pt-4">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52"
            >
              <Image
                src={siteConfig.couple.monogram}
                alt={`${groomNickname} & ${brideNickname} monogram`}
                fill
                className="object-contain"
                priority={false}
              />
            </motion.div>
          </div>

          <header className="relative px-1 pt-4 pb-5 text-center sm:px-2 sm:pt-5 sm:pb-6 md:pb-7">
            <OutsideDivider />
            <div className="mt-4 sm:mt-5">
              <CountdownTitle />
            </div>
            <p
              className={`${cinzel.className} mx-auto mt-4 max-w-md text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.22em] sm:mt-5 sm:text-[0.68rem] sm:tracking-[0.26em]`}
              style={{ color: palette.body }}
            >
              Save the date — we hope to celebrate with you
            </p>
            <div className="mt-3 flex items-center justify-center sm:mt-4">
              <span className="h-px w-16 sm:w-24 md:w-32" style={{ background: lineMuted }} />
            </div>
          </header>

          <div className="relative px-1 sm:px-2">
            <div className="mx-auto max-w-xl">
              <div className="grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-md sm:gap-4 md:mx-auto md:max-w-xl md:grid-cols-4 md:gap-6">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                <CountdownUnit value={timeLeft.seconds} label="Seconds" />
              </div>
            </div>

            <div className="relative mb-2 p-4 sm:p-6 md:p-8">
              <div className="mx-auto w-full max-w-2xl">
                <div
                  className={`${cinzel.className} flex flex-col items-center gap-1.5 font-bold sm:gap-2.5 md:gap-3`}
                  style={{ color: palette.heading }}
                >
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] sm:text-xs sm:tracking-[0.5em] md:text-sm">
                    {ceremonyMonth}
                  </span>

                  <div className="flex w-full items-center gap-2 sm:gap-4 md:gap-5">
                    <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5">
                      <span className="h-[0.5px] flex-1" style={{ background: lineMuted }} />
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] sm:text-[0.7rem] sm:tracking-[0.4em] md:text-xs">
                        {ceremonyDayShort}
                      </span>
                      <span className="h-[0.5px] w-6 sm:w-8 md:w-10" style={{ background: lineMuted }} />
                    </div>

                    <div className="relative flex items-center justify-center px-3 sm:px-4 md:px-5">
                      <span
                        className={`${cinzel.className} relative text-[3rem] font-bold leading-none tracking-wider sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]`}
                      >
                        {ceremonyDayNumber}
                      </span>
                    </div>

                    <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
                      <span className="h-[0.5px] w-6 sm:w-8 md:w-10" style={{ background: lineMuted }} />
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] sm:text-[0.7rem] sm:tracking-[0.4em] md:text-xs">
                        {timeStr}
                      </span>
                      <span className="h-[0.5px] flex-1" style={{ background: lineMuted }} />
                    </div>
                  </div>

                  <span className="text-[0.65rem] uppercase tracking-[0.4em] sm:text-xs sm:tracking-[0.5em] md:text-sm">
                    {ceremonyYear}
                  </span>

                  {ceremonyWhere ? (
                    <p
                      className={`${cinzel.className} mt-3 max-w-sm text-center text-[0.58rem] font-semibold uppercase leading-relaxed tracking-[0.18em] sm:mt-4 sm:text-[0.62rem] sm:tracking-[0.22em] md:max-w-md`}
                      style={{ color: palette.label }}
                    >
                      {ceremonyWhere}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
      </motion.div>
    </section>
  )
}
