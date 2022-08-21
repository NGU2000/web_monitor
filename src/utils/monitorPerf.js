//监控性能
import axios from 'axios';


//获得当前时间  
function getTime() {
    let cur = new Date();
    let time = cur.getFullYear() + ":" + (cur.getMonth()+ 1) + ":" + cur.getDate() + ":" + cur.getHours() + ":" + cur.getMinutes() + ":" + cur.getSeconds();
    return time;
}

//上传数据
function reportPerfData(type, value) {
    const data = {
        type: type,
        time: getTime(),
        url: window.top.location.href,
        value: value,
        userid: localStorage.getItem("userid"),
    };
    axios({
        method: "post",
        url: "http://localhost:10520/api/performance/add",
        data: data,
    }).then((res) => {
        switch (res.data) {
            case 0:
                console.log("发现一条性能");
                break;
            case -1:
                break;
        }
    }).catch((err) => {
        console.log(err);
    });
}

export default function () {
    console.log(localStorage.getItem("userid"));
    const performance = window.performance || {};
    const _timing = performance.timing;
    let WT = _timing.responseStart - _timing.navigationStart; //白屏时间
    let TCP = _timing.connectEnd - _timing.connectStart; //TCP连接耗时
    let ONL = _timing.loadEventEnd - _timing.loadEventStart; //执行onload事件耗时
    let ALLRT = _timing.responseEnd - _timing.requestStart; //所有请求耗时
    let TTFB = _timing.responseStart - _timing.navigationStart; //TTFB 即 Time To First Byte,读取页面第一个字节的时间
    let DNS = _timing.domainLookupEnd - _timing.domainLookupStart; //DNS查询时间
    reportPerfData(0, WT);
    reportPerfData(1, TCP);
    reportPerfData(2, ONL);
    reportPerfData(3, ALLRT);
    reportPerfData(4, TTFB);
    reportPerfData(5, DNS);
}