# API Prompts - Ví dụ sử dụng

## Endpoint: GET `/api/prompts`

### Query Parameters
- `accountId` (optional): Filter prompts theo TikTok account
- `productId` (optional): Filter prompts theo sản phẩm

### Ví dụ sử dụng:

#### 1. Lấy tất cả prompts của một account
```javascript
const response = await fetch('/api/prompts?accountId=6984100221bd5a4f3e75f004')
const data = await response.json()

console.log(data)
// {
//   success: true,
//   data: [
//     {
//       _id: "...",
//       title: "Prompt 1",
//       content: "...",
//       productId: "1731556854745433558",
//       productTitle: "Áo Nữ Áo Ren Cổ V...",
//       productImage: "https://...",
//       ...
//     },
//     ...
//   ]
// }
```

#### 2. Lấy prompts của một sản phẩm cụ thể
```javascript
const productId = '1731556854745433558' // TikTok product_id

const response = await fetch(`/api/prompts?productId=${productId}`)
const data = await response.json()

console.log(data)
// {
//   success: true,
//   data: [
//     {
//       _id: "...",
//       title: "Prompt cho áo",
//       content: "Mô tả sản phẩm...",
//       productId: "1731556854745433558",
//       ...
//     },
//     ...
//   ]
// }
```

#### 3. Lấy prompts của một sản phẩm trong một account
```javascript
const accountId = '6984100221bd5a4f3e75f004'
const productId = '1731556854745433558'

const response = await fetch(`/api/prompts?accountId=${accountId}&productId=${productId}`)
const data = await response.json()

console.log(data)
// {
//   success: true,
//   data: [...]
// }
```

#### 4. Sử dụng trong React component
```tsx
const MyComponent = () => {
    const [prompts, setPrompts] = useState([])
    const [loading, setLoading] = useState(false)

    const loadProductPrompts = async (productId: string) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/prompts?productId=${productId}`)
            const data = await response.json()
            
            if (data.success) {
                setPrompts(data.data)
                console.log(`Loaded ${data.data.length} prompts for product ${productId}`)
            }
        } catch (error) {
            console.error('Error loading prompts:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button onClick={() => loadProductPrompts('1731556854745433558')}>
                Load Prompts
            </button>
            
            {loading && <p>Loading...</p>}
            
            <ul>
                {prompts.map(prompt => (
                    <li key={prompt._id}>
                        <h3>{prompt.title}</h3>
                        <p>{prompt.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
```

#### 5. Random một prompt từ sản phẩm
```javascript
const getRandomPrompt = async (productId: string) => {
    const response = await fetch(`/api/prompts?productId=${productId}`)
    const data = await response.json()
    
    if (data.success && data.data.length > 0) {
        // Lấy random một prompt
        const randomIndex = Math.floor(Math.random() * data.data.length)
        const randomPrompt = data.data[randomIndex]
        
        console.log('Random prompt:', randomPrompt.title)
        console.log('Content:', randomPrompt.content)
        
        return randomPrompt
    }
    
    return null
}

// Sử dụng
const prompt = await getRandomPrompt('1731556854745433558')
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "6987c8a56a3afc6b3fc69792",
      "title": "Mô tả sản phẩm áo",
      "content": "Áo siêu đẹp, siêu xinh...",
      "mediaId": "test123",
      "productId": "1731556854745433558",
      "productTitle": "Áo Nữ Áo Ren Cổ V Tay Dài 2 Lớp Siêu Xinh",
      "productImage": "https://p16-oec-ttp.tiktokcdn-us.com/...",
      "accountId": "6984100221bd5a4f3e75f004",
      "createdAt": "2026-02-08T06:32:00.000Z",
      "updatedAt": "2026-02-08T06:32:00.000Z"
    }
  ]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```
