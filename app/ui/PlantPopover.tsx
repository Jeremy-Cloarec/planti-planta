export default function PlantPopover({ title }: { title: string }) {
    return (
        <div
            id="popover_plant"
            popover="auto"
            className="open:border-black/10 open:bg-gray-100 open:w-20"
        >
            {title}
        </div>
    )
}