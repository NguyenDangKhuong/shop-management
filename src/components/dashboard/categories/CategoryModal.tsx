import { Category } from "@/models/Category";
import { post, put } from "@/utils/api";
import pushNotification from "@/utils/pushNotification";
import { Button, Flex, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { initialCategory } from "./CategoryTable";

const CategoryModal = ({ isOpen, setIsOpen, editingCategory, setEditingCategory, categories }: {
  isOpen: boolean
  setIsOpen: (val: any) => void,
  editingCategory: Category,
  setEditingCategory: (val: any) => void
  categories: Category[]
}) => {
  const isEdit = !!editingCategory._id
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => form.setFieldsValue(editingCategory), [form, editingCategory])
  return <Modal
    title={`${isEdit ? 'Sửa' : 'Thêm'} danh mục`}
    open={isOpen}
    onCancel={() => {
      setEditingCategory(initialCategory)
      setIsOpen(false)
    }}
    footer={false}
  >
    <Form
      name="products"
      form={form}
      initialValues={editingCategory}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={async () => {
        const { _id, ...editingCategoryRemoveId } = editingCategory
        setIsLoading(true)
        const { message, success }: any = isEdit
          ? await put('api/category', editingCategory, 'categories')
          : await post('api/category', editingCategoryRemoveId, 'categories')
        setIsLoading(false)
        pushNotification(message, success)
        if (!success) return
        setEditingCategory(initialCategory)
        setIsOpen(false)
      }}
    >
      <Form.Item<Category>
        label="Tên"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input onChange={(e) => setEditingCategory({
          ...editingCategory,
          name: e.target.value
        })} />
      </Form.Item>
      <Flex justify="flex-end" className="mt-5">
        <Form.Item>
          <Flex>
            <Button className="mr-2" onClick={() => {
              setIsOpen(false)
              setEditingCategory(initialCategory)
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
  </Modal>
}

export default CategoryModal
