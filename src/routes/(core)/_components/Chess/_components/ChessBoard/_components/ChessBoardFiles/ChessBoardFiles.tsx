import { getFilePosition } from '@/shared/util/ChessUtil';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default function ChessBoardFiles() {
  const getTransformation = (file: string) => ({
    left: getFilePosition(file),
  });

  return (
    <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-y-2">
      {files.map((file) => (
        <div style={getTransformation(file)} key={file} className="absolute text-lg font-bold">
          {file}
        </div>
      ))}
    </div>
  );
}
