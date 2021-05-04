import React, {FC, ReactNode} from 'react';
import {RouteProps, Route, Redirect} from 'react-router-dom';
import {useAuth} from '../context';

interface Props {
    children: ReactNode;
}

const GuestRouter: FC<Props & RouteProps> = ({
    children,
    ...rest
}): JSX.Element => {
    const {isAuth} = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) =>
                !isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/dashboard/overview',
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
};

const UserRouter: FC<Props & RouteProps> = ({
    children,
    ...rest
}): JSX.Element => {
    const {isAuth} = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
};

export {GuestRouter, UserRouter};
