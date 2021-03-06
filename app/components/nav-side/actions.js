import {fetchInfo} from '../common/actions'
import {FETCH_START, FETCH_FAIL, FETCH_SUCCEED} from './actionTypes'

export const getNavInfo = () => {
  let url = `/get-navside-info`;
  return fetchInfo(url, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL]);
}