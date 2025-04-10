import { useRef } from 'react';
import type { TChessMove } from '../../../../../../../shared/types/chess/TChessMove';
import type { TGroupedMove } from '../_types/TGroupedMove';

export default function useMoveRefs() {
    const moveRefs = useRef<Map<string, HTMLElement>>(null);

    const getMoveRefsMap = () => {
        if (!moveRefs.current) {
            moveRefs.current = new Map();
        }
        return moveRefs.current;
    };

    const addToMoveRefs = (i: number, move?: TChessMove) => (node: HTMLElement) => {
        if (move) {
            const map = getMoveRefsMap();
            const key = i + move.color;
            map.set(key, node);

            return () => {
                map.delete(key);
            };
        }
        return () => {};
    };

    const getMoveRef = (i: number, groupedMove: TGroupedMove) => {
        const map = getMoveRefsMap();
        const color = groupedMove.left?.color ?? groupedMove.right?.color;
        if (color) {
            return map.get(i + color);
        }
        return undefined;
    };

    return { addToMoveRefs, getMoveRef };
}
