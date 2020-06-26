var Countdown = function(data){
    this.data = data;
    this.elem = document.querySelector(this.data.elemName);
};

Countdown.prototype.remainingTime = function(){
    var diff = this.data.exitTime.getTime() - Date.now();
    var day    = Math.floor(diff / 86400000);
    var hour   = Math.floor(((diff)%(24*60*60*1000))/(60*60*1000));
    var minute = Math.floor(((diff)%(24*60*60*1000))/(60*1000))%60;
    var second = Math.floor(((diff)%(24*60*60*1000))/1000)%60%60;
    var mill   = Math.floor(((diff)%(24*60*60*1000))/10)%100;

    //退出時間か？
    var isExpired = diff < 0;

    //出力フォーマット
    var remainingTime = day                    
        + '<span class="countdown-unit">日</span>'   + ('00' + hour).slice(-2)
        + '<span class="countdown-unit">時間</span>' + ('00' + minute).slice(-2) 
        + '<span class="countdown-unit">分</span>'   + ('00' + second).slice(-2)
	+ '.'                                        + ('00' + mill).slice(-2)
        + '<span class="countdown-unit">秒</span>';

    var ret = new Object();

    ret.isExpired = isExpired;
    ret.remainingTime = remainingTime;

    return ret;
}

Countdown.prototype.execute = function(){
    var time = setInterval(function(){
        var obj = this.remainingTime();

            //有効時間超過
            if(obj.isExpired){
                this.elem.innerHTML = '<span class="exit-text">' + this.data.exitText + '</span>';
            }
            //指定要素に書き込み
            else{
                this.elem.innerHTML = obj.remainingTime;
            }
    }.bind(this), 10);
}