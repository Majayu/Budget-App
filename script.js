async function fetchBudgetData() {
    try {
        const response = await fetch('http://localhost/fetch_budget.php');
        const data = await response.json();

        const tableBody = document.getElementById('budgetTableBody');
        tableBody.innerHTML = ''; // Clear any existing rows

        data.forEach(item => {
            const row = document.createElement('tr');

            if (item.person === "Giovanni") {
                row.innerHTML = `
                    <td>${item.person}</td>
                    <td>Month: ${item.month}, Volaris: ${item.volaris || 'N/A'}, Monthly: ${item.monthly_total}</td>
                `;
            }

            tableBody.appendChild(row);
        });
    } catch (
