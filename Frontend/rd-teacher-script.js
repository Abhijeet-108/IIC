// Teacher details data (same as in rd-script.js)
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

// Load teacher details
function loadTeacherDetails() {
    const teacherId = sessionStorage.getItem('selectedTeacherId');
    const content = document.getElementById('teacherDetailsContent');
    
    // Try to read full details; otherwise build a fallback from stored meta
    let teacher = teacherId ? teacherDetails[teacherId] : null;
    if (!teacher) {
        let meta = null;
        try {
            meta = JSON.parse(sessionStorage.getItem('selectedTeacherMeta') || 'null');
        } catch (_) { meta = null; }

        if (!meta) {
            content.innerHTML = '<div class="empty-message"><h2>Teacher details not found</h2><p>Please go back and select a teacher.</p></div>';
            return;
        }

        // Construct a placeholder details object using metadata
        teacher = {
            name: meta.name || 'Dr. Faculty',
            dept: meta.dept || 'Department',
            designation: meta.designation || 'Faculty',
            photo: meta.photo || 'DF',
            googleScholar: 'https://scholar.google.com/',
            orcid: '0000-0000-0000-0000',
            scopusId: 'N/A',
            researcherId: 'N/A',
            vidwanPortal: 'https://vidwan.inflibnet.ac.in/',
            patents: [
                {
                    number: 'APP-XXXX-YYYY',
                    area: 'Example Area',
                    domain: 'Example Domain',
                    title: 'Example Patent Title',
                    status: 'Published',
                    year: new Date().getFullYear().toString()
                }
            ],
            copyrights: [
                {
                    number: 'CR-XXXX-YYYY',
                    area: 'Example Area',
                    domain: 'Example Domain',
                    title: 'Example Copyright Title',
                    status: 'Published',
                    year: new Date().getFullYear().toString()
                }
            ],
            journals: [
                {
                    title: 'Sample Manuscript Title',
                    authors: `${meta.name || 'Dr. Faculty'}, Co-authors`,
                    isbn: '978-1-23456-789-0',
                    journalName: 'Sample Journal',
                    publisherName: 'Sample Publisher',
                    issue: '1',
                    no: '1',
                    pageNo: '1-10',
                    year: new Date().getFullYear().toString(),
                    doi: 'https://doi.org/10.0000/sample'
                }
            ],
            books: [
                {
                    title: 'Sample Book Title',
                    authors: meta.name || 'Dr. Faculty',
                    isbn: '978-0-00000-000-0',
                    publisherName: 'Sample Publisher',
                    year: (new Date().getFullYear() - 1).toString()
                }
            ],
            bookChapters: [
                {
                    title: 'Sample Book Title',
                    authors: meta.name || 'Dr. Faculty',
                    isbn: '978-0-11111-111-1',
                    chapterName: 'Sample Chapter Name',
                    publisherName: 'Sample Publisher',
                    pageNo: '11-25',
                    year: new Date().getFullYear().toString(),
                    doi: 'https://doi.org/10.0000/chapter'
                }
            ],
            conferences: [
                {
                    title: 'Sample Conference Paper',
                    authors: `${meta.name || 'Dr. Faculty'}, Co-authors`,
                    issn: '0000-0000',
                    journalName: 'Sample Conference',
                    publisherName: 'Sample Org',
                    issue: '1',
                    no: '1',
                    pageNo: '21-30',
                    year: new Date().getFullYear().toString(),
                    doi: 'https://doi.org/10.0000/conference'
                }
            ]
        };
    }
    let html = '';
    
    // Teacher Header
    html += `
        <div class="teacher-header">
            <div class="teacher-photo-large">${teacher.photo}</div>
            <div class="teacher-info">
                <h1>${teacher.name}</h1>
                <div class="designation">${teacher.designation}</div>
                <div class="department">${teacher.dept}</div>
            </div>
        </div>
    `;
    
    // Research Links Section
    html += `
        <div class="details-section">
            <h2><i class="fas fa-link"></i> Research Links</h2>
            <div class="field-group">
                <label>Google Scholar Link</label>
                <div class="value"><a href="${teacher.googleScholar || '#'}" target="_blank">${teacher.googleScholar || 'Not available'}</a></div>
            </div>
            <div class="field-group">
                <label>ORCID</label>
                <div class="value">${teacher.orcid || 'Not available'}</div>
            </div>
            <div class="field-group">
                <label>Scopus ID</label>
                <div class="value">${teacher.scopusId || 'Not available'}</div>
            </div>
            <div class="field-group">
                <label>Researcher's ID</label>
                <div class="value">${teacher.researcherId || 'Not available'}</div>
            </div>
            <div class="field-group">
                <label>Vidwan Portal Link</label>
                <div class="value"><a href="${teacher.vidwanPortal || '#'}" target="_blank">${teacher.vidwanPortal || 'Not available'}</a></div>
            </div>
        </div>
    `;
    
    // Patents Section
    html += `
        <div class="details-section">
            <h2><i class="fas fa-certificate"></i> Patents Details</h2>
    `;
    if (teacher.patents && teacher.patents.length > 0) {
        html += '<div class="items-list">';
        teacher.patents.forEach(patent => {
            html += `
                <div class="item-card">
                    <div class="item-field">
                        <div class="item-label">Patent Number/Application Number</div>
                        <div class="item-value">${patent.number || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Area</div>
                        <div class="item-value">${patent.area || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Domain</div>
                        <div class="item-value">${patent.domain || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Title</div>
                        <div class="item-value">${patent.title || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Status</div>
                        <div class="item-value">${patent.status || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Year</div>
                        <div class="item-value">${patent.year || 'Not available'}</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else {
        html += '<div class="empty-message">No patents available</div>';
    }
    html += '</div>';
    
    // Copyrights Section
    html += `
        <div class="details-section">
            <h2><i class="fas fa-copyright"></i> Copyrights</h2>
    `;
    if (teacher.copyrights && teacher.copyrights.length > 0) {
        html += '<div class="items-list">';
        teacher.copyrights.forEach(copyright => {
            html += `
                <div class="item-card">
                    <div class="item-field">
                        <div class="item-label">Copyright Number/Application Number</div>
                        <div class="item-value">${copyright.number || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Area</div>
                        <div class="item-value">${copyright.area || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Domain</div>
                        <div class="item-value">${copyright.domain || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Title</div>
                        <div class="item-value">${copyright.title || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Status</div>
                        <div class="item-value">${copyright.status || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Year</div>
                        <div class="item-value">${copyright.year || 'Not available'}</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else {
        html += '<div class="empty-message">No copyrights available</div>';
    }
    html += '</div>';
    
    // Journal Details Section
    html += `
        <div class="details-section">
            <h2><i class="fas fa-book"></i> Journal Details</h2>
    `;
    if (teacher.journals && teacher.journals.length > 0) {
        html += '<div class="items-list">';
        teacher.journals.forEach(journal => {
            html += `
                <div class="item-card">
                    <div class="item-field">
                        <div class="item-label">Title of the Manuscript</div>
                        <div class="item-value">${journal.title || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Authors Details</div>
                        <div class="item-value">${journal.authors || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">ISBN</div>
                        <div class="item-value">${journal.isbn || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Journal Name</div>
                        <div class="item-value">${journal.journalName || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Publisher Name</div>
                        <div class="item-value">${journal.publisherName || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Issue</div>
                        <div class="item-value">${journal.issue || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">No</div>
                        <div class="item-value">${journal.no || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Page No</div>
                        <div class="item-value">${journal.pageNo || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Year</div>
                        <div class="item-value">${journal.year || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">DOI/Link</div>
                        <div class="item-value"><a href="${journal.doi || '#'}" target="_blank">${journal.doi || 'Not available'}</a></div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else {
        html += '<div class="empty-message">No journal publications available</div>';
    }
    html += '</div>';
    
    // Book Details Section
    html += `
        <div class="details-section">
            <h2><i class="fas fa-book-open"></i> Book Details</h2>
    `;
    if (teacher.books && teacher.books.length > 0) {
        html += '<div class="items-list">';
        teacher.books.forEach(book => {
            html += `
                <div class="item-card">
                    <div class="item-field">
                        <div class="item-label">Title of the Book</div>
                        <div class="item-value">${book.title || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Authors Details</div>
                        <div class="item-value">${book.authors || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">ISBN</div>
                        <div class="item-value">${book.isbn || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Publisher Name</div>
                        <div class="item-value">${book.publisherName || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Year</div>
                        <div class="item-value">${book.year || 'Not available'}</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else {
        html += '<div class="empty-message">No books available</div>';
    }
    html += '</div>';
    
    // Book Chapters Section
    html += `
        <div class="details-section">
            <h2><i class="fas fa-bookmark"></i> Book Chapters Details</h2>
    `;
    if (teacher.bookChapters && teacher.bookChapters.length > 0) {
        html += '<div class="items-list">';
        teacher.bookChapters.forEach(chapter => {
            html += `
                <div class="item-card">
                    <div class="item-field">
                        <div class="item-label">Title of the Book Chapter</div>
                        <div class="item-value">${chapter.title || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Authors Details</div>
                        <div class="item-value">${chapter.authors || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">ISBN</div>
                        <div class="item-value">${chapter.isbn || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Name of the Chapter</div>
                        <div class="item-value">${chapter.chapterName || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Publisher Name</div>
                        <div class="item-value">${chapter.publisherName || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Page No</div>
                        <div class="item-value">${chapter.pageNo || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Year</div>
                        <div class="item-value">${chapter.year || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">DOI/Link</div>
                        <div class="item-value"><a href="${chapter.doi || '#'}" target="_blank">${chapter.doi || 'Not available'}</a></div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else {
        html += '<div class="empty-message">No book chapters available</div>';
    }
    html += '</div>';
    
    // Conference Details Section
    html += `
        <div class="details-section">
            <h2><i class="fas fa-users"></i> Conference Details</h2>
    `;
    if (teacher.conferences && teacher.conferences.length > 0) {
        html += '<div class="items-list">';
        teacher.conferences.forEach(conference => {
            html += `
                <div class="item-card">
                    <div class="item-field">
                        <div class="item-label">Title of the Paper</div>
                        <div class="item-value">${conference.title || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Authors Details</div>
                        <div class="item-value">${conference.authors || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">ISSN</div>
                        <div class="item-value">${conference.issn || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Journal Name</div>
                        <div class="item-value">${conference.journalName || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Publisher Name</div>
                        <div class="item-value">${conference.publisherName || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Issue</div>
                        <div class="item-value">${conference.issue || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">No</div>
                        <div class="item-value">${conference.no || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Page No</div>
                        <div class="item-value">${conference.pageNo || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">Year</div>
                        <div class="item-value">${conference.year || 'Not available'}</div>
                    </div>
                    <div class="item-field">
                        <div class="item-label">DOI/Link</div>
                        <div class="item-value"><a href="${conference.doi || '#'}" target="_blank">${conference.doi || 'Not available'}</a></div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else {
        html += '<div class="empty-message">No conference publications available</div>';
    }
    html += '</div>';
    
    content.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTeacherDetails();
});

