document.getElementById('menu1').addEventListener('click', changeMode);
document.getElementById('menu2').addEventListener('click', changeMode);

function changeMode(e) {
    if(e.target.getAttribute('id') == "menu1" || e.target.getAttribute('id') == "text1") {
        if(document.getElementById('menu1Color').firstChild.nodeValue == "white") {
        }
        else {
            e.target.style.borderBottom = "40px solid #FFF8EA";
            document.getElementById('menu2').style.borderBottom = "40px solid #ebb800";
            document.getElementById('menu1Color').firstChild.nodeValue = "white";
            document.getElementById('menu2Color').firstChild.nodeValue = "gray";
            document.getElementById('text1').style.color ="black";
            document.getElementById('text2').style.color ="gray";
            $.ajax({
                url: "get2048.php",
                type: "post",
            }).done(function(data) {
                let data2 = data.split(" ");
                let appendData = "";
                data2.sort(function(a,b) {
                    let x = parseInt(a.split("|")[1]);
                    let y = parseInt(b.split("|")[1]);
                    return -(x-y);
                });
                for(let i = 0; i < 10; i++) {
                    if(data2[i] == "") {
                        break;
                    }
                    else {
                        let data3 = data2[i].split("|");
                        appendData = appendData + "<li>" + (i+1) + "등 / ";
                        appendData = appendData + data3[0] + " / ";
                        appendData = appendData + data3[1] + "</li>";
                    }
                }
                $('#leader').empty();
                if(data.length == 0) {
                }
                else {
                    $('#leader').append(appendData);
                }
            });
        }
    }
    else if(e.target.getAttribute('id') == "menu2" || e.target.getAttribute('id') == "text2"){
        if(document.getElementById('menu2Color').firstChild.nodeValue == "white") {
        }
        else {
            e.target.style.borderBottom = "40px solid #FFF8EA";
            document.getElementById('menu1').style.borderBottom = "40px solid #ebb800";
            document.getElementById('menu2Color').firstChild.nodeValue = "white";
            document.getElementById('menu1Color').firstChild.nodeValue = "gray";
            document.getElementById('text2').style.color ="black";
            document.getElementById('text1').style.color ="gray";
            $.ajax({
                url: "getBaseball.php",
                type: "post",
            }).done(function(data) {
                let data2 = data.split(" ");
                let appendData = "";
                data2.sort(function(a,b) {
                    let x = parseInt(a.split("|")[1]);
                    let y = parseInt(b.split("|")[1]);
                    return x-y;
                });
                for(let i = 0; i < 10; i++) {
                    if(data2[i] == "") {
                        break;
                    }
                    else {
                        let data3 = data2[i].split("|");
                        appendData = appendData + "<li>" + (i+1) + "등 / ";
                        appendData = appendData + data3[0] + " / ";
                        appendData = appendData + data3[1] + "</li>";
                    }
                }
                $('#leader').empty();
                if(data.length == 0) {
                }
                else {
                    $('#leader').append(appendData);
                }
            });
        }
    }
}

$.ajax({
    url: "get2048.php",
    type: "post",
}).done(function(data) {
    let data2 = data.split(" ");
    let appendData = "";
    data2.sort(function(a,b) {
        let x = parseInt(a.split("|")[1]);
        let y = parseInt(b.split("|")[1]);
        return -(x-y);
    });
    for(let i = 0; i < 10; i++) {
        if(data2[i] == "") {
            break;
        }
        else {
            let data3 = data2[i].split("|");
            appendData = appendData + "<li>" + (i+1) + "등 / ";
            appendData = appendData + data3[0] + " / ";
            appendData = appendData + data3[1] + "</li>";
        }
    }
    $('#leader').empty();
    if(data.length == 0) {
    }
    else {
        $('#leader').append(appendData);
    }  
});