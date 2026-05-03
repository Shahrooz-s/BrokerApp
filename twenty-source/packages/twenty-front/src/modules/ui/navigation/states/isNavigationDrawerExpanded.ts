import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

export const isNavigationDrawerExpandedState = createAtomState<boolean>({
  key: 'isNavigationDrawerExpanded',
  defaultValue: true,
  useLocalStorage: true,
});
