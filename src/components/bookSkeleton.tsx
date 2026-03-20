
export function BookDetailSkeleton() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">

            {/* Back link */}
            <div className="h-4 w-28 bg-parchment rounded mb-6" />

            <div className="grid md:grid-cols-3 gap-8">

                {/* Cover */}
                <div className="md:col-span-1">
                    <div className="aspect-[3/4] bg-parchment rounded-lg" />
                </div>

                {/* Book info */}
                <div className="md:col-span-2">

                    {/* Title */}
                    <div className="h-8 bg-parchment rounded w-3/4 mb-3" />
                    {/* Author */}
                    <div className="h-4 bg-parchment rounded w-1/3 mb-6" />

                    {/* Star rating row */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-5 w-32 bg-parchment rounded" />
                        <div className="h-4 w-24 bg-parchment rounded" />
                    </div>

                    {/* Meta fields */}
                    <div className="space-y-3 mb-6">
                        <div className="flex gap-2">
                            <div className="h-3 w-20 bg-parchment rounded" />
                            <div className="h-3 w-16 bg-parchment rounded" />
                        </div>
                        <div className="flex gap-2">
                            <div className="h-3 w-16 bg-parchment rounded" />
                            <div className="h-3 w-24 bg-parchment rounded" />
                        </div>
                    </div>

                    {/* Overview lines */}
                    <div className="space-y-2 mb-8">
                        <div className="h-3 bg-parchment rounded w-full" />
                        <div className="h-3 bg-parchment rounded w-full" />
                        <div className="h-3 bg-parchment rounded w-11/12" />
                        <div className="h-3 bg-parchment rounded w-4/5" />
                    </div>

                    {/* Write a review button */}
                    <div className="h-11 w-40 bg-parchment rounded-lg" />
                </div>
            </div>

            {/* Reviews section */}
            <div className="mt-12">
                {/* Section heading */}
                <div className="h-7 w-36 bg-parchment rounded mb-6" />

                {/* Review cards */}
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="border border-parchment rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-parchment rounded-full" />
                                <div className="space-y-1">
                                    <div className="h-3 w-24 bg-parchment rounded" />
                                    <div className="h-3 w-16 bg-parchment rounded" />
                                </div>
                            </div>
                            <div className="h-3 w-28 bg-parchment rounded" />
                            <div className="space-y-1">
                                <div className="h-3 bg-parchment rounded w-full" />
                                <div className="h-3 bg-parchment rounded w-4/5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}