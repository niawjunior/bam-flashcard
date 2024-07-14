const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-screen bg-cyan-200">
        <nav className="flex gap-4 justify-center pt-4">
          <a href="/" className="text-2xl font-bold ">
            Home
          </a>
          <a href="/add" className="text-2xl font-bold ">
            Add new vocab
          </a>
          <a href="/about" className="text-2xl font-bold ">
            About
          </a>
        </nav>
        <div className="p-4">{children}</div>
      </div>
    </>
  )
}

export default Layout
