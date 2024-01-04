'use client'
import DashboardTitle from '@/components/dashboard/DashboardTitle'
import CartSumary from '@/components/dashboard/carts/CartSumary'
import CartListItem from '@/components/dashboard/carts/CartTable'
import InvoiceTable from '@/components/dashboard/carts/InvoiceTable'
import SearchInput from '@/components/dashboard/carts/SearchInput'
import useDebounce from '@/hooks/useDebounce'
import { ProductCart } from '@/models/ProductCart'
import { get } from '@/utils/api'
import pushNotification from '@/utils/pushNotification'
import { Col, Row } from 'antd'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const CartPage = () => {
  const [cartList, setCartList] = useState<ProductCart[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [isFetching, setIsFetching] = useState(false);
  const [addMoreList, setAddMoreList] = useState<number[]>([])
  const [discountPrice, setDiscountPrice] = useState(0)
  const [customerCash, setCustomerCash] = useState(0)
  const [date, setDate] = useState('')

  const debounedScanValue = useDebounce(searchValue, isMobile ? 2000 : 0)

  const componentRef: any = useRef(null)

  useEffect(() => {
    setDate(format(new Date(), 'HH:mm - dd/MM/yyyy'))
    // mutateCheckConnection()
  }, [])

  useEffect(() => {
    (async () => {
      if (!debounedScanValue) return
      setIsFetching(true)
      const { product, message, success } = await get(`/api/product/${debounedScanValue}`, {}, ['productsCart'])

      const { _id } = product

      if (!success) {
        pushNotification(message, success)
        return
      }
      const existedProduct = await cartList?.find(item => item.product?._id === _id)
      const newCartList = existedProduct
        ? cartList.map(item =>
          item.product?._id === product._id
            ? { ...item, quantity: item.quantity! + 1 }
            : item
        )
        : [...cartList, { product, quantity: 1 }]
      product && setCartList(newCartList)
      setSearchValue('')
    })()
  }, [debounedScanValue])

  const totalCart: number =
    cartList.reduce((acc, { quantity }) => acc + quantity!, 0) +
    addMoreList.length

  const totalPrice: number =
    cartList.reduce(
      (acc, curr) => acc + curr.product?.price! * curr.quantity!,
      0
    ) + addMoreList?.reduce((acc, curr) => acc + curr!, 0)

  const exchange =
    customerCash > 0 ? customerCash - totalPrice + discountPrice : 0

  return (
    <>
      <DashboardTitle pageName='Giỏ hàng' />
      <SearchInput isFetching={isFetching} searchValue={searchValue} setSearchValue={(val) => setSearchValue(val)} />
      <Row>
        <Col span={16}>
          <CartListItem isFetching={isFetching} setIsFetching={(val) => setIsFetching(val)} cartList={cartList} setCartList={(val) => setCartList(val)} />
        </Col>
        <Col span={8}>
          <CartSumary
            totalCart={totalCart}
            cartList={cartList}
            totalPrice={totalPrice}
            discountPrice={discountPrice}
            setDiscountPrice={(price: number) => setDiscountPrice(price)}
            customerCash={customerCash}
            setCustomerCash={(cash: number) => setCustomerCash(cash)}
            addMoreList={addMoreList}
            setAddMoreList={(list: number[]) => setAddMoreList(list)}
            exchange={exchange}
            componentRef={componentRef}
          />
        </Col>
      </Row>
      <InvoiceTable
        date={date}
        totalCart={totalCart}
        cartList={cartList}
        totalPrice={totalPrice}
        discountPrice={discountPrice}
        customerCash={customerCash}
        addMoreList={addMoreList}
        exchange={exchange}
        componentRef={componentRef}
      />
    </>
  )
}

export default CartPage
