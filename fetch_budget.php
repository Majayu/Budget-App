<?php
// Database connection details
$servername = "localhost";
$username = "admin"; // Your username
$password = "P@ssw0rd"; // Your password
$dbname = "family_budget"; // Your database name

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare an array to hold data
$data = [];

// Fetch data for Giovanni
$query = "SELECT id, month, volaris, navy_federal, monthly_total FROM Giovanni";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['person'] = "Giovanni";
        $data[] = $row;
    }
}

// Fetch data for Alba
$query = "SELECT id, month, capital_one, sally, truist, grand_total FROM Alba";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['person'] = "Alba";
        $data[] = $row;
    }
}

// Fetch data for Alex
$query = "SELECT id, month, navy_federal, capital_one_apr, estimated_payment FROM Alex";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['person'] = "Alex";
        $data[] = $row;
    }
}

// Fetch data for Home Loan
$query = "SELECT id, loan_amount, monthly_payment FROM Home_Loan";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['person'] = "Home Loan";
        $data[] = $row;
    }
}

// Close the connection
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>

//Give permissions
sudo chmod 644 fetch_budget.php
