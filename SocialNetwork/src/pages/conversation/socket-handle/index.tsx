import _get from 'lodash/get';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

import { NOTIFICATION_SERVER_URI } from '../../../configs/vars';
import { IAuthState } from '../../../reducers/authState/authReducer';
import {
    updateConversation,
    updateCountUnreadPage,
    updateUnreadForConversation,
} from '../../../reducers/fanpageState/fanpageAction';
import { IFacebookState } from '../../../reducers/fanpageState/fanpageReducer';
import { useNotification } from '../../customer/notfication-context';

interface State {
    auth: IAuthState;
    fanpage: IFacebookState;
}

interface IMessage {
    mid: string;
    text: string;
}

const SocketHandle: FC = (): JSX.Element => {
    const location = useLocation();
    const { play } = useNotification();
    const dispatch = useDispatch();

    const selectAuth = (state: State) => {
        return state.auth;
    };

    const auth = useSelector(selectAuth);

    const accessToken: string = _get(auth, 'token.accessToken');

    let [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        if (accessToken) {
            if (socket) {
                socket.close();
            }

            socket = io(`${NOTIFICATION_SERVER_URI}/?token=${accessToken}`, {
                path: '/socket',
                transports: ['websocket', 'polling'],
            });

            setSocket(socket);

            socket.on('comment', (res: any) => {
                const { changes, conversation } = res.entry[0];
                if (conversation && changes) {
                    const { value } = changes[0];

                    const newMessage: any = {
                        type: 2,
                        id: value.comment_id,
                        message: value.message,
                        from: value.from,
                    };

                    if (value.item === 'comment' && value.photo) {
                        newMessage.attachment = {
                            type: 'photo',
                            media: {
                                image: {
                                    src: value.photo,
                                },
                            },
                        };
                    }

                    dispatch(
                        updateConversation({
                            conversation: {
                                ...conversation,
                                message: value.message,
                            },
                            newMessage,
                        })
                    );

                    dispatch(updateUnreadForConversation(conversation));

                    // play sound
                    if (conversation.unread) {
                        play();
                    }
                }
            });

            socket.on('message', (res: any) => {
                const { conversation, messaging } = res.entry[0];
                const message: any = messaging[0].message;

                const data =
                    message.attachments &&
                    message.attachments.map((a: any) => {
                        if (a.type === 'video') {
                            return {
                                id: Date.now(),
                                video_data: {
                                    url: a.payload.url,
                                },
                                mime_type: 'video/mp4',
                            };
                        }

                        return {
                            id: Date.now(),
                            image_data: {
                                preview_url: a.payload.url,
                                url: a.payload.url,
                            },
                            mime_type: 'image/jpeg',
                        };
                    });
                const newMessage = {
                    type: 1,
                    create_time: moment(new Date()).format(),
                    id: message.mid,
                    message: message.text || '',
                    attachments: { data },
                    from: { id: messaging[0].sender.id },
                };

                dispatch(
                    updateConversation({
                        conversation: {
                            ...conversation,
                            message: message.text,
                        },
                        newMessage,
                    })
                );

                dispatch(updateUnreadForConversation(conversation));

                // play sound
                if (conversation.unread) {
                    play();
                }
            });

            socket.on('error', (res: any) => {
                // action error
            });
        }

        return () => socket.close();
    }, [accessToken]);

    return <></>;
};

SocketHandle.propTypes = {};

export default SocketHandle;
