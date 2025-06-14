<?php
header('Access-Control-Allow-Origin: https://www.gcbasic.com');
header('Content-Type: application/xml');

$url = 'https://gcbasic.com/visit_log.xml';
$content = file_get_contents($url);

if ($content === false) {
    http_response_code(500);
    echo "<error>Failed to fetch visit_log.xml</error>";
    exit;
}

echo $content;
?>