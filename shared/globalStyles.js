import { css, Global } from '@emotion/react';

const reset = css`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol,
  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const myGlobalStyles = css`
  ${reset}

  @font-face {
    font-family: 'UpLeveled heading font';
    font-style: bold;
    font-weight: 800;
    src: url('fonts/catamaran/catamaran bold.ttf');
  }

  @font-face {
    font-family: 'UpLeveled body';
    font-style: normal;
    src: url('fonts/bitstream/VeraMono.ttf');
  }
  @font-face {
    font-family: 'UpLeveled span';
    font-style: bold;
    src: url('fonts/bitstream/VeraMono-Bold.ttf');
  }

  h1 {
    font-family: 'UpLeveled heading font', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;

    font-size: 60px;
    color: #1a1a1a;
  }

  body {
    font-family: 'UpLeveled body', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    font-style: normal;
    color: #444;
  }

  span {
    font-family: 'UpLeveled span', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    color: #1a1a1a;
    font-style: bold;
  }
`;

export const globalStyles = <Global styles={myGlobalStyles} />;
