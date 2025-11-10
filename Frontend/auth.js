// Basic shared auth interactions and validation

function showMessage(el, type, text) {
    el.className = 'form-message ' + type;
    el.textContent = text;
    el.style.display = 'block';
    setTimeout(() => {
        el.style.display = 'none';
        el.className = 'form-message';
    }, 5000);
}

function initLogin() {
    const form = document.getElementById('loginForm');
    const msg = document.getElementById('loginMessage');
    const forgot = document.getElementById('forgotPasswordLink');
    if (!form || !msg) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(msg, 'error', 'Please enter a valid email address.');
            return;
        }
        if (!password) {
            showMessage(msg, 'error', 'Please enter your password.');
            return;
        }

        // Simulate successful login
        showMessage(msg, 'success', 'Login successful. Redirecting...');
        console.log('Login submitted:', { email });
        setTimeout(() => {
            window.location.href = 'iic-homepage.html';
        }, 800);
    });

    if (forgot) {
        forgot.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            if (!email) {
                showMessage(msg, 'error', 'Enter your email above, then click Forgot password.');
                return;
            }
            showMessage(msg, 'success', 'If this email is registered, a reset link has been sent.');
            console.log('Password reset requested for:', email);
        });
    }
}

function initSignup() {
    const form = document.getElementById('signupForm');
    const msg = document.getElementById('signupMessage');
    if (!form || !msg) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const collegeId = document.getElementById('collegeId').value.trim();
        const role = document.getElementById('role').value;
        const department = document.getElementById('department').value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(msg, 'error', 'Please enter a valid email address.');
            return;
        }
        if (!firstName || !lastName || !collegeId || !role || !department) {
            showMessage(msg, 'error', 'Please fill in all required fields.');
            return;
        }

        // Simulate account creation
        showMessage(msg, 'success', 'Account created successfully. You can now log in.');
        console.log('Signup submitted:', { email, firstName, lastName, collegeId, role, department });
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    });
}


