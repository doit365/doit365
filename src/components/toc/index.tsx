import React, {FunctionComponent, useEffect} from "react";
import tocbot from 'tocbot';
import styled from "styled-components";

interface TocProps {
  /**
   * Callback triggered whenever the TOC is clicked. Used for
   * hiding the mobile toc overlay when clicking on a link.
   */
  onClick: () => void;
}

const StyledNav = styled.nav`
  .toc-list {
    list-style-type: none;
    margin: 0;
    // padding: 0 0 0 10px;
    padding: 0 0 0 0;
    // border-left: 2px solid #848da2;

    .toc-list {
      padding-top: 10px;
    }
  }

  .toc-list-item {
    line-height: 1.2em;
    padding-bottom: 10px;

    &:last-child {
      padding-bottom: 0;
    }
  }

  .toc-link {
    color: #808080;
    text-decoration: none;
    font-size: 0.9em;
    font-weight: 550; 
    padding-left: 10px;
  }

  .is-active-link {
    margin-left: -1px;
    padding-left: 7px;
    border-left: 4px solid #13acee; 
    color: #099bcc;
    // font-weight: 800;
    // border: 1px solid #bcbcbc; 
    // border-radius: 6px;
    // padding: 0 2px;
    // padding: 0 10px 0 0;
    // background-color: yellow;
  }
`;

const Toc: FunctionComponent<TocProps> = ({onClick}) => {
  useEffect(() => {
    tocbot.init({
      tocSelector: `.toc`,
      contentSelector: `.post`,
      headingSelector: `h2,h3`,
      scrollSmooth: true,
      scrollSmoothDuration: 1,
    });

    return () => tocbot.destroy();
  });

  return (
    <StyledNav className={`toc`} onClick={onClick} />
  );
};

export default Toc;
