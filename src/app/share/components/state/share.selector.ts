import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ShareState } from "./share.reducer";

const featureSelector = createFeatureSelector<ShareState>("share");
export const shareSelector = createSelector(featureSelector, (state) => state)
export const appSelector_isLoading = createSelector(shareSelector, (state) => state.isLoading)
