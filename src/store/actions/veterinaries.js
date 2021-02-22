export const VeterinariesTypes = {
    VETERINARIES_GET_ALL: 'veterinaries/VETERINARIES_GET_ALL',
    VETERINARIES_GET_ALL_SUCCESS: 'veterinaries/VETERINARIES_GET_ALL_SUCCESS',
    VETERINARIES_GET_ALL_ERROR: 'veterinaries/VETERINARIES_GET_ALL_ERROR',
    VETERINARIES_CREATE_OR_EDIT: 'veterinaries/VETERINARIES_CREATE_OR_EDIT',
    VETERINARIES_CREATE_OR_EDIT_SUCCESS: 'veterinaries/VETERINARIES_CREATE_OR_EDIT_SUCCESS',
    VETERINARIES_CREATE_OR_EDIT_ERROR: 'veterinaries/VETERINARIES_CREATE_OR_EDIT_ERROR',
    VETERINARIES_SET_ERROR: 'lost_finds/VETERINARIES_SET_ERROR',
}

export const VeterinariesActions = {

    veterinariesGetAll: () => ({
        type: VeterinariesTypes.VETERINARIES_GET_ALL,
    }),

    veterinariesCreateOrEdit: (data) => ({
        type: VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT,
        payload: data
    }),

    veterinariesSetError: (message) => ({
        type: VeterinariesTypes.VETERINARIES_SET_ERROR,
        payload: {error: message}
    }),

}
