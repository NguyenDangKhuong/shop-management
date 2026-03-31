import { Callout, CodeBlock, Heading2, Highlight, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const reactFormsPatterns: BlogPost = {
    slug: 'react-forms-patterns',
    title: {
        vi: 'React Forms — Patterns & Best Practices cấp Senior',
        en: 'React Forms — Senior-Level Patterns & Best Practices',
    },
    description: {
        vi: 'Hướng dẫn chi tiết xử lý form chuyên nghiệp: React Hook Form, Zod validation, Server Actions, multi-step forms, file upload, UX patterns và anti-patterns cần tránh.',
        en: 'Comprehensive guide to professional form handling: React Hook Form, Zod validation, Server Actions, multi-step forms, file upload, UX patterns and anti-patterns to avoid.',
    },
    date: '2025-06-15',
    tags: ['React', 'Next.js', 'Forms', 'Best Practices', 'TypeScript'],
    emoji: '📝',
    color: '#2563eb',
    sections: [
        { id: 'overview', title: { vi: '🏗️ Form Libraries & Khi Nào Dùng', en: '🏗️ Form Libraries & When to Use' } },
        { id: 'react-hook-form', title: { vi: '📋 React Hook Form', en: '📋 React Hook Form' } },
        { id: 'zod-validation', title: { vi: '🛡️ Zod Schema Validation', en: '🛡️ Zod Schema Validation' } },
        { id: 'server-actions', title: { vi: '⚡ Server Actions', en: '⚡ Server Actions' } },
        { id: 'field-patterns', title: { vi: '🎯 Field Patterns', en: '🎯 Field Patterns' } },
        { id: 'error-handling', title: { vi: '❌ Error Handling', en: '❌ Error Handling' } },
        { id: 'file-upload', title: { vi: '📎 File Upload', en: '📎 File Upload' } },
        { id: 'multi-step', title: { vi: '🔀 Multi-step Forms', en: '🔀 Multi-step Forms' } },
        { id: 'ux-patterns', title: { vi: '🎨 UX Patterns', en: '🎨 UX Patterns' } },
        { id: 'anti-patterns', title: { vi: '🚫 Anti-patterns', en: '🚫 Anti-patterns' } },
        { id: 'senior-tips', title: { vi: '👨‍💻 Senior Tips', en: '👨‍💻 Senior Tips' } },
        { id: 'cheatsheet', title: { vi: '📋 Cheat Sheet', en: '📋 Cheat Sheet' } },
    ],
    content: {
        vi: (
            <>
                <Paragraph>
                    Form là phần <Highlight>phức tạp nhất</Highlight> trong frontend — validation, state management,
                    error handling, UX, accessibility. Bài viết này tổng hợp tất cả patterns và best practices
                    với React Hook Form + Zod + Next.js Server Actions.
                </Paragraph>

                <Callout type="info">
                    <strong>React Hook Form + Zod</strong> là combo phổ biến nhất hiện nay — được dùng bởi Vercel,
                    GitHub, Shopify. Uncontrolled approach giúp performance tốt hơn Formik ~70%.
                </Callout>

                {/* ===== OVERVIEW ===== */}
                <Heading2>🏗️ Form Libraries & Khi Nào Dùng</Heading2>

                <CodeBlock title="so-sanh-libraries.ts">{`// ═══ React Hook Form (RHF) — khuyên dùng ═══
// ✅ Uncontrolled components → ít re-render
// ✅ Bundle nhỏ (~9KB gzipped)
// ✅ TypeScript-first, validation tích hợp
// ✅ Dùng bởi: Vercel, GitHub, Shopify, Twitch
// 📦 npm install react-hook-form

// ═══ Formik — legacy, vẫn phổ biến ═══
// ⚠️ Controlled components → nhiều re-render
// ⚠️ Bundle lớn hơn (~13KB)
// ✅ API đơn giản, dễ học
// ✅ Dùng bởi: Airbnb, Lyft, NASA
// 📦 npm install formik

// ═══ Native React (useState) ═══
// ✅ Không cần thêm library
// ❌ Boilerplate nhiều khi form phức tạp
// ✅ Phù hợp: form đơn giản (1-3 fields)

// ═══ Khi nào dùng cái nào? ═══
// Form đơn giản (login, search)     → Native React hoặc RHF
// Form phức tạp (checkout, profile) → React Hook Form + Zod
// Form cũ đang dùng Formik         → Giữ Formik, migrate dần
// Next.js Server Actions            → RHF + Zod + Server Actions`}</CodeBlock>

                {/* ===== REACT HOOK FORM ===== */}
                <Heading2>📋 React Hook Form (RHF)</Heading2>

                <Paragraph>
                    React Hook Form dùng <Highlight>uncontrolled components</Highlight> — không re-render khi user gõ.
                    Đây là lý do nó nhanh hơn Formik đáng kể.
                </Paragraph>

                <CodeBlock title="terminal">{`# Cài đặt
npm install react-hook-form
npm install @hookform/resolvers zod  # validation với Zod`}</CodeBlock>

                <CodeBlock title="basic-form.tsx">{`'use client'
import { useForm } from 'react-hook-form'

type LoginForm = {
    email: string
    password: string
    remember: boolean
}

export default function LoginPage() {
    const {
        register,      // đăng ký field
        handleSubmit,  // wrap onSubmit
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const onSubmit = async (data: LoginForm) => {
        // data đã được validate, type-safe!
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error('Login failed')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register('email', {
                        required: 'Email là bắt buộc',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                            message: 'Email không hợp lệ',
                        },
                    })}
                />
                {errors.email && <p role="alert">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Mật khẩu</label>
                <input
                    id="password"
                    type="password"
                    {...register('password', {
                        required: 'Mật khẩu là bắt buộc',
                        minLength: { value: 8, message: 'Tối thiểu 8 ký tự' },
                    })}
                />
                {errors.password && <p role="alert">{errors.password.message}</p>}
            </div>

            <label>
                <input type="checkbox" {...register('remember')} />
                Ghi nhớ đăng nhập
            </label>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
        </form>
    )
}`}</CodeBlock>

                <CodeBlock title="rhf-api-reference.ts">{`const {
    register,       // (name, rules?) → đăng ký field
    handleSubmit,   // (onValid, onInvalid?) → wrap submit
    watch,          // (name?) → theo dõi giá trị field
    setValue,       // (name, value) → set giá trị programmatically
    getValues,      // (name?) → lấy giá trị không trigger re-render
    reset,          // (values?) → reset form
    trigger,        // (name?) → trigger validation manually
    control,        // Controller cho controlled components
    formState: {
        errors,         // object chứa errors theo field
        isSubmitting,   // đang submit?
        isValid,        // form hợp lệ?
        isDirty,        // user đã thay đổi?
        dirtyFields,    // fields nào đã thay đổi
        touchedFields,  // fields nào đã touched
    },
} = useForm<FormType>({
    defaultValues: {},       // giá trị mặc định
    mode: 'onSubmit',        // khi nào validate: onChange | onBlur | onSubmit | onTouched | all
    resolver: zodResolver(schema),  // external validation
})`}</CodeBlock>

                {/* ===== ZOD VALIDATION ===== */}
                <Heading2>🛡️ Zod Schema Validation</Heading2>

                <Paragraph>
                    Zod là <Highlight>TypeScript-first schema validation</Highlight> — define schema 1 lần,
                    dùng cho cả validation + TypeScript type. Combo chuẩn với React Hook Form.
                </Paragraph>

                <CodeBlock title="zod-schemas.ts">{`import { z } from 'zod'

// ═══ Schema cơ bản ═══
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email là bắt buộc')
        .email('Email không hợp lệ'),
    password: z
        .string()
        .min(8, 'Tối thiểu 8 ký tự')
        .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
        .regex(/[0-9]/, 'Cần ít nhất 1 số'),
    remember: z.boolean().default(false),
})

// Tự động infer TypeScript type từ schema!
export type LoginFormData = z.infer<typeof loginSchema>
// → { email: string; password: string; remember: boolean }

// ═══ Schema phức tạp ═══
export const productSchema = z.object({
    name: z.string().min(1, 'Tên sản phẩm là bắt buộc').max(100),
    price: z.coerce.number().min(0, 'Giá phải >= 0'),  // coerce: string → number
    category: z.enum(['electronics', 'clothing', 'food'], {
        errorMap: () => ({ message: 'Chọn danh mục' }),
    }),
    description: z.string().optional(),
    tags: z.array(z.string()).min(1, 'Cần ít nhất 1 tag'),
    inStock: z.boolean(),
    publishAt: z.coerce.date().optional(),
})

// ═══ Conditional validation ═══
const shippingSchema = z.object({
    method: z.enum(['delivery', 'pickup']),
    address: z.string().optional(),
    city: z.string().optional(),
}).refine(
    (data) => data.method !== 'delivery' || (data.address && data.city),
    { message: 'Địa chỉ bắt buộc khi giao hàng', path: ['address'] }
)

// ═══ Reuse & Compose schemas ═══
const addressSchema = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().regex(/^\\d{5}$/),
})

const orderSchema = z.object({
    customer: z.string(),
    shippingAddress: addressSchema,      // reuse!
    billingAddress: addressSchema,       // reuse!
    sameAsShipping: z.boolean(),
})

// ═══ Password confirmation ═══
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword,
    { message: 'Mật khẩu không khớp', path: ['confirmPassword'] }
)`}</CodeBlock>

                <CodeBlock title="form-with-zod.tsx">{`'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers'
import { productSchema, type ProductFormData } from '@/schemas/product'

export default function ProductForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<ProductFormData>({
            resolver: zodResolver(productSchema),  // ← Zod xử lý validation
            defaultValues: {
                name: '',
                price: 0,
                category: undefined,
                tags: [],
                inStock: true,
            },
        })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Tên sản phẩm" />
            {errors.name && <span>{errors.name.message}</span>}

            {/* price tự chuyển string → number nhờ z.coerce */}
            <input type="number" {...register('price')} />
            {errors.price && <span>{errors.price.message}</span>}

            <select {...register('category')}>
                <option value="">Chọn danh mục</option>
                <option value="electronics">Điện tử</option>
                <option value="clothing">Thời trang</option>
                <option value="food">Thực phẩm</option>
            </select>
            {errors.category && <span>{errors.category.message}</span>}

            <button disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </button>
        </form>
    )
}`}</CodeBlock>

                {/* ===== SERVER ACTIONS ===== */}
                <Heading2>⚡ Next.js Server Actions</Heading2>

                <Paragraph>
                    Server Actions cho phép <Highlight>validate + xử lý trên server</Highlight> —
                    progressive enhancement (form hoạt động cả khi JS tắt).
                </Paragraph>

                <CodeBlock title="actions/product.ts">{`'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
    name: z.string().min(1, 'Tên là bắt buộc'),
    price: z.coerce.number().min(0),
})

type ActionState = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
}

export async function createProduct(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    // 1. Parse & validate
    const result = schema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
    })

    if (!result.success) {
        return {
            success: false,
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        }
    }

    // 2. Server logic
    try {
        await db.product.create({ data: result.data })
        revalidatePath('/products')
        return { success: true, message: 'Đã tạo sản phẩm!' }
    } catch {
        return { success: false, message: 'Lỗi server' }
    }
}`}</CodeBlock>

                <CodeBlock title="product-form-server.tsx">{`'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { createProduct } from '@/actions/product'

// Component con — dùng useFormStatus
function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Đang xử lý...' : 'Tạo sản phẩm'}
        </button>
    )
}

export default function ProductForm() {
    const [state, formAction] = useActionState(createProduct, {
        success: false,
        message: '',
    })

    return (
        <form action={formAction}>
            <input name="name" placeholder="Tên sản phẩm" />
            {state.errors?.name && <p>{state.errors.name[0]}</p>}

            <input name="price" type="number" placeholder="Giá" />
            {state.errors?.price && <p>{state.errors.price[0]}</p>}

            <SubmitButton />

            {state.message && (
                <p className={state.success ? 'text-green-500' : 'text-red-500'}>
                    {state.message}
                </p>
            )}
        </form>
    )
}

// ═══ Kết hợp RHF + Server Actions ═══
// Dùng RHF để validate client-side (UX nhanh)
// Server Action validate lại server-side (bảo mật)
// → Best of both worlds!`}</CodeBlock>

                {/* ===== FIELD PATTERNS ===== */}
                <Heading2>🎯 Field Patterns</Heading2>

                <CodeBlock title="field-patterns.tsx">{`// ═══ 1. Controlled Components (Select, DatePicker...) ═══
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'

function EventForm() {
    const { control, handleSubmit } = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Controller cho third-party components */}
            <Controller
                name="date"
                control={control}
                rules={{ required: 'Chọn ngày' }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <span>{error.message}</span>}
                    </>
                )}
            />
        </form>
    )
}

// ═══ 2. Dynamic Fields (useFieldArray) ═══
import { useFieldArray, useForm } from 'react-hook-form'

type OrderForm = {
    items: { name: string; quantity: number; price: number }[]
}

function OrderForm() {
    const { register, control, handleSubmit } = useForm<OrderForm>({
        defaultValues: { items: [{ name: '', quantity: 1, price: 0 }] },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <input {...register(\`items.\${index}.name\`)} placeholder="Tên SP" />
                    <input type="number" {...register(\`items.\${index}.quantity\`)} />
                    <input type="number" {...register(\`items.\${index}.price\`)} />
                    <button type="button" onClick={() => remove(index)}>Xóa</button>
                </div>
            ))}
            <button type="button" onClick={() => append({ name: '', quantity: 1, price: 0 })}>
                + Thêm sản phẩm
            </button>
        </form>
    )
}

// ═══ 3. Conditional Fields ═══
function ShippingForm() {
    const { register, watch } = useForm()
    const method = watch('method')  // theo dõi giá trị

    return (
        <form>
            <select {...register('method')}>
                <option value="pickup">Nhận tại cửa hàng</option>
                <option value="delivery">Giao hàng</option>
            </select>

            {/* Chỉ hiện khi chọn delivery */}
            {method === 'delivery' && (
                <>
                    <input {...register('address', { required: 'Nhập địa chỉ' })} />
                    <input {...register('city', { required: 'Nhập thành phố' })} />
                </>
            )}
        </form>
    )
}

// ═══ 4. Dependent Fields (API-driven) ═══
function LocationForm() {
    const { register, watch, setValue } = useForm()
    const country = watch('country')

    // Load cities khi country thay đổi
    const { data: cities } = useSWR(
        country ? \`/api/cities?country=\${country}\` : null,
        fetcher
    )

    useEffect(() => {
        setValue('city', '')  // reset city khi đổi country
    }, [country, setValue])

    return (
        <form>
            <select {...register('country')}>
                <option value="VN">Việt Nam</option>
                <option value="US">United States</option>
            </select>

            <select {...register('city')}>
                <option value="">Chọn thành phố</option>
                {cities?.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </form>
    )
}`}</CodeBlock>

                {/* ===== ERROR HANDLING ===== */}
                <Heading2>❌ Error Handling</Heading2>

                <CodeBlock title="error-handling.tsx">{`// ═══ Field-level errors ═══
function FormField({ name, label, register, errors }) {
    const error = errors[name]

    return (
        <div className="form-field">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                {...register(name)}
                aria-invalid={!!error}
                aria-describedby={error ? \`\${name}-error\` : undefined}
                className={error ? 'border-red-500' : 'border-gray-300'}
            />
            {error && (
                <p id={\`\${name}-error\`} role="alert" className="text-red-500 text-sm">
                    {error.message}
                </p>
            )}
        </div>
    )
}

// ═══ Form-level errors (server errors) ═══
function LoginForm() {
    const { handleSubmit, setError, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST', body: JSON.stringify(data),
            })
            if (!res.ok) {
                const { error } = await res.json()
                // Set form-level error
                setError('root.serverError', { message: error })
                // Hoặc field-level
                setError('email', { message: 'Email chưa đăng ký' })
            }
        } catch {
            setError('root.serverError', { message: 'Không thể kết nối server' })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.serverError && (
                <div className="bg-red-50 p-3 rounded text-red-600">
                    {errors.root.serverError.message}
                </div>
            )}
            {/* ...fields */}
        </form>
    )
}

// ═══ Validation modes ═══
// mode: 'onSubmit'   → validate khi submit (default, ít intrusive)
// mode: 'onBlur'     → validate khi rời field (cân bằng UX)
// mode: 'onChange'    → validate mỗi keystroke (tốn performance)
// mode: 'onTouched'  → validate onChange SAU KHI đã blur lần đầu (khuyên dùng)
// mode: 'all'        → onBlur + onChange

useForm({ mode: 'onTouched' })  // ✅ Best UX — không soi lỗi quá sớm`}</CodeBlock>

                {/* ===== FILE UPLOAD ===== */}
                <Heading2>📎 File Upload</Heading2>

                <CodeBlock title="file-upload.tsx">{`'use client'
import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'

const MAX_SIZE = 5 * 1024 * 1024  // 5MB
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']

type UploadForm = {
    avatar: FileList
}

export default function AvatarUpload() {
    const { register, handleSubmit, formState: { errors } } = useForm<UploadForm>()
    const [preview, setPreview] = useState<string | null>(null)

    const onSubmit = async (data: UploadForm) => {
        const formData = new FormData()
        formData.append('avatar', data.avatar[0])

        await fetch('/api/upload', { method: 'POST', body: formData })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="file"
                accept="image/*"
                {...register('avatar', {
                    required: 'Chọn ảnh',
                    validate: {
                        size: (files) =>
                            !files[0] || files[0].size <= MAX_SIZE || 'Ảnh tối đa 5MB',
                        type: (files) =>
                            !files[0] || ACCEPTED.includes(files[0].type) || 'Chỉ chấp nhận JPG, PNG, WebP',
                    },
                })}
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setPreview(URL.createObjectURL(file))
                }}
            />
            {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded" />}
            {errors.avatar && <p>{errors.avatar.message}</p>}
            <button type="submit">Upload</button>
        </form>
    )
}

// ═══ Drag & Drop Pattern ═══
function DragDropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
    const [isDragging, setDragging] = useState(false)

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragging(false)
        const files = Array.from(e.dataTransfer.files)
        onFiles(files)
    }, [onFiles])

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={\`border-2 border-dashed rounded-xl p-8 text-center
                \${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}\`}
        >
            <p>Kéo thả file vào đây hoặc</p>
            <label className="cursor-pointer text-blue-500 underline">
                chọn file
                <input type="file" multiple className="hidden"
                    onChange={(e) => onFiles(Array.from(e.target.files || []))} />
            </label>
        </div>
    )
}`}</CodeBlock>

                {/* ===== MULTI-STEP ===== */}
                <Heading2>🔀 Multi-step Forms</Heading2>

                <CodeBlock title="multi-step-form.tsx">{`'use client'
import { useState } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers'
import { z } from 'zod'

// Schema cho từng step
const step1Schema = z.object({
    name: z.string().min(1, 'Tên là bắt buộc'),
    email: z.string().email('Email không hợp lệ'),
})

const step2Schema = z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    phone: z.string().regex(/^0\\d{9}$/, 'SĐT: 0xxxxxxxxx'),
})

const step3Schema = z.object({
    cardNumber: z.string().regex(/^\\d{16}$/, '16 chữ số'),
    expiry: z.string().regex(/^\\d{2}\\/\\d{2}$/, 'MM/YY'),
    cvv: z.string().regex(/^\\d{3}$/, '3 chữ số'),
})

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema)
type CheckoutData = z.infer<typeof fullSchema>

const schemas = [step1Schema, step2Schema, step3Schema]
const stepTitles = ['Thông tin', 'Địa chỉ', 'Thanh toán']

export default function CheckoutWizard() {
    const [step, setStep] = useState(0)
    const methods = useForm<CheckoutData>({
        resolver: zodResolver(schemas[step]),
        mode: 'onTouched',
    })

    const next = async () => {
        const valid = await methods.trigger()  // validate step hiện tại
        if (valid) setStep(s => Math.min(s + 1, 2))
    }

    const back = () => setStep(s => Math.max(s - 1, 0))

    const onSubmit = async (data: CheckoutData) => {
        await fetch('/api/orders', {
            method: 'POST', body: JSON.stringify(data),
        })
    }

    return (
        <FormProvider {...methods}>
            {/* Progress indicator */}
            <div className="flex gap-2 mb-6">
                {stepTitles.map((title, i) => (
                    <div key={i} className={\`flex-1 h-2 rounded \${i <= step ? 'bg-blue-500' : 'bg-gray-200'}\`} />
                ))}
            </div>

            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {step === 0 && <Step1 />}
                {step === 1 && <Step2 />}
                {step === 2 && <Step3 />}

                <div className="flex gap-4 mt-6">
                    {step > 0 && <button type="button" onClick={back}>Quay lại</button>}
                    {step < 2
                        ? <button type="button" onClick={next}>Tiếp theo</button>
                        : <button type="submit">Thanh toán</button>
                    }
                </div>
            </form>
        </FormProvider>
    )
}

// Step components dùng useFormContext
function Step1() {
    const { register, formState: { errors } } = useFormContext()
    return (
        <>
            <input {...register('name')} placeholder="Họ tên" />
            {errors.name && <p>{errors.name.message as string}</p>}
            <input {...register('email')} placeholder="Email" />
            {errors.email && <p>{errors.email.message as string}</p>}
        </>
    )
}`}</CodeBlock>

                {/* ===== UX PATTERNS ===== */}
                <Heading2>🎨 UX Patterns</Heading2>

                <CodeBlock title="ux-patterns.tsx">{`// ═══ 1. Debounced validation (username check) ═══
import { useDebouncedCallback } from 'use-debounce'

function UsernameField() {
    const { register, setError, clearErrors } = useFormContext()

    const checkUsername = useDebouncedCallback(async (value: string) => {
        if (!value) return
        const res = await fetch(\`/api/check-username?q=\${value}\`)
        const { available } = await res.json()
        if (!available) {
            setError('username', { message: 'Username đã được sử dụng' })
        } else {
            clearErrors('username')
        }
    }, 500)  // chờ 500ms sau khi ngừng gõ

    return <input {...register('username')} onChange={(e) => checkUsername(e.target.value)} />
}

// ═══ 2. Auto-save draft ═══
function AutoSaveForm() {
    const methods = useForm()

    // Auto-save mỗi 3 giây khi có thay đổi
    useEffect(() => {
        const subscription = methods.watch((data) => {
            localStorage.setItem('form-draft', JSON.stringify(data))
        })
        return () => subscription.unsubscribe()
    }, [methods])

    // Restore draft on mount
    useEffect(() => {
        const draft = localStorage.getItem('form-draft')
        if (draft) methods.reset(JSON.parse(draft))
    }, [methods])

    return <form>...</form>
}

// ═══ 3. Optimistic UI ═══
function QuickToggle({ productId, initialStock }: Props) {
    const [inStock, setInStock] = useState(initialStock)

    const toggle = async () => {
        const newValue = !inStock
        setInStock(newValue)  // ← optimistic update (UI đổi ngay)

        try {
            await fetch(\`/api/products/\${productId}\`, {
                method: 'PATCH',
                body: JSON.stringify({ inStock: newValue }),
            })
        } catch {
            setInStock(initialStock)  // ← rollback nếu lỗi
            toast.error('Cập nhật thất bại')
        }
    }

    return <button onClick={toggle}>{inStock ? '✅ Còn hàng' : '❌ Hết hàng'}</button>
}

// ═══ 4. Smart submit button ═══
function SmartSubmitButton() {
    const { formState: { isSubmitting, isValid, isDirty } } = useFormContext()

    return (
        <button
            type="submit"
            disabled={isSubmitting || !isValid || !isDirty}
            className={isSubmitting ? 'opacity-50 cursor-wait' : ''}
        >
            {isSubmitting ? (
                <><Spinner /> Đang xử lý...</>
            ) : !isDirty ? (
                'Chưa thay đổi'
            ) : !isValid ? (
                'Kiểm tra lại form'
            ) : (
                'Lưu thay đổi'
            )}
        </button>
    )
}`}</CodeBlock>

                {/* ===== ANTI-PATTERNS ===== */}
                <Heading2>🚫 Anti-patterns — Những sai lầm cần tránh</Heading2>

                <CodeBlock title="anti-patterns.ts">{`// ❌ #1: Dùng useState cho mỗi field
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
// 10 fields = 10 useState = 10 re-renders mỗi keystroke!
// ✅ Dùng React Hook Form — 0 re-renders khi gõ

// ❌ #2: Validate chỉ ở client
const onSubmit = (data) => {
    fetch('/api/create', { body: JSON.stringify(data) })
    // Server không validate → SQL injection, XSS, invalid data!
}
// ✅ Validate ở CẢ client (UX) VÀ server (bảo mật)

// ❌ #3: Không disable submit khi đang xử lý
<button type="submit">Submit</button>  // User click 5 lần = 5 requests!
// ✅ Disable + loading state
<button disabled={isSubmitting}>
    {isSubmitting ? 'Đang xử lý...' : 'Submit'}
</button>

// ❌ #4: Error chỉ hiện sau submit
// User gõ xong cả form mới biết lỗi → frustrating
// ✅ Dùng mode: 'onTouched' — hiện lỗi khi rời field

// ❌ #5: Không reset form sau submit thành công
onSubmit(data) {
    await createProduct(data)
    // Form vẫn giữ data cũ → user nhầm là chưa submit
}
// ✅ Reset sau thành công
onSubmit(data) {
    await createProduct(data)
    reset()  // ← clear form
    toast.success('Đã tạo sản phẩm!')
}

// ❌ #6: Dùng onChange cho mọi validation
<input onChange={(e) => {
    setValue(e.target.value)
    if (!e.target.value) setError('Required!')  // Mỗi keystroke!
}} />
// ✅ Dùng register + rules, RHF tự xử lý

// ❌ #7: Không xử lý network errors
onSubmit(data) {
    await fetch('/api/create', { body: JSON.stringify(data) })
    // Nếu network fail → user không biết!
}
// ✅ Try/catch + setError
try { ... } catch (e) {
    setError('root.serverError', { message: 'Lỗi kết nối' })
}

// ❌ #8: Quên noValidate trên form
<form onSubmit={handleSubmit(onSubmit)}>  // Browser validate xung đột RHF!
// ✅ Thêm noValidate
<form onSubmit={handleSubmit(onSubmit)} noValidate>`}</CodeBlock>

                {/* ===== SENIOR TIPS ===== */}
                <Heading2>👨‍💻 Senior-Level Tips</Heading2>

                <CodeBlock title="senior-patterns.ts">{`// 1. ✅ Reusable Form Field Component
type FormFieldProps = {
    name: string
    label: string
    type?: string
    placeholder?: string
}

function FormField({ name, label, type = 'text', placeholder }: FormFieldProps) {
    const { register, formState: { errors } } = useFormContext()
    const error = errors[name]

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-1">
                {label}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                aria-invalid={!!error}
                aria-describedby={error ? \`\${name}-error\` : undefined}
                className={\`w-full px-3 py-2 border rounded-lg
                    \${error ? 'border-red-500' : 'border-gray-300'}\`}
            />
            {error && (
                <p id={\`\${name}-error\`} role="alert" className="mt-1 text-sm text-red-500">
                    {error.message as string}
                </p>
            )}
        </div>
    )
}

// Dùng trong form:
<FormProvider {...methods}>
    <FormField name="email" label="Email" type="email" />
    <FormField name="password" label="Mật khẩu" type="password" />
</FormProvider>

// 2. ✅ Custom hook cho form logic
function useProductForm(productId?: string) {
    const methods = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    })

    // Load existing data if editing
    useEffect(() => {
        if (productId) {
            fetch(\`/api/products/\${productId}\`)
                .then(r => r.json())
                .then(data => methods.reset(data))
        }
    }, [productId, methods])

    const onSubmit = async (data: ProductFormData) => {
        const url = productId
            ? \`/api/products/\${productId}\`
            : '/api/products'
        await fetch(url, {
            method: productId ? 'PUT' : 'POST',
            body: JSON.stringify(data),
        })
    }

    return { methods, onSubmit, isEditing: !!productId }
}

// 3. ✅ Testing forms
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('shows validation errors', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    // Submit empty → errors appear
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(await screen.findByText('Email là bắt buộc')).toBeVisible()

    // Fill valid data → errors disappear
    await user.type(screen.getByLabelText('Email'), 'test@mail.com')
    expect(screen.queryByText('Email là bắt buộc')).not.toBeInTheDocument()
})

// 4. ✅ Accessibility checklist
// ✓ <label htmlFor="..."> liên kết với <input id="...">
// ✓ aria-invalid={!!error} trên input có lỗi
// ✓ aria-describedby="error-id" liên kết input với error message
// ✓ role="alert" trên error message
// ✓ noValidate trên <form> (dùng custom validation)
// ✓ Keyboard navigation: Tab qua được mọi field
// ✓ Focus management: focus vào field lỗi đầu tiên sau submit

// 5. ✅ Form performance
// Tránh re-render cả form khi 1 field thay đổi:
const name = watch('name')  // ❌ Re-render toàn form!
// ✅ Dùng useWatch cho component cụ thể
function NamePreview() {
    const name = useWatch({ name: 'name' })  // chỉ re-render component này
    return <p>Preview: {name}</p>
}`}</CodeBlock>

                {/* ===== CHEAT SHEET ===== */}
                <Heading2>📋 Cheat Sheet</Heading2>

                <CodeBlock title="cheat-sheet.ts">{`// ═══ React Hook Form ═══
useForm({ resolver: zodResolver(schema), mode: 'onTouched' })
register('name')                    // đăng ký field
handleSubmit(onSubmit)              // wrap submit handler
watch('field')                      // theo dõi giá trị
setValue('field', value)            // set giá trị
reset()                             // reset form
trigger('field')                    // trigger validation
setError('field', { message })     // set error manually
formState: { errors, isSubmitting, isValid, isDirty }

// ═══ Zod ═══
z.string().min(1).email()           // string validation
z.coerce.number().min(0)            // auto string → number
z.enum(['a', 'b'])                  // enum
z.array(z.string()).min(1)          // array
z.object({}).refine(fn, { message }) // custom validation
z.infer<typeof schema>              // infer TypeScript type

// ═══ Server Actions ═══
'use server'                         // đánh dấu server function
useActionState(action, initialState) // form state management
useFormStatus()                      // pending state (trong component con)
schema.safeParse(data)              // validate không throw

// ═══ Patterns ═══
<Controller />                       // controlled third-party components
useFieldArray({ control, name })    // dynamic fields (add/remove)
<FormProvider {...methods}>          // share form qua context
useFormContext()                      // dùng form từ context
useWatch({ name })                   // watch không re-render parent`}</CodeBlock>

                <Callout type="tip">
                    <strong>Quy tắc vàng:</strong> Validate ở client cho UX (nhanh, instant feedback),
                    validate lại ở server cho bảo mật (không bao giờ tin client).
                    <strong> React Hook Form + Zod + Server Actions</strong> = combo hoàn hảo.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    Forms are the <Highlight>most complex part</Highlight> of frontend — validation, state management,
                    error handling, UX, accessibility. This guide covers all patterns and best practices
                    with React Hook Form + Zod + Next.js Server Actions.
                </Paragraph>

                <Callout type="info">
                    <strong>React Hook Form + Zod</strong> is the most popular combo today — used by Vercel,
                    GitHub, Shopify. Uncontrolled approach yields ~70% better performance than Formik.
                </Callout>

                {/* ===== OVERVIEW ===== */}
                <Heading2>🏗️ Form Libraries & When to Use</Heading2>

                <CodeBlock title="library-comparison.ts">{`// ═══ React Hook Form (RHF) — recommended ═══
// ✅ Uncontrolled components → fewer re-renders
// ✅ Small bundle (~9KB gzipped)
// ✅ TypeScript-first, integrated validation
// ✅ Used by: Vercel, GitHub, Shopify, Twitch
// 📦 npm install react-hook-form

// ═══ Formik — legacy, still popular ═══
// ⚠️ Controlled components → more re-renders
// ⚠️ Larger bundle (~13KB)
// ✅ Simple API, easy to learn
// ✅ Used by: Airbnb, Lyft, NASA
// 📦 npm install formik

// ═══ Native React (useState) ═══
// ✅ No extra library needed
// ❌ Heavy boilerplate for complex forms
// ✅ Best for: simple forms (1-3 fields)

// ═══ When to use what? ═══
// Simple forms (login, search)      → Native React or RHF
// Complex forms (checkout, profile) → React Hook Form + Zod
// Legacy forms using Formik         → Keep Formik, migrate gradually
// Next.js Server Actions             → RHF + Zod + Server Actions`}</CodeBlock>

                {/* ===== REACT HOOK FORM ===== */}
                <Heading2>📋 React Hook Form (RHF)</Heading2>

                <Paragraph>
                    React Hook Form uses <Highlight>uncontrolled components</Highlight> — no re-renders when user types.
                    This is why it&apos;s significantly faster than Formik.
                </Paragraph>

                <CodeBlock title="terminal">{`# Installation
npm install react-hook-form
npm install @hookform/resolvers zod  # validation with Zod`}</CodeBlock>

                <CodeBlock title="basic-form.tsx">{`'use client'
import { useForm } from 'react-hook-form'

type LoginForm = {
    email: string
    password: string
    remember: boolean
}

export default function LoginPage() {
    const {
        register,      // register a field
        handleSubmit,  // wrap onSubmit
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const onSubmit = async (data: LoginForm) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error('Login failed')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && <p role="alert">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Minimum 8 characters' },
                    })}
                />
                {errors.password && <p role="alert">{errors.password.message}</p>}
            </div>

            <label>
                <input type="checkbox" {...register('remember')} />
                Remember me
            </label>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Sign in'}
            </button>
        </form>
    )
}`}</CodeBlock>

                <CodeBlock title="rhf-api-reference.ts">{`const {
    register,       // (name, rules?) → register a field
    handleSubmit,   // (onValid, onInvalid?) → wrap submit
    watch,          // (name?) → watch field value
    setValue,       // (name, value) → set value programmatically
    getValues,      // (name?) → get value without re-render
    reset,          // (values?) → reset form
    trigger,        // (name?) → trigger validation manually
    control,        // Controller for controlled components
    formState: {
        errors,         // errors object by field
        isSubmitting,   // submitting?
        isValid,        // form valid?
        isDirty,        // user made changes?
        dirtyFields,    // which fields changed
        touchedFields,  // which fields touched
    },
} = useForm<FormType>({
    defaultValues: {},       // default values
    mode: 'onSubmit',        // when to validate: onChange | onBlur | onSubmit | onTouched | all
    resolver: zodResolver(schema),  // external validation
})`}</CodeBlock>

                {/* ===== ZOD VALIDATION ===== */}
                <Heading2>🛡️ Zod Schema Validation</Heading2>

                <Paragraph>
                    Zod is <Highlight>TypeScript-first schema validation</Highlight> — define schema once,
                    use for both validation + TypeScript types. Standard combo with React Hook Form.
                </Paragraph>

                <CodeBlock title="zod-schemas.ts">{`import { z } from 'zod'

// ═══ Basic schema ═══
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Minimum 8 characters')
        .regex(/[A-Z]/, 'Need at least 1 uppercase letter')
        .regex(/[0-9]/, 'Need at least 1 number'),
    remember: z.boolean().default(false),
})

// Automatically infer TypeScript type from schema!
export type LoginFormData = z.infer<typeof loginSchema>
// → { email: string; password: string; remember: boolean }

// ═══ Complex schema ═══
export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required').max(100),
    price: z.coerce.number().min(0, 'Price must be >= 0'),  // coerce: string → number
    category: z.enum(['electronics', 'clothing', 'food'], {
        errorMap: () => ({ message: 'Select a category' }),
    }),
    description: z.string().optional(),
    tags: z.array(z.string()).min(1, 'Need at least 1 tag'),
    inStock: z.boolean(),
})

// ═══ Conditional validation ═══
const shippingSchema = z.object({
    method: z.enum(['delivery', 'pickup']),
    address: z.string().optional(),
    city: z.string().optional(),
}).refine(
    (data) => data.method !== 'delivery' || (data.address && data.city),
    { message: 'Address required for delivery', path: ['address'] }
)

// ═══ Password confirmation ═══
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword,
    { message: 'Passwords do not match', path: ['confirmPassword'] }
)`}</CodeBlock>

                <CodeBlock title="form-with-zod.tsx">{`'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers'
import { productSchema, type ProductFormData } from '@/schemas/product'

export default function ProductForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<ProductFormData>({
            resolver: zodResolver(productSchema),  // ← Zod handles validation
            defaultValues: {
                name: '',
                price: 0,
                category: undefined,
                tags: [],
                inStock: true,
            },
        })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Product name" />
            {errors.name && <span>{errors.name.message}</span>}

            {/* price auto-converts string → number via z.coerce */}
            <input type="number" {...register('price')} />
            {errors.price && <span>{errors.price.message}</span>}

            <select {...register('category')}>
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
            </select>
            {errors.category && <span>{errors.category.message}</span>}

            <button disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save product'}
            </button>
        </form>
    )
}`}</CodeBlock>

                {/* ===== SERVER ACTIONS ===== */}
                <Heading2>⚡ Next.js Server Actions</Heading2>

                <Paragraph>
                    Server Actions let you <Highlight>validate + process on the server</Highlight> —
                    progressive enhancement (forms work even with JS disabled).
                </Paragraph>

                <CodeBlock title="actions/product.ts">{`'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.coerce.number().min(0),
})

type ActionState = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
}

export async function createProduct(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    // 1. Parse & validate
    const result = schema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
    })

    if (!result.success) {
        return {
            success: false,
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        }
    }

    // 2. Server logic
    try {
        await db.product.create({ data: result.data })
        revalidatePath('/products')
        return { success: true, message: 'Product created!' }
    } catch {
        return { success: false, message: 'Server error' }
    }
}`}</CodeBlock>

                <CodeBlock title="product-form-server.tsx">{`'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { createProduct } from '@/actions/product'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Processing...' : 'Create product'}
        </button>
    )
}

export default function ProductForm() {
    const [state, formAction] = useActionState(createProduct, {
        success: false,
        message: '',
    })

    return (
        <form action={formAction}>
            <input name="name" placeholder="Product name" />
            {state.errors?.name && <p>{state.errors.name[0]}</p>}

            <input name="price" type="number" placeholder="Price" />
            {state.errors?.price && <p>{state.errors.price[0]}</p>}

            <SubmitButton />

            {state.message && (
                <p className={state.success ? 'text-green-500' : 'text-red-500'}>
                    {state.message}
                </p>
            )}
        </form>
    )
}

// ═══ Combining RHF + Server Actions ═══
// Use RHF for client-side validation (fast UX)
// Server Action re-validates server-side (security)
// → Best of both worlds!`}</CodeBlock>

                {/* ===== FIELD PATTERNS ===== */}
                <Heading2>🎯 Field Patterns</Heading2>

                <CodeBlock title="field-patterns.tsx">{`// ═══ 1. Controlled Components (Select, DatePicker...) ═══
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'

function EventForm() {
    const { control, handleSubmit } = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="date"
                control={control}
                rules={{ required: 'Select a date' }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <span>{error.message}</span>}
                    </>
                )}
            />
        </form>
    )
}

// ═══ 2. Dynamic Fields (useFieldArray) ═══
import { useFieldArray, useForm } from 'react-hook-form'

type OrderForm = {
    items: { name: string; quantity: number; price: number }[]
}

function OrderForm() {
    const { register, control, handleSubmit } = useForm<OrderForm>({
        defaultValues: { items: [{ name: '', quantity: 1, price: 0 }] },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <input {...register(\`items.\${index}.name\`)} placeholder="Product" />
                    <input type="number" {...register(\`items.\${index}.quantity\`)} />
                    <input type="number" {...register(\`items.\${index}.price\`)} />
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => append({ name: '', quantity: 1, price: 0 })}>
                + Add item
            </button>
        </form>
    )
}

// ═══ 3. Conditional Fields ═══
function ShippingForm() {
    const { register, watch } = useForm()
    const method = watch('method')

    return (
        <form>
            <select {...register('method')}>
                <option value="pickup">Store pickup</option>
                <option value="delivery">Delivery</option>
            </select>

            {method === 'delivery' && (
                <>
                    <input {...register('address', { required: 'Enter address' })} />
                    <input {...register('city', { required: 'Enter city' })} />
                </>
            )}
        </form>
    )
}

// ═══ 4. Dependent Fields (API-driven) ═══
function LocationForm() {
    const { register, watch, setValue } = useForm()
    const country = watch('country')

    const { data: cities } = useSWR(
        country ? \`/api/cities?country=\${country}\` : null,
        fetcher
    )

    useEffect(() => {
        setValue('city', '')
    }, [country, setValue])

    return (
        <form>
            <select {...register('country')}>
                <option value="VN">Vietnam</option>
                <option value="US">United States</option>
            </select>

            <select {...register('city')}>
                <option value="">Select city</option>
                {cities?.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </form>
    )
}`}</CodeBlock>

                {/* ===== ERROR HANDLING ===== */}
                <Heading2>❌ Error Handling</Heading2>

                <CodeBlock title="error-handling.tsx">{`// ═══ Field-level errors ═══
function FormField({ name, label, register, errors }) {
    const error = errors[name]
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                {...register(name)}
                aria-invalid={!!error}
                aria-describedby={error ? \`\${name}-error\` : undefined}
            />
            {error && (
                <p id={\`\${name}-error\`} role="alert" className="text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )
}

// ═══ Form-level errors (server errors) ═══
function LoginForm() {
    const { handleSubmit, setError, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST', body: JSON.stringify(data),
            })
            if (!res.ok) {
                const { error } = await res.json()
                setError('root.serverError', { message: error })
                setError('email', { message: 'Email not registered' })
            }
        } catch {
            setError('root.serverError', { message: 'Cannot connect to server' })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.serverError && (
                <div className="bg-red-50 p-3 rounded text-red-600">
                    {errors.root.serverError.message}
                </div>
            )}
        </form>
    )
}

// ═══ Validation modes ═══
// mode: 'onSubmit'   → validate on submit (default, least intrusive)
// mode: 'onBlur'     → validate when leaving field (balanced)
// mode: 'onChange'    → validate every keystroke (costly)
// mode: 'onTouched'  → onChange AFTER first blur (recommended)
// mode: 'all'        → onBlur + onChange

useForm({ mode: 'onTouched' })  // ✅ Best UX — no premature error display`}</CodeBlock>

                {/* ===== FILE UPLOAD ===== */}
                <Heading2>📎 File Upload</Heading2>

                <CodeBlock title="file-upload.tsx">{`'use client'
import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'

const MAX_SIZE = 5 * 1024 * 1024  // 5MB
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']

export default function AvatarUpload() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [preview, setPreview] = useState<string | null>(null)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="file"
                accept="image/*"
                {...register('avatar', {
                    required: 'Select an image',
                    validate: {
                        size: (files) =>
                            !files[0] || files[0].size <= MAX_SIZE || 'Max 5MB',
                        type: (files) =>
                            !files[0] || ACCEPTED.includes(files[0].type) || 'Only JPG, PNG, WebP',
                    },
                })}
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setPreview(URL.createObjectURL(file))
                }}
            />
            {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded" />}
            {errors.avatar && <p>{errors.avatar.message}</p>}
        </form>
    )
}

// ═══ Drag & Drop Pattern ═══
function DragDropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
    const [isDragging, setDragging] = useState(false)

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragging(false)
        onFiles(Array.from(e.dataTransfer.files))
    }, [onFiles])

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={\`border-2 border-dashed rounded-xl p-8 text-center
                \${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}\`}
        >
            <p>Drag and drop files here or</p>
            <label className="cursor-pointer text-blue-500 underline">
                browse files
                <input type="file" multiple className="hidden"
                    onChange={(e) => onFiles(Array.from(e.target.files || []))} />
            </label>
        </div>
    )
}`}</CodeBlock>

                {/* ===== MULTI-STEP ===== */}
                <Heading2>🔀 Multi-step Forms</Heading2>

                <CodeBlock title="multi-step-form.tsx">{`'use client'
import { useState } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers'
import { z } from 'zod'

// Schema per step
const step1Schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
})

const step2Schema = z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    phone: z.string().min(10, 'Valid phone number required'),
})

const step3Schema = z.object({
    cardNumber: z.string().regex(/^\\d{16}$/, '16 digits'),
    expiry: z.string().regex(/^\\d{2}\\/\\d{2}$/, 'MM/YY'),
    cvv: z.string().regex(/^\\d{3}$/, '3 digits'),
})

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema)
type CheckoutData = z.infer<typeof fullSchema>

const schemas = [step1Schema, step2Schema, step3Schema]
const stepTitles = ['Info', 'Address', 'Payment']

export default function CheckoutWizard() {
    const [step, setStep] = useState(0)
    const methods = useForm<CheckoutData>({
        resolver: zodResolver(schemas[step]),
        mode: 'onTouched',
    })

    const next = async () => {
        const valid = await methods.trigger()
        if (valid) setStep(s => Math.min(s + 1, 2))
    }

    const back = () => setStep(s => Math.max(s - 1, 0))

    const onSubmit = async (data: CheckoutData) => {
        await fetch('/api/orders', {
            method: 'POST', body: JSON.stringify(data),
        })
    }

    return (
        <FormProvider {...methods}>
            {/* Progress indicator */}
            <div className="flex gap-2 mb-6">
                {stepTitles.map((title, i) => (
                    <div key={i} className={\`flex-1 h-2 rounded \${i <= step ? 'bg-blue-500' : 'bg-gray-200'}\`} />
                ))}
            </div>

            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {step === 0 && <Step1 />}
                {step === 1 && <Step2 />}
                {step === 2 && <Step3 />}

                <div className="flex gap-4 mt-6">
                    {step > 0 && <button type="button" onClick={back}>Back</button>}
                    {step < 2
                        ? <button type="button" onClick={next}>Next</button>
                        : <button type="submit">Pay</button>
                    }
                </div>
            </form>
        </FormProvider>
    )
}

function Step1() {
    const { register, formState: { errors } } = useFormContext()
    return (
        <>
            <input {...register('name')} placeholder="Full name" />
            {errors.name && <p>{errors.name.message as string}</p>}
            <input {...register('email')} placeholder="Email" />
            {errors.email && <p>{errors.email.message as string}</p>}
        </>
    )
}`}</CodeBlock>

                {/* ===== UX PATTERNS ===== */}
                <Heading2>🎨 UX Patterns</Heading2>

                <CodeBlock title="ux-patterns.tsx">{`// ═══ 1. Debounced validation (username check) ═══
import { useDebouncedCallback } from 'use-debounce'

function UsernameField() {
    const { register, setError, clearErrors } = useFormContext()

    const checkUsername = useDebouncedCallback(async (value: string) => {
        if (!value) return
        const res = await fetch(\`/api/check-username?q=\${value}\`)
        const { available } = await res.json()
        if (!available) setError('username', { message: 'Username taken' })
        else clearErrors('username')
    }, 500)

    return <input {...register('username')} onChange={(e) => checkUsername(e.target.value)} />
}

// ═══ 2. Auto-save draft ═══
function AutoSaveForm() {
    const methods = useForm()

    useEffect(() => {
        const sub = methods.watch((data) => {
            localStorage.setItem('form-draft', JSON.stringify(data))
        })
        return () => sub.unsubscribe()
    }, [methods])

    useEffect(() => {
        const draft = localStorage.getItem('form-draft')
        if (draft) methods.reset(JSON.parse(draft))
    }, [methods])

    return <form>...</form>
}

// ═══ 3. Optimistic UI ═══
function QuickToggle({ productId, initialStock }: Props) {
    const [inStock, setInStock] = useState(initialStock)

    const toggle = async () => {
        const newValue = !inStock
        setInStock(newValue)  // ← optimistic update

        try {
            await fetch(\`/api/products/\${productId}\`, {
                method: 'PATCH',
                body: JSON.stringify({ inStock: newValue }),
            })
        } catch {
            setInStock(initialStock)  // ← rollback on error
            toast.error('Update failed')
        }
    }

    return <button onClick={toggle}>{inStock ? '✅ In stock' : '❌ Out of stock'}</button>
}

// ═══ 4. Smart submit button ═══
function SmartSubmitButton() {
    const { formState: { isSubmitting, isValid, isDirty } } = useFormContext()

    return (
        <button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
            {isSubmitting ? 'Processing...'
                : !isDirty ? 'No changes'
                : !isValid ? 'Check form'
                : 'Save changes'}
        </button>
    )
}`}</CodeBlock>

                {/* ===== ANTI-PATTERNS ===== */}
                <Heading2>🚫 Anti-patterns — Common Mistakes to Avoid</Heading2>

                <CodeBlock title="anti-patterns.ts">{`// ❌ #1: useState for every field
const [name, setName] = useState('')
const [email, setEmail] = useState('')
// 10 fields = 10 useState = 10 re-renders per keystroke!
// ✅ Use React Hook Form — 0 re-renders while typing

// ❌ #2: Client-only validation
const onSubmit = (data) => {
    fetch('/api/create', { body: JSON.stringify(data) })
    // Server doesn't validate → SQL injection, invalid data!
}
// ✅ Validate on BOTH client (UX) AND server (security)

// ❌ #3: Not disabling submit while processing
<button type="submit">Submit</button>  // 5 clicks = 5 requests!
// ✅ Disable + loading state
<button disabled={isSubmitting}>
    {isSubmitting ? 'Processing...' : 'Submit'}
</button>

// ❌ #4: Errors only after submit
// ✅ Use mode: 'onTouched' — show errors when leaving field

// ❌ #5: Not resetting form after success
// ✅ reset() + toast.success('Created!')

// ❌ #6: Missing noValidate on form
<form onSubmit={handleSubmit(onSubmit)}>  // Browser validation conflicts!
// ✅ Add noValidate
<form onSubmit={handleSubmit(onSubmit)} noValidate>

// ❌ #7: Not handling network errors
// ✅ try/catch + setError('root.serverError', { message })

// ❌ #8: onChange for all validation
// ✅ Use register + rules, RHF handles it automatically`}</CodeBlock>

                {/* ===== SENIOR TIPS ===== */}
                <Heading2>👨‍💻 Senior-Level Tips</Heading2>

                <CodeBlock title="senior-patterns.ts">{`// 1. ✅ Reusable Form Field Component
function FormField({ name, label, type = 'text' }: FormFieldProps) {
    const { register, formState: { errors } } = useFormContext()
    const error = errors[name]

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input id={name} type={type} {...register(name)}
                aria-invalid={!!error}
                aria-describedby={error ? \`\${name}-error\` : undefined} />
            {error && <p id={\`\${name}-error\`} role="alert">{error.message as string}</p>}
        </div>
    )
}

// 2. ✅ Custom hook for form logic
function useProductForm(productId?: string) {
    const methods = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    })

    useEffect(() => {
        if (productId) {
            fetch(\`/api/products/\${productId}\`)
                .then(r => r.json())
                .then(data => methods.reset(data))
        }
    }, [productId, methods])

    const onSubmit = async (data: ProductFormData) => {
        const url = productId ? \`/api/products/\${productId}\` : '/api/products'
        await fetch(url, {
            method: productId ? 'PUT' : 'POST',
            body: JSON.stringify(data),
        })
    }

    return { methods, onSubmit, isEditing: !!productId }
}

// 3. ✅ Testing forms
test('shows validation errors', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(await screen.findByText('Email is required')).toBeVisible()
})

// 4. ✅ Accessibility checklist
// ✓ <label htmlFor> linked with <input id>
// ✓ aria-invalid={!!error} on invalid inputs
// ✓ aria-describedby linking input to error message
// ✓ role="alert" on error messages
// ✓ noValidate on <form>
// ✓ Keyboard navigable: Tab through all fields
// ✓ Focus first invalid field after submit

// 5. ✅ Form performance
const name = watch('name')  // ❌ Re-renders entire form!
// ✅ Use useWatch in specific component
function NamePreview() {
    const name = useWatch({ name: 'name' })  // only re-renders this component
    return <p>Preview: {name}</p>
}`}</CodeBlock>

                {/* ===== CHEAT SHEET ===== */}
                <Heading2>📋 Cheat Sheet</Heading2>

                <CodeBlock title="cheat-sheet.ts">{`// ═══ React Hook Form ═══
useForm({ resolver: zodResolver(schema), mode: 'onTouched' })
register('name')                    // register field
handleSubmit(onSubmit)              // wrap submit handler
watch('field')                      // watch value
setValue('field', value)            // set value
reset()                             // reset form
trigger('field')                    // trigger validation
setError('field', { message })     // set error manually
formState: { errors, isSubmitting, isValid, isDirty }

// ═══ Zod ═══
z.string().min(1).email()           // string validation
z.coerce.number().min(0)            // auto string → number
z.enum(['a', 'b'])                  // enum
z.array(z.string()).min(1)          // array
z.object({}).refine(fn, { message }) // custom validation
z.infer<typeof schema>              // infer TypeScript type

// ═══ Server Actions ═══
'use server'                         // mark server function
useActionState(action, initialState) // form state management
useFormStatus()                      // pending state (child component)
schema.safeParse(data)              // validate without throwing

// ═══ Patterns ═══
<Controller />                       // controlled third-party components
useFieldArray({ control, name })    // dynamic fields (add/remove)
<FormProvider {...methods}>          // share form via context
useFormContext()                      // consume form from context
useWatch({ name })                   // watch without re-rendering parent`}</CodeBlock>

                <Callout type="tip">
                    <strong>Golden rule:</strong> Validate on client for UX (fast, instant feedback),
                    re-validate on server for security (never trust the client).
                    <strong> React Hook Form + Zod + Server Actions</strong> = the perfect combo.
                </Callout>
            </>
        ),
    },
}

export default reactFormsPatterns
