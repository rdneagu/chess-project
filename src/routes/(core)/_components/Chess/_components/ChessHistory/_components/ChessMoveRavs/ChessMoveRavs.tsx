import ChessMoveSet from '../../ChessMoveSet'; // eslint-disable-line import/no-cycle
import { TChessMoveListId } from '../../../../../../../../shared/types/chess/TChessMoveListId';
import useGameStore from '../../../../../../../../shared/stores/gameStore';

type ChessMoveRavsProps = {
    ravId: TChessMoveListId;
};

export default function ChessMoveRavs({ ravId }: ChessMoveRavsProps) {
    const rav = useGameStore((state) => state.moveListStore.getMoveList(ravId));

    if (!rav) {
        return null;
    }

    return (
        <div className="my-2 ml-4 border-l border-slate-400 bg-slate-700">
            {/* {rav.comment && <ChessMoveComment moveId={rav.lastMove?.moveId}>{rav.comment}</ChessMoveComment>} */}
            <ChessMoveSet moveListId={rav.moveListId} />
        </div>
    );
}
