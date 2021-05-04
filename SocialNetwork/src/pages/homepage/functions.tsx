import React from 'react';
import { Link } from 'react-scroll';

import content from './content';
import { Container } from '../../components';
import arrow from './images/arrow.svg';

const Functions = () => {
    return (
        <div className='home-section functions'>
            <Container>
                <div className='home-title text-center'>
                    <h4>{content.functions.title}</h4>
                    <p>{content.functions.sub_title}</p>
                </div>

                <div className='contentBox'>
                    {content.functions.box_contents.map((item: any) => (
                        <div key={item.id} className='box'>
                            <div>
                                <img src={item.img} alt={item.title} />

                                <h3>{item.title}</h3>
                                <p>{item.dec}</p>
                            </div>
                            <Link to={item.id} spy smooth duration={500} offset={0}>
                                <span className='read_more'>
                                    Xem thêm <img src={arrow} alt='' />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Functions;
