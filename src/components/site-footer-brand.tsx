"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

const VIEWBOX_WIDTH = 480

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion()

  const gradientX1Raw = useMotionValue(0.5)
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, VIEWBOX_WIDTH]),
    {
      stiffness: 150,
      damping: 25,
    }
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    gradientX1Raw.set(0.5)
  }

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[37.5%] items-center justify-center p-8">
          <svg
            className="container h-32 w-auto max-w-full"
            viewBox="0 0 480 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H32V160H0Z M32 0H64V32H32Z M32 64H64V96H32Z M32 128H64V160H32Z M64 16H96V64H64Z M64 80H96V128H64Z M128 0H160V160H128Z M160 0H192V32H160Z M160 64H192V96H160Z M192 16H224V64H192Z M160 96H192V160H160Z M192 96H224V160H192Z M256 0H352V32H256Z M256 32H288V160H256Z M320 32H352V160H320Z M256 64H352V96H256Z M384 0H416V160H384Z M416 0H448V32H416Z M416 128H448V160H416Z M448 16H480V144H448Z"
              fill="url(#brad_paint0)"
            />
            <path
              className="stroke-foreground/20"
              d="M0 0H32V160H0Z M32 0H64V32H32Z M32 64H64V96H32Z M32 128H64V160H32Z M64 16H96V64H64Z M64 80H96V128H64Z M128 0H160V160H128Z M160 0H192V32H160Z M160 64H192V96H160Z M192 16H224V64H192Z M160 96H192V160H160Z M192 96H224V160H192Z M256 0H352V32H256Z M256 32H288V160H256Z M320 32H352V160H320Z M256 64H352V96H256Z M384 0H416V160H384Z M416 0H448V32H416Z M416 128H448V160H416Z M448 16H480V144H448Z"
              strokeWidth="2"
            />
            <defs>
              <motion.linearGradient
                id="brad_paint0"
                x1={gradientX1}
                y1="0"
                x2="480"
                y2="160"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.2"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
