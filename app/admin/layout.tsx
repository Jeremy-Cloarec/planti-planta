import Footer  from "../ui/Footer";
import NavAdmin from "../ui/admin/NavAdmin";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (<>
        <NavAdmin />
        <main className=" w-full flex-1 flex flex-col mt-[72px] pt-8">
            {children}
        </main>
        <Footer />

    </>)

}