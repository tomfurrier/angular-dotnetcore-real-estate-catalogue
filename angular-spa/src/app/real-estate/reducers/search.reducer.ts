import {
  RealEstateActionTypes,
  RealEstateActionsUnion
} from '../actions/real-estate.actions';

export interface State {
  ids: number[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: ''
};

export function reducer(
  state = initialState,
  action: RealEstateActionsUnion
): State {
  switch (action.type) {
    case RealEstateActionTypes.Search: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query
      };
    }

    case RealEstateActionTypes.SearchComplete: {
      return {
        ids: action.payload.map(realEstate => realEstate.id),
        loading: false,
        error: '',
        query: state.query
      };
    }

    case RealEstateActionTypes.SearchError: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
