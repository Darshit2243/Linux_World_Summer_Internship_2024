// Example data
const memoryData = [30, 50, 70, 40, 60]; // Sample data for memory usage
const storageData = [10, 20, 15, 25, 30]; // Sample data for storage used
const statusData = [100, 90, 85, 95, 80]; // Sample data for container status

const labels = ['0s', '10s', '20s', '30s', '40s']; // Time labels

// Memory Usage Chart
const ctxMemory = document.getElementById('memoryChart').getContext('2d');
const memoryChart = new Chart(ctxMemory, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Memory Usage (MB)',
            data: memoryData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

// Storage Chart
const ctxStorage = document.getElementById('storageChart').getContext('2d');
const storageChart = new Chart(ctxStorage, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Storage Used (GB)',
            data: storageData,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

// Status Chart
const ctxStatus = document.getElementById('statusChart').getContext('2d');
const statusChart = new Chart(ctxStatus, {
    type: 'doughnut',
    data: {
        labels: ['Running', 'Stopped'],
        datasets: [{
            label: 'Container Status',
            data: [70, 30], // Example percentages
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        }
    }
});
