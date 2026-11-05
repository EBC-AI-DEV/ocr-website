import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-8 py-16 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
