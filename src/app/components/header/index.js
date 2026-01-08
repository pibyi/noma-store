import { LogoFull } from '../logo/logo'
import { NavigationMenu } from './Navigation'
import CartIconButton from '../cart/CartIconButton'
import Link from 'next/link'

const Header = ({ products }) => {
    return (
        <header className="bg-nomadory-background pt-12 pb-6 px-4 md:px-6 md:pb-12 flex items-center justify-between sticky h-[var(--nomadory-header-height)] top-0 z-50">
            <Link href="/">
                <LogoFull />
            </Link>
            <div className="flex items-center gap-4">
                <CartIconButton />
                <NavigationMenu products={products} />
            </div>
        </header>
    )
}
export { Header }
