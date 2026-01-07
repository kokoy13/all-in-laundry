export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <button onClick={onMenuClick} className="text-neutral-900 hover:cursor-pointer hover:text-blue-500 transition-colors text-2xl">
        ☰
      </button>
    </header>
  )
}
