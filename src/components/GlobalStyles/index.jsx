import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Noto Sans KR', sans-serif;
    background: ${props => props.theme.colors.bodyBackground};
  }

  table.dataframe {
    border-collapse: collapse;
    font-size: 0.75em;
    line-height: 1.4em;

    display: block;
    overflow-x: auto;
    white-space: nowrap;
    background-color: ${props => props.theme.colors.bodyBackground};
    
    // > thead {
    //   // background-color: #f0f0f0;
    // }

    > tbody {
      border-bottom: 0.5px solid ${props => props.theme.colors.border};

      > tr > th {
        text-align: right;
        border-bottom: 0.5px solid ${props => props.theme.colors.border};
  
      }
    }
    
  }

  .dataframe td, .dataframe th {
    border-bottom: 0.5px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.blockQuoteBackground};
  }
`

export default GlobalStyles
