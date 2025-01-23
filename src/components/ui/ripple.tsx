import { type FC } from "react"

interface RippleProps {
  className?: string
  size?: number
}

export const Ripple: FC<RippleProps> = ({ className = "", size = 480 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 480 480"
      fill="none"
      className={`${className} dark:stroke-white/10 stroke-black/10`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="rippleMask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="480"
        height="480"
      >
        <rect width="480" height="480" fill="url(#rippleGradient)" />
      </mask>
      <g mask="url(#rippleMask)">
        <circle cx="240" cy="240" r="47.5" />
        <circle cx="240" cy="240" r="79.5" />
        <circle cx="240" cy="240" r="111.5" />
        <circle cx="240" cy="240" r="143.5" />
        <circle cx="240" cy="240" r="175.5" />
        <circle cx="240" cy="240" r="207.5" />
        <circle cx="240" cy="240" r="239.5" />
      </g>
      <defs>
        <radialGradient
          id="rippleGradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(240 240) rotate(90) scale(240 240)"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
