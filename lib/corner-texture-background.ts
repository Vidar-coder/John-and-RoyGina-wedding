import type { CSSProperties } from "react"

/** Source asset: 1536×1024 — tile at fixed width so grain stays crisp (no bg-cover stretch). */
export const CORNER_TEXTURE_TILE_WIDTH = "576px"

export const cornerTextureBackgroundStyle: CSSProperties = {
  backgroundColor: "#0a1410",
  backgroundImage: "url(/corner/background.png)",
  backgroundRepeat: "repeat",
  backgroundSize: `${CORNER_TEXTURE_TILE_WIDTH} auto`,
  backgroundPosition: "0 0",
}
