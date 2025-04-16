import { useRef, useEffect } from 'react';

export default function useRerenderCount(who: string) {
    const rerenderCountRef = useRef(0);
    useEffect(() => {
        if (rerenderCountRef.current === 0) {
            console.log(`${who} has been recreated`);
        } else {
            console.log(`${who} rerendered ${rerenderCountRef.current} times`);
        }
        rerenderCountRef.current += 1;
    });
    return rerenderCountRef.current;
}
