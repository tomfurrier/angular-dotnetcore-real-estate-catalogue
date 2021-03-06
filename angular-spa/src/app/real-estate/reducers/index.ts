import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromRealEstates from './real-estates.reducer';
import * as fromCollection from './collection.reducer';
import * as fromRoot from '../../app.reducer';

export interface RealEstatesState {
  search: fromSearch.State;
  RealEstates: fromRealEstates.State;
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  RealEstates: RealEstatesState;
}

export const reducers: ActionReducerMap<RealEstatesState> = {
  search: fromSearch.reducer,
  RealEstates: fromRealEstates.reducer,
  collection: fromCollection.reducer
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `RealEstates` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.RealEstatesState$ = state$.pipe(select(getRealEstatesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getRealEstatesState = createFeatureSelector<RealEstatesState>(
  'realEstates'
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getRealEstateEntitiesState = createSelector(
  getRealEstatesState,
  state => state.RealEstates
);

export const getSelectedRealEstateId = createSelector(
  getRealEstateEntitiesState,
  fromRealEstates.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getRealEstateIds,
  selectEntities: getRealEstateEntities,
  selectAll: getAllRealEstates,
  selectTotal: getTotalRealEstates
} = fromRealEstates.adapter.getSelectors(getRealEstateEntitiesState);

export const getSelectedRealEstate = createSelector(
  getRealEstateEntities,
  getSelectedRealEstateId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the RealEstates selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getRealEstatesState,
  (state: RealEstatesState) => state.search
);

export const getSearchRealEstateIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of RealEstates in the store.
 */
export const getSearchResults = createSelector(
  getRealEstateEntities,
  getSearchRealEstateIds,
  (RealEstates, searchIds) => {
    return searchIds.map(id => RealEstates[id]);
  }
);

export const getCollectionState = createSelector(
  getRealEstatesState,
  (state: RealEstatesState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionRealEstateIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getRealEstateCollection = createSelector(
  getRealEstateEntities,
  getCollectionRealEstateIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);
