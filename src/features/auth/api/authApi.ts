/**
 * ToDo: create BaseResponse generic,
 * add types to data,
 * complete body of the method,
 * add correct URL of endpoint
 * ...
 */

export const authAPI = {
    // login(data: LoginParametersType) {
    //   return instance.post<BaseResponse<{ userId?: number }>>("auth/login", data)
    // },
    // logout() {
    //   return instance.delete<BaseResponse<{ userId?: number }>>("auth/login")
    // },
    // me() {
    //   return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
    // },
};

/**
 * ToDo: add needed properties with types to LoginParamsType
 */
export type LoginParametersType = {
    email: string;
    password: string;
};
