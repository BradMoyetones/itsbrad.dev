"use client"

import { useEffect, useId, useRef } from "react"

import type { Transition } from "motion/react"

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * The original CD mark uses a 556 × 354 coordinate system.
 *
 * We keep exactly the same coordinate system and place:
 *
 *   B → in the original C region
 *   M → in the original D region
 *
 * Both letters use the same isometric projection.
 */

type Point = readonly [number, number]

const BOUNDS = {
  B: {
    cx: 166.78,
    cy: 240.58,
    width: 332.55,
    height: 224,
  },

  M: {
    cx: 360.77,
    cy: 128.58,
    width: 387.98,
    height: 256,
  },
}

/**
 * Normalized B geometry.
 *
 * This is deliberately geometric/angular rather than a font glyph,
 * matching the technical language of the original mark.
 */
const B_OUTER: Point[] = [
  [0.00, 0.00],
  [0.57, 0.00],
  [0.74, 0.06],
  [0.88, 0.17],
  [0.96, 0.30],
  [0.97, 0.42],
  [0.91, 0.50],
  [0.81, 0.55],

  [0.89, 0.61],
  [0.96, 0.71],
  [0.98, 0.83],
  [0.92, 0.94],
  [0.79, 1.00],
  [0.00, 1.00],
]

const B_HOLE_TOP: Point[] = [
  [0.20, 0.18],
  [0.52, 0.18],
  [0.63, 0.22],
  [0.69, 0.29],
  [0.69, 0.35],
  [0.63, 0.41],
  [0.52, 0.45],
  [0.20, 0.45],
]

const B_HOLE_BOTTOM: Point[] = [
  [0.20, 0.61],
  [0.53, 0.61],
  [0.65, 0.65],
  [0.71, 0.72],
  [0.71, 0.79],
  [0.65, 0.85],
  [0.54, 0.89],
  [0.20, 0.89],
]

/**
 * M geometry in the original D region.
 */
const M_OUTER: Point[] = [
  [0.00, 1.00],
  [0.00, 0.00],
  [0.20, 0.00],
  [0.50, 0.58],
  [0.80, 0.00],
  [1.00, 0.00],
  [1.00, 1.00],
  [0.78, 1.00],
  [0.78, 0.41],
  [0.59, 0.82],
  [0.41, 0.82],
  [0.22, 0.41],
  [0.22, 1.00],
]

function projectPoint(
  point: Point,
  bounds: {
    cx: number
    cy: number
    width: number
    height: number
  },
  yOffset = 0,
): Point {
  const [u, v] = point

  return [
    bounds.cx + (u - v) * (bounds.width / 2),
    bounds.cy +
      (u + v - 1) * (bounds.height / 2) +
      yOffset,
  ]
}

function polygonPath(
  points: Point[],
  bounds: {
    cx: number
    cy: number
    width: number
    height: number
  },
  yOffset = 0,
): string {
  if (!points.length) {
    return ""
  }

  const projected = points.map((point) =>
    projectPoint(point, bounds, yOffset),
  )

  return [
    `M ${projected[0][0].toFixed(2)} ${projected[0][1].toFixed(2)}`,
    ...projected
      .slice(1)
      .map(
        ([x, y]) =>
          `L ${x.toFixed(2)} ${y.toFixed(2)}`,
      ),
    "Z",
  ].join(" ")
}

function compoundPath(
  polygons: Point[][],
  bounds: {
    cx: number
    cy: number
    width: number
    height: number
  },
  yOffset = 0,
): string {
  return polygons
    .map((polygon) =>
      polygonPath(
        polygon,
        bounds,
        yOffset,
      ),
    )
    .join(" ")
}

const B_FACE_NORMAL = compoundPath(
  [B_OUTER, B_HOLE_TOP, B_HOLE_BOTTOM],
  BOUNDS.B,
)

const B_FACE_PRESSED = compoundPath(
  [B_OUTER, B_HOLE_TOP, B_HOLE_BOTTOM],
  BOUNDS.B,
  16,
)

const M_FACE_NORMAL = compoundPath(
  [M_OUTER],
  BOUNDS.M,
)

const M_FACE_PRESSED = compoundPath(
  [M_OUTER],
  BOUNDS.M,
  16,
)

const FACE_NORMAL =
  `${B_FACE_NORMAL} ${M_FACE_NORMAL}`

const FACE_PRESSED =
  `${B_FACE_PRESSED} ${M_FACE_PRESSED}`

/**
 * Stroke follows the exact same geometry as the faces.
 *
 * The original used one compound motion path for the complete
 * C + D outline, so BM follows the same concept.
 */
const STROKE_NORMAL =
  `${compoundPath(
    [B_OUTER, B_HOLE_TOP, B_HOLE_BOTTOM],
    BOUNDS.B,
  )}
   ${compoundPath(
     [M_OUTER],
     BOUNDS.M,
   )}`

const STROKE_PRESSED =
  `${compoundPath(
    [B_OUTER, B_HOLE_TOP, B_HOLE_BOTTOM],
    BOUNDS.B,
    16,
  )}
   ${compoundPath(
     [M_OUTER],
     BOUNDS.M,
     16,
   )}`

/**
 * The original mark exposes shallow technical side faces.
 * Keep that visual depth by extending the lower perimeter.
 */
function sidePath(
  points: Point[],
  bounds: {
    cx: number
    cy: number
    width: number
    height: number
  },
): string {
  const top = points.map((point) =>
    projectPoint(point, bounds),
  )

  const bottom = points.map((point) =>
    projectPoint(point, bounds, 16),
  )

  const paths: string[] = []

  for (let index = 0; index < top.length; index++) {
    const next = (index + 1) % top.length

    const a = top[index]
    const b = top[next]

    const c = bottom[next]
    const d = bottom[index]

    paths.push(
      [
        `M ${a[0].toFixed(2)} ${a[1].toFixed(2)}`,
        `L ${b[0].toFixed(2)} ${b[1].toFixed(2)}`,
        `L ${c[0].toFixed(2)} ${c[1].toFixed(2)}`,
        `L ${d[0].toFixed(2)} ${d[1].toFixed(2)}`,
        "Z",
      ].join(" "),
    )
  }

  return paths.join(" ")
}

const SIDES_NORMAL = [
  sidePath(B_OUTER, BOUNDS.B),
  sidePath(M_OUTER, BOUNDS.M),
].join(" ")

const SIDES_PRESSED = [
  sidePath(B_OUTER, BOUNDS.B),
  sidePath(M_OUTER, BOUNDS.M),
]
  .map((path) => path)
  .join(" ")

export function BradMarkIsometric() {
  const id = useId()

  const ids = {
    facePattern: `bm-face-pattern-${id}`,
    faceFill: `bm-face-fill-${id}`,
    stroke: `bm-stroke-${id}`,
    radialGradient: `bm-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  /**
   * Keep the original click sound and hook.
   */
  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()

  const isInView = useInView(ref, {
    margin: "80px",
  })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(
    useTransform(
      mouseX,
      [0, 1],
      [0, 556],
    ),
    {
      stiffness: 300,
      damping: 30,
      mass: 0.1,
    },
  )

  const cy = useSpring(
    useTransform(
      mouseY,
      [0, 1],
      [0, 354],
    ),
    {
      stiffness: 300,
      damping: 30,
      mass: 0.1,
    },
  )

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (
      window.matchMedia("(hover: none)").matches
    ) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(
        e.clientX / window.innerWidth,
      )

      mouseY.set(
        e.clientY / window.innerHeight,
      )
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    )

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      )
    }
  }, [
    shouldReduceMotion,
    isInView,
    mouseX,
    mouseY,
  ])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        {/*
          Keep this as a motion.g instead of applying a transform
          to a <use>. This is how the original keeps the hatch
          aligned during the pressed animation.
        */}
        <motion.g
          id={ids.faceFill}
          variants={{
            normal: {
              y: 0,
            },
            pressed: {
              y: 16,
            },
          }}
          transition={transition}
        >
          <path
            d={FACE_NORMAL}
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </motion.g>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />

          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/*
        EXACT same construction grid as the original.
      */}
      <g
        className="stroke-line"
        strokeWidth="1"
        strokeDasharray="4 2"
      >
        <path d="M-477.55 756.57L1254.51 -243.41" />

        <path d="M977.37 788.58L-754.67 -211.42" />

        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/*
        Technical side/extrusion layer.
      */}
      <motion.path
        d={SIDES_NORMAL}
        variants={{
          normal: {
            d: SIDES_NORMAL,
          },
          pressed: {
            d: SIDES_PRESSED,
          },
        }}
        transition={transition}
        className="fill-background"
        fillRule="evenodd"
        clipRule="evenodd"
      />

      {/*
        Face.
      */}
      <motion.path
        id={ids.faceFill}
        variants={{
          normal: {
            d: FACE_NORMAL,
          },
          pressed: {
            d: FACE_PRESSED,
          },
        }}
        transition={transition}
        className="fill-background"
        fillRule="evenodd"
        clipRule="evenodd"
      />

      {/*
        Hatch.
      */}
      <motion.path
        variants={{
          normal: {
            d: FACE_NORMAL,
          },
          pressed: {
            d: FACE_PRESSED,
          },
        }}
        transition={transition}
        fill={`url(#${ids.facePattern})`}
        fillRule="evenodd"
        clipRule="evenodd"
      />

      {/*
        Main outline.
      */}
      <motion.path
        id={ids.stroke}
        variants={{
          normal: {
            d: STROKE_NORMAL,
          },
          pressed: {
            d: STROKE_PRESSED,
          },
        }}
        transition={transition}
        stroke="var(--stroke)"
        fill="none"
        fillRule="evenodd"
        clipRule="evenodd"
      />

      {/*
        Cursor-driven highlight.
      */}
      <motion.path
        variants={{
          normal: {
            d: STROKE_NORMAL,
          },
          pressed: {
            d: STROKE_PRESSED,
          },
        }}
        transition={transition}
        stroke={`url(#${ids.radialGradient})`}
        fill="none"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </motion.svg>
  )
}