import { BOARD_RANKS, getRankPosition } from '@/shared/util/ChessUtil';

export default function ChessBoardRanks() {
    const getTransformation = (rank: string) => ({
        top: getRankPosition(rank),
    });

    return (
        <div className="absolute top-0 bottom-0 left-[1%] flex flex-col">
            {BOARD_RANKS.map((rank) => (
                <div style={getTransformation(rank)} key={rank} className="odd:text-board-purple absolute text-lg font-bold">
                    {rank}
                </div>
            ))}
        </div>
    );
}
