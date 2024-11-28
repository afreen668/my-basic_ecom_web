<?php
// Database credentials
$host = 'DESKTOP-POJ2PPO';  // Hostname (or IP address) of your MySQL server
$db = 'subscriptions';    // Name of your database
$user = 'root';       // Username for your MySQL server
$pass = 'MUSIC'; // Password for your MySQL server (leave empty for default setup)
$conn = new mysqli($host, $user, $pass, $db);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Data to insert
$email = "example.user@example.com";
$name = "Example User";
$verification_token = bin2hex(random_bytes(16)); // Generate a random token
$subscribed_to_newsletters = true;

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO subscriptions (email, name, verification_token, subscribed_to_newsletters) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $email, $name, $verification_token, $subscribed_to_newsletters);

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
?>