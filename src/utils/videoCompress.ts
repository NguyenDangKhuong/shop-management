import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

let ffmpeg: FFmpeg | null = null

// Load FFmpeg (lazy, cached)
async function getFFmpeg(onLog?: (msg: string) => void): Promise<FFmpeg> {
    if (ffmpeg && ffmpeg.loaded) return ffmpeg

    ffmpeg = new FFmpeg()

    if (onLog) {
        ffmpeg.on('log', ({ message }) => onLog(message))
    }

    // Load FFmpeg WASM from CDN
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })

    return ffmpeg
}

export type CompressOptions = {
    onProgress?: (percent: number) => void
    onLog?: (msg: string) => void
    maxWidth?: number      // Default: 720 (TikTok portrait)
    crf?: number           // Quality: 18 (best) - 35 (worst), default: 28
    preset?: string        // ultrafast, superfast, veryfast, faster, fast, medium
}

/**
 * Compress video using FFmpeg.wasm
 * Reduces file size by re-encoding to H.264 at lower resolution/quality
 */
export async function compressVideo(
    file: File,
    options: CompressOptions = {}
): Promise<{ file: File; originalSize: number; compressedSize: number; ratio: number } | null> {
    const {
        onProgress,
        onLog,
        maxWidth = 720,
        crf = 28,
        preset = 'veryfast',
    } = options

    try {
        onProgress?.(5)

        const ff = await getFFmpeg(onLog)

        onProgress?.(15)

        // Write input file
        const inputName = 'input' + getExtension(file.name)
        const outputName = 'output.mp4'

        await ff.writeFile(inputName, await fetchFile(file))

        onProgress?.(20)

        // Track FFmpeg progress
        ff.on('progress', ({ progress }) => {
            // progress is 0-1, map to 20-90 range
            const pct = Math.round(20 + progress * 70)
            onProgress?.(Math.min(pct, 90))
        })

        // Compress: scale down + re-encode H.264
        await ff.exec([
            '-i', inputName,
            '-vf', `scale='min(${maxWidth},iw)':-2`,  // Scale down if wider than maxWidth
            '-c:v', 'libx264',
            '-crf', String(crf),
            '-preset', preset,
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',  // Enable streaming
            '-y',
            outputName,
        ])

        onProgress?.(95)

        // Read output
        const data = await ff.readFile(outputName) as Uint8Array
        const compressedBlob = new Blob([new Uint8Array(data.buffer as ArrayBuffer)], { type: 'video/mp4' })
        const compressedFile = new File([compressedBlob], file.name.replace(/\.[^.]+$/, '.mp4'), {
            type: 'video/mp4',
        })

        // Cleanup
        await ff.deleteFile(inputName)
        await ff.deleteFile(outputName)

        onProgress?.(100)

        return {
            file: compressedFile,
            originalSize: file.size,
            compressedSize: compressedFile.size,
            ratio: Math.round((1 - compressedFile.size / file.size) * 100),
        }
    } catch (error) {
        console.error('FFmpeg compression error:', error)
        return null
    }
}

function getExtension(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase()
    return ext ? `.${ext}` : '.mp4'
}

/**
 * Check if compression is available (SharedArrayBuffer required)
 */
export function isCompressionSupported(): boolean {
    return typeof SharedArrayBuffer !== 'undefined'
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
