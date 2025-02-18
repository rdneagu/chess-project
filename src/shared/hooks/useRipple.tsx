import { RefObject, useCallback, useEffect } from 'react';
import { isTriggerKey } from '@/shared/util/EventUtil';

const pointerDownEvents = ['keydown', 'mousedown', 'touchstart'];

export default function useRipple<T extends HTMLElement>(ref: RefObject<T | null>, isDisabled?: boolean) {
  const launchRipple = useCallback(
    (event: Event): void => {
      if (event instanceof KeyboardEvent && (!isTriggerKey(event) || event.repeat)) {
        return;
      }

      const element = ref?.current;
      if (element && !isDisabled) {
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        const { top, left } = element.getBoundingClientRect();
        let rippleCenterX = element.clientWidth / 2 - radius;
        let rippleCenterY = element.clientHeight / 2 - radius;
        if (event instanceof MouseEvent) {
          rippleCenterX = event.clientX - (left + radius);
          rippleCenterY = event.clientY - (top + radius);
        }

        const circle = document.createElement('div');
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.left = `${rippleCenterX}px`;
        circle.style.top = `${rippleCenterY}px`;
        circle.classList.add('ripple', 'absolute', 'bg-current', 'rounded-full', 'animate-ripple', 'pointer-events-none');

        element.appendChild(circle);
        setTimeout(() => {
          circle.remove();
        }, 600);
      }
    },
    [isDisabled, ref],
  );

  useEffect(() => {
    const element = ref?.current;
    pointerDownEvents.forEach((event) => {
      element?.addEventListener(event, launchRipple, { capture: true });
    });

    return () => {
      pointerDownEvents.forEach((event) => {
        element?.removeEventListener(event, launchRipple, { capture: true });
      });
    };
  }, [launchRipple, ref]);
}
