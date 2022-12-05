function appendPicture() {
    let zIndex = 9999;
    let modal = document.getElementById('modal');
    let bg = document.createElement('div');
    bg.setStyle({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)'
    });
    document.body.append(bg);

    modal.querySelector('.modal_close_btn').addEventListener('click', function() {
        bg.remove();
        modal.style.display = 'none';
    });

    modal.setStyle({
        position: 'fixed',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: zIndex + 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)'
    });
}

Element.prototype.setStyle = function(styles) {
    for (let k in styles) this.style[k] = styles[k];
    return this;
};

$.ajax({
    url: "getName.php",
    type: "post",
}).done(function(data) {
    alert(data);
});

document.getElementById('howButton').addEventListener('click', appendPicture);

var score = [0 , 0]; //플레이어 스코어 // 컴퓨터 스코어
var tables = document.getElementById("tbl"); //html테이블의 아이디를 가져온다
var allBlocks = [[null, null, null], [null, null, null], [null, null, null]]; //html테이블의 정보를 담는다
var valid = 1;//사용자가 행동하지 말아야할때 행동을 제한한다 (리셋되는 동안 , 승패를 표시하는 동안)
var valueArr = [];//컴퓨터가 착수할 자리의 가중치를 담는다
var counter = document.getElementById("result")//본문 <div id="result">의 정보를 담는다

initAllBlocks();
function Clicked(y , x){
    if(valid == 1){
        if(allBlocks[y][x] == ""){
            var won = 0;
            tables.rows[y].cells[x].innerText = "O";
            allBlocks[y][x] = "O";
            won = winnigCondition(y, x , "O");
            if(won >= 25){
                valid = 0;
                $('#playerScore').text("플레이어 : " + ++score[0]);
                //counter.textContent = "플레이어 : " + ++score[0] + "    컴퓨터 : " + score[1];
                setTimeout(() => initBoard(), 2000);
            }else
                computerTurn();
        }
    }
}
function showValues() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            console.log(i + " " + j + " " + valueArr[i][j]);
        }
    }
}

function initAllBlocks(){
    //counter.innerText = "플레이어 : " + score[0] + " 컴퓨터 : " + score[1]
    for(var i = 0 ; i < 3 ; i++){
        for(var j = 0 ; j < 3 ; j++){
            allBlocks[i][j] = tables.rows[i].cells[j].innerText;
        }
    }
}
function initBoard() {
    initValueArr();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            tables.rows[i].cells[j].innerText = "";
            allBlocks[i][j] ="";
        }
    }
    valid = 1;
}
function isFull() {
    var fulltest = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (allBlocks[i][j] == "")
                fulltest = 1;
        }
    }
    if (fulltest == 0)
        return 1;
}
function initValueArr(){
    for (var i = 0; i < 3; i++) {
        valueArr.push([]);
        for (var j = 0; j < 3; j++) {
            valueArr[i][j] = 0;
        }
    }
}
///////////////////////////////////////////초기화//

function winnigCondition(indexY , indexX , flag){
    var returnVal = 1;
    var dx = [1, 1, 1, 0, 0, -1, -1, -1];
    var dy = [-1, 1, 0, -1, 1, 1, -1, 0];
    for (var i = 0; i < 8; i++) {
        var newX = dx[i] + indexX;
        var newY = dy[i] + indexY;
        if (newX < 0 || newX > 2 || newY < 0 || newY > 2) {
            continue;
        }
        if (allBlocks[newY][newX] == flag) {
            if(flag == "O")
                if(dx[i]== 0 || dy[i] == 0) //가로세로성분
                    returnVal+= 5;
                else
                    returnVal+=2;
            else
                returnVal+=1;
            newX += dx[i];
            newY += dy[i];
            if (newX < 0 || newX > 2 || newY < 0 || newY > 2) {
            }else
            if (allBlocks[newY][newX] == flag) {
                if (flag == "X")

                    returnVal+= 100; //컴퓨터 승리
                else
                    returnVal+= 25; //플레이어 승리
            }
            //////////////////////한칸 띄고 성립할경우
            newX = indexX - dx[i];
            newY = indexY - dy[i];
            if (newX < 0 || newX > 2 || newY < 0 || newY > 2) {
            }else
            if (allBlocks[newY][newX] == flag) {
                if (flag == "X")
                    returnVal+= 100; //컴퓨터 승리
                else
                    returnVal+= 25; //플레이어 승리
            }
        }

    }
    return returnVal; //결착x
}

function computerTurn(){
    console.log("컴퓨터");
    initValueArr();
    if(isFull()){
        valid = 0;
        setTimeout(()=>initBoard(), 2000);
    }else{
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (allBlocks[i][j] == "") {
                    valueArr[i][j] += winnigCondition(i, j, "O", allBlocks);
                    //컴퓨터가(i,j)에 착수했을때 수의 가중치를 조사 //플레이어가 이기는 수 하나당 +10 , 컴퓨터가 이기는 수 하나당 +100
                    //컴퓨터가 연속 2개 만드는 수 +2 // 플레이어가 연속 2개 만드는 수 +2
                    valueArr[i][j] += winnigCondition(i, j, "X", allBlocks);
                }
            }
        }
        var targetX, targetY, biggest = -1;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (allBlocks[i][j] == "") {
                    if (biggest <= valueArr[i][j]) {
                        biggest = valueArr[i][j];
                        targetY = i , targetX = j;
                    }
                }
            }
        }

        if (allBlocks[1][1] == "" && biggest < 10) {
            targetX = 1;
            targetY = 1;
        }

        allBlocks[targetY][targetX] = "X";
        tables.rows[targetY].cells[targetX].innerText= "X";

        showValues();


        if (biggest >= 100) {
            valid = 0;
            $('#computerScore').text("컴퓨터 : " + ++score[1]);
            //counter.textContent = "플레이어 : " + score[0] + "    컴퓨터 : " + ++score[1];
            setTimeout(() => initBoard(), 2000);

        }
    }
}

score.innerText = "abc";