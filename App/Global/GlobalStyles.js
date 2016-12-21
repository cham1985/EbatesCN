/**
 * 全局样式
 * @flow
 */
import {
    Dimensions, Platform
} from 'react-native'
// import {statusBarH} from './GlobalConst'
import Colors from '../Utils/Colors';

const {height, width} = Dimensions.get('window');

module.exports = {
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
    // STATUS_BAR_HEIGHT : 20,

    statusBarStyle: {
        height: Platform.OS === 'ios' ? 20 : 0,
        // backgroundColor: Colors.backGray
    },
    //二级页面 statusBar的统一属性
    twoLevelPageStatusBarProps: {
        backgroundColor: Colors.white,
        networkActivityIndicatorVisible: true,
        barStyle: 'dark-content'
    }

};