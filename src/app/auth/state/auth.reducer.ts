import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.all.actions";
import { IAuthentication } from "../../share/models/iauthentication";

export interface AuthState {
  authenticationModel: IAuthentication | null,
  sendTokenSuccess: boolean,
  isLoading: boolean

}

export const initialState: AuthState = {
  authenticationModel: null,
  sendTokenSuccess: false,
  isLoading: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      authenticationModel: action.authenticationModel,
      isLoading: false
    };
  }),
  on(AuthActions.loginError, (state) => {
    return {
      ...state,
      authenticationModel: null,
      isLoading: false,
    };
  }),
  on(AuthActions.register, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(AuthActions.registerSuccess, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(AuthActions.registerError, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(AuthActions.forgetPassword, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(AuthActions.forgetPasswordSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
      sendTokenSuccess: true
    };
  }),
  on(AuthActions.forgetPasswordError, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(AuthActions.resetPassword, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(AuthActions.resetPasswordSuccess, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(AuthActions.resetPasswordError, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),
);
