// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Handle Enter key press in form
document.getElementById('loginForm').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('loginBtn').click();
    }
});

// Login button handler
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!username || !password) {
        alert('Please enter both Employee Code and Password');
        return;
    }
    
    // TODO: Add actual authentication logic here
    // For now, just redirect to dashboard
    
    // Since login.html is in /pages folder and index.html is also in /pages folder:
    window.location.href = './index.html';
    
    // If you add real authentication later, you might do:
    /*
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.location.href = './index.html';
        } else {
            alert('Invalid credentials');
        }
    })
    .catch(err => {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
    });
    */
});