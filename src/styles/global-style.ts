import { createGlobalStyle } from "styled-components";
import Theme from "./theme";
import styledNormalize from "styled-normalize";
import * as prismStyle from "prismjs/themes/prism-okaidia.css";

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${prismStyle}

  html {
    box-sizing: border-box;
    background-color: ${Theme.layout.backgroundColor};
  }

  body {
    font-family: ${Theme.fonts.base};
    line-height: 1.9em;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    outline: none;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  .gatsby-highlight {
    // max-width: 100% !important;
    font-size: 0.85em;
    // font-weight: 500;
    background-color: #282a36;

    border-radius: 0.2em;
    padding: 1em 1.4em;
    overflow: auto;

    // width: 100%;
    // border-left: 0.4em solid #000000;

    margin-left: -1.4em;
    width: calc(100% + 1.4em + 1.4em);
    border: 0.1em solid #c6c6c8;
    //box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 6px;
  }

  div[data-language='text'].gatsby-highlight {
    background-color: #f0f0f0;
    // border-bottom: 0.1em dashed #c6c6c8;
    // border-top: 0.1em dashed #c6c6c8;
    border: 0.03em solid #c6c6c8;
    //box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    //margin-top: 6px;
    
  }

  .gatsby-highlight pre.language-text code.language-text {
    color: #000;
    text-shadow: none;
  }
  
  .gatsby-highlight pre[class*='language-'] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }
  
  .gatsby-highlight-code-line {
    background-color: #353631;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
  }
`;

export default GlobalStyle;
