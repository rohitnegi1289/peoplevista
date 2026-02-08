const pageContent = document.getElementById('page-content');
const menuLinks = document.querySelectorAll('.menu a');

const pages = {
    dashboard: `
        <div class="card card-wide">
            <h3>Welcome back, Rohit 👋</h3>
            <p>You have <strong>2 pending actions</strong> today</p>
        </div>

        <div class="card">
            <h3>My Actions</h3>
            <p>Approve leave – Amit</p>
            <p>Upload PAN Card</p>
        </div>

        <div class="card">
            <h3>Attendance Summary</h3>
            <p>Clock In : 09:36 AM</p>
            <p>Working Hours : 5h 12m</p>
        </div>

        <div class="card">
            <h3>Leave Balance</h3>
            <p>PL : 36</p>
            <p>CL : 8</p>
            <p>SL : 12</p>
        </div>

        <div class="card">
            <h3>Quick Actions</h3>
            <p>Apply Leave</p>
            <p>Regularize Attendance</p>
            <p>Download Payslip</p>
        </div>
    `,
    attendance: `<div class="card"><h3>Attendance</h3><p>Attendance module test page</p></div>`,
    leave: `<div class="card"><h3>Leave</h3><p>Leave module test page</p></div>`,
    payroll: `<div class="card"><h3>Payroll</h3><p>Payroll module test page</p></div>`,
    recruitment: `<div class="card"><h3>Recruitment</h3><p>Recruitment module test page</p></div>`,
    profile: `<div class="card"><h3>Profile</h3><p>Profile module test page</p></div>`
};

function loadPage(page) {
    pageContent.innerHTML = pages[page];
    menuLinks.forEach(l => l.parentElement.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).parentElement.classList.add('active');
}

menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        loadPage(link.dataset.page);
    });
});

loadPage('dashboard');
