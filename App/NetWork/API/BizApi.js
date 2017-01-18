/**
 * Created by Ebates on 17/1/11.
 * BizApi
 *  * 业务逻辑需要的所有接口
 */
import *as BaseListActions from '../../Redux/Actions/BaseListActions'
import *as HistorySearchDB from '../../DB/BizDB/HistorySearchDB'
const {fromJS} = require('immutable'); //导入  Immutable.js 的 Record API


/**
 * 搜索页 列表的 API
 * @type {{ApiName: string}}
 */
export const SearchPageListApi = {
    ApiName: 'SearchPageListApi',

    //搜索 页 最大列表  的  数据源, 9个按钮+热门搜索 text 是一个 cell, 默认是 热门搜索cell 和 底部留白cell 2个 数据源
    // hotSearchCellData: [{title: 'GNC'}, {title: 'Walgreens'}, {title: '普丽普莱'}, {title: '黑五'}, {title: '雅诗兰黛'}, {title: 'shoebuy'}, {title: 'Amazon'}, {title: '联名卡'}, {title: 'shoebuy2'}],

    $dataArray:fromJS([ [{title: 'GNC'}, {title: 'Walgreens'}, {title: '普丽普莱'}, {title: '黑五'}, {title: '雅诗兰黛'}, {title: 'shoebuy'}, {title: 'Amazon'}, {title: '联名卡'}, {title: 'shoebuy2'}],  '底部为了留白的cell' ] ),

    /**
     * 历史搜索 列表 第一次 挂载时| commit后 刷新列表时 获取数据源
     * @param opt
     * @returns {function(*)}
     */
    fetchData(opt){
        return (dispatch) => {

            //rawData:  缓存的 关键词
            HistorySearchDB.loadHistoryDB().then((rawData)=> {
                if (rawData.length > 0) {//有缓存
                    this.packageCachedDataToListDataSource(rawData);
                    dispatch(BaseListActions.SuccessFetchinglist(opt, this.ApiName, this.$dataArray.array()));
                }
            }).catch(err => {
                dispatch(BaseListActions.SuccessFetchinglist(opt, this.ApiName, this.$dataArray.array()));

            });
        }
    },

    /**
     * 把 缓存里更新过的 数据 组装到 列表的 数据源 里
     * @param rawData
     * @param data
     * @returns {boolean}
     */
    packageCachedDataToListDataSource(rawData /*, data*/){

        if(this.$dataArray.size==2){
            this.$dataArray=this.$dataArray.insert(1, '历史搜索');
        }else{
            while (this.$dataArray.size>3){//删除 关键词 cell, 只保留 热门搜索, 历史搜索,和 底部空白 cell
                this.$dataArray=this.$dataArray.delete(2);
            }
        }

        rawData.map(
            (v, i)=> {
                this.$dataArray=this.$dataArray.insert(-1, v);//数组倒数第二个下标 循环 插入一个 关键字
            }
        );
    },

    /**
     * 清除 关键词 列表
     * @param opt
     * @returns {function(*)}
     */
    clearAllHistorySearch(opt){
        return (dispatch) => {

            this.reset$dataArray();

            dispatch(BaseListActions.SuccessFetchinglist(opt, this.ApiName, this.$dataArray.array()));
        }
    },

    /**
     * 重置 $dataArray 为初始状态, 只保留 热门搜索,和 底部空白 cell
     */
    reset$dataArray(){
        while (this.$dataArray.size>2){//删除 关键词 cell, 只保留 热门搜索,和 底部空白 cell
            this.$dataArray=this.$dataArray.delete(1);
        }
    },

    /**
     * 删除某个 关键词
     * @param word
     * @returns {function(*)}
     */
    deleteOneKeyWord(word, opt){
        return (dispatch) => {

            HistorySearchDB.deleteOneKeyWordFromHistoryDB(word).then((rawData)=> {
                if (rawData.length > 0) {//有缓存
                     this.packageCachedDataToListDataSource(rawData);
                }else{
                    this.reset$dataArray();
                }
                dispatch(BaseListActions.SuccessFetchinglist(opt, this.ApiName, this.$dataArray.array()));
            }).catch(err => {
                dispatch(BaseListActions.SuccessFetchinglist(opt, this.ApiName, this.$dataArray.array()));

            });
        }
    }

}


/**
 * 初步分解 各种API
 * @param opt
 * @param pageNo
 * @param ApiName
 * @returns {*}
 */
export function fetchApi(opt, pageNo, ApiName) {
    switch (ApiName) {
        case SearchPageListApi.ApiName: {
            // if (opt == BaseListActions.BaseListFetchDataType.INITIALIZE){
            //     return SearchPageListApi.fetchData(opt);
            // }else if(opt == BaseListActions.BaseListFetchDataType.REFRESH)
            return SearchPageListApi.fetchData(opt);
        }
            break;
    }
}