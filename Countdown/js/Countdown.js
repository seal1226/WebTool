class Countdown {
    constructor(data) {
        this.key = 'firstVisit';
        this.data = data;

        this.exitTime = this.getExitTime();
        this.elem = document.getElementById(this.data.elemName);

        let timer = setInterval(() => {
            let obj = this.remainingTime;

            //有効時間超過
            if(obj.isExpired){
                //redirect1が存在しなかったら
                if(data.redirect1){
                    location.href = data.redirect1;
                }
                else{
                    location.href = data.redirect2;
                }
                clearInterval(timer);
            }
            //指定要素に書き込み
            else{
                this.elem.innerHTML = obj.remainingTime;
            }
        }, 10);
    }

    //終了時間を返却
    getExitTime(){
        let firstVisitTime = localStorage.getItem(this.key);
        let exitTime = 0;

        //初回訪問or再接続時間を超過して接続された
        if(firstVisitTime === null){
            firstVisitTime = Date.now();
            localStorage.setItem(this.key, firstVisitTime);
        }
        exitTime = Number.parseInt(firstVisitTime) + 1000 * 60 * this.data.exitSpan;

        //再接続可能時間に達していた場合リセット
        if(exitTime + 1000 * 60 * this.data.reconnect < Date.now()){
            firstVisitTime = Date.now();
            localStorage.setItem(this.key, firstVisitTime);
        }
        exitTime = Number.parseInt(firstVisitTime) + 1000 * 60 * this.data.exitSpan;

        return exitTime;
    }

    //残り時間を返却
    get remainingTime(){
        let diff　 = this.exitTime - Date.now();
        let hour   = Math.floor(((diff)%(24*60*60*1000))/(60*60*1000));
        let minute = Math.floor(((diff)%(24*60*60*1000))/(60*1000))%60;
        let second = Math.floor(((diff)%(24*60*60*1000))/1000)%60%60;
        let mill   = Math.floor(((diff)%(24*60*60*1000))/10)%100;

        //離脱時間に達していた場合
        let isExpired = diff < 0;
        //出力フォーマット形成
        let remainingTime = ('00' + hour).slice(-2)
                    + '<span class="countdown-unit">時間</span>' + ('00' + minute).slice(-2) 
                    + '<span class="countdown-unit">分</span>'   + ('00' + second).slice(-2)
                    + '.'                                        + ('00' + mill).slice(-2)
                    + '<span class="countdown-unit">秒';

        return {
            isExpired,
            remainingTime
        }
    }
}