import { getRankPosition } from '@/shared/util/ChessUtil';

const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function ChessBoardRanks() {
  const getTransformation = (rank: string) => ({
    top: getRankPosition(rank),
  });

  return (
    <div className="absolute top-0 bottom-0 -left-4 flex flex-col gap-y-2">
      {ranks.map((rank) => (
        <div style={getTransformation(rank)} key={rank} className="absolute text-lg font-bold">
          {rank}
        </div>
      ))}
    </div>
  );
}
