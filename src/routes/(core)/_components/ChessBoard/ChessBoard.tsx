import { TReactWrapper } from '@/shared/types/react/TReactWrapper';

export function ChessBoard({ children }: TReactWrapper) {
  return <div className="bg-board h-128 w-128 bg-contain">{children}</div>;
}
