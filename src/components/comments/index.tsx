// import React, {FunctionComponent} from "react";

// /**
//  * Placeholder which is attached under every post. Can be shadowed to
//  * quickly integrate comments (like commento, Disqus, ...).
//  */
// const Comments: FunctionComponent = () => <></>;

// export default Comments;


import React, { createRef, useLayoutEffect } from 'react';

const src = 'https://utteranc.es/client.js';

export interface IUtterancesProps {
    repo: string;
}

const Comments: React.FC<IUtterancesProps> = React.memo(({ repo }) => {
    const containerRef = createRef<HTMLDivElement>();

    useLayoutEffect(() => {
        const utterances = document.createElement('script');

        const attributes = {
            src,
            repo,
            'issue-term': 'pathname',
            label: 'comment',
            theme: 'github-light',
            crossOrigin: 'anonymous',
            async: 'true',
        };

        Object.entries(attributes).forEach(([key, value]) => {
            utterances.setAttribute(key, value);
        });

        containerRef.current.appendChild(utterances);
    }, [repo]);

    return <div ref={containerRef} />;
});

Comments.displayName = 'Comments';

export default Comments;