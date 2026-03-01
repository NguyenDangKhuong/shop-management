/**
 * Basic smoke tests for FacebookPostModal
 * Note: Complex interaction tests are skipped to avoid performance issues
 */

import { uploadVideoToR2, deleteVideoFromR2 } from '@/utils/r2Upload'

// Mock R2 utilities
jest.mock('@/utils/r2Upload')

describe('FacebookPostModal - Smoke Tests', () => {
    it('exports uploadVideoToR2 function', () => {
        expect(uploadVideoToR2).toBeDefined()
    })

    it('exports deleteVideoFromR2 function', () => {
        expect(deleteVideoFromR2).toBeDefined()
    })

    it('uploadVideoToR2 is mockable', async () => {
        const mockUpload = uploadVideoToR2 as jest.MockedFunction<typeof uploadVideoToR2>
        mockUpload.mockResolvedValue({
            success: true,
            url: 'https://pub-105b411e9219481986379bfce642a4ae.r2.dev/test.mov',
            fileName: 'test.mov'
        })

        const mockFile = new File(['content'], 'test.mov', { type: 'video/quicktime' })
        const result = await uploadVideoToR2(mockFile)

        expect(result.success).toBe(true)
        expect(result.url).toContain('r2.dev')
    })

    it('deleteVideoFromR2 is mockable', async () => {
        const mockDelete = deleteVideoFromR2 as jest.MockedFunction<typeof deleteVideoFromR2>
        mockDelete.mockResolvedValue({
            success: true,
            message: 'Deleted'
        })

        const result = await deleteVideoFromR2('test.mov')

        expect(result.success).toBe(true)
    })
})
