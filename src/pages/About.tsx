import { Link } from 'react-router';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">About</h1>
      <nav className="mt-8">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
      </nav>
    </main>
  );
}
