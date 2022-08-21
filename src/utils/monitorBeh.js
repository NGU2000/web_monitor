//监控用户行为  
import axios from 'axios';

//获得当前时间  
function getTime() {
    let cur = new Date();
    let time = cur.getFullYear() + ":" + (cur.getMonth() + 1) + ":" + cur.getDate() + ":" + cur.getHours() + ":" + cur.getMinutes() + ":" + cur.getSeconds();
    return time;
}

//获得cookie
function getCookie(cookie_name) {
    var allcookies = document.cookie;
    //索引长度，开始索引的位置
    var cookie_pos = allcookies.indexOf(cookie_name);

    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1;
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if (cookie_end == -1) {
            cookie_end = allcookies.length;

        }
        //得到想要的cookie的值
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));
    }
    return value;
}

//上传数据
function reportBehData(type, value, msg = "blank") {
    let data = {
        type: type,
        time: getTime(),
        url: window.top.location.href,
        msg: msg,
        value: value,
        userid: localStorage.getItem("userid"),
    };
    axios({
        method: "post",
        url: "http://localhost:10520/api/behavior/add",
        data: data,
    }).then((res) => {
        switch (res.data) {
            case 0:
                console.log("发现一次用户行为");
                break;
            case -1:
                break;
        }
    }).catch((err) => {
        console.log(err);
    });
}

export default function () {
    window.addEventListener('mousedown', function () {
        //pv
        reportBehData(0, 1);
        //uv
        // 想要获取的cook键值
        var cookie_name = this.localStorage.getItem("userid");
        console.log(this.document.cookie);
        // 调用
        var cookie_value = getCookie(cookie_name);
        reportBehData(1, 1, cookie_value);
      })
}