/**
 登录 页
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Image, Platform} from 'react-native';
import Colors from '../Utils/Colors';
import  BaseNavigationBar, {NavBarButton, baseOnBackPress} from '../Comp/Base/BaseNavigationBar'
import BackAndroidEventListener from '../Utils/BackAndroidEventListener'
// import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import BaseTitleBt from '../Comp/Base/BaseTitleBt'
import {baseSpeLine} from '../Comp/Base/BaseSpeLine'
import *as OauthForm from '../Utils/LogRegisterUtils/OauthForm'
import GlobalStyles from '../Global/GlobalStyles'
import phoneQuickLogPage from './phoneQuickLogPage'
import BizLogBt from '../Comp/BizCommonComp/BizLogBt'
import *as BizViews from '../Comp/BizCommonComp/BizViews'
import RegisterPage from './RegisterPage'
import {connect} from 'react-redux'
import *as LogInActions from '../Redux/Actions/LogInActions'
import BaseImgBt from '../Comp/Base/BaseImgBt'
import *as Math from '../Utils/Math'
import *as RootNavigator from '../Root/RootNavigator'

//本地测试 验证码图片用, 接口好了就删了
const IMAGES = [
    'http://www.savethecat.com/wp-content/uploads/2015/06/cats.jpg',
    'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
    'http://media4.popsugar-assets.com/files/2014/08/08/878/n/1922507/caef16ec354ca23b_thumb_temp_cover_file32304521407524949.xxxlarge/i/Funny-Cat-GIFs.jpg',
    'http://media1.santabanta.com/full1/Animals/Cats/cats-87a.jpg',
    'http://awesomegifs.com/wp-content/uploads/cat-smacks-at-hands.gif',
];

/**
 *  展示组件
 */
export class LogInPage extends Component {

    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            this.backAndroidEventListener = new BackAndroidEventListener({
                ...props,
                backPress: (e)=> baseOnBackPress(this.props.navigator),
                hardwareBackPressListenerName: 'LogPage'
            });
        }

        this.email = '';
        this.password = '';
        this.imgOauthCode = '';//图片验证码
        this.props.dispatch(LogInActions.hideImgOauthInputAction());

    }

    componentDidMount() {

        // this.backAndroidEventListener.addEventListener();

    }

    componentWillUnmount() {
        // super.componentWillUnmount();
        // this.backAndroidEventListener.removeEventListener();
    }

    /*
     左上角点击
     */
    // onBackPress() {
    //     this.props.navigator.pop();//app 页面回退
    //     return true;//作用: 避免安卓点Home键, 完全退出
    // }

    //进 注册页
    gotoRegisterPage() {
        // if (RootNavigator.routeNumsFromCurrentRoutes(this.props.navigator,global.gRouteName.RegisterPage)==1){
        //     this.props.navigator.pop();
        // }else{
        //     this.props.navigator.push({
        //         component: RegisterPage,
        //         name:gRouteName.RegisterPage//'RegisterPage'
        //     });
        // }

        if (!RootNavigator.popToDesignatedPage(this.props.navigator, global.gRouteName.RegisterPage)) {
            this.props.navigator.push({
                component: RegisterPage,
                name: gRouteName.RegisterPage//'

            });
        }
    }

    updateEmail(text) {
        this.email = text;
        Log.log('this.email==' + this.email);
    }

    updatePassword(text) {
        this.password = text;
        Log.log('this.email==' + this.password);
    }

    updateImgOauthCode(text) {
        this.imgOauthCode = text;
        Log.log('this.imgOauthCode==' + this.imgOauthCode);
    }

    //输入框失去焦点时回调
    onBlur() {
        Log.log('onBlur this.email==' + this.email);
        Log.log('onBlur this.password==' + this.password);

    }

    onLoginPress() {
        if (!OauthForm.oauthEmail(this.email)) {
            showToast('邮箱地址不正确');
            return;
        }
        if (!OauthForm.oauthPass(this.password)) {
            showToast('密码至少6位字符或数字');
            return;
        }

        showToast('onLoginPress ok ');

    }

    //快捷登录
    onQuickLoginPress() {
        this.props.navigator.push({
            component: phoneQuickLogPage
        });
    }

    //忘记密码
    onForgetPassPress() {
        showToast('onForgetPassPress');

        this.props.dispatch(LogInActions.showImgOauthInputAction());
        this.getOauthCodeImg();
    }

    //获取验证码图片 接口
    getOauthCodeImg(){
        let uri=IMAGES[Math.randomNums(0,IMAGES.length-1)];
        this.props.dispatch(LogInActions.changeOauthCodeImgAction(uri));
    }

    /*邮箱输入框的容器view*/
    emailInputView() {
        return (
            <View style={[GlobalStyles.InputItemContainer, {marginTop: 40}]}>
                <View style={GlobalStyles.IpputItemLeftView}>
                    <Text style={styles.IpputItemLeftText}>邮箱</Text>
                </View>
                <View style={GlobalStyles.InputItemRightView}>
                    <TextInput
                        style={GlobalStyles.textInput}
                        autoFocus={false}
                        placeholder='输入邮箱地址'
                        onChange={(event) => this.updateEmail(
                            event.nativeEvent.text
                        )}
                        onBlur={() => this.onBlur()}
                        underlineColorAndroid={'transparent'}
                    />
                </View>

            </View>
        );
    }

    /*密码输入框的容器view*/
    passInputView() {
        return (
            <View style={[GlobalStyles.InputItemContainer]}>
                <View style={GlobalStyles.IpputItemLeftView}>
                    <Text style={styles.IpputItemLeftText}>密码</Text>
                </View>
                <View style={GlobalStyles.InputItemRightView}>
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder='输入至少6位字符或数字'
                        onChange={(event) => this.updatePassword(
                            event.nativeEvent.text
                        )}
                        onBlur={() => this.onBlur()}
                        underlineColorAndroid={Colors.transparent}
                    />
                </View>
            </View>
        );
    }

    /*图片验证码 输入框的容器view*/
    imgOauthCodeInputView() {
        return (
            <View style={[GlobalStyles.InputItemContainer]}>
                <View style={[GlobalStyles.IpputItemLeftView, {paddingRight: 16}]}>
                    <Text style={styles.IpputItemLeftText}>验证码</Text>
                </View>
                <View style={[GlobalStyles.InputItemRightView, {
                    //flexDirection: 'row',
                    //alignItems: 'center',
                    //justifyContent: 'space-between'
                }]}>
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder='输入图片验证码'
                        onChange={(event) => this.updateImgOauthCode(
                            event.nativeEvent.text
                        )}
                        onBlur={() => this.onBlur()}
                        underlineColorAndroid={Colors.transparent}>
                    </TextInput>
                </View>
                {/*图片按钮*/}
                <BaseImgBt
                    btStyle={{
                        //height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.white,
                    }}
                    imgStyle={{width: 110, height: 35,
                        //backgroundColor:Colors.getRandomColor()
                    }}
                    uri={this.props.LogInReducer.oauthCodeImgUri}
                    onPress={()=>this.getOauthCodeImg()}
                >
                </BaseImgBt>
            </View>
        );
    }

    // renderLoginRegisterView(i, v) {
    //     switch (i) {
    //         case 0: {//登录viiew
    //             return (
    //                 // 登录注册view的 容器view
    //                 <View
    //                     key={i}
    //                     tabLabel={v}/*有几个tabLabel,决定有几个tab*/
    //                     style={styles.renderLoginRegisterView}
    //                 >
    //                     {/*邮箱输入框的容器view*/}
    //                     {this.emailInputView()}
    //                     {/*密码输入框的容器view*/}
    //                     {this.passInputView()}
    //                     {/*按钮和忘记密码的容器view*/}
    //                     <View
    //                         style={{paddingLeft: 20, paddingRight: 20}}
    //                     >
    //                         <BaseTitleBt
    //                             btStyle={{
    //                                 borderRadius: 3, height: 40, alignItems: 'center',
    //                                 justifyContent: 'center', backgroundColor: Colors.appUnifiedBackColor, marginTop: 15
    //                             }}
    //                             selectColor={Colors.blackTranslucent}
    //                             onPress={()=>this.onLoginPress()}
    //                             textStyle={{
    //                                 fontSize: 18,
    //                                 fontFamily: 'Gill Sans',
    //                                 color: Colors.white,
    //                             }}
    //                             title='登录'
    //                         >
    //                         </BaseTitleBt>
    //                         <BaseTitleBt
    //                             btStyle={{
    //                                 marginTop: 10,
    //                                 borderRadius: 3,
    //                                 height: 40,
    //                                 alignItems: 'center',
    //                                 justifyContent: 'center',
    //                                 backgroundColor: Colors.white,
    //                                 borderColor: Colors.borderColor,
    //                                 borderWidth: 1,
    //                             }}
    //                             selectColor={Colors.blackTranslucent}
    //                             onPress={()=>this.onQuickLoginPress()}
    //                             textStyle={{
    //                                 fontSize: 18,
    //                                 fontFamily: 'Gill Sans',
    //                                 color: Colors.appUnifiedBackColor,
    //                             }}
    //                             title='手机号快捷登录'
    //                         >
    //                         </BaseTitleBt>
    //                         {/*忘记密码容器view*/}
    //                         <View
    //                             style={{
    //                                 height: 40, marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start',
    //                                 alignItems: 'center'
    //                             }}
    //                         >
    //                             {baseSpeLine({flex: 1})}
    //                             <BaseTitleBt
    //                                 btStyle={{
    //                                     flex: 1,
    //                                     height: 40, alignItems: 'center',
    //                                     justifyContent: 'center', backgroundColor: 'rgba(242, 244, 244, 1)',
    //                                 }}
    //                                 //selectColor={Colors.blackTranslucent}
    //                                 onPress={()=>this.onForgetPassPress()}
    //                                 textStyle={{
    //                                     fontSize: 14,
    //                                     fontFamily: 'Gill Sans',
    //                                     color: Colors.textGray,
    //                                 }}
    //                                 title='忘记密码'
    //                             >
    //                             </BaseTitleBt>
    //                             {baseSpeLine({flex: 1})}
    //                         </View>
    //                     </View>
    //
    //                 </View>
    //             );
    //         }
    //             break;
    //         case 1: {//注册view
    //             let str = '注册即同意  ';
    //             return (
    //                 <View
    //                     key={i}
    //                     tabLabel={v}/*有几个tabLabel,决定有几个tab*/
    //                     style={styles.renderLoginRegisterView}
    //                 >
    //                     {/*邮箱输入框的容器view*/}
    //                     {this.emailInputView()}
    //                     {/*密码输入框的容器view*/}
    //                     {this.passInputView()}
    //                     {this.InviteCodeInputView()}
    //                     {/*服务条款容器view*/}
    //                     <View style={{
    //                         height: 40,
    //                         paddingLeft: 55,
    //                         flexDirection: 'row',
    //                         justifyContent: 'flex-start',
    //                         alignItems: 'center',
    //                         //backgroundColor: Colors.getRandomColor()
    //                     }}>
    //                         <Text style={{
    //                             color: Colors.textGray,
    //                             fontSize: 13,
    //                             //backgroundColor: Colors.getRandomColor()
    //                         }}>
    //                             {str}
    //                         </Text>
    //                         <Text style={{
    //                             color: Colors.appUnifiedBackColor,
    //                             fontSize: 13,
    //                             //backgroundColor: Colors.getRandomColor()
    //                         }}
    //                               onPress={
    //                                   ()=>this.onPressServiceProvision()
    //                               }
    //                         >
    //                             Ebates.cn服务条款
    //                         </Text>
    //                     </View>
    //                     {/*view*/}
    //                     <View
    //                         style={{paddingLeft: 15, paddingRight: 15}}
    //                     >
    //                         <BaseTitleBt
    //                             btStyle={{
    //                                 borderRadius: 3, height: 40, alignItems: 'center',
    //                                 justifyContent: 'center', backgroundColor: Colors.appUnifiedBackColor
    //                             }}
    //                             selectColor={Colors.blackTranslucent}
    //                             onPress={()=>this.onRegisterPress()}
    //                             textStyle={{
    //                                 fontSize: 18,
    //                                 fontFamily: 'Gill Sans',
    //                                 color: Colors.white,
    //                             }}
    //                             title='免费注册赠$5'
    //                         >
    //                         </BaseTitleBt>
    //                     </View>
    //                 </View>
    //             );
    //         }
    //             break;
    //     }
    // }

    render() {
        const {navigator} = this.props;

        var statusBar = GlobalStyles.twoLevelPageStatusBarProps;

        let navigationBar =
            <BaseNavigationBar
                navigator={navigator}
                leftButton={NavBarButton.getBackButton(()=> {
                    return baseOnBackPress(navigator, this.backAndroidEventListener);
                })}
                rightButton={NavBarButton.newUserRegister(()=>this.gotoRegisterPage(), {title: '新用户注册'})}
                title='登录'
                style={{backgroundColor: Colors.white}}
                titleTextStyle={{color: Colors.black, fontSize: 17}}
                statusBarCustomStyle={statusBar}
                hide={false}/>;

        return (
            <View style={styles.container}>
                {navigationBar}
                {BizViews.ebatesViews()}
                {/*邮箱输入框的容器view*/}
                {this.emailInputView()}
                {baseSpeLine({marginLeft: 15, marginRight: 15, marginTop: -1})}
                {this.passInputView()}
                {baseSpeLine({marginLeft: 15, marginRight: 15, marginTop: -1})}
                {this.props.LogInReducer.isShowImgOauthInput ?
                    this.imgOauthCodeInputView() : null}
                {this.props.LogInReducer.isShowImgOauthInput ?
                    baseSpeLine({marginLeft: 15, marginRight: 15, marginTop: -1}) : null}
                {BizLogBt(()=>this.onLoginPress(), {
                    backgroundColor: Colors.appUnifiedBackColor,
                    disabled: false,
                    title: '登录'
                })}
                {/*手机快捷登录*/}
                <BaseTitleBt
                    btStyle={{
                        borderRadius: 4,
                        borderWidth: 0.5,
                        borderColor: 'rgba(214, 214, 214, 1)',
                        height: 44,
                        alignItems: 'center',
                        marginLeft: 15,
                        marginRight: 15,
                        justifyContent: 'center',
                        backgroundColor: Colors.white,
                        marginTop: 15
                    }}
                    selectColor={Colors.blackTranslucent}
                    onPress={()=>this.onQuickLoginPress()}
                    textStyle={{
                        fontSize: 15,
                        //fontFamily: 'Gill Sans',
                        color: 'rgba(64, 64, 64, 1)',
                    }}
                    title='手机快捷登录'
                >
                </BaseTitleBt>
                {/*右下角Text的容器view*/}
                <View style={{
                    marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 15,
                    //backgroundColor:Colors.getRandomColor()
                }}>
                    <Text style={{color: 'rgba(54, 166, 66, 1)', fontSize: 12}}
                          onPress={()=> {
                              this.onForgetPassPress()
                          }}
                    >忘记密码</Text>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    //输入框左图里的text
    IpputItemLeftText: {},


});

function mapStateToProps(state) {

    // 把 state里的 homePageReducer 注入到 this.props里
    const {LogInReducer}=state;
    return {LogInReducer};
}

export default connect(mapStateToProps)(LogInPage)
