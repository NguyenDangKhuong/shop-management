/** Chuyển tên bài LeetCode thành slug URL, ví dụ: "167. Two Sum II - Input Array Is Sorted" → "two-sum-ii-input-array-is-sorted" */
export const toLeetCodeSlug = (name: string) =>
    name.split('. ').slice(1).join('. ').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
