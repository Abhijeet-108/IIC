// Department data
const departments = [
    'Computer Science & Engineering',
    'Computer Science & Engineering - AIML',
    'Computer Science & Engineering - DATA SCIENCE',
    'Computer Science & Engineering - CYBER SECURITY',
    'Computer Science & BUSINESS SYSTEM',
    'Computer Science & Engineering - IOT',
    'INFORMATION TECHNOLOGY',
    'ELECTRONICS & COMMUNICATION ENGINEERING',
    'CIVIL ENGINEERING',
    'MECHANICAL ENGINEERING',
    'ELECTRICAL ENGINEERING',
    'ELECTRONICS & INSTRUMENTATION ENGINEERING',
    'Computer Applications',
    'FOOD TECHNOLOGY',
    'MEDIA SCIENCE',
    'Business Studies',
    'HOSPITAL ADMINISTRATION',
    'HOSPITALITY MANAGEMENT',
    'Basic Science & Humanities',
    'Master in Business Administration'
];

// Sample teacher data structure
// In a real application, this would come from a database
const teachersData = {
    'Computer Science & Engineering': [
        { id: 'cse1', name: 'Dr. Sudipta Chakrabarty', designation: 'Professor', dept: 'Computer Science & Engineering', photo: 'SC' },
        { id: 'cse2', name: 'Dr. John Smith', designation: 'Associate Professor', dept: 'Computer Science & Engineering', photo: 'JS' },
        { id: 'cse3', name: 'Dr. Jane Doe', designation: 'Assistant Professor', dept: 'Computer Science & Engineering', photo: 'JD' }
    ],
    'Computer Science & Engineering - AIML': [
        { id: 'aiml1', name: 'Dr. AI Expert', designation: 'Professor', dept: 'Computer Science & Engineering - AIML', photo: 'AE' }
    ],
    'Computer Science & Engineering - DATA SCIENCE': [
        { id: 'ds1', name: 'Dr. Data Scientist', designation: 'Associate Professor', dept: 'Computer Science & Engineering - DATA SCIENCE', photo: 'DS' }
    ],
    'Computer Science & Engineering - CYBER SECURITY': [
        { id: 'cs1', name: 'Dr. Security Expert', designation: 'Professor', dept: 'Computer Science & Engineering - CYBER SECURITY', photo: 'SE' }
    ],
    'Computer Science & BUSINESS SYSTEM': [
        { id: 'bs1', name: 'Dr. Business Analyst', designation: 'Associate Professor', dept: 'Computer Science & BUSINESS SYSTEM', photo: 'BA' }
    ],
    'Computer Science & Engineering - IOT': [
        { id: 'iot1', name: 'Dr. IoT Specialist', designation: 'Assistant Professor', dept: 'Computer Science & Engineering - IOT', photo: 'IS' }
    ],
    'INFORMATION TECHNOLOGY': [
        { id: 'it1', name: 'Dr. IT Professional', designation: 'Professor', dept: 'INFORMATION TECHNOLOGY', photo: 'IT' }
    ],
    'ELECTRONICS & COMMUNICATION ENGINEERING': [
        { id: 'ece1', name: 'Dr. ECE Expert', designation: 'Professor', dept: 'ELECTRONICS & COMMUNICATION ENGINEERING', photo: 'EE' }
    ],
    'CIVIL ENGINEERING': [
        { id: 'ce1', name: 'Dr. Civil Engineer', designation: 'Professor', dept: 'CIVIL ENGINEERING', photo: 'CE' }
    ],
    'MECHANICAL ENGINEERING': [
        { id: 'me1', name: 'Dr. Mechanical Expert', designation: 'Professor', dept: 'MECHANICAL ENGINEERING', photo: 'ME' }
    ],
    'ELECTRICAL ENGINEERING': [
        { id: 'ee1', name: 'Dr. Electrical Engineer', designation: 'Professor', dept: 'ELECTRICAL ENGINEERING', photo: 'EL' }
    ],
    'ELECTRONICS & INSTRUMENTATION ENGINEERING': [
        { id: 'eie1', name: 'Dr. Instrumentation Expert', designation: 'Associate Professor', dept: 'ELECTRONICS & INSTRUMENTATION ENGINEERING', photo: 'IE' }
    ],
    'Computer Applications': [
        { id: 'ca1', name: 'Dr. Application Developer', designation: 'Assistant Professor', dept: 'Computer Applications', photo: 'AD' }
    ],
    'FOOD TECHNOLOGY': [
        { id: 'ft1', name: 'Dr. Food Technologist', designation: 'Professor', dept: 'FOOD TECHNOLOGY', photo: 'FT' }
    ],
    'MEDIA SCIENCE': [
        { id: 'ms1', name: 'Dr. Media Expert', designation: 'Associate Professor', dept: 'MEDIA SCIENCE', photo: 'MS' }
    ],
    'Business Studies': [
        { id: 'bs2', name: 'Dr. Business Strategist', designation: 'Professor', dept: 'Business Studies', photo: 'BS' }
    ],
    'HOSPITAL ADMINISTRATION': [
        { id: 'ha1', name: 'Dr. Hospital Administrator', designation: 'Professor', dept: 'HOSPITAL ADMINISTRATION', photo: 'HA' }
    ],
    'HOSPITALITY MANAGEMENT': [
        { id: 'hm1', name: 'Dr. Hospitality Manager', designation: 'Associate Professor', dept: 'HOSPITALITY MANAGEMENT', photo: 'HM' }
    ],
    'Basic Science & Humanities': [
        { id: 'bsh1', name: 'Dr. Science Educator', designation: 'Professor', dept: 'Basic Science & Humanities', photo: 'SE' }
    ],
    'Master in Business Administration': [
        { id: 'mba1', name: 'Dr. MBA Director', designation: 'Professor', dept: 'Master in Business Administration', photo: 'MD' }
    ]
};

// Sample teacher details - in real app, this would come from database
const teacherDetails = {
    'cse1': {
        name: 'Dr. Sudipta Chakrabarty',
        dept: 'Computer Science & Engineering',
        designation: 'Professor',
        photo: 'SC',
        googleScholar: 'https://scholar.google.com/citations?user=example',
        orcid: '0000-0000-0000-0000',
        scopusId: '123456789',
        researcherId: 'R-1234-5678',
        vidwanPortal: 'https://vidwan.inflibnet.ac.in/profile/example',
        patents: [
            {
                number: 'US123456789',
                area: 'Machine Learning',
                domain: 'Artificial Intelligence',
                title: 'Novel Algorithm for Pattern Recognition',
                status: 'Granted',
                year: '2023'
            }
        ],
        copyrights: [
            {
                number: 'CR-2023-001',
                area: 'Software Development',
                domain: 'Web Applications',
                title: 'Educational Management System',
                status: 'Published',
                year: '2023'
            }
        ],
        journals: [
            {
                title: 'Advanced Machine Learning Techniques',
                authors: 'Dr. Sudipta Chakrabarty, Dr. John Smith',
                isbn: '978-0-123456-78-9',
                journalName: 'Journal of Computer Science',
                publisherName: 'IEEE Publications',
                issue: '5',
                no: '12',
                pageNo: '123-145',
                year: '2023',
                doi: 'https://doi.org/10.1234/example'
            }
        ],
        books: [
            {
                title: 'Introduction to Machine Learning',
                authors: 'Dr. Sudipta Chakrabarty',
                isbn: '978-0-987654-32-1',
                publisherName: 'Academic Press',
                year: '2022'
            }
        ],
        bookChapters: [
            {
                title: 'Deep Learning Fundamentals',
                authors: 'Dr. Sudipta Chakrabarty',
                isbn: '978-0-111111-11-1',
                chapterName: 'Neural Networks',
                publisherName: 'Tech Publishers',
                pageNo: '45-78',
                year: '2023',
                doi: 'https://doi.org/10.1234/chapter'
            }
        ],
        conferences: [
            {
                title: 'Recent Advances in AI',
                authors: 'Dr. Sudipta Chakrabarty, Dr. Jane Doe',
                issn: '1234-5678',
                journalName: 'International Conference on AI',
                publisherName: 'ACM',
                issue: '3',
                no: '10',
                pageNo: '234-250',
                year: '2023',
                doi: 'https://doi.org/10.1234/conference'
            }
        ]
    }
};

// Initialize departments page
function initDepartments() {
    const grid = document.getElementById('departmentsGrid');
    grid.innerHTML = '';
    
    departments.forEach(dept => {
        const card = document.createElement('div');
        card.className = 'department-card';
        card.onclick = () => showTeachers(dept);
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-graduation-cap';
        
        const title = document.createElement('h3');
        title.textContent = dept;
        
        card.appendChild(icon);
        card.appendChild(title);
        grid.appendChild(card);
    });
}

// Show teachers for a department
function showTeachers(deptName) {
    document.getElementById('departmentsPage').classList.remove('active');
    document.getElementById('teachersPage').classList.add('active');
    
    document.getElementById('currentDeptName').textContent = deptName;
    document.getElementById('teachersPageTitle').textContent = deptName;
    
    const grid = document.getElementById('teachersGrid');
    grid.innerHTML = '';
    
    // Ensure there is visible dummy data for teachers
    const baseTeachers = teachersData[deptName] || [];
    const finalTeachers = [...baseTeachers];

    // Create deterministic dummy placeholders up to at least 6 entries
    const designations = ['Professor', 'Associate Professor', 'Assistant Professor'];
    const initials = ['AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ'];
    let index = 0;
    while (finalTeachers.length < 6) {
        const dummyId = `${deptName.replace(/[^a-z0-9]/gi, '').toLowerCase()}_dummy_${index + 1}`;
        finalTeachers.push({
            id: dummyId,
            name: `Dr. Faculty ${String.fromCharCode(65 + (index % 26))}`,
            designation: designations[index % designations.length],
            dept: deptName,
            photo: initials[index % initials.length]
        });
        index++;
    }
    
    finalTeachers.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.onclick = () => showTeacherDetails(teacher);
        
        const photo = document.createElement('div');
        photo.className = 'teacher-photo';
        photo.textContent = teacher.photo;
        
        const name = document.createElement('h4');
        name.textContent = teacher.name;
        
        const designation = document.createElement('p');
        designation.textContent = teacher.designation;
        
        card.appendChild(photo);
        card.appendChild(name);
        card.appendChild(designation);
        grid.appendChild(card);
    });
}

// Show departments page
function showDepartments() {
    document.getElementById('teachersPage').classList.remove('active');
    document.getElementById('departmentsPage').classList.add('active');
}

// Show teacher details page
function showTeacherDetails(teacherOrId) {
    const isObj = typeof teacherOrId === 'object' && teacherOrId !== null;
    const teacherId = isObj ? teacherOrId.id : teacherOrId;

    // Persist lightweight metadata for fallback rendering on details page
    if (isObj) {
        const meta = {
            id: teacherOrId.id,
            name: teacherOrId.name,
            dept: teacherOrId.dept,
            designation: teacherOrId.designation,
            photo: teacherOrId.photo
        };
        try {
            sessionStorage.setItem('selectedTeacherMeta', JSON.stringify(meta));
        } catch (_) {}
    }
    // Store teacher ID in sessionStorage
    sessionStorage.setItem('selectedTeacherId', teacherId);
    // Navigate to teacher details page
    window.location.href = 'rd-teacher.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDepartments();
});

