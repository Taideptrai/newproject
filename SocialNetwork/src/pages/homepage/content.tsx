import React from 'react';

import i_box1 from './images/i_box1.svg';
import i_box2 from './images/i_box2.svg';
import i_box3 from './images/i_box3.svg';
import i_box4 from './images/i_box4.svg';
import i_box5 from './images/i_box5.svg';
import i_box6 from './images/i_box6.svg';

// import aft1 from '../../assets/aft1.png';
// import aft2 from '../../assets/aft2.png';
// import aft3 from '../../assets/aft3.png';
// import aft4 from '../../assets/aft4.png';
// import aft5 from '../../assets/aft5.png';
// import aft6 from '../../assets/aft6.png';

import box1 from './images/box1.svg';
import box2 from './images/box2.svg';
import box3 from './images/box3.svg';
import box4 from './images/box4.png';
import box5 from './images/box5.jpg';
import box6 from './images/box6.png';

export default {
    banner: {
        h1: 'Phần mềm quản lý Fanpage Facebook',
        p: 'Phần mềm quản lý tốt nhất, được sử dụng nhiều nhất',
        button: 'Dùng thử miễn phí',
    },
    functions: {
        title: 'Tối đa hiệu quả việc kinh doanh trên Facebook',
        sub_title: 'Việc kinh doanh trở nên dễ dàng với bộ công cụ mạnh mẽ',
        box_contents: [
            {
                id: '2',
                img: i_box1,
                title: 'Quản lý bình luận, tin nhắn',
                dec:
                    'Quản lý nhiều page cùng lúc, tập hợp tất cả các bình luận, tin nhắn. Gắn nhãn, phân nhóm tin nhắn, hỗ trợ phân luồng công việc hiệu quả.',
            },
            {
                id: '1',
                img: i_box2,
                title: 'Ẩn bình luận thông minh',
                dec: 'Tự động ẩn bình luận để tránh tình trạng cướp khách.',
            },

            {
                id: '3',
                img: i_box3,
                title: 'Thư viện ảnh, tin nhắn mẫu',
                dec:
                    'Tạo thư viện ảnh chung, dễ dàng tìm kiếm giúp hỗ trợ nhân viên bán hàng tư vấn hiệu quả, nhanh chóng, linh hoạt.',
            },
            {
                id: '4',
                img: i_box4,
                title: 'Quản lý đơn hàng, khách hàng',
                dec:
                    'Tạo đơn hàng ngay tại cửa sổ hội thoại tư vấn. Quản lý khách hàng và đơn hàng khách đặt.',
            },
            {
                id: '5',
                img: i_box5,
                title: 'Quản lý giao hàng',
                dec:
                    'Lựa chọn hãng vận chuyển tối ưu về phí và thời gian giao hàng. Tra cứu vận đơn và đối soát thanh toán nhanh chóng, chính xác.',
            },
            {
                id: '6',
                img: i_box6,
                title: 'Báo cáo',
                dec: 'Tổng hợp lượng tương tác, đơn hàng, doanh thu từ kênh Facebook.',
            },
        ],
    },

    detail_function: {
        contents: [
            {
                id: '2',

                img: box1,
                title: 'Quản lý bình luận, tin nhắn',
                list: [
                    'Quản lý nhiều page cùng lúc.',
                    'Tự động thu thập tất cả tin nhắn, bình luận.',
                    'Gắn tag phân chia luồng công việc, tránh trùng khách.',
                    'Phân nhóm tin nhắn, bình luận chưa đọc để dễ theo dõi.',
                    'Bộ lọc tin nhắn, bình luận thông minh, nhiều tiêu chí.',
                ],
            },
            {
                id: '1',

                img: box2,
                title: 'Ẩn bình luận thông minh',
                list: [
                    'Tự động nhận diện và ẩn bình luận chứa số điện thoại để tránh tình trạng bị cướp khách.',
                    'Cho phép xóa bình luận ngay tại trình quản lý.',
                    'Cài đặt ẩn hiện bình luận theo nhu cầu riêng.',
                ],
            },

            {
                id: '3',

                img: box3,
                title: 'Thư viện ảnh, tin nhắn mẫu',
                list: [
                    'Tạo thư viện ảnh sản phẩm chung giúp nhân viên tư vấn nhanh, xác các sản phẩm còn bán được.',
                    'Tạo tin nhắn mẫu giúp nâng cao năng suất của nhân viên bán hàng.',
                ],
            },
            {
                id: '4',

                img: box4,
                title: 'Quản lý đơn hàng, khách hàng',
                list: [
                    'Tự động bắt thông tin khách hàng dựa trên nội dung tin nhắn, bình luận hoặc các thông tin public của khách hàng và tạo đơn hàng ngay tại khung hội thoại.',
                    'Kiểm tra độ tin cậy của khách hàng dựa trên lịch sử mua hàng.',
                    'Dễ dàng truy xuất thông tin khách hàng để hỗ trợ sale, marketing.',
                ],
            },
            {
                id: '5',

                img: box5,
                title: 'Quản lý giao hàng',
                list: [
                    'Tích hợp cổng kết nối vận chuyển tới các hãng vận chuyển lớn nhất.',
                    'Tự động tính phí vận chuyển, đề xuất hãng vận chuyển phù hợp nhất.',
                    'Tự đồng bộ dữ liệu với phần mềm quản lý bán hàng.',
                    'Dễ dàng tra cứu đối soát thanh toán.',
                ],
            },
            {
                id: '6',

                img: box6,
                title: 'Báo cáo',
                list: [
                    'Báo cáo số lượng bình luận, tin nhắn theo thời gian thực.',
                    'Báo cáo số đơn hàng từ fanpage.',
                    'Tự đồng bộ dữ liệu với phần mềm quản lý bán hàng.',
                    'Báo cáo doanh thu bán hàng từ Facebook.',
                ],
            },
        ],
    },
    price: {
        title: 'BẢNG GIÁ',
        sub_title: 'Hình thức thanh toán',
        sub_content: (
            <>
                <p>Quý khách chuyển khoản tiền cước sử dụng Vpage về tài khoản:</p>
                <p>- Tài khoản ngân hàng số : 194175159</p>
                <p>- Ngân hàng TMCP Việt Nam Thịnh Vượng VPBank - Chi nhánh Ngô Quyền</p>
                <p> - Chủ tài khoản : Công ty cổ phần Nhanh.vn</p>
            </>
        ),
    },
};
