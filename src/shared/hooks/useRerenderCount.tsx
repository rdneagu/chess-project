import { useRef, useEffect } from 'react';

export default function useRerenderCount(who: string) {
    const rerenderCountRef = useRef(0);
    useEffect(() => {
        rerenderCountRef.current += 1;
        console.log(`${who} rerendered ${rerenderCountRef.current} times`);
    });
    return rerenderCountRef.current;
}
