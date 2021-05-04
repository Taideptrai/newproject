const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            // colors
                            '@color_primary': '#0199fc',
                            '@color_secondary': '#4267b2',
                            '@color_border': '#e9ebee',
                            '@color_light': '#f5f6f7',
                            "@color_sidebar_bg": " #252f47",
                            "@color_sidebar_bg_hover": "#364263",
                            "@color_sidebar_color": "#9daae1",
                            "@color_sidebar_color_hover": "#e1e6ff",
                            '@color_sidebar_customer_trial': '#f50',
                            '@color_sidebar_customer_premium': '#87d068',
                            '@color_text': '#333',

                            "@layout-sider-background": "#252f47",
                            "@menu-dark-bg": "#252f47",
                            "@menu-dark-submenu-bg": "#252f47",
                            "@menu-dark-item-active-bg": "#364263",

                            //  sizes
                            '@size_container': '1200px',
                            '@size_space': '15px',
                            '@size_border_radius': '5px',
                            '@size_header': '50px',
                            '@size-space': '15px',
                            '@color-border': '#e9ebee',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
