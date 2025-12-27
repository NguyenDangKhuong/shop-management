'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  CopyTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { Button, Checkbox, Divider, Flex, Image, Input, Popconfirm, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import BarcodeModal from './BarcodeModal'
import ProductModal from './ProductModal'

import useDebounce from '@/hooks/useDebounce'
import { usePushNotification } from '@/hooks/usePushNotification'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import { remove } from '@/utils/api'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'
import { currencyFormat } from '@/utils/currencyFormat'

export const initialProduct: Product = {
  _id: '',
  name: '',
  price: 0,
  categoryId: '',
  sku: '',
  storage: 0,
  imageUrl: '',
  imagePublicId: ''
}

const ProductTable = ({
  totalDocs,
  products,
  categories
}: {
  totalDocs: number
  products: Product[]
  categories: Category[]
}) => {
  const { push } = usePushNotification()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenBarcode, setIsOpenBarcode] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product>(initialProduct)
  const [searchValue, setSearchValue] = useState('')

  const debounedSearchValue = useDebounce(searchValue, 100)

  // 🚀 Performance: Create categoryMap for O(1) lookups instead of O(n) find()
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach((category: Category) => {
      if (category._id) {
        map.set(category._id, category.name)
      }
    })
    return map
  }, [categories])

  // 🚀 Performance: Memoize URL update to prevent recreating function
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('name', String(debounedSearchValue))
    replace(`${pathname}?${params.toString()}`)
  }, [debounedSearchValue, searchParams, pathname, replace])

  // 🚀 Performance: Stable callback for editing product
  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsOpen(true)
  }, [])

  // 🚀 Performance: Stable callback for barcode modal
  const handleOpenBarcode = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsOpenBarcode(true)
  }, [])

  // 🚀 Performance: Stable callback for copy SKU
  const handleCopySku = useCallback(
    (sku: string) => {
      navigator.clipboard
        .writeText(sku)
        .then(() => {
          push('Mã số đã được sao chép', true)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    [push]
  )

  // 🚀 Performance: Stable callback for delete product
  const handleDeleteProduct = useCallback(
    async (record: Product) => {
      const { message, success }: any = await remove('api/product', record, 'products')
      push(message, success)
    },
    [push]
  )

  // 🚀 Performance: Stable callback for adding new product
  const handleAddProduct = useCallback(() => {
    setEditingProduct(initialProduct)
    setIsOpen(true)
  }, [])

  // 🚀 Performance: Stable callback for pagination
  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', String(page))
      replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, replace]
  )

  // 🚀 Performance: Memoize columns to prevent recreation on every render
  const columns: ColumnsType<Product> = useMemo(
    () => [
      {
        title: 'Hiển thị',
        dataIndex: 'isPublic',
        width: 100,
        render: (_, { isPublic }) => <Checkbox checked={isPublic} />
      },
      {
        title: 'Ảnh',
        dataIndex: 'imageUrl',
        width: 150,
        render: (_, record) => (
          <Image
            className='h-24 w-auto'
            src={record.imageUrl || '/image/product-placeholder.png'}
            alt={record.imageUrl}
            width={70}
          />
        )
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'name'
      },
      {
        title: 'Đơn giá',
        dataIndex: 'price',
        render: (_, { price }) => currencyFormat(price)
      },
      {
        title: 'Số lượng',
        dataIndex: 'storage',
        render: (_, { storage }) => (
          <Flex>
            <MinusOutlined className='cursor-pointer' />
            <span className='mx-2 px-2 py-1 bg-whiterounded text-sm shadow outline-none focus:outline-none focus:shadow-outline border w-16'>
              {storage}
            </span>
            <PlusOutlined className='cursor-pointer' />
          </Flex>
        )
      },
      {
        title: 'Danh mục',
        dataIndex: 'categoryId',
        width: 100,
        // 🚀 Performance: O(1) Map lookup instead of O(n) array.find()
        render: (_, { categoryId }) => (categoryId ? categoryMap.get(categoryId) || '-' : '-')
      },
      {
        title: 'Mã số',
        dataIndex: 'sku',
        render: (_, record) => (
          <Flex>
            <Button type='primary' onClick={() => handleOpenBarcode(record)}>
              {record.sku}
            </Button>
            <CopyTwoTone className='mr-2' onClick={() => handleCopySku(record.sku)} />
          </Flex>
        )
      },
      {
        title: 'Hành động',
        width: 120,
        render: (_, record) => (
          <Space size='middle'>
            <EditTwoTone
              className='cursor-pointer text-lg'
              onClick={() => handleEditProduct(record)}
            />
            <Popconfirm
              placement='leftTop'
              title={'Xác nhận xóa sản phẩm?'}
              description={'Bạn có chắc chắn muốn xóa sản phẩm này ?'}
              onConfirm={() => handleDeleteProduct(record)}
              okText='Xác nhận'
              cancelText='Hủy'>
              <DeleteTwoTone className='cursor-pointer text-lg' twoToneColor='#ff1500' />
            </Popconfirm>
          </Space>
        )
      }
    ],
    [categoryMap, handleEditProduct, handleOpenBarcode, handleCopySku, handleDeleteProduct]
  )

  return (
    <>
      {/* Modern search and action bar */}
      <Flex className='mb-6' justify='space-between' align='center' gap='middle'>
        <Input
          size='large'
          placeholder='Tìm kiếm sản phẩm theo tên...'
          prefix={<SearchOutlined className='text-gray-400' />}
          onChange={e => setSearchValue(e.target.value)}
          style={{ maxWidth: 400 }}
          className='shadow-sm'
        />
        <Button type='primary' size='large' onClick={handleAddProduct}>
          + Thêm sản phẩm
        </Button>
      </Flex>
      <Table
        rowKey='_id'
        bordered
        columns={columns}
        dataSource={products}
        scroll={{ x: 800, y: 600 }}
        className='shadow-sm'
        size='middle'
        pagination={{
          current: Number(new URLSearchParams(searchParams).get('page')) || 1,
          pageSize: LIMIT_PAGE_NUMBER,
          hideOnSinglePage: true,
          total: totalDocs,
          showSizeChanger: true,
          onChange: handlePageChange
        }}
      />
      <ProductModal
        isOpen={isOpen}
        setIsOpen={value => setIsOpen(value)}
        editingProduct={editingProduct}
        setEditingProduct={val => setEditingProduct(val)}
        categories={categories}
      />
      <BarcodeModal
        isOpen={isOpenBarcode}
        setIsOpen={value => setIsOpenBarcode(value)}
        editingProduct={editingProduct}
        setEditingProduct={val => setEditingProduct(val)}
      />
    </>
  )
}

export default ProductTable
