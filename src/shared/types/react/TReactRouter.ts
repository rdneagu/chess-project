import { ReactElement } from 'react';
import { UIMatch } from 'react-router';

// `handle` prop used in routes which helps provide route specific data
// https://reactrouter.com/en/main/hooks/use-matches (see handle)
export type TReactRouterHandle = {
  title?: string;
  crumb?: ReactElement; // Breadcrumbs idea: https://reactrouter.com/en/main/hooks/use-matches
};

export type TReactRouterUIMatch<D> = UIMatch<D, TReactRouterHandle>[];
