/**
 * @jest-environment node
 */
import dayjs from 'dayjs'
import { getDisabledTimeForDate, isTimeValidForDate } from '@/utils/scheduledPostHelpers'

describe('scheduledPostHelpers', () => {
    describe('getDisabledTimeForDate', () => {
        it('hôm nay → disable giờ 0..currentHour-1 (giờ hiện tại vẫn chọn được)', () => {
            const today = dayjs()
            const result = getDisabledTimeForDate(today)

            expect(result.disabledHours).toBeDefined()
            const disabled = result.disabledHours!()
            const currentHour = dayjs().hour()

            // Giờ hiện tại KHÔNG nằm trong danh sách disabled
            expect(disabled).not.toContain(currentHour)
            // Tất cả giờ trước hiện tại đều bị disabled
            for (let h = 0; h < currentHour; h++) {
                expect(disabled).toContain(h)
            }
            // Giờ sau hiện tại không bị disabled
            for (let h = currentHour; h < 24; h++) {
                expect(disabled).not.toContain(h)
            }
        })

        it('ngày mai → cho chọn full 0-23h (không disable giờ nào)', () => {
            const tomorrow = dayjs().add(1, 'day')
            const result = getDisabledTimeForDate(tomorrow)

            // Không có disabledHours → full 24h
            expect(result.disabledHours).toBeUndefined()
        })

        it('ngày mốt → cho chọn full 0-23h', () => {
            const dayAfterTomorrow = dayjs().add(2, 'day')
            const result = getDisabledTimeForDate(dayAfterTomorrow)

            expect(result.disabledHours).toBeUndefined()
        })

        it('chưa chọn ngày (null) → cho chọn full 0-23h', () => {
            const result = getDisabledTimeForDate(null)
            expect(result.disabledHours).toBeUndefined()
        })

        it('chưa chọn ngày (undefined) → cho chọn full 0-23h', () => {
            const result = getDisabledTimeForDate(undefined)
            expect(result.disabledHours).toBeUndefined()
        })

        it('ngày quá khứ → cho chọn full (DatePicker đã chặn chọn quá khứ)', () => {
            const yesterday = dayjs().subtract(1, 'day')
            const result = getDisabledTimeForDate(yesterday)

            expect(result.disabledHours).toBeUndefined()
        })
    })

    describe('isTimeValidForDate', () => {
        it('hôm nay + giờ tương lai → valid', () => {
            const today = dayjs()
            const futureHour = Math.min(dayjs().hour() + 1, 23)
            expect(isTimeValidForDate(today, futureHour)).toBe(true)
        })

        it('hôm nay + giờ hiện tại → valid', () => {
            const today = dayjs()
            expect(isTimeValidForDate(today, dayjs().hour())).toBe(true)
        })

        it('hôm nay + giờ quá khứ → invalid', () => {
            const today = dayjs()
            const currentHour = dayjs().hour()
            if (currentHour > 0) {
                expect(isTimeValidForDate(today, currentHour - 1)).toBe(false)
            }
        })

        it('ngày mai + bất kỳ giờ nào → valid', () => {
            const tomorrow = dayjs().add(1, 'day')
            for (let h = 0; h < 24; h++) {
                expect(isTimeValidForDate(tomorrow, h)).toBe(true)
            }
        })

        it('null date + bất kỳ giờ nào → valid', () => {
            expect(isTimeValidForDate(null, 0)).toBe(true)
            expect(isTimeValidForDate(null, 12)).toBe(true)
            expect(isTimeValidForDate(null, 23)).toBe(true)
        })
    })
})
