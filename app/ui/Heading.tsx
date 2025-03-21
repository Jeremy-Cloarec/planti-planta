export default function Heading({ title }: { title: string }) {
  return (
    <header className="pt-[55px] my-20 md:my-24 lg:my-32">
      <h1 className="text-center">{title}</h1>
    </header>
  )
}