import { createAction, props } from "@ngrx/store";
import { IApplicationSettings } from "./share/models/iapplication-settings";
import { IUser } from "./share/models/iuser";

export const applicationSettings = createAction('[App] Application Settings')
export const applicationSettingsSuccess = createAction('[App] Application Settings Success', props<{ settings: IApplicationSettings }>())
export const applicationSettingsError = createAction('[App] Application Settings Error', props<{ error: string }>())

export const getUser = createAction('[App] Get User')
export const getUserSuccess = createAction('[App] Get User Success', props<{ user: IUser }>())
export const getUserError = createAction('[App] Get User Error', props<{ error: string }>())
