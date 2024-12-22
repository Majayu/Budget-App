<?php
// Database connection details
$servername = "localhost";
$username = "admin";
$password = "P@ssw0rd";
$dbname = "family_budget";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare arrays to hold data for each table
$data = [
    "Home_Loan" => [],
    "Alba" => [],
    "Giovanni" => [],
    "Alex" => []
];

// Fetch data for Home Loan
$query = "SELECT id, Loan_Amount, Monthly_Payment FROM Home_Loan";
$result = $conn->query($query);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data["Home_Loan"][] = $row; // Store Home_Loan data
    }
}

// Fetch data for Alba
$query = "SELECT id, Month, Capital_One, Sally_Fashion, Truist, Grand_Total FROM Alba";
$result = $conn->query($query);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data["Alba"][] = $row; // Store Alba data
    }
}

// Fetch data for Giovanni
$query = "SELECT id, Month, Volaris, Navy_Federal, Monthly_Total FROM Giovanni";
$result = $conn->query($query);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data["Giovanni"][] = $row; // Store Giovanni data
    }
}

// Fetch data for Alex
$query = "SELECT id, Month, Navy_Federal, Capital_One_APR, Estimated_Payment FROM Alex";
$result = $conn->query($query);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data["Alex"][] = $row; // Store Alex data
    }
}

// Debugging: Focus on Home_Loan first
echo '<h2>Home Loan Debugging Output</h2>';
echo '<pre>';
print_r($data["Home_Loan"]);
echo '</pre>';
die();

// Close the connection
$conn->close();

// Return data as JSON for all tables
header('Content-Type: application/json');
echo json_encode($data);
?>
