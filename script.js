// Fetch existing data and populate tables
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://192.168.1.254/fetch_budget.php');
        const data = await response.json();

        // Populate Home Loan Table
        const homeLoanTableBody = document.getElementById('homeLoanTableBody');
        data.Home_Loan.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id !== null && item.id !== "" ? item.id : 'N/A'}</td>
                <td>${item.Loan_Amount !== null && item.Loan_Amount !== "" ? item.Loan_Amount : 'N/A'}</td>
                <td>${item.Monthly_Payment !== null && item.Monthly_Payment !== "" ? item.Monthly_Payment : 'N/A'}</td>
            `;
            homeLoanTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Handle Home Loan Form Submission
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
            location.reload(); // Reload the page to show the updated data
        } else {
            alert('Failed to add home loan data: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding home loan data.');
    }
});
