<?php

// Test rapido per il login API
$url = 'http://localhost:8001/api/auth/login';
$data = [
    'email' => 'admin@dogsandcats.com',
    'password' => 'admin123'
];

$options = [
    'http' => [
        'header' => "Content-type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo "=== TEST LOGIN API ===\n";
echo "URL: $url\n";
echo "Data: " . json_encode($data) . "\n";
echo "Response: $result\n";
echo "=====================\n"; 