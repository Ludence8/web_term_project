document.getElementById('registerButton').addEventListener('click', moveRegister);
document.getElementById('loginButton').addEventListener('click', moveMain);

function moveRegister() {
    var link= 'register.html';
    window.history.back;
    location.href=link;
}

function moveMain() {
    $.ajax({
        url: "login.php",
        type: "post",
        data: {
            id : $('#id').val(),
            password : $('#pass').val()
        }
    }).done(function(data) {
        if(data == "fail") {
            alert("로그인에 실패하였습니다.");
        }
        else {
            alert($('#id').val() + "님, 환영합니다");
            var link= 'main.html';
            location.replace(link);
        }
    });
    
}