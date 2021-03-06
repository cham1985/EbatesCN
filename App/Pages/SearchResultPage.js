/**
 * Created by Ebates on 17/1/18.
 * SearchResultPage
 * 搜索结果页
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ListView, Platform} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../Utils/Colors';
import BaseNavigationBar, {NavBarButton, baseOnBackPress} from '../Comp/Base/BaseNavigationBar'
import GlobalStyles from '../Global/GlobalStyles'
import BackAndroidEventListener from '../Utils/EventListener/BackAndroidEventListener'
import BaseSearchBar from '../Comp/Base/BaseSearchBar/BaseSearchBar'
import *as BizViews from '../Comp/BizCommonComp/BizViews'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import BizSearchResultPagScrollableTabBar from '../Comp/BizCommonComp/BizSearchResultPagScrollableTabBar'
import SearchResultPageMerchantListContanier from '../Redux/Container/SearchResultPageMerchantListContanier'
import SearchResultPageCouponListContanier from '../Redux/Container/SearchResultPageCouponListContanier'
import *as BizApi from '../NetWork/API/BizApi'
import *as SearchResultPageActions from '../Redux/Actions/SearchResultPageActions'
import *as BaseListActions from '../Redux/Actions/BaseListActions'
import *as StringOauth from '../Utils/StringUtils/StringOauth'
import *as HistorySearchDB from '../DB/BizDB/HistorySearchDB'
import *as EventListener from '../Utils/EventListener/EventListener'
import SMSTimer from '../Utils/SMSTimer'

/**
 *
 */
export class SearchResultPage extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            this.backAndroidEventListener = new BackAndroidEventListener({
                ...props,
                backPress: (e) => baseOnBackPress(this.props.navigator),
                hardwareBackPressListenerName: gRouteName.SearchResultPage
            });
        }

        // this.preValue = 0;
        this.BaseSearchBarValue = this.props.route.value;
    }

    componentWillMount() {
        this.props.dispatch(SearchResultPageActions.getDefultTabLabelsAction());
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        Log.log('SearchResultPage componentWillUnmount')
    }

    /**
     * 调 搜索关键词 接口, 商家列表 肯定 已经挂载了, 如果 没有 右划, 即 优惠列表 没挂载,跟 刚进此页面 调的 接口过程一样; 如果 当前 显示的是 优惠列表 ,则 调 关键词 搜索 接口 2个 列表都刷新,当前显示的 列表 先进loading 状态, 未显示的列表 直接 刷新数据
     * @param value
     */
    onSubmit(value) {
        if (StringOauth.isNull(value)) {
            Log.log('onSubmit 了一个 空字符串')
            return;
        }

        HistorySearchDB.saveHistoryDB(value).then(() => {
            // Log.log('成功 缓存一个新的 历史搜索 关键字  '+ value);
            this.props.dispatch(BizApi.SearchPageListApi.fetchData(BaseListActions.BaseListFetchDataType.REFRESH));

        }).catch((e) => {

        });

        this.BaseSearchBarValue = value;
        this.props.route.value = value;

        {
            this.props.dispatch(BaseListActions.InitListDataSource(BizApi.SearchResultPageMerchantListAPI.ApiName));// 商家 列表的 InitListState  重置
            this.props.dispatch(BaseListActions.InitListDataSource(BizApi.SearchResultPageCouponListAPI.ApiName));// 优惠 列表的
            // InitListState  重置

            this.props.dispatch(SearchResultPageActions.updateTabLabelsAction(BizApi.SearchResultPageMerchantListAPI.tabLabel, 0));//商家列表的 tabLabel 清零
            this.props.dispatch(SearchResultPageActions.updateTabLabelsAction(BizApi.SearchResultPageCouponListAPI.tabLabel, 0));//优惠 列表的 tabLabel 清零
        }

        // if (this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.curTabIndex == 0)
        {

            // Log.log('SearchResultPage onSubmit  this.refs.scrollableTabView.props.children[0]='+Log.writeObjToJson(this.refs.scrollableTabView.props.children[0]));

            // this.refs.SearchResultPageMerchantListContanierRef.onRefresh();

            // React.Children.map(this.refs.scrollableTabView.props.children, function (child) {
            //     Log.log('SearchResultPage onSubmit  child='+child);
            //
            //     return child.onRefresh();
            // })

            // this.props.dispatch(BizApi.SearchResultPageMerchantListAPI.fetchData(BaseListActions.BaseListFetchDataType.REFRESH, this.SearchResultPageMerchantListContanierRef.props));//刷新 列表

            this.props.dispatch(BaseListActions.Loadinglist(BaseListActions.BaseListFetchDataType.REFRESH, BizApi.SearchResultPageMerchantListAPI.ApiName));

            //为了 让 2个 列表 数据源 重置成功,只能暂时 慢一秒再请求接口,否则 this.props.baseReducer.meta 数据没重置
            this.timer = new SMSTimer({
                timerNums: 1,
                callBack: (time) => {
                    Log.log('time===' + time);
                    if (time == -1  ) {
                        EventListener.sendEvent(BizApi.SearchResultPageMerchantListAPI.ApiName);
                        EventListener.sendEvent(BizApi.SearchResultPageCouponListAPI.ApiName);

                    }
                }
            }).start();

        }
        // else if (this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.curTabIndex == 1) {
            // this.props.dispatch(BizApi.SearchResultPageCouponListAPI.fetchData(BaseListActions.BaseListFetchDataType.REFRESH, this.SearchResultPageCouponListContanierRef.props));//刷新 列表
        //
        // }
    }

    /**
     * 点击 '查看全部商家'或 '查看全部列表' 按钮 后 重置 搜索控件
     */
    // onResetSearchBar=()=>{
    //     this.refs.refBaseSearchBar.onCancel(true);
    //     this.BaseSearchBarValue='';
    // }

    /**
     * 为了让正在 滚动的 ScrollableTabView 关联的 BizSearchResultPagScrollableTabBar 的 底部 横线 在 判断到 滚到 其他 页面时, 及时 用其页面 对应的 tabbar的 Text 控件的 宽 计算 最新的 横线的 宽,避免 多 个 BizSearchResultPagScrollableTabBar.tabbar.Text 控件 的 宽不一样时, 左右滚动 导致 横线位置不对
     * */
    onScroll = (value) => {
        this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.updataCurTabIndex(value);
    }

    onChangeTab = (i, ref, from) => {
        //避免 滚动停止时, curTabIndex 还没变化
        this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.isNeedUpdataCurTabIndex = true;
        Log.log('SearchResultPage onChangeTab isNeedUpdataCurTabIndex ==' + this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.isNeedUpdataCurTabIndex);

        if (this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.curTabIndex != i) {
            this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.curTabIndex = i;
            this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.updateTabUnderlineWidth();
            Log.log('SearchResultPage onChangeTab curTabIndex ==' + this.refs.scrollableTabView.refs.BizSearchResultPagScrollableTabBar.curTabIndex);
        }
    }

    render() {
        const {navigator} = this.props;
        let self=this;

        let searchBar = BizViews.renderTwoLevelPageSearchBar('输入商家,  优惠名称', this.BaseSearchBarValue, (value) => this.onSubmit(value),);

        let navigationBar =
            <BaseNavigationBar
                style={ {backgroundColor: Colors.white} }
                statusBarCustomStyle={GlobalStyles.statusBarDefaultProps}
                titleTextView={null}
                leftButton={NavBarButton.getBackButton(() => baseOnBackPress(navigator, this.backAndroidEventListener))}
                searchBar={searchBar}
                hide={false}/>;

        let content =
            <ScrollableTabView
                ref="scrollableTabView"
                renderTabBar={() =>
                    <BizSearchResultPagScrollableTabBar
                        ref="BizSearchResultPagScrollableTabBar"
                        style={{height: 45, borderWidth: 0, elevation: 0.1}}
                        tabStyle={{height: 45}}
                        activeTextColor='rgba(54, 166, 66, 1)'
                        tabBarBackgroundColor={Colors.white}
                        tabBarUnderlineColor={Colors.appUnifiedBackColor}
                        inactiveTextColor={Colors.BizCommonBlack}
                        customRefs={this.props.baseReducer.customRefs}
                        textStyle={{
                            fontSize: 14,
                            //backgroundColor: Colors.getRandomColor()
                        }}
                        underlineColor='rgba(67, 187, 78, 1)'
                        underLineBottom={10}
                        underlineHeight={2}/>
                }
                onScroll={(value) => {
                    //暂时只有2个tab, 先写死,以后超过2个 再说
                    this.onScroll(value);
                }
                }
                onChangeTab={({
                    /*只在 自动滚动 停止 后 回调,*/
                    i,
                    ref,
                    from,
                }) => {
                    this.onChangeTab(i, ref, from);
                }}
            >
                <SearchResultPageMerchantListContanier ref='SearchResultPageMerchantListContanierRef' {...this.props}
                                                       tabLabel={this.props.baseReducer.merchantListTabLable }
                />
                <SearchResultPageCouponListContanier ref={(r) => {
                    self.SearchResultPageCouponListContanierRef = r;
                }
                } {...this.props}
                                                     tabLabel={this.props.baseReducer.couponListTabLable }
                />
            </ScrollableTabView>

        return (
            <View style={GlobalStyles.pageContainer}>
                {navigationBar}
                {BizViews.renderShadowLine()}
                {content}
            </View>
        );
    }

}

function mapStateToProps(state) {

    //推荐此种  解构赋值的写法
    const {SearchResultPageReducer}=state;
    return {baseReducer: SearchResultPageReducer};
}
export default connect(mapStateToProps)(SearchResultPage);