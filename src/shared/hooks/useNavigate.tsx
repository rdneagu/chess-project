import { useCallback } from 'react';
import { useNavigate as useRouterNavigate } from 'react-router';
import { ECookie } from '@/shared/types/cookies/ECookie';
import { ERoutePath } from '@/shared/types/navigation/ERoutePath';
import { getCookie } from '@/shared/util/CookiesUtil';

export default function useNavigate() {
  const navigate = useRouterNavigate();

  const navigateHome = useCallback(() => navigate(ERoutePath.HOME), [navigate]);
  const navigateBack = useCallback(() => navigate(-1), [navigate]);
  const navigateToLastRoute = useCallback(() => {
    const route = getCookie<ERoutePath>(ECookie.LAST_ROUTE) || ERoutePath.HOME;
    navigate(route);
  }, [navigate]);

  return { navigate, navigateHome, navigateBack, navigateToLastRoute };
}
