<?php
    $screenFile = fopen("data/2048.json", "a+");
    $obj = new \stdClass();
    $obj->name = $_POST['name'];
    $obj->score = (int)$_POST['score'];
    $obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
    fwrite($screenFile, $obj);
    fwrite($screenFile, "\n");
    fclose($screenFile);
?>