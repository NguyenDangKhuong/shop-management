// Mock nanoid for Jest tests
export const nanoid = () => 'test-id-' + Math.random().toString(36).substr(2, 9)
export const customAlphabet = () => () => 'test-custom-id'
