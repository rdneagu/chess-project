import { useRef } from 'react';
import type { TChessMove } from '../../../../../../../shared/types/chess/TChessMove';
import type { TGroupedMove } from '../_types/TGroupedMove';

export default function useMoveRefs() {
    const moveRefs = useRef<Map<number, HTMLElement>>(null);

    const getMoveRefsMap = () => {
        if (!moveRefs.current) {
            moveRefs.current = new Map();
        }
        return moveRefs.current;
    };

    const addToMoveRefs = (move?: TChessMove) => (node: HTMLElement) => {
        if (move) {
            const map = getMoveRefsMap();
            map.set(move.moveId, node);

            return () => {
                map.delete(move.moveId);
            };
        }
        return () => {};
    };

    const getMoveRef = (groupedMove?: TGroupedMove) => {
        const map = getMoveRefsMap();
        const { moveId } = groupedMove?.right ?? groupedMove?.left ?? {};
        if (moveId) {
            return map.get(moveId);
        }
        return undefined;
    };

    return { addToMoveRefs, getMoveRef };
}
