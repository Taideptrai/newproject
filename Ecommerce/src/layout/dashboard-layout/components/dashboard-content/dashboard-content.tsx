import {FC, ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

const DashboardContent: FC<Props> = ({children}) => {
    return <div className="dashboard_content">{children}</div>;
};

export {DashboardContent};
