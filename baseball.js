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

document.getElementById('howButton').addEventListener('click', appendPicture);

let number = [0,0,0,0];
for(let i=0; i<4; i++){
    number[i] = Math.floor(Math.random() * 10);
    for(let j=0; j<i; j++){
        if(number[i] == number[j]){
            i--;
            break;
        }
    }
}
let aaa = "";
for(let i = 0; i < number.length; i++) {
    aaa = aaa + number[i];
}
alert(aaa);

let username;
$.ajax({
    url: "getName.php",
    type: "post",
}).done(function(data) {
    username = data;
});

let howMuch = 0;
let beforeResult;
let beforeInput;
document.getElementById('okayButton').addEventListener('click', function() {
    let ball = 0;
    let strike = 0;
    howMuch++;
    var pattern3 = /[0-9]{4}/;
    let input = $('#input').val();
    if(pattern3.test(input)) {
        $('#beforeResult').text(beforeResult);
        $('#beforeAnswer').text(beforeInput);
        let test = String(input).split("");

        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                if(number[i] == test[j]){
                    if(i == j){
                        strike++;
                    }else{
                        ball++;
                    }
                }
            }
        }

        if (ball == 0 && strike == 0) {
            $('#result').text("아웃");
            beforeResult = "아웃";
        }
        else if (ball == 0 && strike != 0) {    
            if (strike==4) {
                $.ajax({
                    url: "submitBaseball.php",
                    type: "post",
                    data: {
                        name : username,
                        score : howMuch
                    }
                }).done(function(data) {
                    alert(howMuch+"번만에 맞추셨습니다!");
                });
            }
            else {
                $('#result').text(strike + " 스트라이크");
                beforeResult = strike + " 스트라이크";
            }
        } else if (ball != 0 && strike == 0) {
            $('#result').text(ball + " 볼");
            beforeResult = ball + " 볼";
        }
        else {
            $('#result').text(strike + " 스트라이크 " + ball + " 볼");
            beforeResult = strike + " 스트라이크 " + ball + " 볼";
        }
        beforeInput = input;
    }
    else {
        alert("허용되지 않는 문자열이 포함됩니다.");
    }

});