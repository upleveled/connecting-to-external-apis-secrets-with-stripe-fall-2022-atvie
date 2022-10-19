import { css } from '@emotion/react';

const mainColor = '#242424';
const secondaryColor = '#ff3393';
const fontSizes = {
  big: '40px',
  medium: '20px',
};

export const globalStyles = css`
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

  * {
    border-radius: 5px;
  }

  @font-face {
    src: url('fonts/catamaran/catamaran bold.ttf');
    font-family: 'UpLeveled heading font';
    font-style: bold;
    font-weight: 800;
  }

  @font-face {
    src: url('fonts/bitstream/VeraMono.ttf');
    font-family: 'UpLeveled body';
    font-style: normal;
  }

  @font-face {
    src: url('fonts/bitstream/VeraMono-Bold.ttf');
    font-family: 'UpLeveled span';
    font-style: bold;
  }

  body {
    font-family: 'UpLeveled body', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-size: ${fontSizes.medium};
    font-style: normal;
    color: #444;
  }

  span {
    font-family: 'UpLeveled span', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    color: #1a1a1a;
    font-style: bold;

    &.counter-span {
      margin: 0 100px;
    }
  }

  h1 {
    font-family: 'UpLeveled heading font', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-size: ${fontSizes.big};
    text-align: center;
    color: ${mainColor};
  }

  header {
    img {
      padding: 5px 10px;
      margin: 2vw 15vw;
    }
  }

  img {
    width: 15vw;
    @media (max-width: 1100px) {
      width: 40vw;
    }
  }

  button {
    background-color: ${secondaryColor};
    border-radius: 25px;
    border: none;
    color: white;
    cursor: pointer;
    font-size: ${fontSizes.medium};
    max-width: 80vw;
    padding: 0.5em;
    width: 25em;

    &:active {
      transform: scale(1.05);
    }
    &:hover {
      opacity: 0.95;
    }

    &.counter-button {
      align-self: center;
      width: 2em;
    }
  }

  section {
    align-items: center;
    background-color: #d1f8cb;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    margin: 0 auto;
    min-height: 20vw;
    width: 90vw;
  }

  .error {
    background-color: #f9caca;
    color: #da0e46;
  }

  .productContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: space-around;
    margin: 50px auto;
    width: 90vw;

    .product {
      align-items: center;
      background-color: #e2e2e2;
      display: flex;
      flex-direction: column;
      gap: 15px;
      justify-content: space-between;
      padding: 20px 40px;

      p {
        text-align: center;
      }

      h1 {
        align-self: start;
      }
    }
  }
`;
