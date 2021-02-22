export const ServicesTypes = {
    CREATE_OR_EDIT: 'services/CREATE_OR_EDIT',
    CREATE_OR_EDIT_SUCCESS: 'services/CREATE_OR_EDIT_SUCCESS',
    CREATE_OR_EDIT_ERROR: 'services/CREATE_OR_EDIT_ERROR',
    ERROR_MESSSAGE: 'services/ERROR_MESSSAGE',
    GET_ALL: 'services/GET_ALL',
    GET_ALL_SUCCESS: 'services/GET_ALL_SUCCESS',
    GET_ALL_ERROR: 'services/GET_ALL_ERROR',
    GET_ALL_USER: 'services/GET_ALL_USER',
    GET_ALL_USER_SUCCESS: 'services/GET_ALL_USER_SUCCESS',
    GET_ALL_USER_ERROR: 'services/GET_ALL_USER_ERROR',
    DELETE: 'services/DELETE',
    DELETE_SUCCESS: 'services/DELETE_SUCCESS',
    DELETE_ERROR: 'services/DELETE_ERROR',
    EDIT: 'services/EDIT',
    CLEAR: 'services/CLEAR',
}

export const ServicesActions = {

    serviceCreateOrEdit: (data) => ({
        type: ServicesTypes.CREATE_OR_EDIT,
        payload: data
    }),

    serviceSetErrorMessage: (message) => ({
        type: ServicesTypes.ERROR_MESSSAGE,
        payload: {error: message}
    }),

    serviceGetAll: () => ({
        type: ServicesTypes.GET_ALL,
    }),

    serviceGetAllUser: () => ({
        type: ServicesTypes.GET_ALL_USER,
    }),

    serviceClear: () => ({
        type: ServicesTypes.CLEAR,
    }),

    serviceDelete: (id) => ({
        type: ServicesTypes.DELETE,
        payload: {id}
    }),

    serviceEdit: (service) => ({
        type: ServicesTypes.EDIT,
        payload: service
    }),

}
