"use client";

import React, { useState } from 'react';
import { Avatar, Badge, Drawer, Button, List, InputNumber, Table, Divider, Typography, Icon, Alert } from 'antd';
import { ShoppingCartOutlined, DatabaseOutlined, DeleteOutlined, GiftOutlined, AntCloudOutlined } from '@ant-design/icons';
import { useCart } from '../cart/CartContext';
import { Layout } from 'antd';
import cartImg from '../assets/images/cart.png'
const { Header } = Layout;
const { Text } = Typography;
import customGif from '../assets/images/customGif.png';
import Link from 'next/link';
const Navbar = () => {
  const { cartItems, kitchenItems, removeFromCart, updateItemQuantity, transferToKitchen, updateItemStatus } = useCart();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [kitchenDrawerVisible, setKitchenDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleKitchenDrawer = () => {
    setKitchenDrawerVisible(!kitchenDrawerVisible);
  };

  const handleRemoveItem = id => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id, quantity) => {
    updateItemQuantity(id, quantity);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.value, 0);
  };

  const refreshAllStatuses = () => {
    kitchenItems.forEach(item => updateItemStatus(item.id, 'green'));
  };

  const columnsCart = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (_, item) => (
        <List.Item.Meta
          avatar={<Avatar src={item.imgSrc || cartImg} />}
          title={item.title}
          description={`${item.description}, ${item.value} DTSUs x ${item.quantity}`}
        />
      ),
      width: '80%',
    },
    {
      title: 'Qty.',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, item) => (
        <InputNumber
          min={1}
          value={item.quantity}
          onChange={(value) => handleUpdateQuantity(item.id, value)}
        />
      ),
      width: '10%',
    },
    {
      title: 'Remove',
      dataIndex: 'remove',
      key: 'remove',
      render: (_, item) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(item.id)}
        />
      ),
      width: '10%',
    },
  ];

  const columnsKitchen = [
    {
      title: 'Request',
      dataIndex: 'product',
      key: 'product',
      render: (_, item) => (
        <List.Item.Meta
          avatar={<Avatar src={item.imgSrc || cartImg} />}
          title={item.title}
          description={`${item.description}, ${item.value} DTSUs x ${item.quantity}`}
        />
      ),
      width: '70%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, item) => (
        <Badge color={item.status} />
      ),
      width: '10%',
    },
    {
      title: 'O/P Link',
      dataIndex: 'remove',
      key: 'remove',
      render: (_, item) => (
        <Button
          icon={<AntCloudOutlined />}
        />
      ),
      width: '20%',
    },
  ];



  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '50px' }}>
          <span>Welcome to My Company! <span>You have started your <strong>30 day trial</strong></span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar.Group
            maxCount={3}
            maxPopoverPlacement="top"
            size="large"
            maxStyle={{ color: '#000', backgroundColor: '#E6E6E6' }}
          >
            <Avatar src="https://randomuser.me/api/portraits/women/1.jpg" />
            <Avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
            <Avatar src="https://randomuser.me/api/portraits/women/3.jpg" />
            <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" />
            <Avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
          </Avatar.Group>
          <span style={{ marginLeft: '10px' }}>Our architects are here to help <a href="#">Book a free session</a></span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='mr-5'>
          <Badge count={cartItems.length} style={{ backgroundColor: '#FFD900' }} onClick={toggleDrawer}>
            <ShoppingCartOutlined className='cart-size' shape="circle" />
          </Badge>
        </div>
        <Badge count={kitchenItems.length} style={{ backgroundColor: '#FFD900' }} onClick={toggleKitchenDrawer}>
          <DatabaseOutlined className='cart-size' shape="circle" />
        </Badge>
      </div>
      <Drawer
        title="Your Run Cart"
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        visible={drawerVisible}
        width={500}
      >
        <Table
          dataSource={cartItems.map(item => ({ ...item, key: item.id }))}
          columns={columnsCart}
          pagination={false}
        />

        <div className='row mt-2'>
          <div className='col-md-8 cart-info'>
            <span>Subtotal</span>
          </div>
          <div className='col-md-4 cart-info-num'>
            <span>
              {calculateSubtotal()} DTSUs
            </span>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-md-6 cart-info'>
            <span>New Payment</span>
          </div>
          <div className='col-md-6 cart-info-num'>
            <span>
              No, Inclusive in your package
            </span>
          </div>
        </div>
        <Divider />
        <div className='row mt-2'>
          <div className='col-md-8 cart-info'>
            <span>Total Units Consumed</span>
          </div>
          <div className='col-md-4 cart-info-num'>
            <span>
              {calculateSubtotal()} DTSUs
            </span>
          </div>
        </div>

        <div className='d-flex  justify-content-center mt-4'>
          <div >
            <button className='btn-checkout btn' onClick={transferToKitchen}>Checkout</button>
            <button className='btn-checkout-outline mt-3 btn' onClick={toggleDrawer}>Back to Run Information</button></div>
        </div>

        <div style={{ padding: '20px' }}>
          <Alert
            description="Your have made a great chooseLet's 
            Run and be ready for a surprise"
            type="warning"
            showIcon
            icon={<GiftOutlined />}
          />

          <Alert
            className='mt-2'
            description="Some requests can take a week or moreto be 
delivered and may be subject 
to dependency resolutions related to your"
            type="info"
            showIcon
          />
        </div>
      </Drawer>
      <Drawer
        title="Your Run Kitchen"
        placement="right"
        closable={true}
        onClose={toggleKitchenDrawer}
        visible={kitchenDrawerVisible}
        width={500}
      >
        <Table dataSource={kitchenItems.map(item => ({ ...item, key: item.id }))} columns={columnsKitchen} pagination={false} />

        <div className='row mt-2'>
          <div className='col-md-8 cart-info'>
            <span>Units Under Processing</span>
          </div>
          <div className='col-md-4 cart-info-num'>
            <span>
              {calculateSubtotal()} DTSUs
            </span>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-md-8 cart-info'>
            <span>Units Completed</span>
          </div>
          <div className='col-md-4 cart-info-num'>
            <span>
              {calculateSubtotal()} DTSUs
            </span>
          </div>
        </div>
        <Divider />
        <div className='row mt-2'>
          <div className='col-md-8 cart-info'>
            <span>Total Units Consumed</span>
          </div>
          <div className='col-md-4 cart-info-num'>
            <span>
              {calculateSubtotal()} DTSUs
            </span>
          </div>
        </div>

        <div className='d-flex  justify-content-center mt-4'>
          <div >
            <button className='btn-checkout btn' onClick={refreshAllStatuses}>Refresh Status</button>

            <button onClick={toggleKitchenDrawer} className='btn-checkout-outline mt-3 btn'>Back to Your Dashboard</button>

          </div>
        </div>

        <div style={{ padding: '20px' }}>

          <Alert
            className='mt-2'
            description="Some requests can take a week or moreto be
delivered and may be subject 
to dependency resolutions related to your"
            type="info"
            showIcon
          />
        </div>
      </Drawer>
    </Header>
  );
};

export default Navbar;
