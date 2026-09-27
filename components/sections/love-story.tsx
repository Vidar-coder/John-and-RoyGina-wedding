"use client"

import React from "react"
import localFont from "next/font/local"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { Cinzel } from "next/font/google"
import { cornerTextureBackgroundStyle } from "@/lib/corner-texture-background"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

const MOTIF_BURGUNDY = "#531314"
const MOTIF_FOREST = "#052312"
const IVORY = "#fffaf4"

const palette = {
  body: `color-mix(in srgb, ${MOTIF_FOREST} 78%, #4a5c4e)`,
  heading: MOTIF_FOREST,
  label: MOTIF_BURGUNDY,
  accent: MOTIF_BURGUNDY,
} as const

const MOTIF_CREAM = "#f4f0e8"
const TEXT_WHITE = "#ffffff"
const dividerFade = "color-mix(in srgb, #ffffff 42%, transparent)"

const narrativePanelStyle = {
  background: `color-mix(in srgb, ${IVORY} 94%, ${MOTIF_CREAM})`,
  borderColor: `color-mix(in srgb, ${MOTIF_BURGUNDY} 28%, transparent)`,
  boxShadow: "0 12px 36px color-mix(in srgb, #052312 18%, transparent)",
} as const

const scriptGlowOnDark = {
  textShadow: "0 1px 12px rgba(0, 0, 0, 0.55)",
} as const

const scriptGlowOnIvory = {
  textShadow:
    "0 1px 0 color-mix(in srgb, #fffaf4 95%, white), 0 0 10px color-mix(in srgb, #531314 18%, transparent)",
} as const

const scrollEase = [0.22, 1, 0.36, 1] as const

const headerReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.1,
      ease: scrollEase,
    },
  }),
}

const narrativeContainer: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: scrollEase,
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

const narrativeParagraph: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: scrollEase },
  },
}

const footerReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: scrollEase, delay: 0.05 },
  },
}

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

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const STORY_PARAGRAPHS: readonly string[] = [
  "Ang among love story nagsugod jud sa simbahan. Puro mi mga youth servers sa simbahan—salmista/choir siya, sakristan ko. Eventually nagkailhanay, nagka-amigohay.",
  "Naay one time sauna, sportsfest, nya nagka-grupo mi. Ilaha pa kong sungogon sa akong crush ato nga time kay ka-grupo man mi.",
  "Didto nag-sugod ang tanan. Eventually nagka-text mi, pero as friends ra. Pero pagkadugay, wala mi kabantay nga slowly na-develop na diay mi sa usag usa. Nagka-char-char mi.",
  "Dili ko kalimot nanimba mi ato with friends sa novenaryo ni Sto. Niño. Ako jud siya giampo: “Lord, maynta mao ni gyud ni siya Lord. Maynta magkauyab mi ug magkadayon hangtod sa hangtod.” Char-char gihapon mi.",
  "Until one time nga need ko mo-larga ug Manila kay naay opportunity to work, uy kuyog nako akong kuya nga mag-review kay mo-take ug Board Exam. Dili ko kalimot ato nga moment.",
  "June 2, 2016, to at around mga 9pm kapin. Holy hour sa simbahan. Nangumpisal ko ato gikan, nya siya gikan sa skwelahan. Nagkita mi. Naa siyay gihatag nako nga papel—usa ka letter para nako.",
  "Sa last part sa letter naay note: “ARE YOU STILL COURTING ME? INGNA KO SA IMONG ANSWER RIGHT AFTER IMO NING MABASA. Xoxo.” After that, ako siya gitubag ug “YES.” Nya ni-ana siya nga “Akong tubag kay YES.” Didto to nako gibasa sa sulod sa simbahan—ka-shagiton kaayo kos kalipay. Pag-gawas nako, ngisi siya.",
  "Three months mi LDR, nya niuli ko sa Cebu kay wala man ko madayon ug work. Pag-uli nako, ako siyang gi-surprise kay wala ko mosaba niya nga muuli ko. Ako siya giadto sa coffee shop duol sa UC main. Ako gi-konsabo iyang mga friends nga akong kaila pud.",
  "1st year: adto mi mag-abot sa Parkmall kay adto mo-naog sa 01K nga terminal. Among pirmi paliton kay Virginia hotdog on stick ug turon sa Savemore kay tag 15 ra. Hahaha. Mao to among mga date moments. Ningraduate siya—uwaw kaayo kay gipakuyog ko niya sa iyang pamilya mangaon after.",
  "2017 — dili ko kalimot nga adto mi nag-celebrate sa among 1st anniversary sa Mt. View. Nag boarding house siya ato nga time kay review siya; wala siya mananghid sa iya mama nga mag-overnight mi kay basin masuko, hahaha. Work nako ani nga time.",
  "2018 — 2nd anniversary. Work na mi both, medyo naa nay pang-palit ug kape, hahaha. 1st time namo maka-sulod sa Starbucks kay naka-dawat ug 200 nga voucher, hahaha. Sa J Mall mi ato nag-celebrate, nya after may nangaon sa Matias.",
  "2019 — challenges came nga na-test jud mi duha, but we conquered them, and nagpadayon among love story. 1st travel namo together, 1st sakay eroplano together. Dili mi kalimot kay nagdala siya ug Victoria Secret perfume nga dako nga wala pa kaayo makuhai nga na-flag sa airport—amo nalang gi-refillan ang butanganan ug alcohol para naay madala. Hahaha.",
  "Mao pud ni nga time (2018–2019) nga mura mi ug LDR: work ko gabie, uli buntag; work siya buntag, uli gabie. Di mi mag-abot usahay. Magkabilang mundo ang peg.",
  "2020 — pandemic era, mura sad mi ug LDR bisag malakaw ra ilaha sa amoa. Among tripping kay mag-dungan mi ug kompra sa Colonade or Merkado para magka-kita mi, hahaha. Timing kaayo gi-tanggal ang lockdown May 30; didto ko sa ilaha pag June 1 jud para maka-celebrate mi sa among anniversary.",
  "2021 — nag Bantayan Island mi with friends. Naa man mi kauban nga dili kahibaw mo-drive sa motor; ako ang nigamit sa motor sa amo kauban nga dili mo-start. Among gi-jump start, na-bangga ko sa gate nga naay cemento nga naay mga tanom—maygani wala ko mapangos. Nasamad ra akong tuhod kay na-tukod nako sa nabuak nga side mirror. Worried kaayo siya ato nga time ug naunsa ko.",
  "2022 — first concert together, Ben&Ben concert since mga “Liwanags” man mi, hahaha. Timing kay June 18 ang concert, nya June 19 iya birthday. 2022, mao sd ni nga time nawala ako papa, ug kahibaw siya nga si Papa’s boy jud ko. Kalit kaayo ang panghitabo—giatake siya sa among balay after human ug lunch. Work siya ato nga time; pag-message nako, ni-out gyud siya sa work ug giadto mi sa hospital para i-comfort ko, akong mama ug akong pamilya.",
  "2nd domestic travel together pud—1st Manila trip together.",
  "2023 — first work as a VA, kauban mi duha. Same employers, work mi together. Mao pud ni nga year nga practice na mi drive-drive kay nag-plano magkuha ug sakyanan, and eventually na-grasyahan, naka-kuha jud mi ug car.",
  "2024 — 1st international travel. Kuyog iyang mga HS/college friends—4 mi ka pairs (nakasal na ang duha, kaslonon ang usa this September, ug kami, hahaha). Hong Kong mi. Very unforgettable jud nga moment ang Disneyland. Nagplano jud ko mag-propose ani nga moment pero wala ko ka-palit ug singsing—but basin mao jud ang plan ni Lord.",
  "2025 — first airplane ride and travel with her family. Daghan sad mi travel dinhi: Boracay, Iloilo, Manila, Bukidnon. Naluya among mga bulsa, hahaha. Concert ni KZ ug TJ—another plano nga mag-propose pero wa ghapon madayon. Ako siya gi-ingnan nga pwede ko mag-propose pero iapas lang ang singsing? Hahaha.",
  "Usa sa pinaka-memorable was December 2025, Bukidnon trip. Grabe ka-nindot sa lugar. This time pud kay hapit mi wala madayon kay 3 days before sa among flight, gihilantan ko. Kuyawan mi. Pero maygani na-ulian ko, dayon ghapon ang laag kay YOLO gud, hahaha. Another attempt nga mag-propose pero wala ka-palit ug singsing. Ako gihapon siya gi-ingnan nga pwede mag-propose? Iapas lang ang singsing? Hahaha. Wa siya mo-sugot.",
  "2026 — February 14, 2026 mao na jud ni ang adlaw nga nag-propose ko niya. Daghang rason: usa sa among theme song was “214” kay Feb. 14. And I think it was time kay mag 10 years na mi.",
  "One of the reasons why wala madayon ang mga previous proposal was “Dili pa guro ni ang right time.” But I realize, there’s no such thing as “right time”—because every time is the right time. You just have to make it right.",
  "After that, our journey continued. Naay mga away, mga lalis, mga kahiubos—mohinay man ang kalayo sa gugma pero wala gyud mawala. Karon, mas ni-tubo ug ni-siga ang fire within us, and as we make this official as husband and wife.",
  "We want this to be us—some people nga wala jud makaila namo, people we met along this journey—they will get to know us. Who we are, what we are. Among bonding time is always over food (makita man sd sa lawas), coffee, travel together. Mga laagan jud mi, hahaha.",
  "10 years and 3 months (9/2) as girlfriend and boyfriend—10 years and 6 months on our wedding day. 10 years and more as friends. And soon, together forever as husband and wife.",
]

function SectionDivider({ tone = "burgundy" }: { tone?: "burgundy" | "light" }) {
  const line =
    tone === "light"
      ? dividerFade
      : `linear-gradient(to right, transparent, ${MOTIF_BURGUNDY}, transparent)`
  const lineLeft =
    tone === "light"
      ? dividerFade
      : `linear-gradient(to left, transparent, ${MOTIF_BURGUNDY}, transparent)`
  const dot =
    tone === "light"
      ? dividerFade
      : `color-mix(in srgb, ${MOTIF_BURGUNDY} 55%, transparent)`

  return (
    <div className="flex items-center justify-center gap-1.5 py-2">
      <span className="h-px w-6 sm:w-10" style={{ background: line }} aria-hidden />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: dot }}
        aria-hidden
      />
      <span className="h-px w-6 sm:w-10" style={{ background: lineLeft }} aria-hidden />
    </div>
  )
}

function LoveStoryTitle({ onDark = false }: { onDark?: boolean }) {
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
        className={`${theSeasons.className} block pb-1 uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:pb-1.5 sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: onDark ? TEXT_WHITE : palette.heading,
          textShadow: onDark ? "0 1px 10px rgba(0, 0, 0, 0.45)" : undefined,
        }}
      >
        Our Love Story
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto mt-2 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2.5 sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: onDark ? IVORY : palette.accent,
          ...(onDark ? scriptGlowOnDark : scriptGlowOnIvory),
        }}
      >
        JOKING x RG
      </span>
      <span className="sr-only">JOKING x RG</span>
    </h2>
  )
}

function LoveStoryNarrative() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="mx-auto w-full max-w-3xl rounded-2xl border px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-9"
      style={narrativePanelStyle}
      variants={reduceMotion ? undefined : narrativeContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.06, margin: "-48px 0px -80px 0px" }}
    >
      {STORY_PARAGRAPHS.map((paragraph, index) => (
        <motion.p
          key={index}
          variants={reduceMotion ? undefined : narrativeParagraph}
          className={`font-goudy-italic ${sectionType.textRelaxed} mb-4 text-left leading-[1.75] last:mb-0 sm:mb-5 sm:leading-[1.8]`}
          style={{ color: palette.body }}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  )
}

export function LoveStory() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="love-story"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative scroll-mt-16 w-full overflow-x-hidden bg-[#0a1410] pb-16 pt-16 sm:scroll-mt-20 sm:pb-20 sm:pt-20 md:scroll-mt-24 md:pb-24 md:pt-24`}
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

      <div className="relative z-10 mx-auto w-full px-5 text-center sm:px-8 md:px-10 lg:px-12 @container/love-story">
          <header className="relative pb-6 sm:pb-7 md:pb-8">
            <motion.div
              custom={0}
              variants={reduceMotion ? undefined : headerReveal}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
            >
              <SectionDivider tone="light" />
            </motion.div>
            <motion.div
              custom={1}
              variants={reduceMotion ? undefined : headerReveal}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              className="mt-4 sm:mt-5"
            >
              <LoveStoryTitle onDark />
            </motion.div>
            <motion.p
              custom={2}
              variants={reduceMotion ? undefined : headerReveal}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              className={`${cinzel.className} mx-auto mt-4 max-w-lg px-2 text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.22em] sm:mt-5 sm:text-[0.68rem] sm:tracking-[0.26em]`}
              style={{
                color: "color-mix(in srgb, #ffffff 88%, transparent)",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.45)",
              }}
            >
              From church friends to forever
            </motion.p>
            <motion.div
              custom={3}
              variants={reduceMotion ? undefined : headerReveal}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              className="mt-4 flex justify-center sm:mt-5"
            >
              <span className="h-px w-16 sm:w-24 md:w-32" style={{ background: dividerFade }} />
            </motion.div>
          </header>

          <LoveStoryNarrative />

          <motion.footer
            className="pt-6 text-center sm:pt-8 md:pt-10"
            variants={reduceMotion ? undefined : footerReveal}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.4, margin: "-32px" }}
          >
            <SectionDivider tone="light" />
            <blockquote className="mx-auto mt-4 max-w-xl px-2 sm:mt-5">
              <p
                className={`font-goudy-italic ${sectionType.textRelaxed} italic leading-relaxed`}
                style={{
                  color: "color-mix(in srgb, #ffffff 92%, transparent)",
                  textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)",
                }}
              >
                &ldquo;I have found the one whom my soul loves.&rdquo;
              </p>
              <footer
                className={`${cinzel.className} mt-2 sm:mt-3 ${sectionType.label} not-italic uppercase tracking-[0.2em]`}
                style={{
                  color: "color-mix(in srgb, #fffaf4 90%, white)",
                  textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                Song of Solomon 3:4
              </footer>
            </blockquote>
          </motion.footer>
      </div>
    </section>
  )
}
