export const CommonTypes = {
    LOADING: 'common/LOADING',
    SNACKBAR_SHOW: 'common/SNACKBAR_SHOW',
    SNACKBAR_HIDE: 'common/SNACKBAR_HIDE',
    TOGGLE_MENU: 'common/TOGGLE_MENU',
}

export const CommonActions = {

    showSnackbar: (message) => ({
        type: CommonTypes.SNACKBAR_SHOW,
        payload: message
    }),

    hideSnackbar: () => ({
        type: CommonTypes.SNACKBAR_HIDE
    }),

    toggleMenu: () => ({
        type: CommonTypes.TOGGLE_MENU
    })

}
