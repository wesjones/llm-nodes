# Workflow UI

**[Live Demo](https://llm-nodes-1--wesjones.replit.app)**

A React/TypeScript application built with Vite, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — utility-first CSS
- **shadcn/ui** — component library
- **lucide-react** — icon library
- **Vitest** + **React Testing Library** — unit testing
- **Husky** — Git hooks (pre-commit runs tests)
- **pnpm** — package manager

## Setup from Scratch

```bash
# 1. Scaffold Vite project
pnpm create vite@latest llm-nodes --template react-ts
cd llm-nodes
pnpm install

# 2. Install Tailwind CSS v4
pnpm add tailwindcss @tailwindcss/vite

# 3. Add @import "tailwindcss" to src/index.css

# 4. Configure path aliases:
#    - Add baseUrl + paths to tsconfig.json and tsconfig.app.json
#    - Add @tailwindcss/vite plugin + @ resolve alias to vite.config.ts

# 5. Initialize shadcn/ui (auto-detects Vite + Tailwind v4)
pnpm dlx shadcn@latest init -d

# 6. Install lucide-react
pnpm add lucide-react
```

## Development

```bash
pnpm dev
```

## Testing

```bash
pnpm test          # single run
pnpm test:watch    # watch mode
```

Tests use Vitest with jsdom and React Testing Library. A Husky pre-commit hook runs `pnpm test` automatically before each commit.

## Build

```bash
pnpm build
```
