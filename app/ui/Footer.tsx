export function Footer() {
    const dateYear = new Date()

    return (
        <footer className="w-full mt-10">
            <p>
                {dateYear.getFullYear()} -
                <a href="https://github.com/Jeremy-Cloarec" target="_blank"> Jérémy</a>
            </p>
        </footer>
    )
}