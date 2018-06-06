import { Action } from '@ngrx/store';
import {
  SearchActions,
  SEARCH,
  Search,
  SET_ADDRESS_FILTER,
  SET_INTENT_FILTER,
  SET_TYPE_FILTER,
  SET_MIN_PRICE_FILTER,
  SET_MAX_PRICE_FILTER
} from './search.actions';
import { SearchFilter } from './searchFilter.model';

export interface State {
  activeSearchFilter: SearchFilter;
}

const initialState: State = {
  activeSearchFilter: null
};

export function searchReducer(state = initialState, action: SearchActions) {
  let result: any;

  switch (action.type) {
    case SET_ADDRESS_FILTER:
      result = {
        ...state,
        activeSearchFilter: {
          ...state.activeSearchFilter,
          addressFilter: action.payload
        }
      };
      break;
    case SET_INTENT_FILTER:
      result = {
        ...state,
        activeSearchFilter: {
          ...state.activeSearchFilter,
          intentFilter: action.payload
        }
      };
      break;
    case SET_TYPE_FILTER:
      result = {
        ...state,
        activeSearchFilter: {
          ...state.activeSearchFilter,
          typeFilter: action.payload
        }
      };
      break;
    case SET_MIN_PRICE_FILTER:
      result = {
        ...state,
        activeSearchFilter: {
          ...state.activeSearchFilter,
          minPriceFilter: action.payload
        }
      };
      break;
    case SET_MAX_PRICE_FILTER:
      result = {
        ...state,
        activeSearchFilter: {
          ...state.activeSearchFilter,
          maxPriceFilter: action.payload
        }
      };
      break;
    case SEARCH:
      result = {
        ...state,
        activeSearchFilter: action.payload
      };
      break;
    default:
      return state;
  }

  return result;
}

export const getSearchFilter = (state: State) => state.activeSearchFilter;
