'use client'
import { useGenegateId } from "@/hooks/useGenegateId";
import { ProductCart } from "@/models/ProductCart";
import { post } from "@/utils/api";
import { currencyFormat } from "@/utils/currencyFormat";
import numberWithCommas from "@/utils/numberWithCommas";
import pushNotification from "@/utils/pushNotification";
import {
  MinusOutlined,
} from '@ant-design/icons';
import { AutoComplete, Button, Checkbox, Divider, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";

const { Text } = Typography;
const CartSumary: React.FC<{
  totalCart: number
  cartList: ProductCart[]
  totalPrice: number
  discountPrice: number
  setDiscountPrice: any
  customerCash: number
  setCustomerCash: any
  exchange: number
  componentRef: any
  addMoreList: number[]
  setAddMoreList: (list: number[]) => void
}> = ({
  totalCart,
  cartList,
  totalPrice,
  discountPrice,
  setDiscountPrice,
  customerCash,
  setCustomerCash,
  exchange,
  componentRef,
  addMoreList,
  setAddMoreList
}) => {
    const [options, setOptions] = useState<{ value: number }[]>([])
    const [isPaidOnline, setIsPaidOnline] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const getPanelValue = (price: number) =>
      !price && price > 0 && price < 999 ? [] : [
        { label: String(numberWithCommas(price * 1000)), value: price * 1000 },
        { label: String(numberWithCommas(price * 10000)), value: price * 10000 },
        { label: String(numberWithCommas(price * 100000)), value: price * 100000 }];

    //print
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      copyStyles: true,
      onAfterPrint: async () => {
        setIsLoading(true)
        const orderId = useGenegateId(6)
        const { message, success }: any = await post('api/order', {
          orderId,
          totalPrice,
          totalCart,
          exchange: isPaidOnline ? 0 : exchange,
          customerCash: isPaidOnline ? totalPrice : customerCash,
          products: cartList,
          discountPrice: isPaidOnline ? 0 : discountPrice
        }, 'orders')
        setIsLoading(false)
        pushNotification(message, success)
        if (!success) return
        window.location.reload()
      }
    })
    return (
      <div className="pl-2">
        <Button
          type="primary"
          onClick={() => setAddMoreList([...addMoreList, 0])}
        >
          Thêm
        </Button>
        {addMoreList.map((item, idx) => (
          <Flex className='mt-1' key={idx}>
            <Input
              type='text'
              id='customerPrice'
              placeholder='Nhập số tiền thêm món'
              className='p-2 text-sm w-full border border-black rounded bg-gray-100 mr-3'
              value={item || ''}
              onChange={e => {
                setAddMoreList(
                  addMoreList.map((itemx, index) =>
                    index === idx ? Number(e.target.value) : itemx
                  )
                )
              }}
              autoComplete='off'
            />
            <MinusOutlined
              className='cursor-pointer'
              onClick={() =>
                setAddMoreList(addMoreList.filter((_, index) => index !== idx))
              }
            />
          </Flex>
        ))}
        <Flex justify="space-between">
          <Text strong className="uppercase">{`${totalCart} sản phẩm`}</Text>
          <Text strong className="uppercase">{currencyFormat(totalPrice)}</Text>
        </Flex>

        <Divider style={{ margin: '5px 0' }} />
        <Text type="warning" strong className="uppercase">Tiền Khách Đưa</Text>
        <AutoComplete
          className='w-full'
          allowClear
          disabled={isPaidOnline}
          options={options}
          onSelect={(val) => {
            setCustomerCash(val)
            setOptions([])
          }}
          onChange={(val) => {
            setCustomerCash(Number(val))
            setOptions([])
          }}
          onSearch={(val) => setOptions(val ? getPanelValue(Number(val)) : [])}
          placeholder="Nhập số tiền khách đưa"
        />
        <Flex>
          <div className='mr-2'>
            <Checkbox checked={isPaidOnline} onChange={e => {
              setIsPaidOnline(e.target.checked)
            }}></Checkbox>
          </div>
          <Text>Khách chuyển khoản</Text>
        </Flex>

        <Divider style={{ margin: '5px 0' }} />
        <Text strong type="danger" className="uppercase">Giảm giá (-)</Text>
        <AutoComplete
          className='w-full'
          allowClear
          options={options}
          onSelect={(val) => {
            setDiscountPrice(val)
            setOptions([])
          }}
          onChange={(val) => {
            setDiscountPrice(Number(val))
            setOptions([])
          }}
          onSearch={(val) => setOptions(val ? getPanelValue(Number(val)) : [])}
          placeholder="Nhập số tiền giảm giá"
        />

        <Divider style={{ margin: '5px 0' }} />
        <Flex justify="space-between">
          <Text type="success" strong className="uppercase">Shop nhận được</Text>
          <Text type="success" strong className="uppercase">{currencyFormat(totalPrice - discountPrice)}</Text>
        </Flex>

        <Button
          type="primary"
          className="uppercase w-full"
          loading={isLoading}
          onClick={() => {
            if (customerCash < 999 && !isPaidOnline) {
              pushNotification('Tiền khách nhập phải lớn hơn 1.000đ', false)
              return
            }
            handlePrint()
          }}
        >
          THANH TOÁN
        </Button>
        <Divider style={{ margin: '5px 0' }} />
        {
          !!totalPrice && !isPaidOnline && (
            <Flex justify="space-between">
              <Text strong className="uppercase">Tiền thối</Text>
              <Text strong className="uppercase">{exchange > 0 ? currencyFormat(exchange) : currencyFormat(0)}</Text>
            </Flex>
          )
        }
      </div>
    )
  }

export default CartSumary