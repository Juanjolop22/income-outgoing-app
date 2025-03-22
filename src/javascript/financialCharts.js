import Chart from 'chart.js/auto'; // Importa Chart.js con todos los componentes necesarios
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa el plugin para etiquetas
Chart.register(ChartDataLabels);

const loadFinancialChart = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        console.error('No hay userId en sessionStorage');
        return;
    }

    let chartContainer = document.querySelector('.chart-container');
    let chartCanvas;

    if (!chartContainer) {
        chartContainer = document.createElement('div');
        chartContainer.id = 'chart-container';

        chartCanvas = document.createElement('canvas');
        chartCanvas.id = 'financialChart';
        chartContainer.appendChild(chartCanvas);

        const container = document.querySelector('.container');
        if (container) {
            container.appendChild(chartContainer);
        } 
    } else {
        chartCanvas = document.getElementById('financialChart');
    }

    try {
        const response = await fetch(`http://localhost:3001/getFinancialStats?userId=${userId}`);
        if (!response.ok) throw new Error('Error al obtener estadísticas');
        const data = await response.json();
        console.log('Datos financieros recibidos:', data, userId);

        if (typeof data.incomePercentage !== 'number' || typeof data.expensePercentage !== 'number') {
            throw new Error('Datos inválidos para el gráfico');
        }

        const ctx = chartCanvas.getContext('2d');
        if (window.financialChart && typeof window.financialChart.destroy === 'function') {
            window.financialChart.destroy();
        }

        window.financialChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Ingresos', 'Egresos'],
                datasets: [{
                    data: [data.incomePercentage, data.expensePercentage],
                    backgroundColor: ['#8AB07E', '#B07E8A'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } },
                    datalabels: { 
                        formatter: (value) => `${value}%`, 
                        color: '#F5E8C7', 
                        font: { weight: 'bold' } 
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar el gráfico:', error);
    }
};

export default loadFinancialChart;