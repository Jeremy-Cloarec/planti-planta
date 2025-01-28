export default function Heading({ title }: { title: string }) {
  return (
    <header className="my-16">
      <h1 className="text-center">{title}</h1>
    </header>
  )
}