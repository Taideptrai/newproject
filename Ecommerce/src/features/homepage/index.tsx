import React, {FC} from 'react';
import {TITLE_APP} from '../../constants';
import {DefaultLayout} from '../../layout';
import path from './assets/images/path.png';
import {Banner, Feature, HomeForm, SectionList} from './components';
import './homepage.less';

const Homepage: FC = () => {
    return (
        <DefaultLayout title={TITLE_APP}>
            <Banner />

            <div>
                <img
                    src={path}
                    style={{width: '100%', display: 'block'}}
                    alt=""
                />
            </div>

            <div className="section-home" style={{background: '#f5f9fd'}}>
                <div className="container">
                    <Feature />
                </div>
            </div>

            <SectionList />

            <HomeForm />
        </DefaultLayout>
    );
};

export default Homepage;
