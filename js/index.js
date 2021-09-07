(function(){
    function $(s){
        return document.querySelector(s)
    }
    function $$(s){
        return document.querySelectorAll(s)
    }
    //初始化
    var tr=4
    var td=3
    var isGameOver = false //游戏是否结束
    var table = $('.table')
    var score = 0 //当前分数
    var highScore = 0 //最高分
    var stopTimer = null //计时器开关
    var millisec = 0 //毫秒
    var sec = 0 //秒
    var minute = 0 //分

    //游戏初始化函数
    function init(){
        //生成游戏内容
        var str = ""
        for(let i=0;i<tr;i++){
            str += "<tr>"
            for(let j=0;j<td;j++){
                str += "<td style='background:white'></td>"
            }
            str += "</tr>"
        }
        table.innerHTML = str

        //初始化黑块
        for(let i=0;i<$$('.table tr').length;i++){
            $$('.table tr')[i].children[Math.floor(Math.random()*3)].style.background = "black"
        }
    }
    
    //更新分数
    function scoreUP(){
        score++
        if(score >highScore){
            highScore++
            $('.highestScore').innerHTML = '最高分数：' + highScore
        }
        $('.currentScore').innerHTML = '分数：' + score 
    }
    //更新时间
    function timer(){
        millisec++
        if(millisec == 100){
            millisec = 0
            sec++
            if(sec == 60){
                sec = 0
                minute++
            }
        }
        $('.minute').innerHTML = minute < 10 ? "0"+ minute : minute
        $('.sec').innerHTML = sec < 10 ? "0"+ sec : sec
        $('.millisec').innerHTML = millisec < 10 ? "0"+ millisec : millisec
    }

    //更新表格
    function updateTR(){
        //生成新的一行
        var trs = $$('.table tr')
        var blackIndex = Math.floor(Math.random()*3)
        var newStr = "<tr>"
        for(let i=0;i<3;i++){
            if(i === blackIndex){
                newStr += "<td style='background:black'></td>"
            }else{
                newStr += "<td style='background:white'></td>"   
            }
        }
        newStr += "</tr>"
        //拼接前三行
        for(let i=0;i<trs.length - 1;i++){
            newStr += "<tr>" + trs[i].innerHTML + "</tr>"
        }
        table.innerHTML = newStr
        //更新分数
        scoreUP()
    }

    //游戏结束
    function GameOver(){
        isGameOver = true
        clearInterval(stopTimer)
        if(window.confirm(`游戏结束，当前得分${score},最高得分${highScore},用时${minute}分${sec}秒,是否继续`)){
            $('.currentScore').innerHTML = '分数：0'
            isGameOver = false
            stopTimer = null
            score = millisec = minute = sec = 0
            $('.minute').innerHTML = "00"
            $('.sec').innerHTML = "00"
            $('.millisec').innerHTML = "00"
            init()
        }

    }

    //绑定键盘事件
    function bindEvent(){
        document.onkeydown = function(e){
            if(!isGameOver){
                //绑定一个计时器
                if(!stopTimer){
                    stopTimer = setInterval(timer,10)
                }

                var trs = $$(".table tr")
                switch(e.key){
                    case 'a':
                    case 'A':{
                        if(trs[trs.length-1].children[0].style.background === "black"){
                            updateTR()
                        }else{
                            GameOver()
                        }
                        break
                    }
                    case 's':
                    case 'S':{
                        if(trs[trs.length-1].children[1].style.background === "black"){
                            updateTR()
                        }else{
                            GameOver()
                        }
                        break
                    }
                    case 'd':
                    case 'D':{
                        if(trs[trs.length-1].children[2].style.background === "black"){
                            updateTR()
                        }else{
                            GameOver()
                        }
                    }
                }
            }
        }
    }


    function main(){
        //游戏初始化函数
        init()
        //绑定事件
        bindEvent()
    }

    main()
})()