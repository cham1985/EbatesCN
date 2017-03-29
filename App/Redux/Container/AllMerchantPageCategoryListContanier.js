/**
 * Created by Ebates on 17/1/19.
 * AllMerchantPageCategoryListContanier
 * 全部商家页 的 Category 下拉 列表 数据源
 */

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Animated
} from 'react-native';
import {connect} from 'react-redux';
import CouponListComp from '../../Comp/BizList/CouponListComp'
import *as BizViews from '../../Comp/BizCommonComp/BizViews'
import *as BaseListActions from '../Actions/BaseListActions'
import *as BizApi from '../../NetWork/API/BizApi'
import *as BizMerchantListCell from '../../Comp/BizCells/BizMerchantListCell'
import GlobalStyles from '../../Global/GlobalStyles'
import BaseListComp from '../../Comp/Base/BaseListComp'
import BizDropDownListComp from '../../Comp/BizList/BizDropDownListComp'


class AllMerchantPageCategoryListContanier extends Component {

    static propTypes = {
        // AllMerchantPageReducer:PropTypes.any ,//全部商家 页面的 reducer
        AnimatedViewStyle:PropTypes.any,//下拉列表的容器
    };

    static defaultProps = {
        // AllMerchantPageReducer:null

    };

    componentWillUnmount() {
        Log.log('AllMerchantPageCategoryListContanier componentWillUnmount ')

        BizApi.AllMerchantPageCategoryListApi.isThisCompDidMount=false;
    }

    /**
     * @param props
     * @returns {XML}
     */
    // renderNetWorkAbnormalView(props) {
    //
    //     return BizViews.netWorkAbnormalView({}, {
    //         marginTop: 60,
    //         width: 90,
    //         height: 90,
    //     }, {marginTop: 25,}, {marginTop: 17}, () => {
    //         this.props.dispatch(BizApi.SearchResultPageMerchantListAPI.fetchData(BaseListActions.BaseListFetchDataType.REFRESH, props.route.value));//刷新 列表
    //
    //     });
    // }

    render() {
        Log.log('AllMerchantPageCategoryListContanier render() ')
        return (
            <BizDropDownListComp
                {...this.props}

                renderNetWorkAbnormalView={(props) => {
                    return BizViews.netWorkAbnormalView({}, {
                        marginTop: 60,
                        width: 90,
                        height: 90,
                    }, {marginTop: 25,}, {marginTop: 17}, () => {
                        {/*this.props.dispatch(BizApi.SearchResultPageMerchantListAPI.fetchData(BaseListActions.BaseListFetchDataType.REFRESH, props.route.value));//刷新 列表*/
                        }

                    });
                }
                }
            />

        );
    }
}

function mapStateToProps(state) {
    const {AllMerchantPageCategoryListReducer}=state;
    return {
        baseReducer: AllMerchantPageCategoryListReducer,
    };

}

export default connect(mapStateToProps)(AllMerchantPageCategoryListContanier);