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

let word = ['focus', 'raise', 'close', 'apple', 'usher', 'young', 'rally', 'color', 'shiny', 'flock', 'choir', 'tiger', 'cabin', 'berry', 'paint', 'today', 'avoid', 'array', 'korea', 'gauge', 'claim', 'ocean', 'water', 'await', 'stark', 'beach', 'black', 'sheet', 'black', 'blind', 'stiff'];
let howMuch = 0;
let today = new Date();   
let todayWord = word[parseInt(today.getDate()) - 1].split("");
document.getElementById('okayButton').addEventListener('click', function() {
    let input = $('#input').val();
    var pattern3 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Z]/;
    howMuch++;
    if(pattern3.test(input)){
        alert("허용되지 않는 문자열이 포함됩니다."); //true
    }
    else if(input.length != 5) {
        alert("문자열이 5글자가 아닙니다.");
    }
    else if(word[parseInt(today.getDate()) - 1] == input) {
        alert(howMuch+"번만에 맞추셨습니다!");
        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 5; j++) {
                document.getElementById('t'+i+j).style.backgroundColor = 'transparent';
                $('#t'+i+j).text("");
            }
        }
        howMuch = 0;
    }
    else {
        for(let i = 0; i < 5; i++) {
            if(input.substr(0,1) == todayWord[i]) {
                document.getElementById('t'+(howMuch-1)+"0").style.backgroundColor = 'orange';
            }
            if(input.substr(1,1) == todayWord[i]) {
                document.getElementById('t'+(howMuch-1)+"1").style.backgroundColor = 'orange';
            }
            if(input.substr(2,1) == todayWord[i]) {
                document.getElementById('t'+(howMuch-1)+"2").style.backgroundColor = 'orange';
            }
            if(input.substr(3,1) == todayWord[i]) {
                document.getElementById('t'+(howMuch-1)+"3").style.backgroundColor = 'orange';
            }
            if(input.substr(4,1) == todayWord[i]) {
                document.getElementById('t'+(howMuch-1)+"4").style.backgroundColor = 'orange';
            }
        }
        $('#t'+(howMuch-1)+"0").text(input.substr(0,1));
        if(input.substr(0,1) == todayWord[0]) {
            document.getElementById('t'+(howMuch-1)+"0").style.backgroundColor = 'green';
        }
        $('#t'+(howMuch-1)+"1").text(input.substr(1,1));
        if(input.substr(1,1) == todayWord[1]) {
            document.getElementById('t'+(howMuch-1)+"1").style.backgroundColor = 'green';
        }
        $('#t'+(howMuch-1)+"2").text(input.substr(2,1));
        if(input.substr(2,1) == todayWord[2]) {
            document.getElementById('t'+(howMuch-1)+"2").style.backgroundColor = 'green';
        }
        $('#t'+(howMuch-1)+"3").text(input.substr(3,1));
        if(input.substr(3,1) == todayWord[3]) {
            document.getElementById('t'+(howMuch-1)+"3").style.backgroundColor = 'green';
        }
        $('#t'+(howMuch-1)+"4").text(input.substr(4,1));
        if(input.substr(4,1) == todayWord[4]) {
            document.getElementById('t'+(howMuch-1)+"4").style.backgroundColor = 'green';
        }
    }
    if(howMuch == 6) {
        alert("맞추지 못했습니다.");
        $('td').empty();
        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 5; j++) {
                document.getElementById('t'+i+j).style.backgroundColor = 'transparent';
                $('#t'+i+j).text("");
            }
        }
        howMuch = 0;
    }
});