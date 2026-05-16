const widths = {
  narrow: '36rem',
  base: '44rem',
  wide: '72rem',
}

export default function Container({
  children,
  width = 'base',
}: {
  children: React.ReactNode
  width?: keyof typeof widths
}) {
  return (
    <div
      style={{
        maxWidth: widths[width],
        margin: '0 auto',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}
