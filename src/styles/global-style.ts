import { createGlobalStyle } from "styled-components";
import Theme from "./theme";
import styledNormalize from "styled-normalize";
// import * as prismStyle from "prismjs/themes/prism-okaidia.css";
const prismStyle = require('prismjs/themes/prism-okaidia.css');

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

    // margin-left: -1.4em;
    // width: calc(100% + 1.4em + 1.4em);
    width: 100%;
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
    margin-left: 2px;
    width: calc(100% - 2px);
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

  .remark-sticky-table {
    border-radius: 2px;
    // box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    margin: 32px 0px;
  }
  
  .remark-sticky-table-table {
    border-collapse: collapse;
    box-sizing: border-box;
    border: 1px solid #bcbcbc; 
    // width: 100%;
    width: auto;
  }
  
  .remark-sticky-table-th {
    background-color: #f7f7f7;
    font-weight: 600;
    text-align: left;
    // border: 1px solid #bcbcbc; 
    border-bottom: 1px solid #b8bcc9; 
  }
  
  .remark-sticky-table-tbody:nth-child(odd) {
    background-color: #fafafa;
  }
  
  .remark-sticky-table-th,
  .remark-sticky-table-td {
    padding: 4px 12px;
  }


  table.dataframe  {
    border-collapse: collapse;
    font-size: 0.75em;
    margin-bottom: 8px;
    margin-left: 2px;
    // width: calc(100% - 2px);

    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .dataframe td, .dataframe th {
    border: 1px solid #bcbcbc;
    padding: 0px 12px;
  }

  .dataframe tr:nth-child(even){
    background-color: #f2f2f2;
  }
  
  .dataframe tr:hover {
    background-color: #d6d9e0;
  }

  .dataframe th {
    background-color: #f7f7f7;
    // color: white;
    padding 0px 12px;
  }
`;

export default GlobalStyle;
