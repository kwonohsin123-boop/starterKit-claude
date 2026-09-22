# Next.js Starter Kit

Next.js App Router · TypeScript · Tailwind CSS v4 · shadcn/ui · lucide-react

각 기술 스택을 **공식 설치 가이드의 현재 최신 버전 그대로** 조합하고, 준수 여부를 단계별로 검증한 스타터 킷입니다. 검증 결과는 아래 [2. 공식 문서 준수 검증](#2-공식-문서-준수-검증)에 있습니다.

---

## 1. 기술 스택 버전

검증 시점: **2026-09-22** / 환경: Windows 11 · Node v24.21.0 · npm 11.19.0

| 패키지 | 설치된 버전 | 비고 |
|---|---|---|
| `next` | **16.3.5** | npm dist-tag `latest`. Turbopack 기본 번들러 |
| `react` / `react-dom` | 19.2.8 | create-next-app이 핀한 버전 |
| `typescript` | ^5 | strict 모드 |
| `tailwindcss` | ^4 (4.3.3) | **설정 파일 없음** |
| `@tailwindcss/postcss` | ^4 (4.3.3) | PostCSS 플러그인 |
| `shadcn` | ^4.21.0 | `base` 프리미티브 · `nova` 프리셋 |
| `@base-ui/react` | ^1.8.0 | shadcn CLI 4.13+ 의 **기본** 프리미티브 |
| `cn` | ^0.3.2 | `clsx` + `tailwind-merge` 대체 (shadcn 신규 패키지) |
| `class-variance-authority` | ^0.7.1 | 컴포넌트 variant |
| `lucide-react` | ^1.47.0 | 아이콘 |
| `next-themes` | ^0.4.6 | 다크 모드 |
| `sonner` | ^2.0.8 | 토스트 |
| `tw-animate-css` | ^1.4.0 | `tailwindcss-animate` 대체 |
| `eslint` / `eslint-config-next` | ^9 / 16.3.5 | flat config |

---

## 2. 공식 문서 준수 검증

세 개 공식 가이드 각각에 대해 *가이드가 명시하는 것 → 실제 생성 결과 → 판정* 순으로 확인했습니다.
실제 명령 출력과 파일 내용으로 확인한 것만 ✅ 로 표기했습니다.

### 2.1 Next.js — https://nextjs.org/docs/app/getting-started/installation

문서 버전 **16.3.5** (`lastUpdated: 2026-07-21`) 기준.

| # | 공식 문서가 명시하는 것 | 실제 생성 결과 | 근거 | 판정 |
|---|---|---|---|---|
| N-1 | Node.js 최소 20.9 | v24.21.0 | `node -v` | ✅ |
| N-2 | 기본값으로 TypeScript, ESLint, Tailwind, App Router, Turbopack, alias `@/*` | 전부 활성 | `package.json`, `tsconfig.json` | ✅ |
| N-3 | **Turbopack이 기본 번들러** (`--turbopack` 불필요) | `"dev": "next dev"` / 빌드 로그 `▲ Next.js 16.3.5 (Turbopack)` | `package.json`, 빌드 출력 | ✅ |
| N-4 | **`next lint` 제거됨** → `"lint": "eslint"`, `"lint:fix": "eslint --fix"` | 동일하게 설정 | `package.json` | ✅ |
| N-5 | `next build`가 린터를 실행하지 않음 | 빌드 로그에 lint 단계 없음 | `npm run build` 출력 | ✅ |
| N-6 | ESLint는 `eslint.config.mjs` (flat config) 권장 | 존재 | `eslint.config.mjs` | ✅ |
| N-7 | 루트 레이아웃 필수, `<html>`/`<body>` 포함 | 포함 | `src/app/layout.tsx` | ✅ |
| N-8 | `src/` 디렉터리 옵션 지원 | 사용 | `src/app`, `src/components`, `src/lib` | ✅ |
| N-9 | `AGENTS.md` + 이를 참조하는 `CLAUDE.md` 생성 | 생성됨 | 루트 파일 | ✅ |
| N-10 | `paths`로 절대 경로 임포트 | `"@/*": ["./src/*"]` | `tsconfig.json` | ✅ |

실행한 명령:

```
npx --yes create-next-app@latest temp --ts --tailwind --eslint --app --src-dir
  --import-alias "@/*" --use-npm --turbopack --no-react-compiler --agents-md --disable-git
```

> `--turbopack`은 16에서 이미 기본값이라 중복이지만 의도를 명시하기 위해 전달했습니다.
> `--disable-git`은 초기 커밋을 직접 구성하기 위한 것입니다.

### 2.2 Tailwind CSS — https://tailwindcss.com/docs/installation/framework-guides/nextjs

문서 버전 **v4.3** 기준. create-next-app의 `--tailwind`가 이미 v4 구성을 생성하므로, 별도 설치 대신 **가이드가 요구하는 최종 상태와 일치하는지 대조**했습니다.

| # | 공식 문서가 명시하는 것 | 실제 생성 결과 | 근거 | 판정 |
|---|---|---|---|---|
| T-1 | `tailwindcss`, `@tailwindcss/postcss` 설치 | 둘 다 `^4` | `package.json` devDependencies | ✅ |
| T-2 | `postcss.config.mjs` 가 `{ plugins: { "@tailwindcss/postcss": {} } }` | **문자 단위 일치** | `postcss.config.mjs` | ✅ |
| T-3 | CSS에 `@import "tailwindcss";` | 1행에 존재 | `src/app/globals.css` | ✅ |
| T-4 | **`tailwind.config.*` 파일이 생성되지 않음** | 존재하지 않음 | `ls tailwind.config.*` → No such file | ✅ |
| T-5 | CSS 파일을 레이아웃에서 임포트 | `import "./globals.css"` | `src/app/layout.tsx` | ✅ |

> `postcss` 패키지는 공식 가이드의 `npm install` 목록에 포함되지만, create-next-app 경로에서는 `@tailwindcss/postcss`의 의존성으로 들어오며 직접 의존성으로 선언되지 않습니다. 빌드가 정상 동작하므로 그대로 두었습니다.

### 2.3 shadcn/ui — https://ui.shadcn.com/docs/installation/next

| # | 공식 문서가 명시하는 것 | 실제 생성 결과 | 근거 | 판정 |
|---|---|---|---|---|
| S-1 | `npx shadcn@latest init` | 성공 (`Verifying framework. Found Next.js.`, `Validating Tailwind CSS. Found v4.`) | init 출력 | ✅ |
| S-2 | `tsconfig.json`의 `paths`에 `@/*` 필요 (src 사용 시 `./src/*`) | `"@/*": ["./src/*"]` | `tsconfig.json` | ✅ |
| S-3 | `components.json` 생성 | 생성됨 | `components.json` | ✅ |
| S-4 | Tailwind v4에서는 `tailwind.config`를 **빈 문자열**로 | `"config": ""` | `components.json` | ✅ |
| S-5 | Tailwind v4 모드: `@theme inline` 토큰 매핑 | 존재 (색상·radius 전체) | `src/app/globals.css` | ✅ |
| S-6 | `tailwindcss-animate` 폐기 → `tw-animate-css` | `tw-animate-css ^1.4.0` + `@import "tw-animate-css"` | `package.json`, `globals.css` | ✅ |
| S-7 | 모든 프리미티브에 `data-slot` 속성 | 존재 (`data-slot="button"` 등) | `src/components/ui/button.tsx` | ✅ |
| S-8 | `npx shadcn@latest add <name>` 로 컴포넌트 추가 | 13개 생성 | `src/components/ui/` | ✅ |
| S-9 | `iconLibrary` 가 lucide | `"iconLibrary": "lucide"` | `components.json` | ✅ |
| S-10 | 다크 모드: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange` | 전부 적용 | `src/app/layout.tsx` | ✅ |
| S-11 | 다크 모드: `<html>`에 `suppressHydrationWarning` | 적용 | `src/app/layout.tsx` | ✅ |
| S-12 | `@custom-variant dark (&:is(.dark *));` | 존재 + **컴파일 확인** (빌드 CSS에 `:is(.dark *)` 34건) | `globals.css`, 빌드 CSS | ✅ |

실행한 명령:

```
npx --yes shadcn@latest init -b base -p nova --yes --no-monorepo --css-variables
npx --yes shadcn@latest add button card input label badge separator skeleton
  avatar dialog dropdown-menu tabs tooltip sonner --yes
```

### 2.4 편차 요약

검증 과정에서 **원 요청 또는 일반적 통념과 달랐던 4건**입니다. 모두 의도적으로 선택했고 근거를 남깁니다.

| # | 항목 | 통념 / 원 요청 | 실제 공식 최신 | 이 프로젝트의 선택 |
|---|---|---|---|---|
| D-1 | **Next.js 메이저** | 요청은 v15 | 공식 설치 가이드가 **16.3.5** 기준 | **16.3.5 채택.** "공식 문서 최신 버전 준수" 지시를 우선. v15 전환법은 §7.1 |
| D-2 | **shadcn 프리미티브** | Radix UI | CLI 4.13+ 부터 **Base UI가 기본** (`-d` 옵션이 `--preset=base-nova`) | **Base UI 채택** (공식 기본값). Radix 전환법은 §7.2 |
| D-3 | **`cn` 유틸리티** | `clsx` + `tailwind-merge` 를 `@/lib/utils`에 직접 구현 | **`cn` 단일 패키지**로 분리 (2026-09-21 배포) | `src/lib/utils.ts`는 `export { cn } from "cn"` 한 줄. `clsx`/`tailwind-merge` **미설치** |
| D-4 | **폰트 변수 불일치** | — | shadcn이 생성한 `@theme inline`은 `--font-sans`를 참조하는데 create-next-app은 `--font-geist-sans`를 설정 | `layout.tsx`에서 Geist의 `variable`을 `--font-sans`로 변경해 연결. 빌드 CSS에서 `--font-sans: "Geist", "Geist Fallback"` 확인 |

> D-4는 두 공식 가이드를 조합할 때 생기는 실제 틈입니다. 고치지 않으면 `html { @apply font-sans }`가 정의되지 않은 변수를 참조해 Geist 폰트가 적용되지 않습니다.

### 2.5 실행 검증 결과

| 검증 | 명령 | 결과 |
|---|---|---|
| 타입 체크 | `npx tsc --noEmit` | exit 0, 오류 없음 |
| 린트 | `npm run lint` | exit 0, 오류 없음 |
| 프로덕션 빌드 | `npm run build` | exit 0. `▲ Next.js 16.3.5 (Turbopack)`, `/`·`/icons` 모두 `○ (Static)` |
| dev 서버 | `npm run dev -- --port 3100` | `✓ Ready in 1077ms` |
| HTTP 응답 | `curl /`, `curl /icons` | 둘 다 **200** |
| 렌더링 내용 | 홈 HTML | `lang="ko"`, next-themes 프리페인트 스크립트(`localStorage`/`classList`) 포함 확인 |
| 다크 모드 컴파일 | 빌드 CSS | `:is(.dark *)` 34건, `.dark { --background: #0a0a0a; … }` 토큰 블록 존재 |
| Tailwind config 부재 | `ls tailwind.config.*` | 파일 없음 |

> **수동 확인 필요**: 테마 토글 클릭 시 `<html>`에 `.dark`가 실제로 토글되는지, 다이얼로그/토스트가 열리는지는 브라우저 상호작용이라 자동 검증하지 않았습니다. `npm run dev` 후 직접 확인해 주세요. 위 표는 서버 렌더링 결과와 컴파일된 CSS까지만 근거로 삼았습니다.

---

## 3. 시작하기

```bash
npm install     # 이미 설치되어 있다면 생략
npm run dev     # http://localhost:3000
```

| 스크립트 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint 자동 수정 |

---

## 4. 컴포넌트 추가

```bash
npx shadcn@latest add <컴포넌트명>
npx shadcn@latest add select --dry-run   # 변경 사항 미리보기
```

이미 포함된 13개: `avatar` `badge` `button` `card` `dialog` `dropdown-menu` `input` `label` `separator` `skeleton` `sonner` `tabs` `tooltip`

컴포넌트는 `src/components/ui/`에 **소스 코드로** 복사되므로 자유롭게 수정할 수 있습니다.

### Base UI 합성 API 주의

이 프로젝트는 Base UI 기반이라, 트리거를 다른 컴포넌트로 바꿀 때 Radix의 `asChild`가 아니라 **`render` prop**을 씁니다.

```tsx
// Base UI (이 프로젝트)
<DialogTrigger render={<Button variant="outline" />}>열기</DialogTrigger>

// Radix (대부분의 블로그·예제)
<DialogTrigger asChild><Button variant="outline">열기</Button></DialogTrigger>
```

---

## 5. 프로젝트 구조

```
.
├─ components.json              shadcn 설정 (tailwind.config: "")
├─ eslint.config.mjs            ESLint flat config
├─ next.config.ts
├─ postcss.config.mjs           @tailwindcss/postcss
├─ tsconfig.json                paths: { "@/*": ["./src/*"] }
├─ AGENTS.md / CLAUDE.md        코딩 에이전트 가이드 (create-next-app 생성)
└─ src/
   ├─ app/
   │  ├─ globals.css            Tailwind v4 + shadcn 토큰 (설정 파일 없음)
   │  ├─ layout.tsx             ThemeProvider · TooltipProvider · 헤더/푸터 셸
   │  ├─ page.tsx               랜딩 + 컴포넌트 데모
   │  └─ icons/page.tsx         lucide-react 아이콘 데모
   ├─ components/
   │  ├─ ui/                    shadcn 컴포넌트 13개
   │  ├─ layout/                site-header · site-footer
   │  ├─ demo/                  component-showcase
   │  ├─ theme-provider.tsx
   │  └─ mode-toggle.tsx
   └─ lib/utils.ts              export { cn } from "cn"
```

---

## 6. 다크 모드 동작 방식

다섯 조각이 모두 맞아야 동작합니다. 하나라도 어긋나면 **조용히 실패**합니다.

| 조각 | 위치 | 값 | 어긋나면 |
|---|---|---|---|
| 변형 정의 | `globals.css` | `@custom-variant dark (&:is(.dark *));` | 모든 `dark:` 유틸리티가 아무것도 생성하지 않음 |
| 토큰 세트 | `globals.css` | `:root { … }` + `.dark { … }` | 클래스가 바뀌어도 색이 안 변함 |
| 토큰↔유틸리티 연결 | `globals.css` | `@theme inline { --color-background: var(--background); }` | `bg-background` 클래스 자체가 없음 |
| 클래스 주입 | `layout.tsx` | `<ThemeProvider attribute="class">` | `<html>`에 `.dark`가 붙지 않음 |
| 하이드레이션 | `layout.tsx` | `<html suppressHydrationWarning>` | 매 로드마다 하이드레이션 불일치 경고 |

Tailwind v4에는 `darkMode: "class"` 설정 키가 **없습니다**. `@custom-variant` 한 줄이 그 역할을 전부 대신합니다.

`next-themes`는 `<head>`에 차단형 인라인 스크립트를 넣어 첫 페인트 **전에** `localStorage` 또는 `prefers-color-scheme`을 읽고 `<html>`의 클래스를 정하므로 FOUC가 없습니다. `@theme inline`의 `inline` 키워드가 핵심인데, 값을 리터럴로 굽지 않고 `var(--background)` **참조**로 내보내기 때문에 `.dark`의 덮어쓰기가 런타임에 전파됩니다.

---

## 7. 버전 전환 가이드

### 7.1 Next.js 16 → 15 다운그레이드

아래는 함께 바뀌어야 하며, 일부만 적용하면 빌드되지 않습니다.

```bash
npm install next@15.5.25 eslint-config-next@15.5.25
```

| 항목 | 16.3.5 (현재) | 15.5.25 |
|---|---|---|
| 번들러 | Turbopack 기본 | Webpack 기본 → `"dev": "next dev --turbopack"`, `"build": "next build --turbopack"` 필요 |
| 린트 | `next lint` 제거 | `next lint` 존재 → `"lint": "next lint"` |
| build + lint | 빌드가 린트를 실행하지 않음 | `next build`가 린터를 실행하며, 린트 오류가 빌드를 실패시킴 |
| Node | >= 20.9 | >= 18.18 |
| `AGENTS.md` | 생성됨 | create-next-app@15에 해당 옵션 없음 |

> 15.5.25는 npm dist-tag `latest`가 아니라 **`backport`** 에 있습니다. `next@15`로 설치하면 다른 버전이 잡힐 수 있으니 정확한 버전 문자열로 핀하세요.
>
> 다운그레이드 시 위 §2.1 검증표는 **v15 문서 기준으로 다시 작성해야 합니다.** v16 문서 URL은 v15 프로젝트의 근거가 될 수 없습니다.

### 7.2 Base UI → Radix 전환

`base`는 `components.json`에 기록되고 이미 생성된 컴포넌트에 반영되어 있으므로, `src/components/ui/`를 지우고 재생성해야 합니다.

```bash
rm -rf src/components/ui
npx shadcn@latest init -b radix -p nova --yes --force
npx shadcn@latest add button card input label badge separator skeleton \
  avatar dialog dropdown-menu tabs tooltip sonner --yes
```

이후 코드에서 `render={<X />}` 를 `asChild` + 자식 엘리먼트 형태로 바꿔야 합니다.

---

## 8. 참고 링크

- [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation)
- [create-next-app CLI](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- [Tailwind CSS — Next.js 설치](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [shadcn/ui — Next.js 설치](https://ui.shadcn.com/docs/installation/next)
- [shadcn/ui — components.json](https://ui.shadcn.com/docs/components-json)
- [shadcn/ui — Dark Mode (Next.js)](https://ui.shadcn.com/docs/dark-mode/next)
- [Base UI](https://base-ui.com)
- [Lucide Icons](https://lucide.dev/icons/)
