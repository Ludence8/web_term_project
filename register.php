<?php
    $path = "data/";
    if (!is_dir($path)) {
        mkdir($path, 0777, true);
    }
    $screenFile = fopen("data/person.json", "a+");
    $obj = new \stdClass();
    $obj->Name = $_POST['id'];
    $obj->Password = $_POST['password'];

    $obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
    fwrite($screenFile, $obj);
    fwrite($screenFile, "\n");
    fclose($screenFile);
    

?>