// Function to export table to Excel
document.getElementById('exportExcel').addEventListener('click', function() {
    const table = document.getElementById('absencesTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'Faltas' });
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Faltas_' + new Date().toLocaleDateString() + '.xlsx';
    a.click();
    URL.revokeObjectURL(url);
});

// Scroll functions (assuming they exist in your context)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}