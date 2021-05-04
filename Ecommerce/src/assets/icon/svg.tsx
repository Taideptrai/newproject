import React, {FC} from 'react';

const size = '1em';

const defaultSetting = {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    stroke: 'currentColor',
};

const ChevronDoubleLeftSvg: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...defaultSetting}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
    </svg>
);

const ChevronDoubleRightSvg: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...defaultSetting}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
    </svg>
);

const ChartSquareBarSvg: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" {...defaultSetting}>
        <path
            fillRule="evenodd"
            d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
            clipRule="evenodd"
        />
    </svg>
);

const DocumentAddSvg: FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        {...defaultSetting}
        width={24}
        height={24}
    >
        <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
            clipRule="evenodd"
        />
    </svg>
);

export default {
    ChevronDoubleLeftSvg,
    ChevronDoubleRightSvg,
    ChartSquareBarSvg,
    DocumentAddSvg,
};
