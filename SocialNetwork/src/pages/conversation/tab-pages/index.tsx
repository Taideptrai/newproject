import React, { FC, useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { generateUrlImgFb } from '../../../utils/generate-url-img-fb';

import {
    loadConversations,
    setNullForConversation,
    removeConversations,
} from '../../../reducers/fanpageState/fanpageAction';
import { IFacebookState } from '../../../reducers/fanpageState/fanpageReducer';
import { IStoreState } from '../../../reducers/storeState/storeReducer';
import { loadLabels } from '../../../reducers/labelState/labelAction';
import { loadQuickMessageAction } from '../../../actions/setting';

import { Menu, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PlusDashedCircle, DownIcon } from '../../../assets/icon';
import BtnPage from './btn-page';
import HeaderRight from '../../../components/header-customer/header-right';

import './tab-pages.less';

const TabPages: FC = (): JSX.Element => {
    const pages = useSelector(({ fanpage }: { fanpage: IFacebookState }) => fanpage.pages);

    const store = useSelector(({ store }: { store: IStoreState }) => store.store);

    const [pagesShow, setPagesShow] = useState(0);

    const dispatch = useDispatch();

    const arrPage = Object.keys(pages).map((key: string) => pages[key]);
    const [pageActive, setPageActive] = useState<any>({
        _id: arrPage[0]._id,
        fbObjectId: arrPage[0].fbObjectId,
    });
    if (!store.activePage) {
        store.activePage = arrPage[0];
    }

    useEffect(() => {
        let fbpageId;
        if (store.activePage) {
            fbpageId = store.activePage.fbObjectId;
            setPageActive(store.activePage);
        } else {
            fbpageId = pageActive.fbObjectId;
        }

        const data = {
            pageId: fbpageId,
            storeId: store._id,
        };

        dispatch(loadQuickMessageAction(data));
        dispatch(loadLabels(fbpageId));

        countPageForShow();
    }, [store.activePage]);

    const handleSelectPage = (page: any) => {
        if (page._id === pageActive._id) {
            // setPageActive({ _id: null });
            // store.activePage = null;
            // dispatch(loadConversations(store.queryConversation));
            return;
        } else {
            setPageActive(page);
            store.activePage = page;
            store.queryConversation = null;
            dispatch(removeConversations());
            dispatch(setNullForConversation());
        }
    };

    const renderPages = Object.keys(pages)
        .slice(0, pagesShow)
        .map((key: string) => (
            <BtnPage
                key={key}
                page={pages[key]}
                active={pageActive._id === pages[key]._id}
                onClick={handleSelectPage}
            />
        ));

    const countPageForShow = () => {
        const pageItemWidth = 170;
        const listPage = document.getElementsByClassName('header-right')[0];
        const userInfo = document.getElementsByClassName('user-dropdown')[0];
        const title = document.getElementsByClassName('title')[0];

        if (listPage && userInfo && title) {
            const numberPageView = Math.ceil(
                (listPage.clientWidth - userInfo.clientWidth - title.clientWidth - 50) /
                    pageItemWidth
            );
            setPagesShow(numberPageView);
        }
    };

    const menus = (
        <Menu>
            {Object.keys(pages)
                .slice(pagesShow, Object.keys(pages).length)
                .map((key: string) => (
                    <Menu.Item
                        key={key}
                        className={pageActive._id === pages[key]._id ? 'page-active' : ''}
                    >
                        <div onClick={() => handleSelectPage(pages[key])}>
                            <Avatar
                                src={generateUrlImgFb(
                                    pages[key].fbObjectId,
                                    pages[key].accessToken
                                )}
                                icon={<UserOutlined />}
                                size='small'
                                style={{ marginRight: 10 }}
                            />
                            <Badge className='badge' count={pages[key].countUnread}>
                                <span className='text' style={{ marginRight: 12 }}>
                                    {pages[key].name}
                                </span>
                            </Badge>
                        </div>
                    </Menu.Item>
                ))}
        </Menu>
    );

    return (
        <HeaderRight>
            <div className='tab-pages'>
                <div className='tab-pages-items'>
                    <span className='title text'>Hộp thoại từ</span>

                    {renderPages}

                    <Link to='/customer/select-pages' style={{ lineHeight: 1 }}>
                        <PlusDashedCircle style={{ fontSize: 22 }} />
                    </Link>
                </div>

                {Object.keys(pages).length > pagesShow ? (
                    <Dropdown overlay={menus} placement='bottomRight' trigger={['click']}>
                        <div className='btn-page'>
                            <span className='text'>
                                <DownIcon />
                            </span>
                        </div>
                    </Dropdown>
                ) : (
                    <></>
                )}
            </div>
        </HeaderRight>
    );
};

export default memo(TabPages);
