import { EKeyCode } from '@/shared/types/events/EKeyCode';

export function isTriggerKey(event: KeyboardEvent): boolean {
  return event.code === EKeyCode.SPACE || event.code === EKeyCode.ENTER;
}

export function preventTriggerOnKeydown(event: KeyboardEvent): void {
  if (isTriggerKey(event)) {
    event.preventDefault();
  }
}
