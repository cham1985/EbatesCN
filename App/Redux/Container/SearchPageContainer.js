/*
首页的容器组件,用于 redux
 */
import React from 'react';
import {connect} from 'react-redux';
import SearchPage from '../../Pages/SearchPage'

class SearchPageContainer extends React.Component{

    render(){
        return (
            <SearchPage {...this.props} />
        );
    }
}

// function mapStateToProps(state) {
//     //把 state里的 homePageReducer 注入到 HomePage.props里
//     const {HomePageReducer}=state;
//     return {HomePageReducer};
//
// }

export default connect(/*mapStateToProps*/)(SearchPageContainer);