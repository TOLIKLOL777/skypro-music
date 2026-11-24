import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Страница не найдена</h1>
      <Link href="/music/main">На главную</Link>
    </div>
  );
}
