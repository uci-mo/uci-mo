// eslint-disable-next-line @typescript-eslint/no-var-requires
const packages = require('./package.json').dependencies;

const sortedPackages = Object.keys(packages).sort();
const sortedPackagesRegex = `^(${sortedPackages.join('|')})`;

module.exports = {
  // printWidth is not a rule like ESLint’s max-len, but more like a preferance
  // https://prettier.io/docs/en/options.html#print-width
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'consistent',
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  importOrder: [
    '^(^react$|^@react|^react)',
    sortedPackagesRegex,
    '<THIRD_PARTY_MODULES>',
    '^components/(.*)$',
    '^utils/(.*)$',
    '^styles/(.*)$',
    '(\\.scss|\\.less|\\.css|\\.sass)$',
    '(\\.jpg|\\.jpeg|\\.svg|\\.png|\\.webp)$',
    '^[./]',
    '.*'
  ],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true
};
