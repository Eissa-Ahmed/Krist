import { createReducer, on } from "@ngrx/store";
import { ShareActions } from "./share.all.action";


export interface ShareState {
  isLoading: boolean;
}
export const initialState: ShareState = {
  isLoading: false
}
export const shareReducer = createReducer(
  initialState,
  on(ShareActions.userSubscription, (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(ShareActions.userSubscriptionSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false
    }
  }),
  on(ShareActions.userSubscriptionError, (state, action) => {
    return {
      ...state,
      isLoading: false
    }
  }),
)
