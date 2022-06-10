export interface SectionProps {
  children?: React.ReactNode
}

export default function Section({ children }: SectionProps) {
  return (
    <div className="mx max-w-7xl pt-5  sm:mx-auto">
      <div className="  flex flex-wrap">{children}</div>
    </div>
  )
}
