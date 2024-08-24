import { createReducer, on } from "@ngrx/store";
import { IApplicationSettings } from "./share/models/iapplication-settings";
import { IUser } from "./share/models/iuser";
import { AppActions } from "./app.all.actions";

export interface AppState {
  settings: IApplicationSettings | null;
  user: IUser | null;
}
export const initialState: AppState = {
  settings: null,
  user: null
}
export const appReducer = createReducer(
  initialState,
  on(AppActions.applicationSettingsSuccess,
    (state, action) => {
      return {
        ...state,
        settings: action.settings
      }
    }
  ),
  on(AppActions.getUserSuccess,
    (state, action) => {
      return {
        ...state,
        user: action.user
      }
    }
  ),
)
