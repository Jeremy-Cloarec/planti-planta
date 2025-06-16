import Image from "next/image"
import Link from "next/link"

const links = [
    {
        key: "Plantes",
        href: "/",
        text: "Plantes",
    },
    {
        key: "Qui suis-je ?",
        href: "/qui-suis-je",
        text: "Qui suis-je ?",
    },
    {
        key: "Contact",
        href: "/contact",
        text: "Contact",
    },
    {
        key: "Connexion",
        href: "/sign-in",
        text: "Connexion",
    },
    {
        key: "Panier",
        href: "/panier",
        text: "Panier",
    },
]
const linksLegals = [
    {
        key: "Mentions légales",
        href: "/mentions-legales",
        text: "Mentions légales",
    },
    {
        key: "CGV",
        href: "/cgv",
        text: "CGV",
    },
]

export function Footer() {
    const dateYear = new Date()

    return (
        <footer className="w-full mt-10 px-3 py-8 bg-green flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2 items-center md:flex-row md:justify-between md:w-full">
                <div className="flex items-center gap-2">
                    <Link href={"./"}>
                        <Image src={"./logo_dark.svg"} width={24} height={20} alt="Logo du site" />
                    </Link>
                    <h2>Dancing Plants</h2>
                </div>
                <ul className="flex items-center justify-center gap-3 flex-wrap">
                    {links.map(link =>
                        <li key={link.key}>
                            <Link href={link.href} className="hover:underline hover:underline-offset-2">{link.text}</Link>
                        </li>
                    )}
                </ul>
                <ul className="flex items-center justify-center gap-3 flex-wrap">
                    {linksLegals.map(link =>
                        <li key={link.key}>
                            <Link href={link.href} className="hover:underline hover:underline-offset-2">{link.text}</Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row">
                <p className="text-base">
                    {dateYear.getFullYear()} - Jérémy
                </p>
                <div className="flex gap-3">
                    <a href="https://github.com/Jeremy-Cloarec" target="_blank">
                        <Image src={"./github.svg"} alt="Lien " width={24} height={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/jy-cloarec/" target="_blank">
                        <Image src={"./linkedin.svg"} alt="Lien Linkedin" width={24} height={24} />
                    </a>
                    <a href="https://www.instagram.com/jeremy_cloarec/" target="_blank">
                        <Image src={"./instagram.svg"} alt="Lien Instagrag" width={24} height={24} />
                    </a>
                </div>
            </div>
        </footer>
    )
}