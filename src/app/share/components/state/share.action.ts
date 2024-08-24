import { createAction, props } from "@ngrx/store";

export const userSubscription = createAction('[Footer] User Subscription', props<{ email: string }>());
export const userSubscriptionSuccess = createAction('[Footer] User Subscription Success');
export const userSubscriptionError = createAction('[Footer] User Subscription Error');
