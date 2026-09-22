# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## 명령어

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (Turbopack, 기본 3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint (flat config) |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npx tsc --noEmit` | 타입 체크 — **전용 스크립트가 없으므로 직접 실행** |
| `npx shadcn@latest add <name>` | UI 컴포넌트 추가 (`--dry-run`으로 미리보기) |

- **테스트 프레임워크가 설치되어 있지 않습니다.** 테스트 러너·설정·테스트 파일 모두 없으므로, 없는 테스트 명령을 지어내지 말고 변경 검증은 `lint` + `tsc --noEmit` + `build`로 하세요.
- **`next build`는 린트를 실행하지 않습니다** (Next 16 변경). 린트는 반드시 따로 돌려야 합니다.
- 갓 클론한 트리에는 `.next/types`가 없어 `tsc --noEmit`이 `LayoutProps` 같은 전역 타입을 찾지 못합니다. `npm run dev` 또는 `npm run build`를 **한 번 돌린 뒤** 타입 체크하세요.

---

## 아키텍처

### shadcn 프리미티브가 Base UI입니다 (Radix 아님)

`components.json`의 `"style": "base-nova"`, 의존성은 `@base-ui/react`. 웹의 shadcn 예제 대부분은 Radix 기준이라 **그대로 쓰면 동작하지 않습니다.**

| | 이 프로젝트 (Base UI) | 흔한 예제 (Radix) |
|---|---|---|
| 트리거 합성 | `render={<Button variant="outline" />}` | `asChild` + 자식 엘리먼트 |
| Props 타입 | `DialogPrimitive.Popup.Props` | `React.ComponentProps<typeof X>` |
| 열림 상태 | `data-open` / `data-closed` | `data-state="open"` |

근거: `src/components/mode-toggle.tsx:19`, `src/components/ui/dialog.tsx:47,63`. 모든 프리미티브는 `data-slot` 속성을 갖습니다.

### `cn`은 `cn` 패키지에서 옵니다

`src/` 전체가 `import { cn } from "cn"` 입니다. `clsx`·`tailwind-merge`는 **설치되어 있지 않습니다**.

`src/lib/utils.ts`는 `export { cn } from "cn"` 한 줄짜리 재수출로, shadcn CLI의 alias 타깃으로만 존재하며 **실제로 어떤 파일도 여기서 import하지 않습니다**. 기존 코드를 따라 `from "cn"`으로 쓰세요.

### Tailwind v4 — 설정 파일이 없고, 테마는 `src/app/globals.css` 한 곳에 있습니다

`tailwind.config.*`를 새로 만들지 마세요. 색 토큰 하나를 추가하려면 **세 군데를 함께** 고쳐야 합니다.

1. `:root { --my-color: … }` — 라이트 값
2. `.dark { --my-color: … }` — 다크 값
3. `@theme inline { --color-my-color: var(--my-color); }` — 유틸리티 클래스 생성

3번이 빠지면 `bg-my-color` 클래스 자체가 만들어지지 않고, 2번이 빠지면 다크에서 색이 바뀌지 않습니다. 둘 다 빌드 에러 없이 **조용히 실패**합니다.

### 다크 모드는 다섯 조각이 모두 맞아야 동작합니다

| 조각 | 위치 |
|---|---|
| `@custom-variant dark (&:is(.dark *));` | `globals.css` — v4에는 `darkMode: "class"` 설정 키가 없고 이 한 줄이 그 역할을 전부 합니다 |
| `:root` + `.dark` 토큰 세트 | `globals.css` |
| `@theme inline` 연결 | `globals.css` — `inline`이라 `var()` 참조로 내보내져 런타임 덮어쓰기가 전파됩니다 |
| `<ThemeProvider attribute="class">` | `layout.tsx` |
| `<html suppressHydrationWarning>` | `layout.tsx` |

자세한 실패 양상은 `README.md` §6.

### 폰트 변수의 비표준 배선은 의도된 것입니다

`src/app/layout.tsx:12`의 `Geist({ variable: "--font-sans" })`는 create-next-app 기본값(`--font-geist-sans`)과 다릅니다. shadcn이 생성한 `@theme inline`이 `--font-sans`를 참조하기 때문에 일부러 맞춘 것으로, 되돌리면 `html { @apply font-sans }`가 정의되지 않은 변수를 가리켜 Geist가 적용되지 않습니다.

### Next.js 16 관련

- Turbopack이 기본 번들러 → `--turbopack` 플래그 불필요
- `next lint` 제거됨 → `"lint": "eslint"`, 설정은 `eslint.config.mjs` (flat config)
- `LayoutProps<"/">` / `PageProps<"/path">`는 **import 없이 쓰는 전역 타입**입니다 (`src/app/layout.tsx:30`). 라우트 문자열로 타입이 생성되므로 새 라우트를 추가한 뒤에는 dev/build를 한 번 돌려야 타입이 갱신됩니다.
- API가 조금이라도 의심스러우면 추측하지 말고 `node_modules/next/dist/docs/01-app/` 의 해당 가이드를 먼저 읽으세요 (`AGENTS.md` 지시).

### Server / Client 경계

`src/app/**`는 기본이 Server Component입니다. `"use client"`는 11개 파일에만 있습니다 — 인터랙티브 shadcn 프리미티브(`avatar` `dialog` `dropdown-menu` `label` `separator` `sonner` `tabs` `tooltip`)와 `theme-provider` · `mode-toggle` · `demo/component-showcase`.

프로바이더 중첩은 `src/app/layout.tsx`: `ThemeProvider` → `TooltipProvider` → `SiteHeader`/`main`/`SiteFooter`, `Toaster`는 `TooltipProvider`의 형제.

---

## 컴포넌트 추가

`src/components/ui/`는 CLI 생성물입니다. 손으로 새 파일을 쓰지 말고 `npx shadcn@latest add <name>`으로 생성한 뒤 수정하세요. 생성 프리셋은 `-b base -p nova`이며 `components.json`에 기록되어 있습니다.

프리미티브를 Radix로 바꾸려면 `src/components/ui/` 전체를 재생성해야 합니다 (`README.md` §7.2).

---

## 참고

- `README.md` — §2 공식 문서 준수 검증표 · §6 다크 모드 동작 원리 · §7 Next 15 다운그레이드 / Radix 전환
- `node_modules/next/dist/docs/01-app/` — 이 버전의 Next.js 공식 문서
