<?php
// Database credentials
$host = 'DESKTOP-POJ2PPO';  // Hostname (or IP address) of your MySQL server
$db = 'ecommerce';    // Name of your database
$user = 'root';       // Username for your MySQL server
$pass = 'MUSIC'; // Password for your MySQL server (leave empty for default setup)
$conn = new mysqli($host, $user, $pass, $db);



// Handle form submission

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$email = $conn->real_escape_string($data['email']);
$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName']);
$phone = $conn->real_escape_string($data['phone']);
$address = $conn->real_escape_string($data['address']);
$city = $conn->real_escape_string($data['city']);
$zipCode = $conn->real_escape_string($data['zipCode']);
$paymentMethod = $conn->real_escape_string($data['paymentMethod']);
$orderTotal = $conn->real_escape_string($data['orderTotal']);

// Insert into database
$sql = "INSERT INTO orders (email, first_name, last_name, phone, address, city, zip_code, payment_method, order_total) 
        VALUES ('$email', '$firstName', '$lastName', '$phone', '$address', '$city', '$zipCode', '$paymentMethod', '$orderTotal')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => 'Order saved successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Error: ' . $conn->error]);
}


?> 

//http://localhost/phpmyadmin

