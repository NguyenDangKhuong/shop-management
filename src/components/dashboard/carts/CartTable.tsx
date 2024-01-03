'use client'

import { useEffect } from 'react'

import { Flex, Table } from 'antd'

import { Category } from '@/models/Category'
import { ProductCart } from '@/models/ProductCart'
import { currencyFormat } from '@/utils/currencyFormat'
import {
  DeleteTwoTone,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons'

export const initialCategory: Category = {
  _id: '',
  name: '',
}

const CartListItem = ({
  cartList,
  setCartList,
  isFetching,
  setIsFetching
}: {
  cartList: ProductCart[]
  setCartList: (val: any) => void
  isFetching: boolean
  setIsFetching: (val: boolean) => void
}) => {

  const tableCartList = cartList.map(({ product, quantity }) => ({
    _id: product._id,
    imageUrl: product.imageUrl,
    name: product.name,
    price: product.price,
    quantity,
  }))
  useEffect(() => {
    if (tableCartList) {
      setIsFetching(false)
    }
  }, [tableCartList])
  const columns = [
    // {
    //   title: 'Hình ảnh',
    //   render: (_: any, { imageUrl }: any) => <Image
    //     className='h-12 w-auto'
    //     height={100}
    //     src={imageUrl || '/image/product-placeholder.png'}
    //     alt={imageUrl}
    //   />
    // },
    {
      title: 'Tên',
      dataIndex: 'name'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_: any, { quantity, _id }: any) => {
        const currProduct = cartList.find(item => item.product?._id === _id)
        return (
          <Flex>
            <MinusOutlined
              className='cursor-pointer'
              onClick={() => currProduct &&
                setCartList(
                  currProduct.quantity! > 1
                    ? cartList.map(item =>
                      item.product?._id === _id
                        ? { ...item, quantity: item.quantity! - 1 }
                        : item
                    )
                    : cartList.filter(item => _id !== item.product?._id)
                )}
            />
            <span className='mx-2 px-2 py-1 bg-whiterounded text-sm shadow outline-none focus:outline-none focus:shadow-outline border w-16'>
              {quantity}
            </span>
            <PlusOutlined
              className='cursor-pointer'
              onClick={() => currProduct &&
                setCartList(
                  cartList.map(item =>
                    item.product?._id === _id
                      ? { ...item, quantity: item.quantity! + 1 }
                      : item
                  )
                )}
            />
          </Flex>
        )
      }
    },
    {
      title: 'Đơn giá',
      render: (_: any, { price }: any) => currencyFormat(price)
    },
    {
      title: 'Tổng',
      render: (_: any, { price, quantity }: any) => currencyFormat(price * quantity!)
    },
    {
      title: 'Hành động',
      render: (_: any, { _id }: any) => (
        <DeleteTwoTone className='cursor-pointer' twoToneColor='#ff4d4f'
          onClick={() => setCartList(
            cartList.filter(item => _id !== item.product?._id)
          )} />
      )
    }
  ]
  return (
    <>
      <Table
        rowKey='_id'
        className='border-r-2 pr-2'
        loading={isFetching}
        bordered
        columns={columns}
        dataSource={tableCartList}
        scroll={{ y: 800 }}
        pagination={false}
      />
    </>
  )
}

export default CartListItem
