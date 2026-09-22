import Link from "next/link"
import { cn } from "cn"
import {
  ComponentIcon,
  MoonStarIcon,
  PaletteIcon,
  ZapIcon,
} from "lucide-react"

import { ComponentShowcase } from "@/components/demo/component-showcase"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const stack = [
  { name: "Next.js", version: "16.3.5", note: "App Router · Turbopack 기본 번들러" },
  { name: "React", version: "19.2.8", note: "React Server Components" },
  { name: "Tailwind CSS", version: "4.3.3", note: "설정 파일 없는 CSS-first 구성" },
  { name: "shadcn/ui", version: "CLI 4.21.0", note: "Base UI · nova 프리셋" },
  { name: "lucide-react", version: "1.47.0", note: "트리 셰이킹되는 아이콘" },
  { name: "TypeScript", version: "5.x", note: "strict 모드" },
]

const features = [
  {
    icon: ZapIcon,
    title: "Turbopack 기본",
    description: "Next.js 16부터 dev/build 모두 Turbopack이 기본 번들러입니다.",
  },
  {
    icon: PaletteIcon,
    title: "설정 파일 없는 Tailwind",
    description: "tailwind.config 없이 globals.css의 @theme 블록만으로 테마를 정의합니다.",
  },
  {
    icon: MoonStarIcon,
    title: "다크 모드",
    description: "next-themes와 @custom-variant dark 조합. FOUC 없이 시스템 설정을 따릅니다.",
  },
  {
    icon: ComponentIcon,
    title: "13개 UI 컴포넌트",
    description: "shadcn/ui CLI로 추가된 컴포넌트가 src/components/ui에 소스로 존재합니다.",
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-14">
      <section className="space-y-5">
        <Badge variant="secondary">공식 설치 가이드 최신 버전 기준</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Next.js Starter Kit
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Next.js 16 App Router, TypeScript, Tailwind CSS 4, shadcn/ui, lucide-react를
          각 공식 문서의 설치 절차 그대로 조합한 스타터 킷입니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/icons" className={cn(buttonVariants({ size: "lg" }))}>
            아이콘 데모 보기
          </Link>
          <a
            href="https://ui.shadcn.com/docs/components"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            shadcn/ui 문서
          </a>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">기술 스택</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <Card key={item.name}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span>{item.name}</span>
                  <Badge variant="outline">{item.version}</Badge>
                </CardTitle>
                <CardDescription>{item.note}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">특징</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="size-5 text-muted-foreground" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">컴포넌트 데모</h2>
        <ComponentShowcase />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">로딩 상태</h2>
        <Card>
          <CardContent className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="grid gap-2">
              <Skeleton className="h-4 w-[220px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
