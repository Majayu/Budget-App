async function fetchBudgetData() {
    try {
        const response = await fetch('http://localhost/fetch_budget.php'); // Adjust the path if needed
        const data = await response.json();

        const tableBody = document.getElementById('budgetTableBody');
        tableBody.innerHTML = ''; // Clear any existing rows

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.person}</td>
                <td>${item.category || 'N/A'}</td>
                <td>${item.amount || 'N/A'}</td>
                <td>${item.date || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching budget data:', error);
    }
}

// Fetch and display data on page load
fetchBudgetData();
