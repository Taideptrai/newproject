import React, { FC, ReactNode } from 'react';

import './content-auth.less';

interface Props {
    children: ReactNode;
}

const ContentAuth: FC<Props> = ({ children }) => {
    return <div>{children}</div>;
};

export default ContentAuth;
