document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const navAddStudent = document.getElementById('nav-add-student');
    const navViewStudents = document.getElementById('nav-view-students');
    const sectionAddStudent = document.getElementById('section-add-student');
    const sectionViewStudents = document.getElementById('section-view-students');
    
    const addStudentForm = document.getElementById('add-student-form');
    const studentsTableBody = document.getElementById('studentsTableBody');
    const searchInput = document.getElementById('searchInput');
    const filterCourse = document.getElementById('filterCourse');
    const emptyState = document.getElementById('emptyState');
    
    // Toast
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    const toastMessage = document.getElementById('toast-message');

    // === State Management ===
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // === Choices.js Initialization ===
    const courseInterestChoices = new Choices(document.getElementById('courseInterest'), {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
    });

    const studentStatusChoices = new Choices(document.getElementById('studentStatus'), {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
    });

    const filterCourseChoices = new Choices(document.getElementById('filterCourse'), {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
    });

    // === Navigation Logic ===
    function switchSection(targetId) {
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector(`[data-target="${targetId}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('animate-fade-in');
        });
        
        const targetSection = document.getElementById(targetId);
        targetSection.style.display = 'block';
        
        // Trigger reflow for animation
        void targetSection.offsetWidth;
        targetSection.classList.add('animate-fade-in');

        // Render table if switching to view students
        if (targetId === 'section-view-students') {
            renderStudentsTable();
        }
    }

    navAddStudent.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection('section-add-student');
    });

    navViewStudents.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection('section-view-students');
    });

    // === Add Student Logic ===
    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('studentName').value.trim();
        const email = document.getElementById('studentEmail').value.trim();
        const course = document.getElementById('courseInterest').value;
        const status = document.getElementById('studentStatus').value;
        
        if (!name || !email || !course || !status) {
            return; // HTML5 validation handles the UI warning
        }

        const newStudent = {
            id: Date.now().toString(),
            name: name,
            email: email,
            course_interest: course,
            status: status,
            createdAt: new Date().toISOString()
        };

        students.push(newStudent);
        saveStudents();
        
        // Reset form
        addStudentForm.reset();
        courseInterestChoices.setChoiceByValue('');
        studentStatusChoices.setChoiceByValue('New');
        
        // Show success toast
        toastMessage.textContent = 'Student added successfully!';
        toast.show();
    });

    // === View Students Logic ===
    function saveStudents() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    function renderStudentsTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterCourse.value;
        
        const filteredStudents = students.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchTerm) || 
                                  student.course_interest.toLowerCase().includes(searchTerm);
            const matchesFilter = filterValue === 'All' || student.course_interest === filterValue;
            
            return matchesSearch && matchesFilter;
        });

        studentsTableBody.innerHTML = '';
        
        if (filteredStudents.length === 0) {
            emptyState.classList.remove('d-none');
            document.querySelector('.table-responsive').classList.add('d-none');
        } else {
            emptyState.classList.add('d-none');
            document.querySelector('.table-responsive').classList.remove('d-none');
            
            filteredStudents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach(student => {
                const row = document.createElement('tr');
                
                // Determine badge class
                let badgeClass = '';
                if (student.status === 'New') badgeClass = 'status-new';
                else if (student.status === 'Contacted') badgeClass = 'status-contacted';
                else if (student.status === 'Enrolled') badgeClass = 'status-enrolled';
                
                row.innerHTML = `
                    <td class="ps-4">
                        <div class="d-flex align-items-center">
                            <div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 36px; height: 36px; font-weight: 600;">
                                ${student.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">${student.name}</h6>
                            </div>
                        </div>
                    </td>
                    <td><span class="text-muted">${student.email}</span></td>
                    <td><span class="fw-medium">${student.course_interest}</span></td>
                    <td><span class="badge-status ${badgeClass}">${student.status}</span></td>
                    <td class="pe-4 text-end">
                        <button class="btn btn-sm btn-light text-danger delete-btn" data-id="${student.id}" title="Delete">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                studentsTableBody.appendChild(row);
            });
            
            // Attach delete listeners
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    deleteStudent(id);
                });
            });
        }
    }

    function deleteStudent(id) {
        if(confirm('Are you sure you want to remove this student?')) {
            students = students.filter(s => s.id !== id);
            saveStudents();
            renderStudentsTable();
            
            toastMessage.textContent = 'Student removed.';
            toastMessage.parentElement.parentElement.classList.replace('bg-success', 'bg-dark');
            toast.show();
            setTimeout(() => {
                toastMessage.parentElement.parentElement.classList.replace('bg-dark', 'bg-success');
            }, 3000);
        }
    }

    // Search and Filter Listeners
    searchInput.addEventListener('input', renderStudentsTable);
    filterCourse.addEventListener('change', renderStudentsTable);
});
