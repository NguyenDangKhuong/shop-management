import { AutoComplete } from 'antd';
import { useState } from 'react';

const CurrencyAutocomplete = ({ onSelect }: {
  onSelect: (val: any) => void
}) => {
  const [options, setOptions] = useState<{ value: number }[]>([]);
  const getPanelValue = (price: number) =>
    !price ? [] : [{ value: price * 1000 }, { value: price * 10000 }, { value: price * 100000 }];
  return (
    <AutoComplete
      className='w-full'
      allowClear
      options={options}
      onSelect={(data: number) => onSelect(data)}
      onSearch={(val) => setOptions(getPanelValue(Number(val)))}
      placeholder="Nhập số tiền"
    />
  )
}

export default CurrencyAutocomplete