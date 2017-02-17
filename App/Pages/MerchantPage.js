/**
 商家页
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import BaseSearchBar from '../Comp/Base/BaseSearchBar/BaseSearchBar'
import Colors from '../Utils/Colors';
import GlobalStyles from '../Global/GlobalStyles'
import *as BizViews from '../Comp/BizCommonComp/BizViews'
import BaseNavigationBar from '../Comp/Base/BaseNavigationBar'
import MerchantPageListComp from '../Comp/BizList/MerchantPageListComp'

/**
 *  展示组件
 */
export class MerchantPage extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    onSubmit(value) {

    }

    render() {
        let searchBar = <BaseSearchBar ref="refBaseSearchBar"
                                       placeholder="搜索"
                                       onSubmit={(value) => this.onSubmit(value)
                                       }
                                       customInputStyle={{color: 'rgba(64, 64, 64, 1)', fontSize: 15}}
        />;
        let navigationBar =
            <BaseNavigationBar
                style={ {backgroundColor: Colors.white} }
                statusBarCustomStyle={GlobalStyles.statusBarDefaultProps}
                titleTextView={null}
                searchBar={searchBar}
                hide={false}/>;
        let List = <MerchantPageListComp ref="List" {...this.props/*为了把 baseReducer 传给 MerchantPageListComp */ }
        />;

        return (
            <View style={GlobalStyles.pageContainer}>
                {navigationBar}
                {BizViews.renderShadowLine()}
                {List}
            </View>
        );
    }

}

function mapStateToProps(state) {

    //推荐此种  解构赋值的写法
    const {MerchantPageReducer}=state;
    return {baseReducer: MerchantPageReducer};
}
export default connect(mapStateToProps)(MerchantPage);



