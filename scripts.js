// Fetch existing data and populate tables
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://192.168.1.254/fetch_budget.php');
        const data = await response.json();

        // Populate Home Loan Table
        const homeLoanTableBody = document.getElementById('homeLoanTableBody');
        homeLoanTableBody.innerHTML = ''; // Clear existing rows

        data.Home_Loan.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.Loan_Amount}</td>
                <td>${item.Monthly_Payment}</td>
                <!-- Added Delete Button -->
                <td><button class="btn btn-danger btn-sm" onclick="deleteHomeLoan(${item.id})">Delete</button></td>
            `;
            homeLoanTableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Function to delete a home loan entry
async function deleteHomeLoan(id) {
    if (!confirm("Are you sure you want to delete this entry?")) return; // Confirmation before deleting

    try {
        const response = await fetch('http://192.168.1.254/delete_home_loan.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }) // Send the ID to delete
        });

        const result = await response.json();
        if (result.success) {
            alert('Home loan entry deleted successfully!');
            location.reload(); // Refresh the table
        } else {
            alert('Failed to delete entry: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the entry.');
    }
}
