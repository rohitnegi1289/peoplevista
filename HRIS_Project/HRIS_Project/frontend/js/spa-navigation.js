// SPA Navigation System
const pageContent = document.getElementById('page-content');
const menuItems = document.querySelectorAll('.sidebar .menu li');

// Page content templates
const pages = {
    dashboard: `
        <div class="card card-wide">
            <h3>Welcome back, Rohit 👋</h3>
                <p>You have <strong>2 pending actions</strong> today</p>
        </div>
        
        <!-- Attendance Calendar Panel -->
        <div id="attendance-calendar"></div>
        
        <div class="card">
            <h3>My Actions</h3>

            <div class="card-scroll">
                <p>Approve leave – Amit</p>
                <p>Upload PAN Card</p>
               
            </div>

            <div class="card-footer">
            </div>
        </div>

        <div class="card">
            <h3>Today's Attendance</h3>
            <p>Clock In : 09:36 AM</p>
            <p>Clock Out : 06:15 PM</p>
            <p>Total Hours : 8 hrs 39 mins</p>
        </div>
        <div class="card">
            <h3>Leave Balance</h3>
            <p>Privilege Leave: 36</p>
            <p>Casual Leave: 8</p>
            <p>Sick Leave: 12</p>
        </div>
        <div class="card">
            <h3>Payroll</h3>
            <p>Last Salary: ₹ 40,505 /-</p>
        </div>
    `,

    recruitment: `
        <div class="card">
            <h3>Open Positions</h3>
            <p>No positions created yet.</p>
        </div>
        <div class="card">
            <h3>Candidates</h3>
            <p>Candidate tracking coming soon.</p>
        </div>
        <div class="card">
            <h3>Interview Pipeline</h3>
            <p>Pipeline setup pending.</p>
        </div>
    `,

    attendance: `
        <div class="card">
            <h3>Attendance</h3>
            <p>Attendance page content</p>
        </div>
    `,

    leave: `
        <div class="card">
            <h3>Leave Management</h3>
            <p>Leave page content</p>
        </div>
    `,

    payroll: `
        <div class="card">
            <h3>Payroll</h3>
            <p>Payroll page content</p>
        </div>
    `,

    profile: `
        <div class="card">
            <h3>Profile</h3>
            <p>Profile page content</p>
        </div>
    `
};

// Load page content
function loadPage(pageName) {
    if (pages[pageName]) {
        pageContent.innerHTML = pages[pageName];

        // Update active menu item
        menuItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`[data-page="${pageName}"]`).parentElement;
        activeItem.classList.add('active');

        // Update page title
        document.title = `PeopleVista | ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;

        // 👇 ADD THIS (dashboard-only hook)
        if (pageName === "dashboard") {
            renderAttendanceCalendar();
        }
    }
}


// Handle menu clicks
document.querySelectorAll('.sidebar .menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        loadPage(page);
    });
});

// Load dashboard on initial load
loadPage('dashboard');

// Logout functionality
const logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', () => {
    // Clear session data (if using localStorage/sessionStorage)
    localStorage.clear();
    sessionStorage.clear();

    // Optional: redirect to login page
    window.location.href = '    login.html';

    console.log('User logged out successfully');
});


// Attendance Calendar Rendering

function renderAttendanceCalendar() {
    const container = document.getElementById("attendance-calendar");
    if (!container) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Hardcoded now, API later
    const attendanceData = {
        "2026-01-01": "P",
        "2026-01-02": "A",
        "2026-01-03": "P",
        "2026-01-05": "A"
    };

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const monthName = today.toLocaleString("default", { month: "long" });

    let html = `
        <div class="attendance-panel">
            <div class="attendance-header">
                <h3>${monthName}</h3>
            </div>

            <div class="calendar-grid">
                ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
                    .map(d => `<div class="calendar-day">${d}</div>`)
                    .join("")}
    `;

    for (let i = 0; i < firstDay; i++) {
        html += `<div></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
        const dateKey = `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
        let statusClass = "future";

        if (attendanceData[dateKey] === "P") statusClass = "present";
        if (attendanceData[dateKey] === "A") statusClass = "absent";

        html += `<div class="calendar-date ${statusClass}">${d}</div>`;
    }

    html += `
            </div>

            <div class="attendance-legend">
                <div class="legend-item">
                    <span class="legend-dot legend-present"></span> Present
                </div>
                <div class="legend-item">
                    <span class="legend-dot legend-absent"></span> Absent
                </div>
                <div class="legend-item">
                    <span class="legend-dot legend-future"></span> Upcoming
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}
