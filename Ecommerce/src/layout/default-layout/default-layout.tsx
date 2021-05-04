import React, {FC, ReactNode, useEffect} from 'react';
import Helmet from 'react-helmet';
import {TITLE_APP} from '../../constants';
import {Header, Footer} from './components';

interface Props {
    children: ReactNode;
    title?: string;
}

const DefaultLayout: FC<Props> = ({children, title = TITLE_APP}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <main className="main">{children}</main>
            <Footer />
        </>
    );
};

export {DefaultLayout};
