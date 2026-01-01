import { useRef } from 'react'

import { Button, Flex, Modal } from 'antd'
import Barcode from 'react-barcode'
import { useReactToPrint } from 'react-to-print'

import { initialCategory } from '../categories/CategoryTable'

import { Product } from '@/models/Product'
import { currencyFormat } from '@/utils/currencyFormat'

const BarcodeModal = ({
  isOpen,
  setIsOpen,
  editingProduct,
  setEditingProduct
}: {
  isOpen: boolean
  setIsOpen: (val: any) => void
  editingProduct: Product
  setEditingProduct: (val: any) => void
}) => {
  const ref = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    copyStyles: true
  })
  return (
    <Modal
      title={`Barcode: ${editingProduct.sku}`}
      open={isOpen}
      onCancel={() => {
        setEditingProduct(initialCategory)
        setIsOpen(false)
      }}
      footer={false}>
      <div ref={ref} className='grid grid-cols-2 gap-x-14 gap-y-2 text-center ml-10 my-auto'>
        {Array.from(Array(editingProduct.storage), (_, i) => (
          <div key={i} className='flex flex-col justify-center items-center mt-2'>
            <div className='text-[8px]'>
              {editingProduct?.name?.length > 20
                ? `${editingProduct?.name?.substring(0, 20)}...`
                : editingProduct.name}
            </div>
            <Barcode
              width={1}
              height={20}
              fontSize={8}
              margin={2}
              value={editingProduct.sku || ''}
            />
            <div className='text-[8px]'>{currencyFormat(editingProduct.price)}</div>
          </div>
        ))}
      </div>
      <Flex justify='flex-end' className='mt-5'>
        <Button
          className='mr-2'
          onClick={() => {
            setIsOpen(false)
            setEditingProduct(initialCategory)
          }}>
          Hủy
        </Button>
        <Button
          type='primary'
          onClick={() => {
            handlePrint()
            setIsOpen(false)
          }}>
          In
        </Button>
      </Flex>
    </Modal>
  )
}

export default BarcodeModal
