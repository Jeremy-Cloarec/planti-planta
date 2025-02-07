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
        <a
            href="#"
            className="ring-1 ring-green p-2 bg-white rounded-lg flex flex-col gap-4 group transition delay-75 duration-300 h-fit"
        >
            <Image
                src={url}
                alt={alt}
                className="rounded-md w-full"
                width={212}
                height={209}
            />
            <h2 className="text-ellipsis">{title}</h2>
            <p>{price}€</p>
            <Button
                text="Ajouter au panier"
            />
        </a>
    )
}