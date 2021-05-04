import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Modal, Form, Input, Divider, message } from 'antd';
import { InsaButton } from '../../../components';
import { logout } from '../../../reducers/authState/authAction';
import { changePassword } from '../../../api/user';
import '../style.less';

interface IModalChangePassword {
    visible: boolean;
    setVisible: (value: boolean) => void;
}

const ModalChangePassword: FC<IModalChangePassword> = ({ visible, setVisible }) => {
    const dispatch = useDispatch();

    const [formPassword] = Form.useForm();

    const handleChangeNewPassword = async () => {
        try {
            const dataForm = formPassword.getFieldsValue();
            await changePassword({
                currentPassword: dataForm.currentPassword,
                newPassword: dataForm.newPassword,
            });
            message.success('Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!');
            dispatch(logout());
            dispatch(push('/'));
        } catch (error) {
            message.error('Thay đổi mật khẩu thất bại');
        }
    };

    return (
        <>
            <Modal
                title={<span>Thay đổi mật khẩu</span>}
                centered
                visible={visible}
                onOk={() => {}}
                okText="Tiếp tục"
                onCancel={() => setVisible(false)}
                cancelText="Dừng lại"
                width={390}
                closable={false}
                maskClosable={true}
                keyboard={false}
                footer={[
                    <InsaButton onClick={() => setVisible(false)}>Hủy</InsaButton>,
                    <InsaButton type="primary" onClick={handleChangeNewPassword}>
                        Cập nhật
                    </InsaButton>,
                ]}
                className="modal-change-password"
            >
                <Form layout="vertical" form={formPassword}>
                    <Form.Item
                        label="Nhập mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu hiện tại',
                            },
                        ]}
                    >
                        <Input.Password type="password" placeholder="*********" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu mới',
                            },
                        ]}
                    >
                        <Input.Password type="password" placeholder="*********" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Xác nhận mật khẩu mới',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Hai mật khẩu bạn đã nhập không giống nhau!')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password type="password" placeholder="*********" />
                    </Form.Item>
                    <Divider />
                </Form>
            </Modal>
        </>
    );
};

export default ModalChangePassword;
