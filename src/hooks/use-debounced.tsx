import { useEffect, useState } from "react";

export default function useDebounced<T>(value: T, delay: number = 500): T {
    const [state, setState] = useState<T>(value);

    useEffect(() => {
        if (!value) return;
        
        const handler = setTimeout(() => setState(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return state;
}