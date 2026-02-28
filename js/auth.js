/**
 * auth.js — TaskFlow Client-Side Auth System
 * Uses browser localStorage to simulate user accounts and sessions.
 */

// ─── Storage Keys ───────────────────────────────────────────────────────────
const USERS_KEY = 'taskflow_users';
const SESSION_KEY = 'taskflow_session'; // holds the "token" (mock JWT payload)

// Bootstrap the users array if it doesn't exist yet
if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
}

// ─── Core Auth Helpers ───────────────────────────────────────────────────────

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

/** Returns the current logged-in user object, or null. */
function getLoggedInUser() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

/** Creates a client-side session (mock JWT) and stores it. */
function createSession(user) {
    const token = { email: user.email, name: user.name, issuedAt: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(token));
}

/** Destroys the current session and refreshes the navbar. */
function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    // Reset the navbar to show Login / Sign Up links again
    updateNavbar();
    // Also clear the task list view since it's user-specific
    const todoList = document.getElementById('todo-list');
    if (todoList) todoList.innerHTML = '';
    // Show a friendly empty state
    renderEmptyState && renderEmptyState();
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function updateNavbar() {
    const user = getLoggedInUser();
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    if (user) {
        navActions.innerHTML = `
            <span style="color:var(--text-secondary);font-size:.875rem;font-weight:500;margin-right:1rem;">
                Hi, ${user.name.split(' ')[0]}
            </span>
            <button id="nav-logout-btn" class="btn btn-ghost" style="color:#ef4444;">Log Out</button>
        `;
        document.getElementById('nav-logout-btn')
            .addEventListener('click', logoutUser);
    } else {
        navActions.innerHTML = `
            <button id="nav-login-btn"  class="btn btn-ghost"    onclick="openAuthModal('login')">Log In</button>
            <button id="nav-signup-btn" class="btn btn-primary"  onclick="openAuthModal('signup')">Sign Up</button>
        `;
    }
}

document.addEventListener('DOMContentLoaded', updateNavbar);

// ─── Auth Modal ──────────────────────────────────────────────────────────────

/**
 * Opens the auth modal. tab = 'login' | 'signup'
 * The modal HTML is injected once and reused.
 */
function openAuthModal(tab = 'login') {
    // Create the modal only if it doesn't exist
    if (!document.getElementById('auth-modal')) {
        _injectModal();
    }
    const modal = document.getElementById('auth-modal');
    modal.classList.add('open');
    switchTab(tab);
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        _clearErrors();
    }
}

function switchTab(tab) {
    document.getElementById('login-panel').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('signup-panel').style.display = tab === 'signup' ? 'flex' : 'none';
    document.getElementById('modal-tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('modal-tab-signup').classList.toggle('active', tab === 'signup');
}

function _clearErrors() {
    document.querySelectorAll('#auth-modal .error-msg')
        .forEach(el => el.textContent = '');
    document.querySelectorAll('#auth-modal .form-input')
        .forEach(el => el.classList.remove('error'));
}

function _injectModal() {
    const overlay = document.createElement('div');
    overlay.id = 'auth-modal';
    overlay.innerHTML = `
        <div class="auth-modal-backdrop" onclick="closeAuthModal()"></div>
        <div class="auth-modal-box">
            <!-- Close button -->
            <button class="auth-modal-close" onclick="closeAuthModal()" aria-label="Close">
                <span class="material-symbols-outlined">close</span>
            </button>

            <!-- Tabs -->
            <div class="auth-modal-tabs">
                <button id="modal-tab-login"  class="auth-tab active" onclick="switchTab('login')">Log In</button>
                <button id="modal-tab-signup" class="auth-tab"        onclick="switchTab('signup')">Sign Up</button>
            </div>

            <!-- ── Login Panel ── -->
            <div id="login-panel" class="auth-form" style="display:flex;flex-direction:column;gap:1rem;">
                <div class="form-group">
                    <label for="m-login-email">Email</label>
                    <input type="email" id="m-login-email" class="form-input" placeholder="you@example.com">
                    <span class="error-msg" id="m-login-email-err"></span>
                </div>
                <div class="form-group">
                    <label for="m-login-pass">Password</label>
                    <input type="password" id="m-login-pass" class="form-input" placeholder="••••••••">
                    <span class="error-msg" id="m-login-pass-err"></span>
                </div>
                <span class="error-msg main-error" id="m-login-main-err"></span>
                <button class="btn btn-primary btn-full" onclick="handleModalLogin()">Log In</button>
            </div>

            <!-- ── Sign Up Panel ── -->
            <div id="signup-panel" class="auth-form" style="display:none;flex-direction:column;gap:1rem;">
                <div class="form-group">
                    <label for="m-signup-name">Full Name</label>
                    <input type="text" id="m-signup-name" class="form-input" placeholder="Jane Doe">
                    <span class="error-msg" id="m-signup-name-err"></span>
                </div>
                <div class="form-group">
                    <label for="m-signup-email">Email</label>
                    <input type="email" id="m-signup-email" class="form-input" placeholder="you@example.com">
                    <span class="error-msg" id="m-signup-email-err"></span>
                </div>
                <div class="form-group">
                    <label for="m-signup-pass">Password</label>
                    <input type="password" id="m-signup-pass" class="form-input" placeholder="At least 6 characters">
                    <span class="error-msg" id="m-signup-pass-err"></span>
                </div>
                <div class="form-group">
                    <label for="m-signup-confirm">Confirm Password</label>
                    <input type="password" id="m-signup-confirm" class="form-input" placeholder="••••••••">
                    <span class="error-msg" id="m-signup-confirm-err"></span>
                </div>
                <span class="error-msg main-error" id="m-signup-main-err"></span>
                <button class="btn btn-primary btn-full" onclick="handleModalSignup()">Create Account</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

// ─── Modal Form Handlers ─────────────────────────────────────────────────────

function handleModalLogin() {
    _clearErrors();
    const email = document.getElementById('m-login-email').value.trim().toLowerCase();
    const password = document.getElementById('m-login-pass').value;
    let ok = true;

    if (!email) {
        _setErr('m-login-email-err', 'Email is required.');
        _flag('m-login-email');
        ok = false;
    }
    if (!password) {
        _setErr('m-login-pass-err', 'Password is required.');
        _flag('m-login-pass');
        ok = false;
    }
    if (!ok) return;

    const user = getUsers().find(u => u.email === email && u.password === password);
    if (!user) {
        _setErr('m-login-main-err', 'Invalid email or password.');
        return;
    }

    createSession(user);
    closeAuthModal();
    updateNavbar();
    // Trigger the app to reload the user's tasks
    if (typeof onAuthSuccess === 'function') onAuthSuccess();
}

function handleModalSignup() {
    _clearErrors();
    const name = document.getElementById('m-signup-name').value.trim();
    const email = document.getElementById('m-signup-email').value.trim().toLowerCase();
    const password = document.getElementById('m-signup-pass').value;
    const confirm = document.getElementById('m-signup-confirm').value;
    let ok = true;

    if (name.length < 2) {
        _setErr('m-signup-name-err', 'Name must be at least 2 characters.');
        _flag('m-signup-name');
        ok = false;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
        _setErr('m-signup-email-err', 'Enter a valid email address.');
        _flag('m-signup-email');
        ok = false;
    }
    if (password.length < 6) {
        _setErr('m-signup-pass-err', 'Password must be at least 6 characters.');
        _flag('m-signup-pass');
        ok = false;
    }
    if (password !== confirm) {
        _setErr('m-signup-confirm-err', 'Passwords do not match.');
        _flag('m-signup-confirm');
        ok = false;
    }
    if (!ok) return;

    const users = getUsers();
    if (users.some(u => u.email === email)) {
        _setErr('m-signup-main-err', 'An account with this email already exists.');
        return;
    }

    const newUser = { name, email, password }; // NOTE: never store plain-text passwords in production!
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    createSession(newUser);
    closeAuthModal();
    updateNavbar();
    if (typeof onAuthSuccess === 'function') onAuthSuccess();
}

// ─── Small DOM Helpers ───────────────────────────────────────────────────────
function _setErr(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}
function _flag(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('error');
}
