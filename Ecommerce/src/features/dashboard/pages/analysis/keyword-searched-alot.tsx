import React, {FC} from 'react';
import {InsaCard} from '../../../../components';
import {KeywordChip} from '../../components';

const KeywordSearchedAlot: FC = () => {
    return (
        <InsaCard
            bordered
            className="keyword-searched-alot"
            title={
                <div className="title-card">TỪ KHÓA ĐƯỢC TÌM KIẾM NHIỀU</div>
            }
        >
            <div className="keyword-wrapper">
                <KeywordChip title="quần áo thể thao" />
                <KeywordChip title="quần" />
                <KeywordChip title="quần áo " />
                <KeywordChip title="thao" />
            </div>
        </InsaCard>
    );
};

export {KeywordSearchedAlot};
