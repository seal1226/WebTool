class Countdown {
    constructor(data) {
        this.data = data;
        this.elem = document.querySelector(this.data.elemName);

        //0.1秒間隔で更新
        let timer = setInterval(() => {
            let obj = this.remainingTime;

            //有効時間超過
            if(obj.isExpired){
                this.elem.innerHTML = `<span class="exit-text">${this.data.exitText}</span>`;
            }
            //指定要素に書き込み
            else{
                this.elem.innerHTML = obj.remainingTime;
            }
        }, 100);
    }

    //残り時間を返却
    get remainingTime()
    {
        let diff = this.data.exitTime - Date.now();
        let day    = Math.floor(diff / 86400000);
        let hour   = Math.floor(((diff)%(24*60*60*1000))/(60*60*1000));
        let minute = Math.floor(((diff)%(24*60*60*1000))/(60*1000))%60;
        let second = Math.floor(((diff)%(24*60*60*1000))/1000)%60%60;
        let mill   = Math.floor(((diff)%(24*60*60*1000))/10)%100;

        //退出時間か？
        let isExpired = diff < 0;

        //出力フォーマット
        let remainingTime = day                    
            + '<span class="countdown-unit">日</span>'   + ('00' + hour).slice(-2)
            + '<span class="countdown-unit">時間</span>' + ('00' + minute).slice(-2) 
            + '<span class="countdown-unit">分</span>'   + ('00' + second).slice(-2)
            + '<span class="countdown-unit">秒</span>';

        return {
            isExpired,
            remainingTime
        }
    }
}