import React, {FC} from 'react';
import logo from './logo1.svg';
import './style.less';

interface Props {
    size?: number;
    isDashboard?: boolean;
}

const Logo: FC<Props> = ({size = 60}) => {
    return (
        <div className="logo">
            <img src={logo} alt="" style={{height: size}} />
        </div>
    );
};

export {Logo};
