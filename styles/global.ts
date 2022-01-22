import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Inter Regular'), local('Inter-Regular'), url('/fonts/inter-v3-latin-regular.woff2') format('woff2')
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Inter Medium'), local('Inter-Medium'), url('/fonts/inter-v3-latin-500.woff2') format('woff2')
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Inter Bold'), local('Inter-Bold'), url('/fonts/inter-v3-latin-700.woff2') format('woff2')
}

@font-face {
  font-family: 'Spectral';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/spectral-v7-latin-700.woff2') format('woff2')
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  font-size: 62.5%;
}

body {
  line-height: 1;
  font-size: ${({ theme }) => theme.font.sizes.medium};
  background-color: ${({ theme }) => theme.colors.sand1};
  color: ${({ theme }) => theme.colors.sand12};
}


html,
input,
button,
select,
option {
  font-family: ${(props) => props.theme.font.family};
}

button {
  appearance: none;
  --webkit-appearance: none;
  -moz-appearance: none;
  -ms-progress-appearance: none;
  background: none;
  outline: none;
  border: 0;
  font-size: inherit;
  cursor: pointer;
}

ul {
  list-style-type: none;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyles;
