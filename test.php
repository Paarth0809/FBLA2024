<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "futura_jobs";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $position = $_POST['position'];
    $resume = $_FILES['resume'];

    // Save the resume file to the server
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($resume["name"]);
    move_uploaded_file($resume["tmp_name"], $target_file);

    // Insert application data into the database
    $stmt = $conn->prepare("INSERT INTO applications (name, email, position, resume) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $position, $target_file);
    
    if ($stmt->execute()) {
        echo "Application submitted successfully.";
    } else {
        echo "Method not allowed. Error: " . $stmt->error;
    }
    
    $stmt->close();
}

$conn->close();
?>
