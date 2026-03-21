import { useEffect, useState } from "react";

function Toast({ message, type }: { message: string, type: 'error' | 'success' | 'warning' }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;
    return (
        <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm max-w-sm
        ${type === "success" ? "bg-forest" : "bg-burgundy"}`}
        >
            <span className="flex-1">{message}</span>
            <button onClick={() => setVisible(false)} className="text-white/80 hover:text-white transition-colors">
                ✕
            </button>
        </div>
    );
}

export default Toast;