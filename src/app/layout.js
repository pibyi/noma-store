import '@ant-design/v5-patch-for-react-19'
import { Cormorant_Garamond, Poppins } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { Footer, Header } from './components'
import { getProducts } from './actions/shopify'
import { CartProvider } from './components/cart/CartProvider'
import CartDrawer from './components/cart/CartDrawer'
import './globals.css'

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
})

const cormorantGaramond = Cormorant_Garamond({
    variable: '--font-cormorant-garamond',
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
    title: 'Nomadory',
    description: 'Woven by hand Rooted in soul',
    openGraph: {
        title: 'Nomadory',
        description: 'Woven by hand · Rooted in soul',
        url: 'https://nomadory.com',
        siteName: 'Nomadory',
        images: [
            {
                url: '/og-image.jpeg',
                width: 1200,
                height: 630,
                alt: 'Nomadory - Woven by hand Rooted in soul',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nomadory',
        description: 'Woven by hand · Rooted in soul',
        images: ['/og-image.jpeg'],
    },
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [
            {
                url: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        other: [
            {
                url: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                url: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    },
    manifest: '/site.webmanifest',
}

const RootLayout = async ({ children }) => {
    const productsData = await getProducts()
    const products =
        productsData.success && productsData.data
            ? productsData.data.products
            : []

    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${cormorantGaramond.variable} !font-poppins max-w-[1440px] text-nomadory-primary mx-auto relative`}
            >
                <AntdRegistry>
                    <ConfigProvider>
                        <CartProvider>
                            <Header products={products} />
                            <div className="h-[calc(100vh-var(--nomadory-header-height))] overflow-y-auto">
                                {children}
                                <Footer />
                            </div>
                            <CartDrawer />
                        </CartProvider>
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    )
}
export default RootLayout
