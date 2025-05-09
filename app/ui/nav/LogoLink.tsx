import Image from "next/image";
import Link from "next/link";

export function LogoLink() {
    return (
        <Link
            key="Home"
            href="/"
            className="w-fit flex z-40">
            <Image
                src="/logo.svg"
                alt="Logo du site : une petite plante mignone "
                className={`min-w-9 mr-3 w-13 h-auto md:w-16 md:h-auto`}
                width={48}
                height={56}
            />
        </Link>

    )
}