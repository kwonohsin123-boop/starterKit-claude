export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-1 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:gap-4">
        <p>Next.js 16 · React 19 · Tailwind CSS 4 · shadcn/ui</p>
        <p>© {new Date().getFullYear()} Starter Kit</p>
      </div>
    </footer>
  )
}
