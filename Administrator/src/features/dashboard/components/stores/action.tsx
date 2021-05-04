import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

interface Props {
    record: any;
}

const Actions = ({ record }: Props) => {
    const history: any = useHistory();

    return (
        <Button type='primary' onClick={() => history.push(`/dashboard/shops/${record._id}`)}>
            Chi tiết
        </Button>
    );
};

Actions.propTypes = {};

export default Actions;
