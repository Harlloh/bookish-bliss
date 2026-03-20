export function ProfileLoading() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
            {/* Profile Header Skeleton */}
            <div className="bg-white border border-parchment rounded-lg p-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-parchment rounded-full" />
                    <div className="flex-1 space-y-2">
                        <div className="h-5 bg-parchment rounded w-40" />
                        <div className="h-3 bg-parchment rounded w-56" />
                        <div className="h-3 bg-parchment rounded w-32" />
                    </div>
                    <div className="h-10 w-24 bg-parchment rounded-lg" />
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-4 mb-6 border-b border-parchment pb-3">
                <div className="h-4 w-28 bg-parchment rounded" />
                <div className="h-4 w-28 bg-parchment rounded" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-parchment rounded-lg p-4 space-y-2">
                        <div className="h-4 bg-parchment rounded w-1/3" />
                        <div className="h-3 bg-parchment rounded w-full" />
                        <div className="h-3 bg-parchment rounded w-4/5" />
                    </div>
                ))}
            </div>
        </div>
    );
}