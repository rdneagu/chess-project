import react from './airbnb/react.js';
import reactA11y from './airbnb/react-a11y.js';
import reactHooks from './airbnb/react-hooks.js';
import airbnbBestPractices from './airbnb-base/best-practices.js';
import airbnbErrors from './airbnb-base/errors.js';
import airbnbES6 from './airbnb-base/es6.js';
import airbnbImports from './airbnb-base/imports.js';
import airbnbNode from './airbnb-base/node.js';
import airbnbStrict from './airbnb-base/strict.js';
import airbnbStyle from './airbnb-base/style.js';
import airbnbTypescript from './airbnb-typescript/airbnb-typescript.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  airbnbBestPractices,
  airbnbErrors,
  airbnbES6,
  airbnbImports,
  airbnbNode,
  airbnbStrict,
  airbnbStyle,
  react,
  reactA11y,
  reactHooks,
  ...airbnbTypescript,
);
