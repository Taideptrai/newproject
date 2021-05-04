import React, { memo } from 'react';
import moment from 'moment';

import './style.less';

const BottomText = () => {
    const year = moment(Date.now()).format('YYYY');

    return <p>{`Copyright © ${year}. All rights reserved`}</p>;
};

export default memo(BottomText);
