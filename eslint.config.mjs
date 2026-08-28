import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...tseslint.configs.recommended,
  globalIgnores(["dist/**", "pages-dist/**", ".next/**", ".vinext/**", ".wrangler/**", "out/**", "build/**", "next-env.d.ts"]),
]);
