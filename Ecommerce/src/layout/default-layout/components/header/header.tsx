import {CloseOutlined} from '@ant-design/icons';
import {Col, Row} from 'antd';
import cls from 'classnames';
import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Logo} from '../../../../components';
import {useAuth} from '../../../../context/auth';
import {UserDropdown} from '../user-dropdown';
import './header.less';

const Header: FC = () => {
    const {isAuth} = useAuth();
    const [show, setShow] = useState<boolean>(false);
    const toggleShow = () => {
        setShow(!show);
    };

    const classNav = cls('nav', {show});

    return (
        <header className="header">
            <div className="container">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Logo size={60} />
                    </Col>

                    <Col>
                        <nav className={classNav}>
                            <div
                                className="close-menu"
                                onClick={toggleShow}
                                role="presentation"
                            >
                                <CloseOutlined />
                                <span>Đóng</span>
                            </div>

                            <ul className="main-menu">
                                <li>
                                    <Link to="/">Tính năng</Link>
                                </li>
                                <li>
                                    <Link to="/">Trợ giúp</Link>
                                </li>

                                {isAuth && (
                                    <li>
                                        <Link to="/dashboard/overview">
                                            Trang quản lý
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    {isAuth ? (
                                        <UserDropdown />
                                    ) : (
                                        <div className="btn-group">
                                            <Link to="/auth/login">
                                                <button
                                                    className="btn-home btn-outline-primary btn-signin"
                                                    type="button"
                                                >
                                                    Đăng nhập
                                                </button>
                                            </Link>

                                            <Link to="/auth/signup">
                                                <button
                                                    className="btn-home btn-primary"
                                                    type="button"
                                                >
                                                    Dùng thử
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </nav>

                        <div
                            className="toggle-menu"
                            onClick={toggleShow}
                            role="presentation"
                        >
                            <i className="icon" />
                        </div>
                    </Col>
                </Row>
            </div>
        </header>
    );
};

export {Header};
