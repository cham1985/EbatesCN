import React, {Component} from 'react';
import {
    SwitchIOS,
    View,
    Text
} from 'react-native';
import {connect} from 'react-redux'
import BaseTitleBt from '../../Comp/Base/BaseTitleBt'
import Colors from '../../Utils/Colors'
import *as RootComponentActions from '../../Redux/Actions/RootComponentActions'
// import RootNavigator from '../../Root/RootNavigator'
// import RegisterPage from '../../Pages/RegisterPage'
import *as LeftDrawerComponent from './LeftDrawerComponent'
import *as EventListener from '../../Utils/EventListener/EventListener'
import *as RootComponentInitialState from '../../Redux/InitialState/RootComponentInitialState'
import *as UserDB from '../../DB/BizDB/UserDB'

//左图
export  class LeftPanelView extends Component {

    onBtSelect(i) {
        // showToast('onBtSelect  type=='+i);
        switch (i) {
            case 0:
            {
                if (this.props.RootComponentReducer.curNav!=RootComponentInitialState.rootNavs.RootHomeNavigatorContainer){
                    this.props.dispatch(RootComponentActions.changeNavActions(RootComponentInitialState.rootNavs.RootHomeNavigatorContainer));
                }
            }
            break;
            case 1:
            {
                // if (this.props.RootComponentReducer.curNav!=RootComponentInitialState.rootNavs.RootRecommendFriendNavContainer){
                //     this.props.dispatch(RootComponentActions.changeNavActions(RootComponentInitialState.rootNavs.RootRecommendFriendNavContainer));
                // }

                //此处模拟注销
                gUserDB.logOut();

            }
                break;
        }

        EventListener.sendEvent(LeftDrawerComponent.closeDrawerEventName)
    }

    render() {
        return (
            <View style={{
                marginTop: 20, justifyContent: 'center', marginRight: 15, alignItems: 'center',
                backgroundColor: Colors.getRandomColor()
            }}>
                <BaseTitleBt
                    btStyle={[{
                        borderRadius: 4,
                        height: 44,
                        alignItems: 'center',
                        marginLeft: 15,
                        marginRight: 15,
                        justifyContent: 'center',
                        backgroundColor: Colors.getRandomColor(),
                        marginTop: 15
                    }]}
                    onPress={()=>this.onBtSelect(0)}
                    textStyle={{
                        fontSize: 15,
                        color: Colors.white,
                    }}
                    title='首页'
                    disabled={false}
                >
                </BaseTitleBt>

                <BaseTitleBt
                    btStyle={[{
                        borderRadius: 4,
                        height: 44,
                        alignItems: 'center',
                        marginLeft: 15,
                        marginRight: 15,
                        justifyContent: 'center',
                        backgroundColor: Colors.getRandomColor(),
                        marginTop: 15
                    }]}
                    onPress={()=>this.onBtSelect(1)}
                    textStyle={{
                        fontSize: 15,
                        color: Colors.white,
                    }}
                    title='注销'
                    disabled={false}
                >
                </BaseTitleBt>
            </View>

        )
    }
}

function mapStateToProps(state) {

    // 把 state里的 RootComponentReducer 注入到 this.props里
    const {RootComponentReducer}=state;
    return {RootComponentReducer};
}
export default connect(mapStateToProps)(LeftPanelView)
