import React, {FC, ReactNode, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {TITLE_APP} from '../constants';

interface Props {
    children: ReactNode;
    title?: string;
}

const BaseLayout: FC<Props> = ({children, title = TITLE_APP}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

export {BaseLayout};
