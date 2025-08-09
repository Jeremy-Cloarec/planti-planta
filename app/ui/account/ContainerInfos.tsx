export default function ContainerInfos({children}: { children: React.ReactNode }) {
    return (
        <div className="p-3 ring-1 ring-slate-200 rounded-xs flex flex-col gap-3">
            {children}
        </div>
    )
}