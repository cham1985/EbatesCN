/**
 * Created by Ebates on 17/3/14.
 * AboutEbatesCnPageReducer.js
 */
const {Record, fromJS,} = require('immutable') //导入  Immutable.js 的 Record API

import InitialState, {
    InitListState,
    ListToLoadingState,
    ListSuccesState,
    ListFailureState,
    ListRemoveOneItem,ListWillUnmount,ListRemoveNumsItem,ListChangeOneItem,ListInsertOneItem
} from '../InitialState/ListInitialState'
import *as BaseListActions from '../Actions/BaseListActions'
import *as AboutEbatesCnPageApi from '../../NetWork/API/AboutEbatesCnPageApi'

const initialState = new InitialState()
    .setIn(['ApiName'], AboutEbatesCnPageApi.AboutEbatesCnPageApi.ApiName)
    .setIn(['isRenderRefreshControl'], false)
    .setIn(['isRenderFooterView'], false);


export default function AboutEbatesCnPageReducer(state = initialState, action) {
    if (state.ApiName && state.ApiName != action.ApiName) {
        return state;
    }

    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case BaseListActions.BaseListStatus.INITIALIZE: {//此控件第一次 componentDidMount 挂载时 回调

            return InitListState(state, action);
        }
            break;
        case BaseListActions.BaseListStatus.Loading: {//正在 加载网络 状态
            return ListToLoadingState(state, action);
        }
            break;
        case BaseListActions.BaseListStatus.SUCCESS: {

            return ListSuccesState(state, action);

        }
            break;
        case BaseListActions.BaseListStatus.FAILURE: {

            return ListFailureState(state, action);
        }
            break;
        case BaseListActions.BaseListStatus.REMOVE: {

            return ListRemoveOneItem(state, action);
        }
            break;
        case BaseListActions.BaseListStatus.WillUnmount:{

            return ListWillUnmount(state,action);
        }

        case BaseListActions.BaseListStatus.RemoveNums: {

            return ListRemoveNumsItem(state, action);
        }
            break;
        case BaseListActions.BaseListStatus.ChangeOneItem: {

            return ListChangeOneItem(state, action);
        }
            break;
        case BaseListActions.BaseListStatus.InsertOneItem: {

            return ListInsertOneItem(state, action);
        }
            break;
    }

    /**
     * ## Default
     */
    return state;
}