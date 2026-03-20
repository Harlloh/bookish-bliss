import { useAuthStore } from "@/stores/authStore";

function DashStats({ totalBooks, totalReviews, totalMembers, isLoading }: { totalBooks: string, totalReviews: string | number, totalMembers: string, isLoading: boolean }) {
    const { user, isAuthenticated, } = useAuthStore();

    return (
        <>
            {isLoading ? <section className="border-y border-parchment bg-warm-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 gap-8 text-center">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-8 w-16 bg-parchment rounded mx-auto" />
                                <div className="h-3 w-12 bg-parchment rounded mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </section> : <section className="border-y border-parchment bg-warm-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className={`grid gap-8 text-center ${(user && isAuthenticated) ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        <div>
                            <p className="text-3xl font-bold font-serif text-burgundy">{totalBooks || 0}</p>
                            <p className="text-sm text-muted">Books</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold font-serif text-gold">{totalReviews || 0}</p>
                            <p className="text-sm text-muted">Reviews</p>
                        </div>
                        {(user && isAuthenticated) && <div>
                            <p className="text-3xl font-bold font-serif text-forest">{totalMembers || 0}</p>
                            <p className="text-sm text-muted">Members</p>
                        </div>}
                    </div>
                </div>
            </section>}
        </>
    );
}

export default DashStats;