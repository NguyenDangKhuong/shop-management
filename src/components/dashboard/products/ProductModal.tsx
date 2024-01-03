import { useGenegateId } from '@/hooks/useGenegateId';
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { post, put } from "@/utils/api";
import numberWithCommas from "@/utils/numberWithCommas";
import pushNotification from "@/utils/pushNotification";
import {
  UploadOutlined
} from '@ant-design/icons';
import { AutoComplete, Button, Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { initialProduct } from "./ProductTable";

const { Option } = Select;

const ProductModal = ({ isOpen, setIsOpen, editingProduct, setEditingProduct, categories }: {
  isOpen: boolean
  setIsOpen: (val: any) => void,
  editingProduct: Product,
  setEditingProduct: (val: any) => void
  categories: Category[]
}) => {
  const isEdit = !!editingProduct._id
  //auto complete price
  const [options, setOptions] = useState<{ value: number }[]>([]);
  const getPanelValue = (price: number) =>
    !price && price > 0 && price < 999 ? [] : [
      { label: String(numberWithCommas(price * 1000)), value: price * 1000 },
      { label: String(numberWithCommas(price * 10000)), value: price * 10000 },
      { label: String(numberWithCommas(price * 100000)), value: price * 100000 }];

  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => form.setFieldsValue(editingProduct), [form, editingProduct])
  const sku = useGenegateId(5)
  const tempName = useGenegateId(3)
  const { imagePublicId, categoryId } = editingProduct
  return <Modal
    title={`${editingProduct._id ? 'Sửa' : 'Thêm'} sản phẩm`}
    open={isOpen}
    onCancel={() => {
      setEditingProduct(initialProduct)
      setIsOpen(false)
    }}
    footer={false}
  >
    <Form
      name="products"
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
        pushNotification(message, success)
        if (!success) return
        setEditingProduct(initialProduct)
        setIsOpen(false)
      }}
    >
      <Form.Item<Product>
        label="Tên"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Flex>

          <Input value={editingProduct.name} onChange={(e) => setEditingProduct({
            ...editingProduct,
            name: e.target.value
          })} />
          {!isEdit ? <Button className='ml-2' type='primary' onClick={() => {
            categoryId && setEditingProduct({
              ...editingProduct,
              name: `${String(
                categories.find(
                  ({ _id }) => _id === categoryId
                )?.name
              )} ${tempName}`
            })
          }}>Tạo tên</Button> : null}
        </Flex>
      </Form.Item>
      <Form.Item<Product>
        label="Giá"
        name="price"
        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
      >
        <AutoComplete
          className='w-full'
          allowClear
          options={options}
          onSelect={(val) => {
            setEditingProduct({
              ...editingProduct,
              price: val
            })
            setOptions([])
          }}
          onSearch={(val) =>
            setOptions(val ? getPanelValue(Number(val)) : [])
          }
          placeholder="Nhập số tiền"
        />
      </Form.Item>
      <Form.Item<Product>
        label="Số lượng"
        name="storage"
        rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}
      >
        <InputNumber className="w-full" onChange={(e) => setEditingProduct({
          ...editingProduct,
          storage: e
        })} />
      </Form.Item>
      <Form.Item<Product>
        label="Danh mục"
        name="categoryId"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm' }]}
      >
        <Select
          onChange={(val) =>
            setEditingProduct({
              ...editingProduct,
              categoryId: val
            })
          }
        >
          {categories.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item<Product>
        label="Ảnh"
        name="imageUrl"
        rules={[{ required: true, message: 'Vui lòng up hình sản phẩm' }]}
      >
        <Button icon={!!!imagePublicId && <UploadOutlined />} onClick={() => {
          const widget = window.cloudinary.createUploadWidget(
            {
              cloudName: 'ndk',
              uploadPreset: 'yumyshop',
              folder: 'yumyshop/products'
            },
            (error: any, res: any) => {
              if (error) {
                console.error(error)
                return
              }
              if (res.event === 'success' && res.info.resource_type === 'image') {
                setEditingProduct({
                  ...editingProduct,
                  imageUrl: res.info.url, imagePublicId: res.info.public_id
                })
                form.setFieldsValue({ imageUrl: res.info.url });
              }
            }
          )
          widget.open()
        }}>{imagePublicId || 'Chọn ảnh'}</Button>

      </Form.Item>
      <Flex justify="flex-end" className="mt-5">
        <Form.Item>
          <Flex>
            <Button className="mr-2" onClick={() => {
              setIsOpen(false)
              setEditingProduct(initialProduct)
            }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Lưu
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  </Modal >
}

export default ProductModal
