import Link from 'next/link'

const Layout: React.FC<React.PropsWithChildren>= ({ children }) => {
  return (
    <div>
      <nav>
        <Link href={'/'}>BACK</Link>
      </nav>
      {children}
    </div>
  )
}

export default Layout