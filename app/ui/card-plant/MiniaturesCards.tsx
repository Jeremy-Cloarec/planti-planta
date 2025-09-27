import { Plant } from "@/app/lib/definitions";
import { formatedUrl } from "@/app/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function MiniaturesCards({ plants }: { plants: Plant[] }) {
    return (
        <div className=" sticky bottom-3 flex justify-center w-full sm:w-auto sm:top-0 sm:h-dvh">
            <ul className="flex sm:flex-col gap-2 justify-center">
                {plants.map((plant: Plant) => (
                    <li key={plant.id} >
                        <Link href={"/"}>
                            <Image
                                src={`/plants/${formatedUrl(plant.title)}.png`}
                                alt={`Miniature du dessin ${plant.title}`}
                                height={50}
                                width={45}                      
                                className="object-contain grayscale"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
