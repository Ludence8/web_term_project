<?php
    $screenFile = fopen("data/baseball.json", "r");
    $data2 = "";
    while(!feof($screenFile)) {
        $data = fgets($screenFile);
        if($data == "") {
            continue;
        }
        $data = json_decode($data);
        $data2 = $data2.$data->name."|".$data->score." ";
    }
    echo($data2);
?>