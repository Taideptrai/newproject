import { Button, Col, Input, message, Row, Tag } from 'antd';
import { pick } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as settingApi from '../../../api/setting';
import { ILabel } from '../../../collections/label';
import { Page } from '../../../reducers/fanpageState/fanpageReducer';
import { loadLabels } from '../../../reducers/labelState/labelAction';
import ColorPicker from './color-picker';
import { useContextLabel } from './context';

interface Label {
    name: string;
    color: string;
    backgroundColor: string;
    order: number;
    status: number;
}

interface Props {
    toggle: () => void;
    label?: ILabel;
    layout?: number[];
}

const convertLabel = (label?: ILabel) => {
    return label
        ? pick(label, ['name', 'color', 'backgroundColor', 'order', 'status'])
        : {
              name: '',
              color: '#ffffff',
              backgroundColor: '#4267b2',
              order: 1,
              status: 1,
          };
};

const FormAddLabel: FC<Props> = ({ toggle, label, layout = [24, 24] }) => {
    const [loading, setLoading] = useState(false);
    const [label_local, setLabel] = useState<Label>(convertLabel(label));
    const dispatch = useDispatch();
    const store = useSelector((state: any) => state.store.store);
    const pages = useSelector((state: any) => state.fanpage.pages);
    const { page } = useContextLabel();

    useEffect(() => {
        setLabel(convertLabel(label));
    }, [label]);

    const changeTitle = (e: any) => {
        setLabel({ ...label_local, name: e.target.value });
    };

    const pickColorBg = (backgroundColor: string) => {
        setLabel({ ...label_local, backgroundColor });
    };

    const pickColorText = (color: string) => {
        setLabel({ ...label_local, color });
    };

    const pageId = (pages[page as string] as Page).fbObjectId;
    const storeId = store._id;

    const handleAddLabel = async () => {
        if ((label && !label.name.trim()) || !label_local.name.trim()) {
            return message.error('Vui l??ng nh???p t??n nh??n h???i tho???i');
        }
        setLoading(loading);
        if (label) {
            const data = {
                ...pick(label, ['name', 'color', 'backgroundColor', 'order', 'status']),
                ...label_local,
            };

            settingApi
                .updateLabel({
                    storeId,
                    pageId,
                    data,
                    labelId: label._id,
                })
                .then(() => {
                    toggle();
                    message.success('???? c???p nh???t nh??n h???i tho???i');
                    dispatch(loadLabels(pageId));
                })
                .catch(() => {
                    setLoading(false);
                    message.error('L???i c???p nh???t nh??n h???i tho???i');
                });
        } else {
            try {
                const data = {
                    storeId,
                    pageId,
                    data: label_local,
                };

                await settingApi.addLabel(data);

                toggle();
                dispatch(loadLabels(pageId));

                message.success('Th??m nh??n h???i tho???i th??nh c??ng');
            } catch (error) {
                message.error('L???i th??m nh??n h???i tho???i');
            }
        }
    };

    return (
        <>
            <Row>
                <Col span={layout[0]} className='tag-col'>
                    {label_local.name.length > 0 && (
                        <Tag
                            color={label_local.backgroundColor}
                            style={{ color: label_local.color }}
                        >
                            {label_local.name}
                        </Tag>
                    )}
                </Col>

                <Col span={layout[1]}>
                    <Input.Group compact>
                        <Input
                            placeholder='T??n nh??n h???i tho???i'
                            style={{ width: '40%' }}
                            onChange={changeTitle}
                            value={label_local.name}
                        />

                        <ColorPicker
                            label='Ch???n m??u n???n'
                            pickColor={pickColorBg}
                            style={{ width: '30%' }}
                            color={label_local.backgroundColor}
                        />

                        <ColorPicker
                            label='Ch???n m??u ch???'
                            pickColor={pickColorText}
                            style={{ width: '30%' }}
                            color={label_local.color}
                        />
                    </Input.Group>
                </Col>
            </Row>

            <Row justify='end' gutter={15} style={{ marginTop: 30 }}>
                <Col>
                    <Button onClick={toggle} disabled={!page} className='cancel-btn'>
                        H???y
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' onClick={handleAddLabel} loading={loading}>
                        {label ? 'C???p nh???t' : 'Th??m'}
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default FormAddLabel;
