'use client'

import { useEffect, useState } from 'react'

import { DatePicker, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { Order } from '@/models/Order'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'
import { format, parseISO } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ProductCart } from '@/models/ProductCart'
import { currencyFormat } from '@/utils/currencyFormat'
import {
  EyeTwoTone
} from '@ant-design/icons'
import OrderModal from './OrderModal'

const OrderTable = ({
  totalDocs,
  orders
}: {
  totalDocs: number
  orders: Order[]
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [editingProductOrder, setEditingProductOrder] = useState<ProductCart[]>([])
  useEffect(() => {
    if (orders) {
      setIsFetching(false)
    }
  }, [orders])
  const columns: ColumnsType<Order> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId'
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice'
    },
    {
      title: 'Tiền khách đưa',
      dataIndex: 'customerCash'
    },
    {
      title: 'Tiền thối lại',
      dataIndex: 'exchange'
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discountPrice'
    },
    {
      title: 'Tổng số sản phẩm',
      dataIndex: 'totalCart'
    },
    {
      title: 'Ngày bán',
      dataIndex: 'createdAt',
      render: (_, { createdAt }) => format(
        parseISO(String(createdAt!)),
        'HH:mm:ss dd/MM/yyyy'
      )
    },
    {
      title: 'Chi tiết',
      render: (_, record) => (
        <>
          <EyeTwoTone className='cursor-pointer' onClick={() => {
            setEditingProductOrder(record.products)
            setIsOpen(true)
          }} />
        </>
      )
    }
  ]
  return (
    <>
      <div className='mb-5'>
        <DatePicker allowClear placeholder='Chọn ngày' onChange={async (_, dateString) => {
          params.set('date', String(dateString));
          params.set('isMonth', '')
          replace(`${pathname}?${params.toString()}`);
        }} />
        <span className='mx-5'>hoặc</span>
        <DatePicker allowClear placeholder='Chọn tháng' picker="month" onChange={(_, dateString) => {
          params.set('date', String(`${dateString}-01`))
          params.set('isMonth', 'true')
          replace(`${pathname}?${params.toString()}`);
        }} />
      </div>
      <Table
        rowKey='_id'
        loading={isFetching}
        bordered
        columns={columns}
        dataSource={orders}
        scroll={{ x: 800, y: 600 }}
        pagination={{
          current: Number(params.get('page')) || 1,
          pageSize: LIMIT_PAGE_NUMBER,
          hideOnSinglePage: true,
          total: totalDocs,
          showSizeChanger: true,
          onChange(page) {
            params.set('page', String(page));
            replace(`${pathname}?${params.toString()}`);
            setIsFetching(true)
          },
        }}
        footer={() => `Tổng tiền: ${currencyFormat(
          orders?.reduce(
            (acc: number, curr: Order) => acc + Number(curr.totalPrice),
            0
          )
        )}`}
      />
      <OrderModal
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value)}
        products={editingProductOrder}
      />
    </>
  )
}

export default OrderTable
