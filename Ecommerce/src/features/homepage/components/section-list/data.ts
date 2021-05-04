import img1 from '../../assets/images/img1.svg';
import img2 from '../../assets/images/img2.svg';
import img3 from '../../assets/images/img3.svg';
import img4 from '../../assets/images/img4.svg';
import img5 from '../../assets/images/img5.png';
import img6 from '../../assets/images/img6.svg';

export interface Item {
    key: number;
    title: string;
    text_list: string[];
    img: string;
}

export const data: Item[] = [
    {
        key: 1,
        title: 'Kéo sản phẩm từ sàn về phần mềm',
        text_list: [
            'Lấy sản phẩm về và tự tạo trên phần mềm',
            'Ghép nối sản phẩm không cần trùng SKU',
        ],
        img: img1,
    },
    {
        key: 2,
        title: 'Đồng bộ đơn hàng',
        text_list: [
            'Tự động tải đơn hàng về phần mềm khi có đơn hàng mới',
            'Xử lý đơn hàng trực tiếp trên phần mềm (đóng gói, báo HVC)',
            'Theo dõi trạng thái đơn hàng thành công/hoàn/hủy',
        ],
        img: img2,
    },
    {
        key: 3,
        title: 'Lưu trữ thông tin khách hàng',
        text_list: [
            'Lưu trữ danh sách khách hàng trên sàn với đầy đủ thông tin',
            'Tự động cập nhật khách hàng khi có đơn mới',
            'Sử dụng tệp khách hàng cho các chương trình re-mkt sau này',
        ],
        img: img3,
    },
    {
        key: 4,
        title: 'Quản lý đơn gửi HVC theo biên bản',
        text_list: [
            'Kiểm soát số lượng đơn gửi vận chuyển bằng biên bản',
            'Hạn chế tối đa tình trạng sót đơn, mất hàng',
            'Tối ưu công đoạn nhặt hàng bằng Bảng tổng hợp sản phẩm',
        ],
        img: img4,
    },
    {
        key: 5,
        title: 'Quản lý đối soát',
        text_list: [
            'Theo dõi tiền thu của khách, tiền sàn trả về',
            'Kiểm soát chênh lệch và các khoản phí sàn thu',
        ],
        img: img5,
    },
    {
        key: 6,
        title: 'Báo cáo theo kênh bán',
        text_list: [
            'Báo cáo số lượng bình luận, tin nhắn theo thời gian thực',
            'Báo cáo số đơn hàng từ fanpage',
            'Báo cáo doanh thu bán hàng từ Facebook',
        ],
        img: img6,
    },
];
