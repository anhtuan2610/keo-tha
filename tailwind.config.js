import { theme, plugins } from '@janbox/ds';
import withMT from '@material-tailwind/react/utils/withMT';

// TODO: Get colors and boxShadows from @ichiba/ichiba-core-ui
module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@janbox/ds/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme,
  plugins,
});
