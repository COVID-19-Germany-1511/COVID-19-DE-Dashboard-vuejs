import { Actions } from 'vuex-smart-module';
import RootGetters from './RootGetters';
import RootMutations from './RootMutations';
import { RootState } from '@/store/RootState';

export default class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {}
