# フロントエンド

----

## 環境構築の手順

リポジトリルートにフロントエンドのプロジェクトを一から構築した時の手順です。

参考サイト

- <https://ui.shadcn.com/docs/installation/vite>

### プロジェクト作成

1. ディレクトリを作成して移動

    ```bash
    mkdir frontend && cd frontend
    ```

2. Viteプロジェクト作成

    ```bash
    $ pnpm create vite@latest
    │
    ◇  Project name:
    │  .
    │
    ◇  Select a framework:
    │  React
    │
    ◇  Select a variant:
    │  TypeScript + SWC
    │
    ◇  Scaffolding project in /home/enjn/dev/webmtg-system/frontend...
    │
    └  Done. Now run:

      pnpm install
      pnpm run dev
    ```

### Tailwind CSSの導入

1. Tailwind CSSのインストール

    ```bash
    $ pnpm add tailwindcss @tailwindcss/vite

      ╭──────────────────────────────────────────────────────────────────╮
      │                                                                  │
      │                Update available! 9.14.2 → 10.6.5.                │
      │   Changelog: https://github.com/pnpm/pnpm/releases/tag/v10.6.5   │
      │                Run "pnpm add -g pnpm" to update.                 │
      │                                                                  │
      ╰──────────────────────────────────────────────────────────────────╯

    Downloading @swc/core-linux-x64-gnu@1.11.11: 15.68 MB/15.68 MB, done
    Downloading @swc/core-linux-x64-musl@1.11.11: 19.83 MB/19.83 MB, done
    Packages: +156
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Progress: resolved 223, reused 101, downloaded 55, added 156, done
    node_modules/.pnpm/@swc+core@1.11.11/node_modules/@swc/core: Running postinstall script, done in 43ms
    node_modules/.pnpm/esbuild@0.25.1/node_modules/esbuild: Running postinstall script, done in 56ms

    dependencies:
    + @tailwindcss/vite 4.0.15
    + react 19.0.0
    + react-dom 19.0.0
    + tailwindcss 4.0.15

    devDependencies:
    + @eslint/js 9.22.0 already in devDependencies, was not moved to dependencies.
    + @types/react 19.0.12 already in devDependencies, was not moved to dependencies.
    + @types/react-dom 19.0.4 already in devDependencies, was not moved to dependencies.
    + @vitejs/plugin-react-swc 3.8.1 already in devDependencies, was not moved to dependencies.
    + eslint 9.22.0 already in devDependencies, was not moved to dependencies.
    + eslint-plugin-react-hooks 5.2.0 already in devDependencies, was not moved to dependencies.
    + eslint-plugin-react-refresh 0.4.19 already in devDependencies, was not moved to dependencies.
    + globals 15.15.0 (16.0.0 is available) already in devDependencies, was not moved to dependencies.
    + typescript 5.7.3 (5.8.2 is available) already in devDependencies, was not moved to dependencies.
    + typescript-eslint 8.27.0 already in devDependencies, was not moved to dependencies.
    + vite 6.2.2 already in devDependencies, was not moved to dependencies.

    Done in 8.9s
    ```

### スタイルの設定

1. 名称を変更

    ```bash
    mv src/index.css src/global.css
    ```

2. `src/global.css`を以下の記述だけに置き換える

    ```css
    @import "tailwindcss";
    ```

### tsconfig.jsonの修正

1. `tsconfig.json`を以下のように修正

    ```diff
    {
    "files": [],
    "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
    +  "compilerOptions": {
    +    "baseUrl": ".",
    +    "paths": {
    +      "@/*": ["./src/*"]
    +    }
    +  }
    }
    ```

2. `tsconfig.app.json`を以下のように修正

    ```diff
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,

    +    /* パスエイリアス設定 */
    +   "baseUrl": ".",
    +   "paths": {
    +     "@/*": ["./src/*"]
    +   }  
    ```

### vite.config.tsを更新

1. 以下のパッケージを追加

    ```bash
    pnpm add -D @types/node
    ```

2. `vite.config.ts`を以下の内容となるよう修正

    ```ts
    import path from "path";
    import tailwindcss from "@tailwindcss/vite";
    import react from "@vitejs/plugin-react-swc";
    import { defineConfig } from "vite";

    // https://vite.dev/config/
    export default defineConfig({
      plugins: [react(), tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    });
    ```

### CLI操作

1. shadcnのinitコマンド実行

    ```bash
    $ pnpm dlx shadcn@latest init
    Packages: +220
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Progress: resolved 220, reused 43, downloaded 177, added 220, done
    ✔ Preflight checks.
    ✔ Verifying framework. Found Vite.
    ✔ Validating Tailwind CSS config. Found v4.
    ✔ Validating import alias.
    ✔ Which color would you like to use as the base color? › Neutral
    ✔ Writing components.json.
    ✔ Checking registry.
    ✔ Updating src/global.css
    ✔ Installing dependencies.
    ✔ Created 1 file:
    - src/lib/utils.ts

    Success! Project initialization completed.
    You may now add components.
    ```

### コンポーネント追加（確認用）

1. buttonコンポーネントを追加

    ```bash
    pnpm dlx shadcn@latest add button
    ```

2. `src/App.tsx`を以下のように修正

    ```tsx
    import { Button } from "@/components/ui/button"

    function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
        </div>
    )
    }

    export default App
    ```

3. `src/main.tsx`を以下のように修正

    ```diff
    -import "./index.css";
    +import "./global.css";
    ```

## ディレクトリ構造を変更

### ディレクトリ構造の作成

```bash
# features ディレクトリ構造の作成
mkdir -p src/features/auth/{components,domain,types,api,routes}
mkdir -p src/features/user/{components,domain,types,api,routes}

# shared ディレクトリ構造の作成
mkdir -p src/shared/{components/ui,hooks,utils,types,constants}

# app/routes ディレクトリの作成
mkdir -p src/app/routes
```

### 空のディレクトリに.gitkeepを追加

```bash
find src -type d -empty -exec touch {}/.gitkeep \;
```

### ファイルの移動と整理

```bash
# グローバルスタイルの移動
mv src/global.css src/app/globals.css

# shadcn/ui コンポーネントの移動
mv src/components/ui/* src/shared/components/ui/

# ユーティリティ関数の名称変更
mv src/lib/utils.ts src/lib/cn.ts
```

```bash
rm src/assets/react.svg
rm src/App.css
mv src/App.tsx src/app.tsx
rm -fr src/assets/
rm -fr src/components/
```

### エントリーポイントの更新（main.tsx）

```diff
 import { StrictMode } from "react";
 import { createRoot } from "react-dom/client";
-import "./global.css";
+import "./app/globals.css";
-import App from "./App.tsx";
+import App from "./app.tsx";

 createRoot(document.getElementById("root")!).render(
   <StrictMode>
     <App />
   </StrictMode>
 );
```

### components.jsonの更新

```diff
 {
   "$schema": "https://ui.shadcn.com/schema.json",
   "style": "new-york",
   "rsc": false,
   "tsx": true,
   "tailwind": {
     "config": "",
-    "css": "src/global.css",
+    "css": "src/app/globals.css",
     "baseColor": "neutral",
     "cssVariables": true,
     "prefix": ""
   },
   "aliases": {
-    "components": "@/components",
+    "components": "@/shared/components",
-    "utils": "@/lib/utils",
+    "utils": "@/lib/cn",
-    "ui": "@/components/ui",
+    "ui": "@/shared/components/ui",
     "lib": "@/lib",
-    "hooks": "@/hooks"
+    "hooks": "@/shared/hooks"
   },
   "iconLibrary": "lucide"
 }
```

### app.tsxの更新

```diff
-import { Button } from "@/components/ui/button";
+import { Button } from "@/shared/components/ui/button";

 function App() {
   return (
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>
   );
 }
 
 export default App;
```

### button.tsxの更新

```diff
 /* eslint-disable react-refresh/only-export-components */
 import * as React from "react";
 import { Slot } from "@radix-ui/react-slot";
 import { cva, type VariantProps } from "class-variance-authority";

-import { cn } from "@/lib/utils";
+import { cn } from "@/lib/cn";
```
