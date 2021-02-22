export const AuthTypes = {
    SYSTEM_LOGIN: 'auth/SYSTEM_LOGIN',
    SYSTEM_LOGIN_SUCCESS: 'auth/SYSTEM_LOGIN_SUCCESS',
    SYSTEM_LOGIN_ERROR: 'auth/SYSTEM_LOGIN_ERROR',
    USER_LOGIN: 'auth/USER_LOGIN',
    USER_LOGIN_SUCCESS: 'auth/USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR: 'auth/USER_LOGIN_ERROR',
    USER_SIGN_UP: 'auth/USER_SIGN_UP',
    USER_SIGN_UP_SUCCESS: 'auth/USER_SIGN_UP_SUCCESS',
    USER_SIGN_UP_ERROR: 'auth/USER_SIGN_UP_ERROR',
}

export const AuthActions = {

    systemLogin: () => ({
        type: AuthTypes.SYSTEM_LOGIN,
    }),

}
