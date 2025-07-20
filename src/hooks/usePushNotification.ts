'use client'

import { App } from 'antd'

export const usePushNotification = () => {
  const { notification } = App.useApp()

  const push = (message: string, success: boolean) => {
    return success
      ? notification.success({
          message: 'Thành công',
          description: message
        })
      : notification.error({
          message: 'Lỗi',
          description: message,
          duration: 15
        })
  }

  return { push }
}
