import Button from "./Button";
import Image from "next/image";

interface CardPlantProps {
    title: string;
    price: string;
}

export default function CardPlant({ title, price }: CardPlantProps) {
    const alt: string = `Photographie de la plante ${title}`;
    const url = `/plants/${title.toLowerCase()}.png`;

    return (
        <a href="#" className="p-2 bg-white shadow-md rounded-lg flex flex-col gap-2 group transition delay-75 duration-300 hover:shadow-[#00000047] h-fit">
            <Image
                src={url}
                alt={alt}
                className="w-full h-auto rounded-md"
                width={212}
                height={209}
            />
            <h3 className="text-ellipsis overflow-hidden">{title}</h3>
            <p>{price}€</p>
            <Button text="Ajouter au panier" />
        </a>
    )
}