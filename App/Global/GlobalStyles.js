/**
 * 全局样式 GlobalStyles
 * @flow
 */
import {
    Dimensions, Platform,PixelRatio
} from 'react-native'
import Layout from 'react-native-tab-navigator/Layout';
import Colors from '../Utils/Colors';

const {height, width} = Dimensions.get('window');

//慢慢代替 下边的 module.exports 里的内容
global.gScreen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    navBarHeight: Platform.OS === 'ios' ? 64 : 50,
    navBarPaddingTop: Platform.OS === 'ios' ? 20 : 0,
    onePix: 1 / PixelRatio.get(),
    isIOS: Platform.OS === 'ios'
}

module.exports =
// export default GlobalStyles=  这样导出报错
    {
        line: {
            flex: 1,
            height: 0.4,
            opacity: 0.5,
            backgroundColor: 'darkgray',
        },
        cell_container: {
            flex: 1,
            backgroundColor: 'white',
            padding: 10,
            marginLeft: 5,
            marginRight: 5,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderStyle: null,
            borderWidth: 0.5,
            borderRadius: 2,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        listView_container: {
            flex: 1,
            backgroundColor: '#f3f3f4',
        },
        backgroundColor: '#f3f3f4',
        listView_height: (height - (20 + 40)),
        window_height: height,
        window_width: width,
        nav_bar_height_ios: 44,
        nav_bar_height_android: 50,
        STATUS_BAR_HEIGHT : 20,//IOS 顶部状态栏高

        statusBarStyle: {
            height: Platform.OS === 'ios' ? 20 : 0,
            //networkActivityIndicatorVisible: true,
            animated: true, showHideTransition: 'slide',
            // backgroundColor: Colors.backGray
        },
        // statusBar的默认 统一样式
        statusBarDefaultProps: {
            backgroundColor: Colors.white,
            barStyle: Platform.OS === 'ios' ? 'dark-content' : 'default' //
        },

        //输入框的容器view
        InputItemContainer: {
            // marginTop: 40,
            height: 44,
            flexDirection: 'row', alignItems: 'center',
            paddingLeft: 15, paddingRight: 15,
            //borderColor: Colors.borderColor, borderWidth: 1,
            backgroundColor: Colors.white//'rgba(252, 254, 254, 1)'
        },
        //输入框容器里的左图
        IpputItemLeftView: {
            // flex: 1,
            paddingRight: 30,
            justifyContent: 'center', alignItems: 'flex-start',
            height: 44,
            //backgroundColor: Colors.getRandomColor()
        },
        //输入框容器里的右图
        InputItemRightView: {
            flex: 4, height: 40, //,
            //backgroundColor: Colors.getRandomColor()
        },
        textInput: {
            //marginTop: 3,//因 input的内容偏高,此处为了下移点, 和 input左边的 邮箱,密码2个Text 对齐
            height: 40,
            fontSize: 15,
            // alignItems: 'center',
            color: Colors.black,
            //backgroundColor: Colors.getRandomColor()
        },
        bottomTabBarHeight: Layout.tabBarHeight,//一级页面底部tabbar的整体高度
        window: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        //每个页面的最大的view的 style
        pageContainer: {
            flex: 1,
            backgroundColor: Colors.white,
        },
        //导航栏标题字体的样式
        navBarTitleTextStyle: {
            color: Colors.allNavTitleColor, fontSize: 17
        },
        //顶部 状态栏+nav 的高
        statusBarAndNavBarH: Platform.OS === 'ios' ? 20 + 44 : 50,
        AllMerchantPageMenuBtH:45,//全部商家页 筛选 按钮 的H
        AllMerchantPageDropDownListCellH:44,//全部商家||全部优惠 页 单选下拉列表的默认高
        AllMerchantPageFilterListH:465,//全部商家页 筛选 列表的高,暂时写死,懒得 动态算
    };

//顶部 状态栏+nav 的高
// export const statusBarAndNavBarH = Platform.OS === 'ios' ? this.statusBarStyle.height + this.nav_bar_height_ios : this.nav_bar_height_android,
