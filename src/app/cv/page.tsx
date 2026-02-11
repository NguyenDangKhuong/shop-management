import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CV - Nguyen Dang Khuong',
    description: 'Front-end Developer CV - Nguyen Dang Khuong',
}

const CVPage = () => {
    return (
        <div className="w-screen h-screen">
            <iframe
                src="/NguyenDangKhuong_FE.pdf"
                className="w-full h-full border-0"
                title="CV - Nguyen Dang Khuong"
            />
        </div>
    )
}

export default CVPage
