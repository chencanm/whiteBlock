(function(){
    var tr=4
    var td=3
    var isGameOver = false //游戏是否结束
    var table = document.querySelector('.table')
    var score = 0 //当前分数
    var highScore = 0 //最高分
    var stopTimer = null //计时器开关
    var millisec = 0 //毫秒
    var sec = 0 //秒
    var minute = 0 //分

    var init = function(){
        allFunction()
    }
    //所有方法
    var allFunction = function(){
        //游戏初始化
        makeTable()
        //绑定键盘事件
        bindEvent()
    }

     //游戏初始化
    var makeTable = function(){
        var str = ''
        for(let i=0;i<tr;i++){
            str+="<tr>"
            for(let i=0;i<td;i++){
                str+="<td style='background:white'></td>"
            }
            str+="</tr>"
        }
        table.innerHTML = str
        //初始化黑色区域
        for(let i=0;i<4;i++){
            document.querySelectorAll('.table tr')[i].children[Math.floor(Math.random()*3)].style.background = 'black'
        }
    }

     //绑定键盘事件
    var bindEvent = function(){
        document.onkeydown = function(e){
            if(!isGameOver){
                //绑定一个计时器
                if(!stopTimer){
                    stopTimer = setInterval(timer,10)
                }
                var trs = document.querySelectorAll(".table tr")
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

    //继续游戏 删除最后一行，添加新的一行
    var updateTR = function(){
        var newStr = "<tr>"
        var trs = document.querySelectorAll('.table tr')
        var newBlackIndex = Math.floor(Math.random()*3) //新生成的黑色快的下标
        //生成新的一行
        for(var i=0;i<3;i++){
             if(i===newBlackIndex){
                 newStr+="<td style='background:black'></td>"
             }else{
                newStr+="<td style='background:white'></td>"
             }
        }
        newStr+="</tr>"
        //拼接前三行
        for(let i=0;i<trs.length-1;i++){
            newStr+="<tr>"+trs[i].innerHTML+"</tr>"
        }
        table.innerHTML = newStr
        //更新分数
        scoreUp()
    }

    //结束游戏
    var GameOver = function(){
        isGameOver = true //游戏结束
        clearInterval(stopTimer)
        //弹出弹框，继续：true,取消：flase
        if(window.confirm(`游戏结束，当前得分${score}，最高分${highScore}，用时${minute}分${sec}秒，是否继续`)){
            document.querySelector('.currentScore').innerHTML = "分数：0"
            isGameOver = false
            stopTimer = null
            score = millisec = sec = minute = 0
            document.querySelector('.minute').innerHTML = "00"
            document.querySelector('.sec').innerHTML = "00"
            document.querySelector('.millisec').innerHTML = "00"
            makeTable()
        }
    }

    //更新分数
    var scoreUp = function(){
        score++
        if(score>highScore){
            highScore++
            document.querySelector('.highestScore').innerHTML = `最高分数：${highScore}`
        }
        document.querySelector('.currentScore').innerHTML = `分数：${score}`
    }

    //更新时间
    var timer = function(){
        millisec++
        if(millisec==100){
            sec++
            millisec=0
            if(sec==60){
                sec=0
                minute++
            }
        }
        document.querySelector('.minute').innerHTML = minute < 10 ? "0"+ minute : minute
        document.querySelector('.sec').innerHTML = sec < 10 ? "0"+ sec : sec
        document.querySelector('.millisec').innerHTML = millisec < 10 ? "0"+ millisec : millisec
    }

    init()
})()