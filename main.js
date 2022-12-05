document.getElementById('leaderBoard').addEventListener('click', moveRegister);
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('tickTaeToe').addEventListener('click', ticktactoe);
document.getElementById('2048').addEventListener('click', move2048);
document.getElementById('baseball').addEventListener('click', baseball);
document.getElementById('wordle').addEventListener('click', wordle);

function moveRegister() {
    var link= 'leaderBoard.html';
    window.history.back;
    location.href=link;
}

function logout() {
    $.ajax({
        url: "destorySession.php",
        type: "post",
    }).done(function(data) {
        
    });
    alert("로그아웃 되었습니다.");
    var link= 'login.html';
    window.history.back;
    location.replace(link);
}

function ticktactoe() {
    var link= 'tickTacToe.html';
    window.history.back;
    location.href=link;
}

function move2048() {
    var link= '2048.html';
    window.history.back;
    location.href=link;
}

function wordle() {
    var link= 'wordle.html';
    window.history.back;
    location.href=link;
}

function baseball() {
    var link= 'baseball.html';
    window.history.back;
    location.href=link;
}
