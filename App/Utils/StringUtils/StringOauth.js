/**
 * Created by Ebates on 16/12/20.
 * 字符串验证
 */

/**
 * str1里是否包含str2
 * @param str1
 * @param str2
 * @returns {boolean}
 */
export function contain(str1,str2) {
    // indexOf: str第一次在str1里出现的下标
    return str1.indexOf(str2)>0;
}

/**
 * http://www.cnblogs.com/sj521/p/5623035.html
 * 判断字符串长度
 * @param val
 * @returns {number}
 */
export function getStrLen(val) {
    let len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null)
        {
            len += 2;//汉字算两个字符
        }
        else
        {
            len += 1;
        }
    }
    return len;
}

/**
 * 字符串是否包含汉字
 * @param val
 * @returns {boolean}
 */
export function isContainChinese(val) {
    let b = false;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null)
        {
            b=true
        }
    }
    return b;
}