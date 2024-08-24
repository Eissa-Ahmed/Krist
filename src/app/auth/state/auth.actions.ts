import { createAction, props } from "@ngrx/store";
import { IAuthentication } from "../../share/models/iauthentication";
import { Register } from "../../share/models/Register";
import { ResetPasswordModel } from "../../share/models/ResetPasswordModel";

export const login = createAction('[Login] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Login] Login Success', props<{ authenticationModel: IAuthentication }>());
export const loginError = createAction('[Login] Login Error', props<{ error: string }>());

export const register = createAction('[Register] Register', props<{ register: Register }>());
export const registerSuccess = createAction('[Register] Register Success', props<{ message: string }>());
export const registerError = createAction('[Register] Register Error', props<{ error: string }>());

export const forgetPassword = createAction('[Forget Password] Forget Password', props<{ email: string }>());
export const forgetPasswordSuccess = createAction('[Forget Password] Forget Password Success', props<{ message: string }>());
export const forgetPasswordError = createAction('[Forget Password] Forget Password Error', props<{ error: string }>());

export const resetPassword = createAction('[Reset Password] Reset Password', props<{ model: ResetPasswordModel }>());
export const resetPasswordSuccess = createAction('[Reset Password] Reset Password Success', props<{ message: string }>());
export const resetPasswordError = createAction('[Reset Password] Reset Password Error', props<{ error: string }>());

export const tokenVerify = createAction('[Reset Password] Token Verify', props<{ token: string }>());
export const tokenVerifySuccess = createAction('[Reset Password] Token Verify Success');
export const tokenVerifyError = createAction('[Reset Password] Token Verify Error');

