// Fetch existing Home Loan data and populate the table
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://192.168.1.254/fetch_budget.php');
        const data = await response.json();

        const homeLoanTableBody = document.getElementById('homeLoanTableBody');
        data.Home_Loan.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id !== null && item.id !== "" ? item.id : 'N/A'}</td>
                <td>${item.Loan_Amount !== null && item.Loan_Amount !== "" ? item.Loan_Amount : 'N/A'}</td>
                <td>${item.Monthly_Payment !== null && item.Monthly_Payment !== "" ? item.Monthly_Payment : 'N/A'}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteHomeLoan(${item.id})">
                        Delete
                    </button>
                </td>
            `;
            homeLoanTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Handle Home Loan form submission
document.getElementById('homeLoanForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const loanAmount = document.getElementById('loanAmount').value;
    const monthlyPayment = document.getElementById('monthlyPayment').value;

    try {
        const response = await fetch('http://192.168.1.254/add_home_loan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loanAmount,
                monthlyPayment
            })
        });

        const result = await response.json();
        if (result.success) {
            alert('Home loan data added successfully!');
            location.reload(); // Reload the page to show updated data
        } else {
            alert('Failed to add home loan data: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding home loan data.');
    }
});

// Function to delete a home loan entry
async function deleteHomeLoan(id) {
    if (!confirm("Are you sure you want to delete this entry?")) {
        return;
    }
    try {
        const response = await fetch('http://192.168.1.254/delete_home_loan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        const result = await response.json();
        if (result.success) {
            alert('Entry deleted successfully!');
            location.reload(); // Reload the page to update data
        } else {
            alert('Failed to delete entry: ' + result.message);
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
        alert('An error occurred while deleting the entry.');
    }
}
