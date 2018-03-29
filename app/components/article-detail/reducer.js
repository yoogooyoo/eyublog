import {generateReducer} from '../common/reducer'
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from '../nav-side/actionTypes'

export const initialState = {}

export default generateReducer(initialState, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL])