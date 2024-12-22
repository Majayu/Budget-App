async function fetchBudgetData() {
    try {
        const response = await fetch('http://192.168.1.254/fetch_budget.php'); // Updated URL
        const data = await response.json();

        const tableBody = document.getElementById('budgetTableBody');
        tableBody.innerHTML = ''; // Clear any existing rows

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.person}</td>
                <td>${item.month || 'N/A'}</td>
                <td>${item.capital_one || item.volaris || item.navy_federal || 'N/A'}</td>
                <td>${item.grand_total || item.monthly_total || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching budget data:', error);
    }
}

// Fetch and display data on page load
fetchBudgetData();
