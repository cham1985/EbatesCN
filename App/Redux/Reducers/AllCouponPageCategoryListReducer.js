/**
 * Created by Ebates on 16/12/27.
 * AllCouponPageCategoryListReducer
 * 全部优惠页 Category 下拉列表的 reducer
 */
import {
    ListView,
} from 'react-native';
import InitialState, {
    InitListState,
    ListToLoadingState,
    ListSuccesState,
    ListWillUnmount,ListChangeNumsItem
} from '../InitialState/ListInitialState'
import *as BaseListActions from '../Actions/BaseListActions'
import *as AllCouponPageApi from '../../NetWork/API/AllCouponPageApi'
const {List, fromJS} = require('immutable') //导入  Immutable.js 的 Record API


const initialState = new InitialState()/*通用列表的初始UI状态*/
/*搜索结果页 优惠 列表的 特殊状态*/
    .setIn(['ApiName'], AllCouponPageApi.AllCouponPageCategoryListApi.ApiName)
    .setIn(['isRenderRefreshControl'], false)

export default function AllCouponPageCategoryListReducer(state = initialState, action) {
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

            return ListSuccesState(state,action);
        }
            break;

        case BaseListActions.BaseListStatus.NODATA: {

            let _nextState = state
                .setIn(['status'], action.type)
                .setIn(['opt'], action.opt);

            return _nextState;
        }
            break;
        case BaseListActions.BaseListStatus.WillUnmount: {

            // BizApi.SearchResultPageCouponListAPI.componentDidMount = false;
            return ListWillUnmount(state,action);
        }
            break;
        case BaseListActions.BaseListStatus.ChangeNumsItem: {

            // BizApi.SearchResultPageCouponListAPI.componentDidMount = false;
            return ListChangeNumsItem(state,action);
        }
            break;

    }

    /**
     * ## Default
     */
    return state;
}