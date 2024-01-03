import { ProductCart } from "@/models/ProductCart"
import { currencyFormat } from "@/utils/currencyFormat"

const InvoiceTable: React.FC<{
  date: string
  totalCart: number
  cartList: ProductCart[]
  totalPrice: number
  discountPrice: number
  customerCash: number
  exchange: number
  componentRef: any
  addMoreList: number[]
}> = ({
  date,
  totalCart,
  cartList,
  totalPrice,
  discountPrice,
  customerCash,
  exchange,
  componentRef,
  addMoreList,
}) => {
    return (
      <div className='max-w-xs m-auto mt-40'>
        <div
          ref={componentRef}
          className='content-invoice flex flex-col justify-center items-center text-center text-[10px]'>
          <h1 className='text-[20px] font-bold mt-2 uppercase font-serif'>
            Yumy shop
          </h1>
          <div className='mt-1 text-center'>
            Đ/c: 223A, Nguyễn Văn Khạ, ấp
            <br /> Cây Sộp, Tân An Hội, Củ Chi, TPHCM
            <br />
            SĐT: 0393.022.997
            <br />
            Zalo: 0966.813.400
          </div>
          <h2 className='text-sm font-bold mt-1'>Hóa đơn thanh toán</h2>
          <div>{`Thời gian: ${date}`}</div>
          <table className='table-auto mt-3 border-collapse border border-black'>
            <thead>
              <tr>
                <th className='border border-black text-[10px]'>Tên</th>
                <th className='border border-black text-[10px]'>SL</th>
                <th className='border border-black text-[10px]'>Đơn giá</th>
                <th className='border border-black text-[10px]'>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {addMoreList.map((item, idx) => (
                <tr key={idx}>
                  <td className='border border-black text-left text-[10px]'>
                    {`Sản phẩm ${idx + 1}`}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    1
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {currencyFormat(item)}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {currencyFormat(item)}
                  </td>
                </tr>
              ))}
              {cartList.map(item => (
                <tr key={item.product?._id}>
                  <td className='border border-black text-left text-[10px]'>
                    {item.product?.name}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {item.quantity}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {currencyFormat(item.product?.price!)}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {currencyFormat(item!.quantity! * item.product?.price!)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className='border border-black border-t-4 text-left text-[10px]'>
                  Tổng
                </td>
                <td className='border border-black border-t-4 text-right text-[10px]'>
                  {totalCart}
                </td>
                <td
                  colSpan={2}
                  className='border border-black border-t-4 text-right text-[10px]'>
                  {currencyFormat(totalPrice)}
                </td>
              </tr>
              {discountPrice > 0 && (
                <tr>
                  <td className='border border-black text-left text-[10px]'>
                    Giảm giá{' '}
                  </td>
                  <td
                    colSpan={3}
                    className='border border-black text-right text-[10px]'>
                    {currencyFormat(discountPrice)}
                  </td>
                </tr>
              )}
              {discountPrice > 0 && (
                <tr>
                  <td className='border border-black text-left text-[10px]'>
                    Tiền đã giảm
                  </td>
                  <td
                    colSpan={3}
                    className='border border-black text-right text-[10px]'>
                    {currencyFormat(totalPrice - discountPrice)}
                  </td>
                </tr>
              )}
              <tr>
                <td className='border border-black text-left text-[10px]'>
                  Khách đưa
                </td>
                <td
                  colSpan={3}
                  className='border border-black text-right text-[10px]'>
                  {customerCash ? currencyFormat(customerCash) : 0}
                </td>
              </tr>
              {exchange > 0 && (
                <tr>
                  <td className='border border-black text-left text-[10px]'>
                    Trả lại
                  </td>
                  <td
                    colSpan={3}
                    className='border border-black text-right text-[10px]'>
                    {exchange ? currencyFormat(exchange) : 0}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='mt-4 text-center text-[10px]'>
            Quý khách vui lòng kiểm tra hóa đơn <br /> trước khi rời shop
          </div>
          <div className='text-center text-[10px]'>
            Xin cảm ơn và hẹn gặp lại!
          </div>
        </div>
      </div>
    )
  }

export default InvoiceTable