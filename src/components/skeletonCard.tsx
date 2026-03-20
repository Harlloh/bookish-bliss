export default function SkeletonCard() {
    return (
        <div className="rounded-lg border border-parchment bg-warm-white p-4 animate-pulse">
            <div className="h-48 bg-parchment rounded-md mb-4" />
            <div className="h-4 bg-parchment rounded w-3/4 mb-2" />
            <div className="h-3 bg-parchment rounded w-1/2 mb-4" />
            <div className="h-3 bg-parchment rounded w-1/4" />
        </div>
    );
}
