import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
];

export default eslintConfig;
