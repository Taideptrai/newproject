import React from 'react';

import { Container } from '../../components';
import content from './content';

const Price = () => {
    return (
        <div className='home-section price'>
            <Container>
                <h2 className='title'>{content.price.title}</h2>
            </Container>
        </div>
    );
};

export default Price;
