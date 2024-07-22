import React from 'react';
import { LinkOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image';
import img1 from "../assets/images/image.png";
import img2 from "../assets/images/image2.png";
import img3 from "../assets/images/image3.png";
import img4 from "../assets/images/image4.png";
import Link from 'next/link';
import { useCart } from '../cart/CartContext';  


const CustomCard = ({ imgSrc, title, description, value, id }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ imgSrc, title, description, value, id });
    };

    return (
        <Card
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%'
            }}
            cover={
                <Image
                    alt="example"
                    src={imgSrc}
                    width={300}
                    height={172}
                    layout="responsive"
                />
            }
        >
            <Meta
                className='card-design'
                title={title}
                description={description}
            />
            <div className='d-flex justify-content-between align-items-end card-height'>
                <div>
                    <span>{value} DTSU*</span>
                    <Link href='/blankCard' passHref>
                        <button className='btn-link ml-3'>
                            <LinkOutlined className='icon-color' />
                        </button>
                    </Link>
                    <button className='btn-link ml-3' onClick={handleAddToCart}>
                        <PlusOutlined className='icon-color' />
                    </button>
                </div>
            </div>
        </Card>
    );
};

const Cards = () => {
    const cardData = [
        { id: 1, img: img1, title: "Mobile Apps", description: "Get your own mobile app", value: 100 },
        { id: 2, img: img2, title: "BI", description: "Create Dashboards", value: 100 },
        { id: 3, img: img3, title: "HR", description: "Talents", value: 50 },
        { id: 4, img: img4, title: "Operations", description: "ERP Management", value: 100 }
    ];

    return (
        <div>
            <div className="row">
                {cardData.map((card, index) => (
                    <div className="col-3 mt-3" key={index}>
                        <CustomCard
                            imgSrc={card.img}
                            title={card.title}
                            description={card.description}
                            value={card.value}
                            id={card.id}
                        />
                    </div>
                ))}
            </div>
            <div className='d-flex w-100 justify-content-end mt-2'>
                <div className='d-flex mr-5 justify-content-between'>
                    <SettingOutlined className='mr-3' />
                    <p>Remaining DTSUs: 200</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <SettingOutlined className='mr-3' />
                    <p>Remaining DTSUs: 200</p>
                </div>
            </div>
        </div>
    );
};

export default Cards;

