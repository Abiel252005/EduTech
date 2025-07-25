// Sample student data for each group (limited to 5 for testing)
const studentData = {
    '201-EMEC23': [
        { id: '242520454-8', name: 'Ángel Farid Alvarado Pérez' },
        { id: '242520704-6', name: 'Julio César Amador Hernández' },
        { id: '242520475-3', name: 'Enrique Andrade Reyes' },
        { id: '242520643-6', name: 'Tania Lizeth Arellano Calvario' },
        { id: '242520061-1', name: 'Emiliano Badillo Hernández' }
    ],
    '202-EMEC23': [
        { id: '242520483-7', name: 'Kevin Uriel Aguilar Rodríguez' },
        { id: '242520383-9', name: 'Jesus Alberto Balderas Vázquez' },
        { id: '242520500-8', name: 'Uri Dariel Aquino González' },
        { id: '242520392-0', name: 'Santiago Arcos Sánchez' },
        { id: '242520270-8', name: 'Jorge Antonio Bermúdez Cortés' }
    ],
    '203-EMEC23': [
        { id: '242520500-8', name: 'Uri Dariel Aquino González' },
        { id: '242520392-0', name: 'Santiago Arcos Sánchez' },
        { id: '242520270-8', name: 'Jorge Antonio Bermúdez Cortés' },
        { id: '242520975-2', name: 'María Fernanda Cid Ramírez' },
        { id: '242520506-5', name: 'Cristina Arellano Maldonado' }
    ],
    '204-EMEC23': [
        { id: '242520270-8', name: 'Jorge Antonio Bermúdez Cortés' },
        { id: '242520975-2', name: 'María Fernanda Cid Ramírez' },
        { id: '242520506-5', name: 'Cristina Arellano Maldonado' },
        { id: '242521014-9', name: 'Jonathan Jaziel Arenas Zuñiga' },
        { id: '242520499-3', name: 'Vanessa Arias Bustamante' }
    ],
    '205-INFO23': [
        { id: '242520506-5', name: 'Cristina Arellano Maldonado' },
        { id: '242521014-9', name: 'Jonathan Jaziel Arenas Zuñiga' },
        { id: '242520499-3', name: 'Vanessa Arias Bustamante' },
        { id: '242520234-4', name: 'Concepción Shamady Beristain Irivas' },
        { id: '242520232-8', name: 'Jocelin Briones Hernández' }
    ],
    '206-INFO23': [
        { id: '242520499-3', name: 'Vanessa Arias Bustamante' },
        { id: '242520234-4', name: 'Concepción Shamady Beristain Irivas' },
        { id: '242520232-8', name: 'Jocelin Briones Hernández' },
        { id: '242520491-0', name: 'Diego Zoe Chávez Olguín' },
        { id: '242520407-6', name: 'Dilan Yahir Álvarez Sánchez' }
    ],
    '207-INFO23': [
        { id: '242520232-8', name: 'Jocelin Briones Hernández' },
        { id: '242520491-0', name: 'Diego Zoe Chávez Olguín' },
        { id: '242520407-6', name: 'Dilan Yahir Álvarez Sánchez' },
        { id: '242520709-5', name: 'Ángel Rafael Ascención Marín' },
        { id: '242520382-1', name: 'Alexis Beltrán Martínez' }
    ],
    '208-MODI23': [
        { id: '242520407-6', name: 'Dilan Yahir Álvarez Sánchez' },
        { id: '242520709-5', name: 'Ángel Rafael Ascención Marín' },
        { id: '242520382-1', name: 'Alexis Beltrán Martínez' },
        { id: '242520935-6', name: 'John Brian Calvario Sánchez' },
        { id: '242520666-7', name: 'Yareli Castillo Heredia' }
    ],
    '209-MODI23': [
        { id: '242520382-1', name: 'Alexis Beltrán Martínez' },
        { id: '242520935-6', name: 'John Brian Calvario Sánchez' },
        { id: '242520666-7', name: 'Yareli Castillo Heredia' },
        { id: '242520588-3', name: 'Edmarth Giovanny Cerqueda Chamorro' },
        { id: '242520825-9', name: 'Luis Uriel Cesareo Romero' }
    ],
    '210-MODI23': [
        { id: '242520666-7', name: 'Yareli Castillo Heredia' },
        { id: '242520588-3', name: 'Edmarth Giovanny Cerqueda Chamorro' },
        { id: '242520825-9', name: 'Luis Uriel Cesareo Romero' },
        { id: '242520772-3', name: 'Nicolás Cortés Gómez' },
        { id: '242520440-7', name: 'Iván Charbel De Los Santos Flores' }
    ],
    '211-MODI23': [
        { id: '242520825-9', name: 'Luis Uriel Cesareo Romero' },
        { id: '242520772-3', name: 'Nicolás Cortés Gómez' },
        { id: '242520440-7', name: 'Iván Charbel De Los Santos Flores' },
        { id: '242520320-1', name: 'José Eduardo Domínguez Aladino' },
        { id: '242520278-1', name: 'Laura Jezabel Escobar Cortez' }
    ],
    '212-MODI23': [
        { id: '242520440-7', name: 'Iván Charbel De Los Santos Flores' },
        { id: '242520320-1', name: 'José Eduardo Domínguez Aladino' },
        { id: '242520278-1', name: 'Laura Jezabel Escobar Cortez' },
        { id: '242520532-1', name: 'Cristian Iván García Hernández' },
        { id: '242520223-7', name: 'Ángel Magdiel Gaytán Martínez' }
    ],
    '213-MODI23': [
        { id: '242520278-1', name: 'Laura Jezabel Escobar Cortez' },
        { id: '242520532-1', name: 'Cristian Iván García Hernández' },
        { id: '242520223-7', name: 'Ángel Magdiel Gaytán Martínez' },
        { id: '242520523-0', name: 'Hiram Abisai Gómez Hernández' },
        { id: '242520223-7', name: 'Ángel Magdiel Gaytán Martínez' }
    ],
    '214-MODI23': [
        { id: '242520223-7', name: 'Ángel Magdiel Gaytán Martínez' },
        { id: '242520523-0', name: 'Hiram Abisai Gómez Hernández' },
        { id: '242520223-7', name: 'Ángel Magdiel Gaytán Martínez' },
        { id: '242520523-0', name: 'Hiram Abisai Gómez Hernández' },
        { id: '242520223-7', name: 'Ángel Magdiel Gaytán Martínez' }
    ]
};

// Variables para paginación
let currentPage = 0;
const studentsPerPage = 5;

function toggleAttendance(group) {
    const modal = document.getElementById('attendanceModal');
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }
    const modalGroupName = document.getElementById('modalGroupName');
    const modalAttendanceCount = document.getElementById('modalAttendanceCount');
    const modalAttendanceTableBody = document.getElementById('modalAttendanceTableBody');
    const saveModalTimeBtn = document.getElementById('saveModalTime');
    const saveModalAttendanceBtn = document.getElementById('saveModalAttendance');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (!modalGroupName || !modalAttendanceCount || !modalAttendanceTableBody || !saveModalTimeBtn || !saveModalAttendanceBtn || !loadMoreBtn) {
        console.error('One or more modal elements not found!');
        return;
    }

    // Establecer datos del grupo seleccionado
    modalGroupName.textContent = group;
    const initialCount = parseInt(document.querySelector(`[onclick="toggleAttendance('${group}')"] .card-text`).textContent.split(': ')[1]);
    modalAttendanceCount.value = initialCount;

    // Resetear paginación y actualizar tabla
    currentPage = 0;
    updateModalAttendance(group);

    // Mostrar botón "Ver más" si hay más estudiantes que el límite inicial
    const students = studentData[group] || [];
    loadMoreBtn.style.display = students.length > studentsPerPage ? 'block' : 'none';

    // Mostrar el modal
    modal.classList.add('show');
}

function updateModalAttendance(group) {
    const tableBody = document.getElementById('modalAttendanceTableBody');
    if (!tableBody) {
        console.error('Table body element not found!');
        return;
    }
    const attendanceCount = parseInt(document.getElementById('modalAttendanceCount').value);
    const students = studentData[group] || [];
    tableBody.innerHTML = '';

    const startIdx = currentPage * studentsPerPage;
    const endIdx = Math.min(startIdx + studentsPerPage, attendanceCount);
    const selectedStudents = students.slice(0, attendanceCount).slice(startIdx, endIdx);

    selectedStudents.forEach((student, index) => {
        const globalIndex = startIdx + index;
        const isPresent = globalIndex < attendanceCount;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border-b">${student.id}</td>
            <td class="border-b">${student.name}</td>
            <td class="border-b ${isPresent ? 'present' : 'absent'}">${isPresent ? 'Presente' : 'Ausente'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function loadMoreStudents() {
    currentPage++;
    const group = document.getElementById('modalGroupName').textContent;
    const attendanceCount = parseInt(document.getElementById('modalAttendanceCount').value);
    const students = studentData[group] || [];
    const startIdx = currentPage * studentsPerPage;
    const endIdx = Math.min(startIdx + studentsPerPage, attendanceCount);

    if (endIdx <= attendanceCount) {
        updateModalAttendance(group);
    } else {
        document.getElementById('loadMoreBtn').style.display = 'none'; // Ocultar si no hay más
    }
}

function closeModal() {
    const modal = document.getElementById('attendanceModal');
    if (modal) {
        modal.classList.remove('show');
        currentPage = 0; // Resetear paginación al cerrar
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// Añadir eventos de los botones
document.getElementById('saveModalTime').onclick = function() {
    const group = document.getElementById('modalGroupName').textContent;
    const newTime = document.getElementById('modalEntryTime').value;
    alert(`Hora de entrada actualizada a ${newTime} para el grupo ${group}`);
};

document.getElementById('saveModalAttendance').onclick = function() {
    const group = document.getElementById('modalGroupName').textContent;
    const newCount = parseInt(document.getElementById('modalAttendanceCount').value);
    if (newCount >= 0 && newCount <= 5) { // Limitado a 5 por ser prueba
        const card = document.querySelector(`[onclick="toggleAttendance('${group}')"] .card-text`);
        card.textContent = `Presentes: ${newCount}`;
        currentPage = 0; // Reiniciar paginación al actualizar
        updateModalAttendance(group);
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.style.display = newCount > studentsPerPage ? 'block' : 'none';
        alert(`Asistencia actualizada a ${newCount} para el grupo ${group}`);
    } else {
        alert('El número de presentes debe estar entre 0 y 5 para esta prueba.');
    }
};