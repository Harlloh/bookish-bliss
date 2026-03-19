export function EmptyBookShelf({ type = "recently-added" }) {
    const config = {
        "recently-added": {
            icon: "📚",
            heading: "No Books Added Yet",
            body: "The shelves are bare. Check back later!",
        },
        "top-rated": {
            icon: "⭐",
            heading: "No Ratings Yet",
            body: "No books have been rated yet. Be the first!",
        },
    };

    const { icon, heading, body } = config[type];

    return (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-4">{icon}</span>
            <h3 className="font-serif text-lg font-semibold text-ink mb-1">{heading}</h3>
            <p className="text-sm text-muted">{body}</p>
        </div>
    );
}