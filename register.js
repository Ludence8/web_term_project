document.getElementById('backButton').addEventListener('click', back);
document.getElementById('registerButton').addEventListener('click', register);

function back() {
    var link= 'login.html';
    location.replace(link);
}
function register() {
    if($('#pass').val() != "" && $('#id').val() != "") {
        if($('#pass').val() == $('#passCheck').val()) {
            $.ajax({
                url: "register.php",
                type: "post",
                data: {
                    id : $('#id').val(),
                    password : $('#pass').val()
                }
            }).done(function(data) {
                alert("회원가입 완료");
                var link= 'login.html';
                location.replace(link);
            });
        }
        else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    }
    else {
        alert("아이디 또는 비밀번호를 입력하여 주세요.");
    }
    
}