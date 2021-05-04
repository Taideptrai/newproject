import React, {FC} from 'react';

import './keyword-chip.less';

interface Props {
    title: string;
}

const KeywordChip: FC<Props> = ({title}) => {
    return <div className="keyword-chip">{title}</div>;
};

export {KeywordChip};
