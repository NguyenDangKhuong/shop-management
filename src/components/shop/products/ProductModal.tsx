import { useEffect, useState } from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Flex, Form, Input, InputNumber, Modal, Select } from 'antd'

import { initialProduct } from './ProductTable'

import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { usePushNotification } from '@/hooks/usePushNotification'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import { post, put } from '@/utils/api'
import { productUploadConfig } from '@/utils/cloudinaryConfig'
import { genegateId } from '@/utils/genegateId'
import numberWithCommas from '@/utils/numberWithCommas'

const { Option } = Select

const ProductModal = ({
  isOpen,
  setIsOpen,
  editingProduct,
  setEditingProduct,
  categories
}: {
  isOpen: boolean
  setIsOpen: (val: any) => void
  editingProduct: Product
  setEditingProduct: (val: any) => void
  categories: Category[]
}) => {
  const { push } = usePushNotification()
  const isEdit = !!editingProduct._id
  //auto complete price
  const [options, setOptions] = useState<{ value: number }[]>([])
  const getPanelValue = (price: number) =>
    !price && price > 0 && price < 999
      ? []
      : [
        { label: String(numberWithCommas(price * 1000)), value: price * 1000 },
        { label: String(numberWithCommas(price * 10000)), value: price * 10000 },
        { label: String(numberWithCommas(price * 100000)), value: price * 100000 }
      ]

  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => form.setFieldsValue(editingProduct), [form, editingProduct])

  // Cloudinary upload hook
  const { openWidget, isUploading, progress, error: uploadError } = useCloudinaryUpload(
    productUploadConfig,
    (result) => {
      setEditingProduct({
        ...editingProduct,
        imageUrl: result.url,
        imagePublicId: result.publicId
      })
      form.setFieldsValue({ imageUrl: result.url })
      push('Tải ảnh thành công!', true)
    },
    (error) => {
      push('Tải ảnh thất bại: ' + (error?.message || 'Lỗi không xác định'), false)
    }
  )
  const sku = genegateId(5)
  const tempName = genegateId(3)
  const { imagePublicId, categoryId } = editingProduct
  return (
    <Modal
      title={`${editingProduct._id ? 'Sửa' : 'Thêm'} sản phẩm`}
      open={isOpen}
      onCancel={() => {
        setEditingProduct(initialProduct)
        setIsOpen(false)
      }}
      footer={false}>
      <Form
        name='products'
        form={form}
        initialValues={editingProduct}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={async () => {
          const { _id, ...editingProductRemoveId } = editingProduct
          setIsLoading(true)
          const { message, success }: any = isEdit
            ? await put('api/product', editingProduct, 'products')
            : await post('api/product', { ...editingProductRemoveId, sku }, 'products')
          setIsLoading(false)
          push(message, success)
          if (!success) return
          setEditingProduct(initialProduct)
          setIsOpen(false)
        }}>
        <Form.Item<Product>
          label='Tên'
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
          <Flex>
            <Input
              value={editingProduct.name}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value
                })
              }
            />
            {!isEdit ? (
              <Button
                className='ml-2'
                type='primary'
                onClick={() => {
                  categoryId &&
                    setEditingProduct({
                      ...editingProduct,
                      name: `${String(
                        categories.find(({ _id }) => String(_id) === categoryId)?.name
                      )} ${tempName}`
                    })
                }}>
                Tạo tên
              </Button>
            ) : null}
          </Flex>
        </Form.Item>
        <Form.Item<Product>
          label='Giá'
          name='price'
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
          <AutoComplete
            className='w-full'
            allowClear
            options={options}
            onSelect={val => {
              setEditingProduct({
                ...editingProduct,
                price: val
              })
              setOptions([])
            }}
            onSearch={val => setOptions(val ? getPanelValue(Number(val)) : [])}
            placeholder='Nhập số tiền'
          />
        </Form.Item>
        <Form.Item<Product>
          label='Số lượng'
          name='storage'
          rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}>
          <InputNumber
            className='w-full'
            onChange={e =>
              setEditingProduct({
                ...editingProduct,
                storage: e
              })
            }
          />
        </Form.Item>
        <Form.Item<Product>
          label='Danh mục'
          name='categoryId'
          rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm' }]}>
          <Select
            onChange={val =>
              setEditingProduct({
                ...editingProduct,
                categoryId: val
              })
            }>
            {categories.map(item => (
              <Option key={String(item._id)} value={String(item._id)}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<Product>
          label='Ảnh'
          name='imageUrl'
        // rules={[{ required: true, message: 'Vui lòng up hình sản phẩm' }]}
        >
          <Button
            icon={!!!imagePublicId && <UploadOutlined />}
            onClick={openWidget}
            loading={isUploading}>
            {imagePublicId || 'Chọn ảnh'}
          </Button>
          {isUploading && progress > 0 && (
            <span className='ml-2 text-blue-500'>Đang tải: {progress}%</span>
          )}
          {uploadError && (
            <div className='text-red-500 text-sm mt-1'>{uploadError}</div>
          )}
        </Form.Item>
        <Flex justify='flex-end' className='mt-5'>
          <Form.Item>
            <Flex>
              <Button
                className='mr-2'
                onClick={() => {
                  setIsOpen(false)
                  setEditingProduct(initialProduct)
                }}>
                Hủy
              </Button>
              <Button type='primary' htmlType='submit' loading={isLoading}>
                {`${editingProduct._id ? 'Sửa' : 'Thêm'}`}
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  )
}

export default ProductModal
