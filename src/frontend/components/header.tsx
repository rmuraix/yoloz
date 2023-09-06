export default function Header() {
  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 border-opacity-10 bg-opacity-30 backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-5xl px-8 sm:px-4">
        <div className="flex h-16 items-center justify-between">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            Tomato Recognizer
          </span>
        </div>
      </div>
    </nav>
  );
}
