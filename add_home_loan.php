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
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Get input data
$data = json_decode(file_get_contents('php://input'), true);
$loanAmount = $data['loanAmount'];
$monthlyPayment = $data['monthlyPayment'];

// Insert the data into the Home_Loan table
$query = "INSERT INTO Home_Loan (Loan_Amount, Monthly_Payment) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("dd", $loanAmount, $monthlyPayment);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Home loan data added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add home loan data: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
