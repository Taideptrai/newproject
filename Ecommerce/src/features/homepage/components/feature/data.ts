import feature1 from '../../assets/images/feature1.svg';
import feature2 from '../../assets/images/feature2.svg';
import feature3 from '../../assets/images/feature3.svg';
import feature4 from '../../assets/images/feature4.svg';
import feature5 from '../../assets/images/feature5.svg';
import feature6 from '../../assets/images/feature6.svg';

export interface Item {
    text: string;
    title: string;
    img: string;
}

export const data: Item[] = [
    {
        img: feature1,
        title: 'Quản lý sản phẩm trên sàn',
        text:
            'Quản lý nhiều page cùng lúc, tập hợp tất cả các bình luận, tin nhắn. Gắn nhãn, phân nhóm tin nhắn, hỗ trợ phân luồng công việc hiệu quả.',
    },
    {
        img: feature2,
        title: 'Đồng bộ đơn hàng',
        text: 'Tự động ẩn bình luận để tránh tình trạng cướp khách.',
    },
    {
        img: feature3,
        title: 'Lưu trữ thông tin khách hàng',
        text:
            'Tạo thư viện ảnh chung, dễ dàng tìm kiếm giúp hỗ trợ nhân viên bán hàng tư vấn hiệu quả, nhanh chóng, linh hoạt.',
    },
    {
        img: feature4,
        title: 'Quản lý đơn gửi theo biên bản',
        text:
            'Tạo đơn hàng ngay tại cửa sổ hội thoại tư vấn. Quản lý khách hàng và đơn hàng khách đặt.',
    },
    {
        img: feature5,
        title: 'Quản lý đối soát',
        text:
            'Lựa chọn hãng vận chuyển tối ưu về phí và thời gian giao hàng. Tra cứu vận đơn và đối soát thanh toán nhanh chóng, chính xác.',
    },
    {
        img: feature6,
        title: 'Báo cáo kênh bán',
        text: 'Tổng hợp lượng tương tác, đơn hàng, doanh thu từ kênh Facebook.',
    },
];
