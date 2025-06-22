// Sample student data for each group (expand as needed)
const studentData = {
    '201-EMEC23': [
        { id: '242520454-8', name: 'Ángel Farid Alvarado Pérez' },
        { id: '242520704-6', name: 'Julio César Amador Hernández' },
        // Add more students up to 25
    ],
    '202-EMEC23': [
        { id: '242520483-7', name: 'Kevin Uriel Aguilar Rodríguez' },
        { id: '242520383-9', name: 'Jesus Alberto Balderas Vázquez' },
        // Add more students up to 24
    ],
    '203-EMEC23': [
        { id: '242520500-8', name: 'Uri Dariel Aquino González' },
        { id: '242520392-0', name: 'Santiago Arcos Sánchez' },
        // Add more students up to 23
    ],
    '204-EMEC23': [
        { id: '242520270-8', name: 'Jorge Antonio Bermúdez Cortés' },
        { id: '242520975-2', name: 'María Fernanda Cid Ramírez' },
        // Add more students up to 22
    ],
    '205-INFO23': [
        { id: '242520506-5', name: 'Cristina Arellano Maldonado' },
        { id: '242521014-9', name: 'Jonathan Jaziel Arenas Zuñiga' },
        // Add more students up to 20
    ],
    '206-INFO23': [
        { id: '242520499-3', name: 'Vanessa Arias Bustamante' },
        { id: '242520234-4', name: 'Concepción Shamady Beristain Irivas' },
        // Add more students up to 19
    ],
    '207-INFO23': [
        { id: '242520232-8', name: 'Jocelin Briones Hernández' },
        { id: '242520491-0', name: 'Diego Zoe Chávez Olguín' },
        // Add more students up to 18
    ],
    '208-MODI23': [
        { id: '242520407-6', name: 'Dilan Yahir Álvarez Sánchez' },
        { id: '242520709-5', name: 'Ángel Rafael Ascención Marín' },
        // Add more students up to 21
    ],
    '209-MODI23': [
        { id: '242520382-1', name: 'Alexis Beltrán Martínez' },
        { id: '242520935-6', name: 'John Brian Calvario Sánchez' },
        // Add more students up to 20
    ],
    '210-MODI23': [
        { id: '242520666-7', name: 'Yareli Castillo Heredia' },
        { id: '242520588-3', name: 'Edmarth Giovanny Cerqueda Chamorro' },
        // Add more students up to 19
    ],
    '211-MODI23': [
        { id: '242520825-9', name: 'Luis Uriel Cesareo Romero' },
        { id: '242520772-3', name: 'Nicolás Cortés Gómez' },
        // Add more students up to 18
    ],
    '212-MODI23': [
        { id: '242520440-7', name: 'Iván Charbel De Los Santos Flores' },
        { id: '242520320-1', name: 'José Eduardo Domínguez Aladino' },
        // Add more students up to 17
    ],
    '213-MODI23': [
        { id: '242520278-1', name: 'Laura Jezabel Escobar Cortez' },
        { id: '242520532-1', name: 'Cristian Iván García Hernández' },
        // Add more students up to 16
    ],
    '214-MODI23': [
        { id: '242520223-7', name: 'Ángel Magdiel Gaytán Martínez' },
        { id: '242520523-0', name: 'Hiram Abisai Gómez Hernández' },
        // Add more students up to 15
    ]
};

// Function to toggle attendance modal
function toggleAttendance(group) {
    const modal = document.getElementById('attendanceModal');
    const modalGroupName = document.getElementById('modalGroupName');
    const modalAttendanceCount = document.getElementById('modalAttendanceCount');
    const modalAttendanceTableBody = document.getElementById('modalAttendanceTableBody');
    const saveModalTimeBtn = document.getElementById('saveModalTime');
    const saveModalAttendanceBtn = document.getElementById('saveModalAttendance');

    modalGroupName.textContent = group;
    const initialCount = parseInt(document.querySelector(`[onclick="toggleAttendance('${group}')"] .card-text`).textContent.split(': ')[1]);
    modalAttendanceCount.value = initialCount;

    // Populate table with students
    updateModalAttendance();

    // Show modal
    modal.classList.add('show');

    // Save time functionality
    saveModalTimeBtn.onclick = function() {
        const newTime = document.getElementById('modalEntryTime').value;
        const entryTimes = document.querySelectorAll('#modalAttendanceTableBody .entry-time');
        entryTimes.forEach(timeInput => {
            timeInput.value = newTime;
        });
        alert(`Hora de entrada actualizada a ${newTime} para el grupo ${group}`);
    };

    // Save attendance count functionality
    saveModalAttendanceBtn.onclick = function() {
        const newCount = parseInt(modalAttendanceCount.value);
        if (newCount >= 0 && newCount <= 30) {
            const card = document.querySelector(`[onclick="toggleAttendance('${group}')"] .card-text`);
            card.textContent = `Presentes: ${newCount}`;
            updateModalAttendance();
            alert(`Asistencia actualizada a ${newCount} para el grupo ${group}`);
        } else {
            alert('El número de presentes debe estar entre 0 y 30.');
        }
    };
}

// Function to update modal attendance table based on count
function updateModalAttendance() {
    const tableBody = document.getElementById('modalAttendanceTableBody');
    const group = document.getElementById('modalGroupName').textContent;
    const attendanceCount = parseInt(document.getElementById('modalAttendanceCount').value);
    const students = studentData[group] || [];
    tableBody.innerHTML = '';

    const selectedStudents = students.slice(0, attendanceCount);
    selectedStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border-b">${student.id}</td>
            <td class="border-b">${student.name}</td>
            <td class="border-b"><input type="time" class="entry-time" value="07:00"></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('attendanceModal');
    modal.classList.remove('show');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}