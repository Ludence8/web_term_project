<?php
    $screenFile = fopen("data/2048.json", "r");
    $data2 = "";
    while(!feof($screenFile)) {
        $data = fgets($screenFile);
        if($data == "") {
            continue;
        }
        $data = json_decode($data);
        echo($data->name."|".$data->score." ");
    }
    
?>