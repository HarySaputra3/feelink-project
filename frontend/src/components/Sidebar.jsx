
const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-100 p-4">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-200">Dashboard</a>
          </li>
          <li>
            <a href="/entry" className="block px-2 py-1 rounded hover:bg-gray-200">Entry</a>
          </li>
          <li>
            <a href="/history" className="block px-2 py-1 rounded hover:bg-gray-200">History</a>
          </li>
          <li>
            <a href="/settings" className="block px-2 py-1 rounded hover:bg-gray-200">Settings</a>
          </li>
        </ul>
        <div className="mt-4">
          <a href="/" className="block px-2 py-1 text-red-600 hover:bg-red-100 rounded">Logout</a>
        </div>
      </nav>
  )
}

export default Sidebar