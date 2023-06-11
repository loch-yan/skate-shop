import { cn } from "@/lib/utils"

interface HeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string
  description?: string
  size?: "default" | "sm"
}

export function Header({
  title,
  description,
  size = "default",
  className,
  ...props
}: HeaderProps) {
  return (
    <div {...props} className={cn("grid gap-1", className)}>
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          size === "default" && "md:text-4xl"
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "text-muted-foreground",
            size === "default" && "text-lg"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
