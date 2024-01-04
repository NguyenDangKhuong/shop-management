import { customAlphabet } from 'nanoid'

export function genegateId(size: number): string {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwyz', size)
  return String(nanoid())
}
