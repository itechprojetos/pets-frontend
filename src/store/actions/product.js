export const ProductTypes = {
    GET_HIGHLIGHTS: 'product/GET_HIGHLIGHTS',
    GET_HIGHLIGHTS_SUCCESS: 'product/GET_HIGHLIGHTS_SUCCESS',
    GET_HIGHLIGHTS_ERROR: 'product/GET_HIGHLIGHTS_ERROR',
    GET_PRODUCTS: 'product/GET_PRODUCTS',
    GET_PRODUCTS_SUCCESS: 'product/GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_ERROR: 'product/GET_PRODUCTS_ERROR',
}

export const ProductActions = {

    /**
     * Obtem os destaques.
     * @returns {{type: string}}
     */
    getHighlights: () => ({
        type: ProductTypes.GET_HIGHLIGHTS,
    }),

    getProducts: (id) => ({
        type: ProductTypes.GET_PRODUCTS,
        payload: {id}
    }),

}
