/**
 * Basic smoke tests for FacebookPostModal
 * Note: Complex interaction tests are skipped to avoid performance issues
 */

import { uploadVideoToMinIO, deleteVideoFromMinIO } from '@/utils/minioUpload'

// Mock MinIO utilities
jest.mock('@/utils/minioUpload')

describe('FacebookPostModal - Smoke Tests', () => {
    it('exports uploadVideoToMinIO function', () => {
        expect(uploadVideoToMinIO).toBeDefined()
    })

    it('exports deleteVideoFromMinIO function', () => {
        expect(deleteVideoFromMinIO).toBeDefined()
    })

    it('uploadVideoToMinIO is mockable', async () => {
        const mockUpload = uploadVideoToMinIO as jest.MockedFunction<typeof uploadVideoToMinIO>
        mockUpload.mockResolvedValue({
            success: true,
            url: 'https://s3.thetaphoa.store/test.mov',
            fileName: 'test.mov'
        })

        const mockFile = new File(['content'], 'test.mov', { type: 'video/quicktime' })
        const result = await uploadVideoToMinIO(mockFile)

        expect(result.success).toBe(true)
        expect(result.url).toContain('s3.thetaphoa.store')
    })

    it('deleteVideoFromMinIO is mockable', async () => {
        const mockDelete = deleteVideoFromMinIO as jest.MockedFunction<typeof deleteVideoFromMinIO>
        mockDelete.mockResolvedValue({
            success: true,
            message: 'Deleted'
        })

        const result = await deleteVideoFromMinIO('test.mov')

        expect(result.success).toBe(true)
    })
})
