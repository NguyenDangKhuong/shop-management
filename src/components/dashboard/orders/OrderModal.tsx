import { ProductCart } from "@/models/ProductCart"
import { Modal, Table } from "antd"

const OrderModal = ({
  isOpen,
  setIsOpen,
  products = []
}: {
  isOpen: boolean
  setIsOpen: (val: any) => void,
  products: ProductCart[],
}) => {
  const newProduct = products.map(item => (
    {
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }
  ))
  return (
    <Modal
      title={`Chi tiết sản phẩm đơn hàng`}
      open={isOpen}
      onCancel={() => {
        setIsOpen(false)
      }}
      footer={false}
    >
      <Table
        rowKey='name'
        bordered
        pagination={false}
        columns={[
          {
            title: 'Tên sản phẩm',
            dataIndex: 'name'
          },
          {
            title: 'Giá tiền',
            dataIndex: 'price'
          },
          {
            title: 'Số lượng mua',
            dataIndex: 'quantity'
          }]}
        dataSource={newProduct ?? []}
      />
    </Modal>
  )
}

export default OrderModal