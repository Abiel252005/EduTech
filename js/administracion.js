// Simulación de almacenamiento de reportes en memoria
let reports = [
    { name: "Reporte_07/07/2025 10:15 AM.xlsx", date: new Date("2025-07-07T10:15:00") },
    { name: "Reporte_08/07/2025 03:45 PM.xlsx", date: new Date("2025-07-08T15:45:00") }
];
const reportCountElement = document.getElementById('reportCount');
const reportModal = document.getElementById('reportModal');
const modalReportsElement = document.getElementById('modalReports');
let attendanceChart = null;
let pieChart = null;
let calendarChart = null;
let extraChart = null;
let secondaryChart = null;

// Datos simulados
const attendanceData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [{
        label: 'Asistencias',
        data: [85, 90, 88, 92, 87, 89, 91],
        backgroundColor: 'rgba(46, 125, 50, 0.7)',
        borderColor: 'rgba(46, 125, 50, 1)',
        borderWidth: 1
    }, {
        label: 'Faltas',
        data: [15, 10, 12, 8, 13, 11, 9],
        backgroundColor: 'rgba(211, 47, 47, 0.7)',
        borderColor: 'rgba(211, 47, 47, 1)',
        borderWidth: 1
    }]
};

// Datos simulados para el calendario de faltas (julio 2025)
const calendarData = {
    labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    datasets: [{
        label: 'Faltas por Día',
        data: Array(31).fill(0).map((_, i) => i < 11 ? Math.floor(Math.random() * 5) + 1 : null),
        backgroundColor: 'rgba(211, 47, 47, 0.7)',
        borderColor: 'rgba(211, 47, 47, 1)',
        borderWidth: 1,
        fill: false,
        spanGaps: true
    }]
};

// Datos simulados para gráfica adicional
const extraData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [{
        label: 'Promedio Asistencia',
        data: [88, 90, 87, 92],
        backgroundColor: 'rgba(76, 175, 80, 0.7)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1
    }]
};

// Datos simulados para gráfica secundaria
const secondaryData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    datasets: [{
        label: 'Inasistencias Diarias',
        data: [5, 7, 4, 6, 3],
        backgroundColor: 'rgba(255, 152, 0, 0.7)',
        borderColor: 'rgba(255, 152, 0, 1)',
        borderWidth: 1,
        fill: false
    }]
};

// Función para actualizar el contador de reportes
function updateReportCount() {
    if (reportCountElement) {
        reportCountElement.textContent = reports.length;
    }
}

// Función para ver los reportes en un modal
function viewReports() {
    if (reportModal) {
        modalReportsElement.innerHTML = '';
        if (reports.length === 0) {
            modalReportsElement.innerHTML = '<li>No hay reportes generados.</li>';
        } else {
            reports.forEach(report => {
                const li = document.createElement('li');
                li.textContent = `${report.name} - Elaborado: ${report.date.toLocaleString('es-MX', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).replace(',', '')}`;
                modalReportsElement.appendChild(li);
            });
        }
        reportModal.style.display = 'flex';
    } else {
        console.error('Modal no encontrado');
    }
}

// Función para cerrar el modal
function closeModal() {
    if (reportModal) {
        reportModal.style.display = 'none';
    }
}

// Crear gráfico inicial de asistencia (solo julio)
function createInitialChart() {
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    attendanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Julio'],
            datasets: [{
                label: 'Asistencias',
                data: [91],
                backgroundColor: 'rgba(46, 125, 50, 0.7)',
                borderColor: 'rgba(46, 125, 50, 1)',
                borderWidth: 1
            }, {
                label: 'Faltas',
                data: [9],
                backgroundColor: 'rgba(211, 47, 47, 0.7)',
                borderColor: 'rgba(211, 47, 47, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Porcentaje (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Índices de Asistencia y Faltas - Julio 2025'
                }
            },
            onClick: () => expandChart()
        }
    });
    const attendancePercent = document.getElementById('attendancePercent');
    if (attendancePercent) {
        attendancePercent.textContent = '91%';
    }
}

// Expandir gráfico de asistencia a todos los meses
function expandChart() {
    if (attendanceChart) {
        attendanceChart.destroy();
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        attendanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: attendanceData.labels,
                datasets: attendanceData.datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Porcentaje (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Índices de Asistencia y Faltas por Mes (2025)'
                    }
                }
            }
        });
    }
}

// Crear gráfico de calendario de faltas
function createCalendarChart() {
    const ctx = document.getElementById('calendarChart').getContext('2d');
    calendarChart = new Chart(ctx, {
        type: 'line',
        data: calendarData,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Día del Mes'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Número de Faltas'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Faltas por Día - Julio 2025'
                },
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    });
}

// Crear gráfico de pastel para porcentajes
function createPieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Éxito de Asistencia', 'Inasistencia'],
            datasets: [{
                data: [91, 9],
                backgroundColor: ['rgba(46, 125, 50, 0.7)', 'rgba(211, 47, 47, 0.7)']
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Porcentajes - Julio 2025'
                }
            }
        }
    });
}

// Crear gráfico adicional
function createExtraChart() {
    const ctx = document.getElementById('extraChart').getContext('2d');
    extraChart = new Chart(ctx, {
        type: 'bar',
        data: extraData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Porcentaje (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Promedio de Asistencia por Semana - Julio 2025'
                }
            }
        }
    });
}

// Crear gráfico secundario
function createSecondaryChart() {
    const ctx = document.getElementById('secondaryChart').getContext('2d');
    secondaryChart = new Chart(ctx, {
        type: 'line',
        data: secondaryData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Número de Inasistencias'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Inasistencias Diarias - Julio 2025'
                }
            }
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateReportCount();
    createInitialChart();
    createCalendarChart();
    createPieChart();
    createExtraChart();
    createSecondaryChart();
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === reportModal) {
            closeModal();
        }
    });
});