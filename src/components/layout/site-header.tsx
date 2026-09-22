import Link from "next/link"
import { SparklesIcon } from "lucide-react"
import { cn } from "cn"

import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "홈" },
  { href: "/icons", label: "아이콘" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <SparklesIcon className="size-5" />
          <span>Starter Kit</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
