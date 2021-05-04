import React, {FC} from 'react';
import {Result, Button} from 'antd';
import BaseLayout from '../base-layout';

interface Props {}

const NotFound: FC<Props> = () => {
    return (
        <BaseLayout title="Trang web không tồn tại">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </BaseLayout>
    );
};

export {NotFound};
