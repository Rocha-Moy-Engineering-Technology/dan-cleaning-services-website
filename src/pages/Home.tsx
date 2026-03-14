import { Link } from 'react-router';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">dan-cleaning-services-website</h1>
      <nav className="mt-8">
        <Link to="/about" className="text-blue-500 hover:underline">
          About
        </Link>
      </nav>
    </main>
  );
}
