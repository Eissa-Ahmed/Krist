import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');
export const selectAuth = createSelector(
  selectAuthFeature,
  (state: AuthState) => state
);

export const selectIsLoadingAuth = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoading
);
export const selectTokenIsSend = createSelector(
  selectAuth,
  (state: AuthState) => state.sendTokenSuccess
);




