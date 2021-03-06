import React, {FC} from 'react';

const size = '1em';

const defaultSetting = {
    viewBox: '0 0 1024 1024',
    width: size,
    height: size,
    fill: 'currentColor',
};
const FacebookSvg: FC = () => (
    <svg {...defaultSetting}>
        <g>
            <path d="M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z" />
        </g>
    </svg>
);

const MessageSvg: FC = () => (
    <svg {...defaultSetting}>
        <g>
            <path
                fill="rgb(255, 255, 255)"
                stroke="rgb(207, 210, 212)"
                strokeLinejoin="miter"
                strokeLinecap="butt"
                strokeMiterlimit="4"
                strokeWidth="26.030809075949787"
                d="M947.886 406.185c-10.43-89.79-48.115-169.265-104.443-231.565l0.32 0.359c-89.539-99.576-218.793-161.916-362.607-161.916-80.305 0-156.069 19.438-222.846 53.864l2.728-1.278c-74.527 37.728-135.439 92.849-179.002 160.234l-1.079 1.782c-42.66 64.694-68.054 144.050-68.054 229.336 0 9.065 0.287 18.063 0.852 26.985l-0.062-1.219c2.675 50.326 13.905 97.33 32.262 140.577l-1.025-2.718c25.906 61.166 62.949 113 108.998 155.157l0.331 0.299c4.176 3.61 6.802 8.915 6.802 14.833 0 0.404-0.012 0.806-0.036 1.204l0.003-0.055c-0.26 46.855 0 93.711 0 140.566v69.294c3.696-1.978 6.143-3.176 8.486-4.581q89.182-53.78 178.259-107.715c2.392-1.564 5.32-2.494 8.466-2.494 1.738 0 3.41 0.284 4.971 0.808l-0.11-0.032c36.586 9.926 78.593 15.629 121.932 15.629 30.511 0 60.363-2.827 89.306-8.232l-2.991 0.464c114.363-19.677 212.306-78.841 281.382-162.678l0.636-0.795c62.218-72.608 100.089-167.677 100.089-271.59 0-19.225-1.296-38.147-3.806-56.684l0.239 2.161z"
            />
            <path
                fill="rgb(0, 128, 255)"
                d="M148.74 620.575l272.074-271.449 132.028 128.332 243.596-128.332-273.219 276.76-127.499-129.373z"
            />
        </g>
    </svg>
);

export default {
    FacebookSvg,
    MessageSvg,
};
