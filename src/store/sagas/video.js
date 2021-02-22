// import { call, put } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
// import api, { API_TOKEN, USER_ID } from '../../services/api'
import actions from '../actions'
import { Video } from '../../models/Video'

export function* getVideoHighlights() {
    try {
        // google storage permissions allUsers
        // const { data } = yield call(api.get, '/services/app/...')
        const data = {
            success: true,
            videos: [
                new Video({
                    id: 1,
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    videoUrl: 'https://storage.googleapis.com/dospets/video1.mp4',
                    tags: ['amor', 'carinho', 'dicas']
                }),
                new Video({
                    id: 2,
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    videoUrl: 'https://storage.googleapis.com/dospets/video1.mp4',
                    tags: ['amor', 'dicas']
                }),
                new Video({
                    id: 3,
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    videoUrl: 'https://storage.googleapis.com/dospets/video1.mp4',
                    tags: ['amor', 'carinho']
                }),
            ]
        }
        if (data.success) {
            yield put({type: actions.VideoTypes.GET_VIDEO_HIGHLIGHTS_SUCCESS, payload: data.videos})
        } else {
            yield put({type: actions.VideoTypes.GET_VIDEO_HIGHLIGHTS_ERROR})
        }
    } catch (e) {
        console.log('getVideoHighlights exception: ', e)
        yield put({type: actions.VideoTypes.GET_VIDEO_HIGHLIGHTS_ERROR})
    }
}
