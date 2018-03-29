import {fetchInfo} from "../common/actions"
import {FETCH_FAIL, FETCH_START, FETCH_SUCCEED} from '../nav-side/actionTypes'

export const getArticleDetail = (id) => {
  let url = `/get-article-detail/${id}`
  return fetchInfo(url, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL])
}