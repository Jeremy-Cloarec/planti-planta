export default function LoadingPlants() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 w-full">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}

function CardSkeleton() {
    return (
        <div
            className="rounded-3xl bg-gray-100 p-4 flex flex-col gap-4 animate-pulse"
        >
            <div className="flex justify-center  rounded-xl bg-white px-4 py-8 w-full aspect-square">
            </div>
            <div className="h-5 w-3/5 rounded-md bg-gray-200" />
            <div className="h-5 w-12 rounded-md bg-gray-200" />
            <div className="rounded-xl h-10 w-full bg-gray-300" />
        </div>
    );
}

