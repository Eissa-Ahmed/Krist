import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

const featureSelector = createFeatureSelector<AppState>("app");
export const appSelector = createSelector(featureSelector, (state) => state)
export const appSelector_SocialMedia = createSelector(appSelector, (state) => state.settings?.SocialMediaAccounts)
