<?php
    $screenFile = fopen("data/person.json", "r");
    $id = $_POST['id'];
    $password = $_POST['password'];
    $info;
    while(!feof($screenFile)) {
        $data = fgets($screenFile);
        if($data == "") {
            continue;
        }
        $data = json_decode($data);
        if($id == $data->Name) {
            if($password == $data->Password) {
                $info = "pass";
                break;
            }
            else {
                $info = "fail";
            }
        }
        else {
            $info = "fail";
        }
    }

    if($info == "pass") {
        session_start();
        $_SESSION['id'] = $_POST['id'];
    }
    echo($info);
?>