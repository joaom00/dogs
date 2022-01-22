type DefaultBreakpoints = typeof defaultBreakpoints;

const defaultBreakpoints = {
  small: '640px',
  medium: '768px',
  large: '1024px',
  xlarge: '1280px',
  huge: '1536px',
};

const theme = {
  grid: {
    container: '97.5rem',
  },
  radii: {
    base: '0.4rem',
  },
  space: {
    xs: '0.8rem',
    sm: '1.6rem',
    md: '2.4rem',
    lg: '3.2rem',
    xl: '4rem',
    '2xl': '4.8rem',
    '3xl': '5.6rem',
    '4xl': '6.4rem',
  },
  font: {
    family:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    heading: 'Spectral, serif',
    normal: 400,
    medium: 500,
    bold: 700,
    sizes: {
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '2.4rem',
      xlarge: '3.6rem',
      xxlarge: '5.4rem',
    },
  },
  colors: {
    yellow1: 'hsl(60 54.0% 98.5%)',
    yellow2: 'hsl(52 100% 95.5%)',
    yellow3: 'hsl(55 100% 90.9%)',
    yellow4: 'hsl(54 100% 86.6%)',
    yellow5: 'hsl(52 97.9% 82.0%)',
    yellow6: 'hsl(50 89.4% 76.1%)',
    yellow7: 'hsl(47 80.4% 68.0%)',
    yellow8: 'hsl(48 100% 46.1%)',
    yellow9: 'hsl(53 92.0% 50.0%)',
    yellow10: 'hsl(50 100% 48.5%)',
    yellow11: 'hsl(42 100% 29.0%)',
    yellow12: 'hsl(40 55.0% 13.5%)',

    sand1: 'hsl(50 20.0% 99.0%)',
    sand2: 'hsl(60 7.7% 97.5%)',
    sand3: 'hsl(59 6.5% 95.1%)',
    sand4: 'hsl(58 6.1% 92.9%)',
    sand5: 'hsl(57 6.0% 90.7%)',
    sand6: 'hsl(56 5.9% 88.4%)',
    sand7: 'hsl(55 5.9% 85.2%)',
    sand8: 'hsl(51 6.0% 77.1%)',
    sand9: 'hsl(50 2.0% 55.7%)',
    sand10: 'hsl(55 1.7% 51.9%)',
    sand11: 'hsl(50 2.0% 43.1%)',
    sand12: 'hsl(50 6.0% 10.0%)',
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50,
  },
  media: {
    lessThan(breakpoint: keyof DefaultBreakpoints) {
      return `(max-width: ${defaultBreakpoints[breakpoint]})`;
    },
    greaterThan(breakpoint: keyof DefaultBreakpoints) {
      return `(min-width: ${defaultBreakpoints[breakpoint]})`;
    },
    between(firstBreakpoint: keyof DefaultBreakpoints, secondBreakpoint: keyof DefaultBreakpoints) {
      return `(min-width: ${defaultBreakpoints[firstBreakpoint]}) and (max-width: ${defaultBreakpoints[secondBreakpoint]})`;
    },
  },
} as const;

export default theme;
