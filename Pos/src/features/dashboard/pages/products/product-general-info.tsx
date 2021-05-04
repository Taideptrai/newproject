import { PictureOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import { get } from 'lodash';
import React, { FC } from 'react';
import { ProductAttribute } from '../../../../collections/product';
import constants from '../../../../constants';
import formatMoney from '../../../../utils/formatMoney';
import NoProduct from './no-product';
import { useProduct } from './use-product';

const ProductGeneralInfo: FC = () => {
    const { product } = useProduct();

    if (!product)
        return (
            <Card className='product-general-info'>
                <NoProduct />
            </Card>
        );

    const categoryName = get(product, 'categoryId.name') || '---';

    return (
        <Card className='product-general-info'>
            <Typography.Title level={3}>
                #{product.name}{' '}
                {product.attributes?.map((attr: ProductAttribute) => attr.tags)?.join(' - ')}
            </Typography.Title>
            <div className='general-info'>
                <div className='tab-label'>Thông tin sản phẩm</div>

                <Row gutter={32}>
                    <Col>
                        <Avatar
                            size={80}
                            src={
                                product.images?.length > 0
                                    ? `${constants.URL_IMG}${product.images[0]}`
                                    : undefined
                            }
                            shape='square'
                            icon={<PictureOutlined />}
                        />
                    </Col>
                    <Col span={8}>
                        <Row gutter={[12, 12]}>
                            <Col span={12}>Giá</Col>
                            <Col span={12}>: {formatMoney(product.price)} đ</Col>
                            <Col span={12}>Mã SKU</Col>
                            <Col span={12}>: {product.sku}</Col>
                            <Col span={12}>Barcode</Col>
                            <Col span={12}>: {product.code}</Col>
                        </Row>
                    </Col>

                    <Col span={8}>
                        <Row gutter={[12, 12]}>
                            <Col span={12}>Nhãn hiệu</Col>
                            <Col span={12}>: ---</Col>
                            <Col span={12}>Danh mục</Col>
                            <Col span={12}>: {categoryName}</Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className='description'>
                <div className='tab-label'>Mô tả sản phẩm</div>
                <div className='description-content'>
                    {product.description || get(product, 'parentId.description', '')}
                </div>
            </div>
        </Card>
    );
};

export default ProductGeneralInfo;
