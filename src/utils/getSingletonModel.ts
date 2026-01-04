import { getModelForClass, ReturnModelType } from '@typegoose/typegoose'

/**
 * Get or create a Typegoose model using Singleton pattern
 * Prevents model re-registration issues in Next.js serverless environments
 * 
 * @param name - Model name (e.g., 'ShopeeLink')
 * @param classRef - Typegoose class reference
 * @param options - Model options including schemaOptions
 * @returns Model instance
 */
export function getSingletonModel<T>(
    name: string,
    classRef: new (...args: any[]) => T,
    options?: Parameters<typeof getModelForClass>[1]
): ReturnModelType<new (...args: any[]) => T> {
    // Use global cache to persist across hot reloads and serverless invocations
    const globalKey = `${name}Model`

    if (!(global as any)[globalKey]) {
        (global as any)[globalKey] = getModelForClass(classRef, options)
    }

    return (global as any)[globalKey]
}
