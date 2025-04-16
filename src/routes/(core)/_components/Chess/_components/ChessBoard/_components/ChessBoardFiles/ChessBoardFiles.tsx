import { getFilePosition, BOARD_FILES } from '@/shared/util/ChessUtil';

export default function ChessBoardFiles() {
    const getTransformation = (file: string) => ({
        left: getFilePosition(file),
    });

    return (
        <div className="absolute right-0 bottom-[5%] left-0 flex flex-col">
            {BOARD_FILES.map((file) => (
                <div style={getTransformation(file)} key={file} className="even:text-board-purple absolute ml-[9.5%] text-lg font-bold">
                    {file}
                </div>
            ))}
        </div>
    );
}
