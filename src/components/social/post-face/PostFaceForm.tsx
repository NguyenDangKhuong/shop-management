'use client'

import { useState } from 'react'
import { ImageIcon, XIcon } from '@/components/icons'
import { Button, Textarea } from '@/components/ui'

const PostFaceForm = () => {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [fileType, setFileType] = useState<'image' | 'video' | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Check file type
        if (file.type.startsWith('image/')) {
            setFileType('image')
        } else if (file.type.startsWith('video/')) {
            setFileType('video')
        } else {
            alert('Please select an image or video file')
            return
        }

        setSelectedFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
    }

    const removeFile = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        setSelectedFile(null)
        setPreviewUrl(null)
        setFileType(null)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Here you can add your API call to submit the post
            const formData = new FormData()
            formData.append('content', content)
            if (selectedFile) {
                formData.append('media', selectedFile)
            }

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            alert('Post submitted successfully!')

            // Reset form
            setContent('')
            removeFile()
        } catch (error) {
            alert('Failed to submit post')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-950 min-h-screen flex items-center justify-center relative overflow-hidden p-4">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_3s_infinite]"></div>

            {/* Post Card */}
            <div className="relative w-full max-w-2xl bg-glass-bg backdrop-blur-2xl border border-glass-border rounded-3xl p-8 md:p-10 shadow-2xl z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Post</h2>
                    <p className="text-gray-400 text-sm">Share your thoughts with the world</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Content Textarea */}
                    <Textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        rows={6}
                        showCharCount
                        required
                    />

                    {/* File Preview */}
                    {previewUrl && (
                        <div className="relative bg-glass-bg-light border border-glass-border rounded-xl p-4">
                            <button
                                type="button"
                                onClick={removeFile}
                                className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
                            >
                                <XIcon />
                            </button>
                            {fileType === 'image' ? (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full rounded-lg max-h-96 object-cover"
                                />
                            ) : (
                                <video
                                    src={previewUrl}
                                    controls
                                    className="w-full rounded-lg max-h-96"
                                />
                            )}
                        </div>
                    )}

                    {/* Upload Buttons */}
                    <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-glass-bg-hover hover:bg-glass-border border border-glass-border rounded-xl text-gray-300 hover:text-white transition-all duration-300">
                                <ImageIcon />
                                <span className="font-medium">Photo/Video</span>
                            </div>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" loading={loading} fullWidth disabled={!content.trim()}>
                        {loading ? 'POSTING...' : 'POST'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default PostFaceForm
