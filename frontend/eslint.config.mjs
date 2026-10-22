import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  // Déjà ignorés par le preset, mais repris ici pour ne pas linter le build si ses défauts changent.
  // node_modules/ est ignoré par ESLint lui-même.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
