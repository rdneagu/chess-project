import type { TChessMove } from '../../../../../../../shared/types/chess/TChessMove';
import { useShallowGameStoreV2 } from '@/shared/stores/gameStoreV2';

export default function useMoveRefs() {
    const moveRefs = useShallowGameStoreV2((state) => state.moveRefs);

    const getMoveRefsMap = () => {
        if (!moveRefs.current) {
            moveRefs.current = new Map();
        }
        return moveRefs.current;
    };

    const addToMoveRefs = (move?: TChessMove) => (node: HTMLElement) => {
        const moveId = move?.moveId ?? 0;
        const map = getMoveRefsMap();
        map.set(moveId, node);

        return () => {
            map.delete(moveId);
        };
    };

    const getMoveRef = (moveId?: number) => {
        const map = getMoveRefsMap();
        if (moveId) {
            return map.get(moveId);
        }
        return undefined;
    };

    return { addToMoveRefs, getMoveRef };
}
