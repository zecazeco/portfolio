import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container hero">
      <h1>Página não encontrada</h1>
      <p>
        <Link href="/">Voltar para o portfólio</Link>
      </p>
    </main>
  );
}
