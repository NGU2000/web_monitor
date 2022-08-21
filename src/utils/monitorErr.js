import axios from 'axios';

function reportData(errData) {
    axios({
        method: "post",
        url: "http://localhost:10520/api/error/add",
        data: errData,
    }).then((res) => {
        switch (res.data) {
            case 0:
                console.log("发现一个异常");
                break;
            case -1:
                console.log("一个异常未被导入数据库");
                break;
        }
    }).catch((err) => {
        console.log(err);
    });
}

// 获取资源异常的文件名
function getFileName(src) {
    if (!src) {
        return '';
    }
    const arr = src.split('/');
    return arr[arr.length - 1];
}


// 处理堆栈信息
function formatErrorStack(stack) {
    if (!stack) return ''
    const arr = stack.split('\n')
    return arr
      .slice(1)
      .map(function (str) {
        return str.trim()
      })
      .join(' ^ ')
  }

//获得当前时间  
function getTime(){
    let cur = new Date();
    let time = cur.getFullYear() + ":" +  (cur.getMonth()+ 1)+ ":" +  cur.getDate()  + ":" + cur.getHours() + ":" + cur.getMinutes() + ":" + cur.getSeconds();
    return time;
}

//导出函数
export default function (Vue, option = {}) {
    //js异常
    Vue.config.errorHandler = function (err, vm, info) {
        const data = {
            type: 0,
            time: getTime(),
            url: window.top.location.href,
            msg: err.message,
            stack: err.stack,
            userid: localStorage.getItem("userid"),
        }
        //导入数据库  
        reportData(data);
    }

    // 监控全局错误
    window.onerror = function (msg, url, lineNo, columnNo) {
        //信息报错
        if (debugConfig.ignoreErrMsgs.includes(msg)) {
            return;
        }
        const data = {
            type: 0,
            time: getTime(),
            url: window.top.location.href,
            msg: msg,
            stack: url,
            userid: localStorage.getItem("userid"),
        }
        //导入数据库  
        reportData(data);
    };

    // promise异常，归到脚本异常
    window.addEventListener('unhandledrejection',
        function (e) {
            const data = {
                type: 1,
                time: getTime(),
                url: window.top.location.href,
                msg: e.reason.name + ': ' + e.reason.message,
                stack: formatErrorStack(e.reason.stack),
                userid: localStorage.getItem("userid"),
            }
            //导入数据库
            reportData(data);
        },
        true
    );
    
    // 资源请求异常
    window.addEventListener('load', function (e) {
        console.log("log error");
        // 检测请求是否成功
        function ifSuccess(status) {
            return status < 400;
        }
        const entries = performance.getEntriesByType('resource');
        const srcEntries = entries.filter(function (val) {
            // console.log(val.initiatorType);
            return val.initiatorType == 'css';
        })
        // 重发请求
        for (const item of srcEntries) {
            if (ifSuccess(xhr.status)) {
                console.log("请求成功");
                return;
            }
            const xhr = new XMLHttpRequest();
            originXML.open.call(xhr, 'GET', item.name);
            originXML.send.call(xhr);
            xhr.addEventListener('loadend',  function () {
                console.log("请求失败");
                // 请求失败 记录为资源异常
                const data = {
                    type: 2,
                    time: getTime(),
                    url: window.top.location.href,
                    msg: `Not Found: ${getFileName(item.name)}`,
                    stack: `Not Found: ${item.name}`,
                    userid: localStorage.getItem("userid"),
                }
                //导入数据库
                reportData(data);
            });
        }
    });

    // 白屏异常
    setTimeout(function () {
        const height = window.innerHeight;
        const width = window.innerWidth;
        for (let i = 1; i < 20; i++) {
            ifRendering(document.elementsFromPoint(width / 2, (height / 20) * i)[0]);
            ifRendering(document.elementsFromPoint((width / 20) * i, height / 2)[0]);
        }
        let empty = 18;
        if (empty == 15) {
            console.log("白屏异常");
            const data = {
                type: 3,
                time: getTime(),
                url: window.top.location.href,
                msg: 'the web page is white screen now.',
                stack: 'No rending for vue pages',
                userid: localStorage.getItem("userid"),
            }
            //导入数据库
            reportData(data);
        }
        //判断是否有渲染
        function ifRendering(dom) {
            const tagName = dom.tagName;
            if (tagName != 'HTML' && tagName != 'BODY') {
                empty--;
            }
        }
    }, 50);

}