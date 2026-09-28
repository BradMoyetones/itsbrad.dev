"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

const VIEWBOX_WIDTH = 1410

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
        <div className="flex w-full translate-y-[27.5%] items-center justify-center">
          <svg
            className="container size-full overflow-visible"
            viewBox="0 0 1135 258"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1084.1 -0.5V51.0996H1135.7V206.9H1084.1V258.5H928.301V-0.5H1084.1ZM980.9 205.9H1081.04V52.0996H980.9V205.9Z"
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              d="M774.499 -0.5V51.0996H826.1V258.5H773.499V155.3H671.299V258.5H618.699V51.0996H670.299V-0.5H774.499ZM671.299 102.7H773.499V54.1641H671.299V102.7Z"
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              d="M464.899 -0.5V51.0996H516.5V103.7H464.899V205.9H516.5V258.5H463.899V206.9H412.3V155.3H361.699V258.5H309.1V-0.5H464.899ZM361.699 102.7H461.836V52.0996H361.699V102.7Z"
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              d="M155.3 -0.5V51.0996H206.9V206.9H155.3V258.5H-0.5V-0.5H155.3ZM52.0996 205.9H152.236V155.3H52.0996V205.9ZM52.0996 102.7H152.236V52.0996H52.0996V102.7Z"
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              className="stroke-foreground/10"
              d="M155.3 -0.5V51.0996H206.9V206.9H155.3V258.5H-0.5V-0.5H155.3ZM464.899 -0.5V51.0996H516.5V103.7H464.899V205.9H516.5V258.5H463.899V206.9H412.3V155.3H361.7V258.5H309.1V-0.5H464.899ZM774.5 -0.5V51.0996H826.1V258.5H773.5V155.3H671.3V258.5H618.699V51.0996H670.3V-0.5H774.5ZM1084.1 -0.5V51.0996H1135.7V206.9H1084.1V258.5H928.301V-0.5H1084.1ZM980.9 205.9H1081.04V52.0996H980.9V205.9ZM52.0996 205.9H152.236V155.3H52.0996V205.9ZM671.3 102.7H773.5V54.1641H671.3V102.7ZM361.7 102.7H461.836V52.0996H361.7V102.7ZM52.0996 102.7H152.236V52.0996H52.0996V102.7Z"
              strokeWidth="2"
            />
            <defs>
              <motion.linearGradient
                id="paint0_linear_1145_73"
                x1={gradientX1}
                y1="1"
                x2="705"
                y2="257"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  )
}
