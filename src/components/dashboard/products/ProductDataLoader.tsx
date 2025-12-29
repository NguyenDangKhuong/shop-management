import DashboardTitle from '@/components/dashboard/DashboardTitle'
import { get } from '@/utils/api'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'
import ProductTable from './ProductTable'

async function ProductDataLoader({ searchParams }: any) {
    const { page, size, name, isPublic } = await searchParams

    const [{ totalDocs, products }, { categories }] = await Promise.all([
        get(
            `api/products`,
            {
                page: Number(page) ?? 1,
                size: Number(size) ?? LIMIT_PAGE_NUMBER,
                name: name ?? '',
                isPublic: isPublic ?? false
            },
            ['products'],
            0
        ),
        get(`api/categories`, {}, ['categories'], 0)
    ])

    return (
        <>
            <DashboardTitle pageName='sản phẩm' totalDocs={totalDocs} />
            <ProductTable totalDocs={totalDocs} products={products} categories={categories} />
        </>
    )
}

export default ProductDataLoader
