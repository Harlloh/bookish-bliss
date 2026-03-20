// Paste this component in your Home.jsx or as a separate file
import SkeletonCard from "@/components/skeletonCard"


export function BookshelfLoading() {
    return (
        <div className="animate-pulse">
            {/* Recently Added skeleton */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="h-6 w-40 bg-parchment rounded" />
                        <div className="h-4 w-16 bg-parchment rounded" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                </div>
            </section>
        </div>
    );
}