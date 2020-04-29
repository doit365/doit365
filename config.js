module.exports = {
    title: `DevTimes`,
    siteUrl: `https://devtimes.com`,
    description: `A Development for %TOPICS%`,
    topics: [`angular`, `bigdata`, 'game'],
    menu: [
        // {
        //     name: 'All',
        //     path: '/archive'
        // },
        {
            name: 'Web',
            path: '/tag/web'
        },
        {
            name: 'BigData',
            path: '/tag/bigdata'
        },
        {
            name: 'Notebook',
            path: '/tag/notebook'
        },
        {
            name: 'Tips',
            path: '/tag/tip'
        },
        {
            name: 'About',
            path: '/page'
        },
    ],
    footerMenu: [
        {
            name: 'RSS',
            path: '/rss.xml'
        },
        {
            name: 'Sitemap',
            path: '/sitemap.xml'
        }
    ],
    search: true,
    author: {
        name: `winuss`,
        description: `Every end is a <strong>new beginning</strong>.
            <a href="https://devtimes.com" rel="noopener" target="_blank">devtimes.com</a>`,
        social: {
            facebook: ``,
            twitter: `https://twitter.com/winuss`,
            linkedin: ``,
            instagram: ``,
            youtube: ``,
            github: `https://github.com/winuss`,
            twitch: ``
        }
    }
}