export default function ProductTableSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Title skeleton */}
            <div className="mb-6">
                <div className="h-8 w-48 bg-gray-300 rounded mb-2" />
                <div className="h-6 w-64 bg-gray-200 rounded" />
                <div className="h-px bg-gray-200 mt-4" />
            </div>

            {/* Search bar and action button skeleton */}
            <div className="mb-6 flex justify-between items-center gap-4">
                <div className="h-10 bg-gray-200 rounded max-w-[400px] flex-1" />
                <div className="h-10 w-40 bg-blue-200 rounded" />
            </div>

            {/* Table skeleton */}
            <div className="border border-gray-200 rounded shadow-sm bg-white">
                {/* Table header */}
                <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4">
                    <div className="h-4 bg-gray-300 rounded w-24 mr-8" />
                    <div className="h-4 bg-gray-300 rounded w-16 mr-8" />
                    <div className="h-4 bg-gray-300 rounded w-32 mr-8" />
                    <div className="h-4 bg-gray-300 rounded w-20 mr-8" />
                    <div className="h-4 bg-gray-300 rounded w-20 mr-8" />
                    <div className="h-4 bg-gray-300 rounded w-24 mr-8" />
                    <div className="h-4 bg-gray-300 rounded w-20" />
                </div>

                {/* Table rows */}
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="h-24 border-b border-gray-100 flex items-center px-4 gap-4 hover:bg-gray-50"
                    >
                        {/* Checkbox */}
                        <div className="w-4 h-4 bg-gray-200 rounded" />

                        {/* Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded" />

                        {/* Product name */}
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>

                        {/* Price */}
                        <div className="h-4 bg-gray-200 rounded w-24" />

                        {/* Storage */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded" />
                        </div>

                        {/* Category */}
                        <div className="h-4 bg-gray-200 rounded w-20" />

                        {/* SKU */}
                        <div className="h-8 bg-blue-200 rounded w-24" />

                        {/* Actions */}
                        <div className="flex gap-3">
                            <div className="w-6 h-6 bg-gray-200 rounded" />
                            <div className="w-6 h-6 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination skeleton */}
            <div className="mt-4 flex justify-end">
                <div className="h-10 w-64 bg-gray-200 rounded" />
            </div>
        </div>
    )
}
