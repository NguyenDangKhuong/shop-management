'use client'

import { useEffect, useRef, useState } from 'react'

import { Col, InputRef, Row } from 'antd'
import { format } from 'date-fns'
import { isMobile } from 'react-device-detect'

import DashboardTitle from '@/components/dashboard/DashboardTitle'
import CartSumary from '@/components/dashboard/carts/CartSumary'
import CartListItem from '@/components/dashboard/carts/CartTable'
import InvoiceTable from '@/components/dashboard/carts/InvoiceTable'
import SearchInput from '@/components/dashboard/carts/SearchInput'
import useDebounce from '@/hooks/useDebounce'
import { ProductCart } from '@/models/ProductCart'
import { get } from '@/utils/api'
import pushNotification from '@/utils/pushNotification'

const CartPage = () => {
  const [cartList, setCartList] = useState<ProductCart[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [addMoreList, setAddMoreList] = useState<number[]>([])
  const [discountPrice, setDiscountPrice] = useState(0)
  const [customerCash, setCustomerCash] = useState(0)
  const [date, setDate] = useState('')
  const scanInput = useRef<InputRef>(null)

  const debounedScanValue = useDebounce(searchValue, isMobile ? 2000 : 0)

  const componentRef: any = useRef(null)

  useEffect(() => {
    //check connection every 30 minutes
    setInterval(async () => {
      const { connected, success } = await get(`/api/check-connection`, {}, ['connection'])
      if (!connected || !success) {
        window.location.reload()
      }
    }, 180000)
    //fix date of date-fns
    setDate(format(new Date(), 'HH:mm - dd/MM/yyyy'))

    scanInput?.current?.focus()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!debounedScanValue) return
      const { product, message, success, status } = await get(
        `/api/product/${debounedScanValue}`,
        {},
        ['productsCart']
      )

      if (!success) {
        pushNotification(message, success)
        setSearchValue('')
        setIsFetching(false)
        scanInput?.current?.focus()
        return
      }
      if (Number(status) === 500) {
        window.location.reload()
        return
      }

      const existedProduct = await cartList?.find(item => item.product?._id === product._id)
      const newCartList = existedProduct
        ? cartList.map(item =>
            item.product?._id === product._id ? { ...item, quantity: item.quantity! + 1 } : item
          )
        : [...cartList, { product, quantity: 1 }]
      product && setCartList(newCartList)
      setSearchValue('')
      setIsFetching(false)
      scanInput?.current?.focus()
    })()
  }, [debounedScanValue.length > 4])

  const totalCart: number =
    cartList.reduce((acc, { quantity }) => acc + quantity!, 0) + addMoreList.length

  const totalPrice: number =
    cartList.reduce((acc, curr) => acc + curr.product?.price! * curr.quantity!, 0) +
    addMoreList?.reduce((acc, curr) => acc + curr!, 0)

  const exchange = customerCash > 0 ? customerCash - totalPrice + discountPrice : 0

  return (
    <>
      <DashboardTitle pageName='Giỏ hàng' />
      <SearchInput
        isFetching={isFetching}
        setIsFetching={val => setIsFetching(val)}
        searchValue={searchValue}
        scanInput={scanInput}
        setSearchValue={val => setSearchValue(val)}
      />
      <Row>
        <Col span={16}>
          <CartListItem
            isFetching={isFetching}
            cartList={cartList}
            setCartList={val => setCartList(val)}
            scanInput={scanInput}
          />
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
