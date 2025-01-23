export default function Button({ text }: { text: string }) {
    return (
        <button className="inline-block w-full  px-2 py-2 rounded-md transition delay-75 duration-300 ease-in-out  bg-green group-hover:bg-greenHover text-white">{text}</button>
    )
}