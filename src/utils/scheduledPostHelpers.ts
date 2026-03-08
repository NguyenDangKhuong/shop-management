import dayjs from 'dayjs'

/**
 * Trả về danh sách giờ bị disable cho TimePicker dựa trên ngày đã chọn
 *
 * Logic:
 * - Ngày hôm nay → disable giờ 0..currentHour-1 (giờ hiện tại vẫn chọn được)
 * - Ngày mai / ngày mốt / tương lai → cho chọn full 0-23h
 * - Chưa chọn ngày → cho chọn full 0-23h
 *
 * @param selectedDate - Ngày đã chọn (dayjs object hoặc null)
 * @returns Object { disabledHours } cho Antd TimePicker disabledTime prop
 */
export const getDisabledTimeForDate = (selectedDate: dayjs.Dayjs | null | undefined): { disabledHours?: () => number[] } => {
    const isToday = selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day')
    if (isToday) {
        const currentHour = dayjs().hour()
        // Disable giờ 0 đến currentHour-1
        // VD: 23h hiện tại → disable 0..22, giờ 23 vẫn chọn được
        return {
            disabledHours: () => Array.from({ length: currentHour }, (_, i) => i)
        }
    }
    // Ngày mai trở đi hoặc chưa chọn ngày → full day
    return {}
}

/**
 * Kiểm tra xem giờ đã chọn có hợp lệ (trong tương lai) với ngày đã chọn không
 *
 * @param selectedDate - Ngày đã chọn
 * @param selectedHour - Giờ đã chọn
 * @returns true nếu giờ hợp lệ
 */
export const isTimeValidForDate = (selectedDate: dayjs.Dayjs | null, selectedHour: number): boolean => {
    if (!selectedDate) return true
    const isToday = dayjs(selectedDate).isSame(dayjs(), 'day')
    if (isToday) {
        return selectedHour >= dayjs().hour()
    }
    return true
}
