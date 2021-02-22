export const PetsTypes = {
    CREATE_OR_EDIT: 'pets/CREATE_OR_EDIT',
    CREATE_OR_EDIT_SUCCESS: 'pets/CREATE_OR_EDIT_SUCCESS',
    CREATE_OR_EDIT_ERROR: 'pets/CREATE_OR_EDIT_ERROR',
    CREATE_OR_EDIT_SET_ERROR: 'pets/CREATE_OR_EDIT_SET_ERROR',
    GET_ALL: 'pets/GET_ALL',
    GET_ALL_SUCCESS: 'pets/GET_ALL_SUCCESS',
    GET_ALL_ERROR: 'pets/GET_ALL_ERROR',
    GET_ALL_USER: 'pets/GET_ALL_USER',
    GET_ALL_USER_SUCCESS: 'pets/GET_ALL_USER_SUCCESS',
    GET_ALL_USER_ERROR: 'pets/GET_ALL_USER_ERROR',
    CLEAR: 'pets/CLEAR',
}

export const PetsActions = {

    petsCreateOrEdit: (data) => ({
        type: PetsTypes.CREATE_OR_EDIT,
        payload: data
    }),

    petsCreateOrEditSetError: (message) => ({
        type: PetsTypes.CREATE_OR_EDIT_SET_ERROR,
        payload: {error: message}
    }),

    petsGetAll: () => ({
        type: PetsTypes.GET_ALL,
    }),

    petsGetAllUser: () => ({
        type: PetsTypes.GET_ALL_USER,
    }),

    petsClear: () => ({
        type: PetsTypes.CLEAR,
    }),

}
