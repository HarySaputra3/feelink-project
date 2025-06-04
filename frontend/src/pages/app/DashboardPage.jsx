import Menggila from '../../components/_menggila.jsx';

const DashboardPage = () => {
  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2">
        <h1 className="text-4xl">This dashboard okay, yu see yu prob prob here</h1>
      </header>
      <main className="max-w-7xl text-primary overflow-x-auto">
        <div className="py-6 sm:p-6 md:p-12 w-full">
          <p className="text-lg">Welcome to your dashboard!</p>
          <Menggila />
        </div>
      </main>
    </>
  )
}

export default DashboardPage