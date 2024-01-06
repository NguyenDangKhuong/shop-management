'use client'
import { Input, InputRef } from 'antd';
import { useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';

const { Search } = Input;

const SearchInput = ({
  isFetching,
  searchValue,
  setSearchValue,
  setIsFetching,
  scanInput
}: {
  isFetching: boolean
  searchValue: string
  setSearchValue: (val: string) => void,
  setIsFetching: (val: boolean) => void,
  scanInput: any
}) => {

  const onIdle = () => {
    scanInput?.current?.focus()
  }

  useIdleTimer({ onIdle, timeout: 8_000 })
  return (
    <Search
      ref={scanInput}
      className='mb-5'
      allowClear
      autoFocus
      loading={isFetching}
      disabled={isFetching}
      placeholder='Nhập mã sản phẩm'
      value={searchValue}
      onChange={val => { 
        setSearchValue(val.target.value) 
        if(val.target.value.length < 5) return
        setIsFetching(true)
      }}
    />

  )
}

export default SearchInput