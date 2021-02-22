export const VideoTypes = {
    GET_VIDEO_HIGHLIGHTS: 'video/GET_VIDEO_HIGHLIGHTS',
    GET_VIDEO_HIGHLIGHTS_SUCCESS: 'video/GET_VIDEO_HIGHLIGHTS_SUCCESS',
    GET_VIDEO_HIGHLIGHTS_ERROR: 'video/GET_VIDEO_HIGHLIGHTS_ERROR',
}

export const VideoActions = {

    /**
     * Obtem os videos em destaques.
     * @returns {{type: string}}
     */
    getVideoHighlights: () => ({
        type: VideoTypes.GET_VIDEO_HIGHLIGHTS,
    }),

}
