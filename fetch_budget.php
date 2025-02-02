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

// Prepare array to hold Home_Loan data
$data = ["Home_Loan" => []];

// Fetch data for Home Loan
$query = "SELECT id, Loan_Amount, Monthly_Payment FROM Home_Loan";
$result = $conn->query($query);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data["Home_Loan"][] = $row;
    }
}

$conn->close();
echo json_encode($data);
?>
