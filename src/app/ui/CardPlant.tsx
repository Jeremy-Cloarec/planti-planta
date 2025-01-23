import Button from "./Button";

interface ButtonProp {
    title: string;
    price: string;
}

export default function CardPlant({ title, price }: ButtonProp) {

    const alt: string = `Photographie de la plante ${title}`;
    const url = `./plants/${title.toLowerCase()}.png`;

    return (
        <a href="#" className="p-2 bg-white shadow-md rounded-lg flex flex-col gap-2 group transition delay-75 duration-300 hover:shadow-[#00000047] h-fit">
            <img
                src={url}
                alt={alt}
                className="w-full h-auto rounded-md"
            />
            <h3>{title}</h3>
            <p>{price}</p>
            <Button text="Ajouter au panier" />
        </a>
    )
}