import { render, screen, waitFor } from '@testing-library/react'
import FacebookPostTable from '../FacebookPostTable'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn()
}))

// Mock react-device-detect
jest.mock('react-device-detect', () => ({
    isMobile: false
}))

// Mock FacebookPostModal
jest.mock('../FacebookPostModal', () => {
    return function MockFacebookPostModal({ isOpen }: any) {
        return isOpen ? <div data-testid="post-modal">Modal</div> : null
    }
})

// Mock Ant Design components
jest.mock('antd', () => {
    const actual = jest.requireActual('antd')
    return {
        ...actual,
        Table: ({ dataSource }: any) => (
            <div data-testid="posts-table">
                {dataSource?.map((post: any) => (
                    <div key={post._id} data-testid="post-row">
                        <span data-testid="post-content">{post.content}</span>
                        <span data-testid="post-status">{post.status}</span>
                        <span data-testid="post-type">{post.postType}</span>
                        {post.mediaFiles?.length > 0 && (
                            <div data-testid="media-files">
                                {post.mediaFiles.map((file: any, idx: number) => (
                                    <div key={idx} data-testid={`media-${file.type}`}>
                                        {file.type}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ),
        Modal: ({ open, children, title }: any) =>
            open ? (
                <div data-testid="preview-modal">
                    <h3>{title}</h3>
                    {children}
                </div>
            ) : null,
        Image: {
            PreviewGroup: ({ children }: any) => <div data-testid="image-preview-group">{children}</div>
        },
        Button: ({ children, onClick }: any) => (
            <button onClick={onClick} data-testid="button">
                {children}
            </button>
        ),
        Tag: ({ children }: any) => <span data-testid="tag">{children}</span>,
        List: ({ dataSource, renderItem }: any) => (
            <div data-testid="posts-list">
                {dataSource?.map((item: any) => renderItem(item))}
            </div>
        ),
        'List.Item': ({ children }: any) => <div data-testid="list-item">{children}</div>,
        'List.Item.Meta': ({ title, description }: any) => (
            <div>
                <div>{title}</div>
                <div>{description}</div>
            </div>
        ),
        Popconfirm: ({ children }: any) => <div>{children}</div>,
        Avatar: () => <div data-testid="avatar" />,
        Space: ({ children }: any) => <div>{children}</div>,
        Divider: () => <hr />
    }
})

describe('FacebookPostTable - Basic Tests', () => {
    const mockPosts = [
        {
            _id: '1',
            content: 'Test post content',
            status: 'scheduled',
            postType: 'post',
            mediaFiles: [
                { url: 'https://example.com/img1.jpg', type: 'image', publicId: 'img1' }
            ],
            scheduledAt: '2026-01-05T10:00:00Z',
            createdAt: '2026-01-01T10:00:00Z'
        },
        {
            _id: '2',
            content: 'Test reel content',
            status: 'published',
            postType: 'reel',
            mediaFiles: [
                { url: 'https://s3.thetaphoa.store/video/reel.mov', type: 'video', publicId: 'reel.mov' }
            ],
            scheduledAt: '2026-01-04T15:00:00Z',
            createdAt: '2026-01-02T10:00:00Z'
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks()
        // Mock fetch for API calls
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true, data: mockPosts })
            })
        ) as jest.Mock
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders table with posts', async () => {
        render(<FacebookPostTable />)

        await waitFor(() => {
            expect(screen.getByTestId('posts-table')).toBeInTheDocument()
        })
    })

    it('displays post data correctly', async () => {
        render(<FacebookPostTable />)

        await waitFor(() => {
            const postRows = screen.getAllByTestId('post-row')
            expect(postRows).toHaveLength(2)
        })

        expect(screen.getByText('Test post content')).toBeInTheDocument()
        expect(screen.getByText('Test reel content')).toBeInTheDocument()
    })

    it('shows create new post button', () => {
        render(<FacebookPostTable />)

        const button = screen.getByText('Tạo bài viết mới')
        expect(button).toBeInTheDocument()
    })

    it('displays media files for posts', async () => {
        render(<FacebookPostTable />)

        await waitFor(() => {
            const mediaFiles = screen.getAllByTestId('media-files')
            expect(mediaFiles.length).toBeGreaterThan(0)
        })

        expect(screen.getByTestId('media-image')).toBeInTheDocument()
        expect(screen.getByTestId('media-video')).toBeInTheDocument()
    })

    it('handles posts with different types', async () => {
        render(<FacebookPostTable />)

        await waitFor(() => {
            const postTypes = screen.getAllByTestId('post-type')
            expect(postTypes[0]).toHaveTextContent('post')
            expect(postTypes[1]).toHaveTextContent('reel')
        })
    })

    it('handles empty posts list', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true, data: [] })
            })
        ) as jest.Mock

        render(<FacebookPostTable />)

        await waitFor(() => {
            const table = screen.getByTestId('posts-table')
            expect(table).toBeInTheDocument()
        })

        const postRows = screen.queryAllByTestId('post-row')
        expect(postRows).toHaveLength(0)
    })

    it('displays post count in header', async () => {
        render(<FacebookPostTable />)

        await waitFor(() => {
            expect(screen.getByText(/Bài viết Facebook/)).toBeInTheDocument()
        })
    })
})
