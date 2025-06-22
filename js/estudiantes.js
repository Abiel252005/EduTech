function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

let initialVisibleRows = 10;
let increment = 10;
let currentVisibleRows = initialVisibleRows;

function updateRowVisibility() {
    const rows = document.querySelectorAll('#studentTableBody tr');
    const showMoreButton = document.getElementById('showMoreButton');
    const showLessButton = document.getElementById('showLessButton');

    // Update row visibility
    rows.forEach((row, index) => {
        if (index < currentVisibleRows) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });

    // Update button states
    if (currentVisibleRows >= rows.length) {
        showMoreButton.disabled = true;
    } else {
        showMoreButton.disabled = false;
    }

    if (currentVisibleRows <= initialVisibleRows) {
        showLessButton.disabled = true;
    } else {
        showLessButton.disabled = false;
    }
}

function showMoreRows() {
    const rows = document.querySelectorAll('#studentTableBody tr');
    currentVisibleRows = Math.min(currentVisibleRows + increment, rows.length);
    updateRowVisibility();
}

function showLessRows() {
    currentVisibleRows = Math.max(currentVisibleRows - increment, initialVisibleRows);
    updateRowVisibility();
}

function filterTable() {
    const input = document.getElementById('filterInput').value.toLowerCase();
    const rows = document.querySelectorAll('#studentTableBody tr');

    let visibleCount = 0;
    rows.forEach((row, index) => {
        const name = row.cells[1].textContent.toLowerCase();
        const group = row.cells[2].textContent.toLowerCase();
        const matchesFilter = name.includes(input) || group.includes(input);

        if (matchesFilter) {
            row.style.display = 'table-row';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    // Adjust button states after filtering
    const showMoreButton = document.getElementById('showMoreButton');
    const showLessButton = document.getElementById('showLessButton');
    currentVisibleRows = visibleCount;

    if (visibleCount <= initialVisibleRows) {
        showLessButton.disabled = true;
        showMoreButton.disabled = visibleCount === rows.length;
    } else {
        showLessButton.disabled = false;
        showMoreButton.disabled = visibleCount === rows.length;
    }
}

// Initialize the table with only the first 10 rows visible
document.addEventListener('DOMContentLoaded', () => {
    updateRowVisibility();
    document.getElementById('showMoreButton').addEventListener('click', showMoreRows);
    document.getElementById('showLessButton').addEventListener('click', showLessRows);
    document.getElementById('filterInput').addEventListener('keyup', filterTable);
});