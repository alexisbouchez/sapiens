export interface LogoProps {
  color?: string
  width?: string | number
  height?: string | number
  className?: string
}

export default function Logo({ color, width, height, className }: LogoProps) {
  return (
    <svg
      width="190"
      height="202"
      viewBox="0 0 190 202"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[${width}] h-[${height}] h-12 w-12 ${className}`}
    >
      <path
        d="M95 13L165.668 68.2L178.138 157L95 190.6L11.8616 157L24.3323 68.2L95 13Z"
        stroke={color || 'white'}
        strokeWidth="20"
      />
    </svg>
  )
}
