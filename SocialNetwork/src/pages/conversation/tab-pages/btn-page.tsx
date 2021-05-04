import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import React, { FC, memo, ReactElement } from 'react';
import { Page } from '../../../reducers/fanpageState/fanpageReducer';
import { generateUrlImgFb } from '../../../utils/generate-url-img-fb';

import './btn-page.less';

interface Props {
    active?: boolean;
    page: Page;
    onClick: (page: any) => void;
}

const BtnPage: FC<Props> = ({ page, active, onClick }): ReactElement => {
    const className = active ? 'btn-page active' : 'btn-page';

    return (
        <div className={className} onClick={() => onClick(page)}>
            <Avatar
                src={generateUrlImgFb(page.fbObjectId, page.accessToken)}
                icon={<UserOutlined />}
                size='small'
                style={{ marginRight: 10 }}
            />
            <span className='text'>{page.name}</span>

            <Badge className='badge' count={page.countUnread} style={{ marginLeft: 10 }} />
        </div>
    );
};

BtnPage.defaultProps = {
    active: false,
};

export default memo(BtnPage);
