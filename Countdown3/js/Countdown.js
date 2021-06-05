
/**
 * カウントダウン
 */
class Countdown {
    /**
     * コンストラクタ
     * 
     * @param {*} data 
     */
    constructor(data) {
        //バリデーション
        if(!this._validate(data)) {
            throw new Error("マウントを取り消します");
        }

        this.data = data;
    }

    /**
     * カウントダウンタイマースタート
     */
    start(){
        let elem = document.getElementById(this.data.elemName);

        //0.01秒ごとに描画するコールバンクを設定
        let timer = setInterval(() => {
            let fromDate = this._createDatefromTimeFormat(this.data.fromTime);
            let toDate   = this._createDatefromTimeFormat(this.data.toTime);

            //範囲外ならスキップ
            if(!this._isBetweenTime(fromDate, toDate)){
                return;
            }

            //残り時間を計算
            let ret = this._remainingTime(toDate);

            //エレメントに書き込み
            elem.innerHTML = ret.remainingTime;
        }, 100);
    }

    /**
     * validation
     * 
     * @param {*} data 
     * @returns 
     */
    _validate(data) {
        if(!data.elemName) {
            console.log('elemNameが指定されていません');

            return false;
        }

        if(!document.getElementById(data.elemName)) {
            console.log('elementがDOM上で見つかりませんでした');

            return false;
        }

        if(!data.fromTime) {
            console.log('fromTimeが指定されていません');;

            return false;
        }

        if(!data.toTime) {
            console.log('toTimeが指定されていません');

            return false;
        }

        if(!this._validateTimeFormat(data.fromTime) || !this._validateTimeFormat(data.toTime)) {
            return false;
        }

        if(data.fromTime > data.toTime) {
            console.log('時間の大小関係が不整合です。 \n from < to の関係になっていますか？');

            return false;
        }

        return true;
    }

    /**
     * timeFormat validation
     * 
     * @param {string} timeFormat 
     * @returns 
     */
    _validateTimeFormat(timeFormat) {
        if(!timeFormat.match(/\d{2}:\d{2}/)) {
            console.log('時間は"00:00"の形式で指定してください');

            return false;
        }

        return true;
    }

    /**
     * timeFormatと現在日付を元にDateオブジェクトを作成
     * @param {string} timeFormat 
     * @returns 
     */
    _createDatefromTimeFormat(timeFormat) {
        let hour = timeFormat.substr(0, 2)
        let minute = timeFormat.substr(3, 4);

        let baseTime = new Date();

        baseTime.setHours(hour);
        baseTime.setMinutes(minute);
        baseTime.setSeconds(0);

        return baseTime;
    }

    /**
     * 現在時刻がfromDate ~ toDateの間に位置するか検証
     * 
     * @param {Date} fromtDate 
     * @param {Date} toDate 
     */
    _isBetweenTime(fromtDate, toDate) {
        let nowDate = new Date();

        if(nowDate < fromtDate){
            return false;
        }

        if(nowDate > toDate){
            return false;
        }

        return true;
    }

    /**
     * 残り時間を返却
     * 
     * @param {Date} toDate 
     * @returns 
     */
    _remainingTime(toDate){
        let diff　 = toDate - Date.now();
        let hour   = Math.floor(((diff)%(24*60*60*1000))/(60*60*1000));
        let minute = Math.floor(((diff)%(24*60*60*1000))/(60*1000))%60;
        let second = Math.floor(((diff)%(24*60*60*1000))/1000)%60%60;

        //離脱時間に達していた場合
        let isExpired = diff < 0;
        //出力フォーマット形成
        let remainingTime = ('00' + hour).slice(-2)
                    + '<span class="countdown-unit">時間</span>' + ('00' + minute).slice(-2) 
                    + '<span class="countdown-unit">分</span>'   + ('00' + second).slice(-2)
                    + '<span class="countdown-unit">秒';

        return {
            isExpired,
            remainingTime
        }
    }
}