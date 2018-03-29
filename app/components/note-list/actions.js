import WOW from 'wowjs/dist/wow.js'

import {fetchInfo} from '../common/actions'
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from '../note-list/actionTypes'

export const getNote = (current, count) => {
  return fetchInfo(`/get-note?count=${count}&current=${current}`,
          [FETCH_START, FETCH_SUCCEED, FETCH_FAIL], () => {new WOW.init()})
}