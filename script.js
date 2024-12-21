document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Budget data submitted!');
});

document.getElementById('goalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Goal set!');
});

// Placeholder for charts
const pieCtx = document.getElementById('pieChart').getContext('2d');
const barCtx = document.getElementById('barChart').getContext('2d');

const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Rent', 'Groceries', 'Entertainment', 'Savings'],
        datasets: [{
            data: [500, 300, 200, 400],
            backgroundColor: ['red', 'blue', 'green', 'yellow']
        }]
    }
});

const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
            label: 'Expenses',
            data: [1200, 1100, 900, 1000],
            backgroundColor: 'blue'
        }]
    }
});
