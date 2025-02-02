<?php
header('Content-Type: application/json');

// Database connection details
$servername = "localhost";
$username = "admin";
$password = "P@ssw0rd";
$dbname = "family_budget";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Get input data (id)
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Invalid ID provided']);
    exit();
}

// Delete the record from the Home_Loan table
$query = "DELETE FROM Home_Loan WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Entry deleted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete entry: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
