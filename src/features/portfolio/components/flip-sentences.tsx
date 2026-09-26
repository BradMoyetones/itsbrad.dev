export function FlipSentences({
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children" | "ref"> & {
  children: string[]
}) {
  return (
    <div {...props}>
      <span className="font-mono text-sm text-muted-foreground">
        {children[0]}
      </span>
    </div>
  )
}
