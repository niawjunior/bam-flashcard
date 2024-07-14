const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-[100vh] w-screen bg-cyan-200">
        <nav className="flex gap-4 justify-center pt-4">
          <a href="/" className="text-xl font-bold ">
            HOME
          </a>
          <a href="/add" className="text-xl font-bold ">
            ADD NEW VOCABULARY
          </a>
          <a href="/about" className="text-xl font-bold ">
            ABOUT
          </a>
        </nav>
        <div className="p-4">{children}</div>
      </div>
    </>
  )
}

export default Layout
