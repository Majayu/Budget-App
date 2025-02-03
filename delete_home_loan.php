<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "admin";
$password = "P@ssw0rd";
$dbname = "family_budget";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Get input data
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

if ($id) {
    // Securely delete the row with the given ID
    $query = "DELETE FROM Home_Loan WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Entry deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete entry: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid ID']);
}

$conn->close();
?>
