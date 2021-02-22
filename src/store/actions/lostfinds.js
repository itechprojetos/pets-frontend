export const LostFindsTypes = {
    LOST_FINDS: 'lost_finds/LOST_FINDS',
    LOST_FINDS_SUCCESS: 'lost_finds/LOST_FINDS_SUCCESS',
    LOST_FINDS_ERROR: 'lost_finds/LOST_FINDS_ERROR',
    LOST_FINDS_SET_ERROR: 'lost_finds/LOST_FINDS_SET_ERROR',
    CLEAR: 'lost_finds/CLEAR',
}

export const LostFindsActions = {

    lostFind: (data) => ({
        type: LostFindsTypes.LOST_FINDS,
        payload: data
    }),

    lostFindSetError: (message) => ({
        type: LostFindsTypes.LOST_FINDS_SET_ERROR,
        payload: {error: message}
    }),

    lostFindClear: () => ({
        type: LostFindsTypes.CLEAR,
    }),

}
