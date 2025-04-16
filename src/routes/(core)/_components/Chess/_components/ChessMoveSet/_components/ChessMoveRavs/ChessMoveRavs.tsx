import ChessMoveSet from '../../ChessMoveSet'; // eslint-disable-line import/no-cycle
import { TChessMoveListId } from '../../../../../../../../shared/types/chess/TChessMoveListId';
import ChessMoveComment from '../ChessMoveComment/ChessMoveComment';
import { useShallowGameStoreV2 } from '@/shared/stores/gameStoreV2';

type ChessMoveRavsProps = {
    ravId: TChessMoveListId;
};

export default function ChessMoveRavs({ ravId }: ChessMoveRavsProps) {
    const rav = useShallowGameStoreV2((state) => state.moveLists[ravId]);

    if (!rav) {
        return null;
    }

    return (
        <div className="my-2 ml-4 border-l border-slate-400 bg-slate-700">
            {rav.comment && <ChessMoveComment comment={rav.comment} />}
            <ChessMoveSet moveListId={rav.moveListId} />
        </div>
    );
}
