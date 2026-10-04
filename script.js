
// ==========================================
// PLACEMENT PREPARATION TRACKER
// HTML + CSS + VANILLA JAVASCRIPT
// ==========================================

// ---------- STORAGE HELPERS ----------

const DB = {
    get(key, fallback = []) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value ?? fallback;
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const COMPANIES = [
    "Amazon", "TCS", "Infosys",
    "Deloitte", "Accenture", "Wipro"
];

const $ = id => document.getElementById(id);

const makeId = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

let currentPage = "dashboard";
let pendingDestination = "dashboard";
let selectedTags = [];
let toastTimer;

// ---------- INITIAL SAMPLE DATA ----------

function initializeData() {
    if (!localStorage.getItem("ppt_stories")) {
        const samples = [
            {
                id: "s1", name: "Rahul Sharma", branch: "CSE",
                cgpa: "8.7", graduation: "2026",
                status: "Placed", company: "Amazon",
                role: "Software Development Engineer",
                package: "18", reason: "",
                skills: ["Python", "DSA", "SQL", "OOP"],
                rounds: [
                    {name:"Aptitude", description:"Quantitative aptitude, logical reasoning and verbal ability."},
                    {name:"Coding", description:"Two array and string-based coding problems."},
                    {name:"Technical", description:"Data structures, OOP concepts, DBMS and project discussion."},
                    {name:"HR", description:"Questions about teamwork, strengths and career goals."}
                ],
                aptitude: "Percentages, probability, time and work, logical reasoning.",
                coding: "Array rotation, string reversal and searching problems.",
                resume: "One-page resume with two Python projects and internship details.",
                resumeTips: "Keep project descriptions measurable and mention technologies used.",
                timeline: "Started in second year. Practised DSA regularly using free online resources.",
                mistakes: "Initially ignored communication practice and timed coding practice.",
                advice: "Build strong fundamentals and practise coding consistently. Start early instead of waiting for final year.",
                difficulty: "Hard", helpful: 12, date: "2026-08-15"
            },
            {
                id: "s2", name: "Priya Reddy", branch: "IT",
                cgpa: "9.1", graduation: "2026",
                status: "Placed", company: "TCS",
                role: "Assistant System Engineer",
                package: "7", reason: "",
                skills: ["Java", "SQL", "Communication", "OOP"],
                rounds: [
                    {name:"Aptitude", description:"Numerical ability, verbal ability and reasoning."},
                    {name:"Coding", description:"Basic Java programs and output-based questions."},
                    {name:"Technical", description:"Java fundamentals, SQL joins and project explanation."},
                    {name:"HR", description:"Introduction, relocation and career-related questions."}
                ],
                aptitude: "Number systems, percentages, ratios and verbal reasoning.",
                coding: "Palindrome, prime number and basic array programs.",
                resume: "Highlighted Java skills, academic projects and certifications.",
                resumeTips: "Keep the resume simple and proofread it carefully.",
                timeline: "Started in third year and followed a daily practice schedule.",
                mistakes: "Did not revise SQL enough before the technical round.",
                advice: "Focus on fundamentals, communication and mock interviews.",
                difficulty: "Medium", helpful: 18, date: "2026-08-20"
            },
            {
                id: "s3", name: "Arjun Kumar", branch: "ECE",
                cgpa: "8.3", graduation: "2026",
                status: "Placed", company: "Infosys",
                role: "Systems Engineer",
                package: "6.5", reason: "",
                skills: ["Python", "SQL", "Problem Solving"],
                rounds: [
                    {name:"Aptitude", description:"Logical reasoning, quantitative aptitude and English."},
                    {name:"Coding", description:"Basic Python programming and pattern problems."},
                    {name:"Technical", description:"Python, DBMS, networking basics and project questions."},
                    {name:"HR", description:"Personal introduction and career interests."}
                ],
                aptitude: "Logical reasoning, averages, ratios and time and distance.",
                coding: "Number reversal, sorting and pattern printing.",
                resume: "Included two academic projects and programming skills.",
                resumeTips: "Be ready to explain everything mentioned in your resume.",
                timeline: "Started preparation during second year.",
                mistakes: "Spent less time on aptitude initially.",
                advice: "Practise all sections instead of focusing on only one subject.",
                difficulty: "Medium", helpful: 9, date: "2026-08-25"
            },
            {
                id: "s4", name: "Sneha Patel", branch: "CSE",
                cgpa: "8.5", graduation: "2026",
                status: "Unplaced", company: "Deloitte",
                role: "Analyst", package: "",
                reason: "Needed more consistent coding practice and stronger technical explanations.",
                skills: ["Python", "SQL", "HTML"],
                rounds: [
                    {name:"Aptitude", description:"Quantitative and logical reasoning."},
                    {name:"Coding", description:"Two basic programming problems."},
                    {name:"Technical", description:"Questions about DBMS and academic projects."},
                    {name:"HR", description:"Communication and situational questions."}
                ],
                aptitude: "Percentages, ratios, reasoning and data interpretation.",
                coding: "String manipulation and basic array questions.",
                resume: "Academic projects, Python and SQL skills.",
                resumeTips: "Include only skills and projects you can explain confidently.",
                timeline: "Started seriously in third year.",
                mistakes: "Started preparation late and did not practise mock interviews.",
                advice: "Use your time wisely. Regular practice and revision can improve your confidence.",
                difficulty: "Medium", helpful: 14, date: "2026-08-28"
            },
            {
                id: "s5", name: "Kiran Rao", branch: "EEE",
                cgpa: "7.9", graduation: "2026",
                status: "Unplaced", company: "Accenture",
                role: "Associate", package: "",
                reason: "Could improve aptitude speed and confidence during technical discussions.",
                skills: ["C", "Python", "Communication"],
                rounds: [
                    {name:"Aptitude", description:"Numerical ability and logical reasoning."},
                    {name:"Coding", description:"Basic C and Python programming."},
                    {name:"Technical", description:"Programming fundamentals and project discussion."},
                    {name:"HR", description:"Teamwork and situational questions."}
                ],
                aptitude: "Time and work, averages and number series.",
                coding: "Prime number and palindrome programs.",
                resume: "Academic projects and basic programming knowledge.",
                resumeTips: "Add practical project details and relevant skills.",
                timeline: "Started in third year.",
                mistakes: "Did not practise enough timed aptitude tests.",
                advice: "Do not lose confidence. Identify your weak areas and work on them.",
                difficulty: "Easy", helpful: 7, date: "2026-09-02"
            },
            {
                id: "s6", name: "Divya Nair", branch: "CSE",
                cgpa: "8.0", graduation: "2026",
                status: "Unplaced", company: "Wipro",
                role: "Project Engineer", package: "",
                reason: "Needed stronger DSA fundamentals and more practice explaining projects.",
                skills: ["Java", "SQL", "DBMS"],
                rounds: [
                    {name:"Aptitude", description:"Verbal and quantitative aptitude."},
                    {name:"Coding", description:"Basic Java programming questions."},
                    {name:"Technical", description:"OOP, SQL and project explanation."},
                    {name:"HR", description:"Communication and career goals."}
                ],
                aptitude: "Ratios, probability and verbal ability.",
                coding: "Arrays, strings and loops.",
                resume: "Java academic project and database knowledge.",
                resumeTips: "Show what you personally contributed to a project.",
                timeline: "Started in second year but preparation was irregular.",
                mistakes: "Inconsistent practice and insufficient revision.",
                advice: "Make a timetable, practise every day and learn from every interview.",
                difficulty: "Medium", helpful: 11, date: "2026-09-05"
            }
        ];

        DB.set("ppt_stories", samples);
    }

    if (!localStorage.getItem("ppt_accounts")) {
        DB.set("ppt_accounts", []);
    }

    if (!localStorage.getItem("ppt_helpful")) {
        DB.set("ppt_helpful", []);
    }
}

function getStories() {
    return DB.get("ppt_stories", []);
}

function getAccounts() {
    return DB.get("ppt_accounts", []);
}

function getCurrentUser() {
    const id = localStorage.getItem("ppt_current");
    return getAccounts().find(a => a.id === id) || null;
}

function saveStory(story) {
    const stories = getStories();
    stories.unshift(story);
    DB.set("ppt_stories", stories);
}

initializeData();

// ---------- COMMON HELPERS ----------

function initials(name = "User") {
    return name.split(" ")
        .filter(Boolean)
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function formatDate(date) {
    if (!date) return "";
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric"
    });
}

function stats() {
    const stories = getStories();
    const placed = stories.filter(s => s.status === "Placed");
    const unplaced = stories.filter(s => s.status === "Unplaced");

    return [
        ["Total Stories", stories.length],
        ["Placed Seniors", placed.length],
        ["Unplaced Seniors", unplaced.length],
        ["Lessons from Placed Seniors", placed.length],
        ["Lessons from Unplaced Seniors", unplaced.length],
        ["Companies Covered", 6]
    ];
}

function statCards(className = "") {
    return `<div class="${className}">
        ${stats().map(([label, value]) => `
            <div class="stat-card">
                <div class="stat-number counter" data-target="${value}">0</div>
                <div class="stat-label">${label}</div>
            </div>
        `).join("")}
    </div>`;
}

function animateCounters() {
    document.querySelectorAll(".counter").forEach(counter => {
        const target = Number(counter.dataset.target);
        const start = performance.now();
        const duration = 700;

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            counter.textContent = Math.round(target * progress);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    });
}

function pageHeader(title, subtitle) {
    return `<div class="page-heading">
        <h1>${title}</h1>
        <p>${subtitle}</p>
    </div>`;
}

function tagList(tags = []) {
    return tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("");
}

// ---------- LANDING PAGE ----------

function renderLanding() {
    $("homeStats").innerHTML = statCards("stats-grid");
    $("companyStrip").innerHTML = COMPANIES.map(company =>
        `<div class="company-card">${company}</div>`
    ).join("");
    animateCounters();
}

function backToLanding() {
    $("authScreen").classList.add("hidden");
    $("landing").classList.remove("hidden");
    $("app").classList.add("hidden");
    renderLanding();
}

// ---------- AUTHENTICATION ----------

function showAuth(mode = "login", destination = "dashboard") {
    pendingDestination = destination;
    $("landing").classList.add("hidden");
    $("app").classList.add("hidden");
    $("authScreen").classList.remove("hidden");
    renderAuth(mode);
}

function renderAuth(mode = "login") {
    const isSignup = mode === "signup";

    $("authContent").innerHTML = `
        <h2>${isSignup ? "Create an account" : "Welcome back"}</h2>
        <p class="auth-subtitle">
            ${isSignup ? "Join the placement preparation community." : "Login to continue your journey."}
        </p>

        <form id="authForm" novalidate>
            ${isSignup ? `
                <div class="form-group">
                    <label>Full Name</label>
                    <input class="form-control" id="fullName" placeholder="Enter your full name">
                    <div class="form-error" id="nameError"></div>
                </div>
            ` : ""}

            <div class="form-group">
                <label>Email Address</label>
                <input class="form-control" id="email" type="email" placeholder="name@example.com">
                <div class="form-error" id="emailError"></div>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input class="form-control" id="password" type="password" placeholder="Minimum 6 characters">
                <div class="form-error" id="passwordError"></div>
            </div>

            ${isSignup ? `
                <div class="form-group">
                    <label>Role</label>
                    <select class="form-control" id="role" onchange="updateSignupFields()">
                        <option value="">Select your role</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
                <div id="roleFields"></div>
                <div class="form-error" id="roleError"></div>
            ` : ""}

            <div class="form-error" id="generalError"></div>

            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:12px">
                ${isSignup ? "Create Account" : "Login"}
            </button>
        </form>

        <div class="auth-switch">
            ${isSignup ? "Already have an account?" : "New to the platform?"}
            <button class="text-button" onclick="renderAuth('${isSignup ? "login" : "signup"}')">
                ${isSignup ? "Login" : "Create account"}
            </button>
        </div>
    `;

    $("authForm").addEventListener("submit", handleAuth);
}

function updateSignupFields() {
    const role = $("role").value;
    const container = $("roleFields");

    if (role === "Junior") {
        container.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>Current Year</label>
                    <select class="form-control" id="year">
                        <option value="">Select year</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Branch</label>
                    <select class="form-control" id="branch">
                        <option value="">Select branch</option>
                        <option>CSE</option><option>CSM</option>
                        <option>IT</option><option>ECE</option>
                        <option>EEE</option><option>Mechanical</option>
                        <option>Civil</option><option>Other</option>
                    </select>
                </div>
            </div>
        `;
    } else if (role === "Senior") {
        container.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>Branch</label>
                    <input class="form-control" id="branch" placeholder="e.g. CSE">
                </div>
                <div class="form-group">
                    <label>CGPA</label>
                    <input class="form-control" id="cgpa" type="number" min="0" max="10" step=".01" placeholder="e.g. 8.5">
                </div>
                <div class="form-group">
                    <label>Graduation Year</label>
                    <input class="form-control" id="graduation" type="number" min="2000" max="2100" placeholder="2026">
                </div>
                <div class="form-group">
                    <label>Placement Status</label>
                    <select class="form-control" id="status">
                        <option value="">Select status</option>
                        <option>Placed</option>
                        <option>Unplaced</option>
                    </select>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = "";
    }
}

function handleAuth(event) {
    event.preventDefault();

    const isSignup = Boolean($("fullName"));
    const email = $("email").value.trim().toLowerCase();
    const password = $("password").value;
    const accounts = getAccounts();

    document.querySelectorAll(".form-error").forEach(e => e.textContent = "");

    let valid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $("emailError").textContent = "Enter a valid email address.";
        valid = false;
    }

    if (password.length < 6) {
        $("passwordError").textContent = "Password must contain at least 6 characters.";
        valid = false;
    }

    if (!isSignup) {
        if (!valid) return;

        const user = accounts.find(a => a.email === email && a.password === password);

        if (!user) {
            $("generalError").textContent = "Incorrect email or password.";
            return;
        }

        loginUser(user);
        return;
    }

    const name = $("fullName").value.trim();
    const role = $("role").value;
    const branch = $("branch")?.value.trim() || "";
    const year = $("year")?.value || "";
    const cgpa = $("cgpa")?.value || "";
    const graduation = $("graduation")?.value || "";
    const status = $("status")?.value || "";

    if (!name) {
        $("nameError").textContent = "Please enter your full name.";
        valid = false;
    }

    if (accounts.some(a => a.email === email)) {
        $("emailError").textContent = "This email is already registered. Please login.";
        valid = false;
    }

    if (!role) {
        $("roleError").textContent = "Please select your role.";
        valid = false;
    }

    if (role === "Junior" && (!year || !branch)) {
        $("roleError").textContent = "Please select your year and branch.";
        valid = false;
    }

    if (role === "Senior") {
        if (!branch || !cgpa || !graduation || !status) {
            $("roleError").textContent = "Please complete all senior details.";
            valid = false;
        }

        if (cgpa && (Number(cgpa) < 0 || Number(cgpa) > 10)) {
            $("roleError").textContent = "CGPA must be between 0 and 10.";
            valid = false;
        }

        if (graduation && (Number(graduation) < 2000 || Number(graduation) > 2100)) {
            $("roleError").textContent = "Enter a valid graduation year.";
            valid = false;
        }
    }

    if (!valid) return;

    const user = {
        id: makeId(), name, email, password, role, branch,
        year, cgpa, graduation, status,
        createdAt: new Date().toISOString()
    };

    accounts.push(user);
    DB.set("ppt_accounts", accounts);

    showToast("Account created successfully!");
    loginUser(user);
}

// CORRECTED LOGIN NAVIGATION

function loginUser(user) {
    localStorage.setItem("ppt_current", user.id);

    $("authScreen").classList.add("hidden");
    $("landing").classList.add("hidden");
    $("app").classList.remove("hidden");

    updateTopbar();

    // Explore Stories should open Placed Seniors.
    if (pendingDestination === "stories") {
        pendingDestination = "placed";
    }

    // Only seniors can open the Share Experience form.
    if (pendingDestination === "share" && user.role !== "Senior") {
        pendingDestination = "dashboard";
        navigate("dashboard");
        showToast("Only senior accounts can share experiences.");
        return;
    }

    navigate(pendingDestination);
}

function logout() {
    localStorage.removeItem("ppt_current");
    $("profileDropdown").classList.add("hidden");
    $("sidebar").classList.remove("open");
    backToLanding();
    showToast("You have logged out.");
}

// ---------- PROFILE AND ACCOUNT SWITCHING ----------

function updateTopbar() {
    const user = getCurrentUser();
    if (!user) return;

    $("topName").textContent = user.name;
    $("topRole").textContent = user.role;
    $("topAvatar").textContent = initials(user.name);

    document.querySelectorAll(".senior-only").forEach(el => {
        el.classList.toggle("hidden", user.role !== "Senior");
    });
}

function toggleProfileMenu() {
    $("profileDropdown").classList.toggle("hidden");
}

function showAccountSwitcher() {
    toggleProfileMenu();

    const accounts = getAccounts();
    const current = getCurrentUser();

    openModal(`
        <h2>Switch Account</h2>
        <p class="muted">Choose an account saved on this browser.</p>
        <div class="modal-section">
            ${accounts.map(a => `
                <button class="story-mini" style="width:100%;background:none;border:0;color:var(--text);text-align:left;cursor:pointer"
                    onclick="switchAccount('${a.id}')">
                    <div class="avatar">${initials(a.name)}</div>
                    <div>
                        <strong>${escapeHTML(a.name)}</strong>
                        <small>${escapeHTML(a.email)} · ${escapeHTML(a.role)}</small>
                        ${a.id === current?.id ? '<span class="badge">Current account</span>' : ""}
                    </div>
                </button>
            `).join("")}
        </div>
        <button class="btn btn-outline" onclick="closeModal();showAuth('signup')" style="margin-top:15px">
            + Add another account
        </button>
    `);
}

function switchAccount(id) {
    const account = getAccounts().find(a => a.id === id);
    if (!account) return;
    closeModal();
    loginUser(account);
    showToast("Account switched.");
}

// ---------- NAVIGATION ----------

function navigate(page) {
    const user = getCurrentUser();

    if (!user) {
        showAuth("login");
        return;
    }

    if (page === "share" && user.role !== "Senior") {
        showToast("Share Experience is available for seniors only.");
        return;
    }

    currentPage = page;

    $("profileDropdown").classList.add("hidden");
    $("sidebar").classList.remove("open");

    document.querySelectorAll(".nav-item[data-page]").forEach(item => {
        item.classList.toggle("active", item.dataset.page === page);
    });

    renderPage();
}

function toggleSidebar() {
    $("sidebar").classList.toggle("open");
}

function renderPage() {
    const pages = {
        dashboard: renderDashboard,
        placed: renderPlaced,
        unplaced: renderUnplaced,
        interviews: renderInterviews,
        resume: renderResume,
        share: renderShareForm,
        profile: renderProfile
    };

    $("pageContent").innerHTML = "";
    pages[currentPage]?.();
    animateCounters();
}

// ---------- DASHBOARD ----------

function renderDashboard() {
    const user = getCurrentUser();
    const stories = getStories();

    const juniorTips = {
        "1st Year": [
            "Learn programming fundamentals in C or Python.",
            "Improve communication and problem-solving.",
            "Explore different technology domains."
        ],
        "2nd Year": [
            "Practise data structures and algorithms.",
            "Learn DBMS, OOP and SQL fundamentals.",
            "Build small academic and personal projects."
        ],
        "3rd Year": [
            "Practise aptitude and coding regularly.",
            "Prepare your resume and practise interviews.",
            "Explore internships and company requirements."
        ]
    };

    $("pageContent").innerHTML = `
        ${pageHeader(`Welcome, ${escapeHTML(user.name)}! 👋`,
            "Track your progress and discover real placement experiences.")}

        ${statCards("dashboard-stats")}

        <div class="dashboard-grid">
            <section class="panel">
                <h3>Recently Shared Stories</h3>
                ${stories.slice(0, 4).map(s => `
                    <div class="story-mini">
                        <div class="avatar">${initials(s.name)}</div>
                        <div style="flex:1">
                            <strong>${escapeHTML(s.name)}</strong>
                            <small>${escapeHTML(s.company)} · ${escapeHTML(s.status)}</small>
                        </div>
                        <button class="text-button" onclick="viewStory('${s.id}')">View</button>
                    </div>
                `).join("")}
            </section>

            <section class="panel">
                ${user.role === "Junior" ? `
                    <h3>Suggested Starting Steps</h3>
                    <p class="muted">${escapeHTML(user.year)} preparation roadmap</p>
                    ${(juniorTips[user.year] || juniorTips["1st Year"]).map((tip, i) => `
                        <div class="round-row">
                            <strong>Step ${i + 1}</strong>
                            <p>${tip}</p>
                        </div>
                    `).join("")}
                ` : `
                    <h3>Your Contribution</h3>
                    <p class="muted">Help juniors prepare by sharing your experience.</p>
                    <p style="margin:20px 0">Your real interview journey could help another student prepare better.</p>
                    <button class="btn btn-primary" onclick="navigate('share')">Share Your Experience</button>
                `}
            </section>
        </div>
    `;
}

// ---------- SENIOR CARDS ----------

function seniorCard(story, placed) {
    return `
        <article class="senior-card">
            <div class="card-top">
                <div class="avatar">${initials(story.name)}</div>
                <div>
                    <h3>${escapeHTML(story.name)}</h3>
                    <small>${escapeHTML(story.branch)} · Class of ${escapeHTML(story.graduation)}</small>
                </div>
            </div>

            <span class="badge ${placed ? "" : "unplaced"}">
                ${placed ? "Placed" : "Unplaced"}
            </span>

            ${placed ? `
                <div class="card-details">
                    <div><span class="detail-label">Company</span><span class="detail-value">${escapeHTML(story.company)}</span></div>
                    <div><span class="detail-label">Package</span><span class="detail-value">${escapeHTML(story.package || "Not specified")} ${story.package ? "LPA" : ""}</span></div>
                    <div><span class="detail-label">CGPA</span><span class="detail-value">${escapeHTML(story.cgpa)}</span></div>
                    <div><span class="detail-label">Role</span><span class="detail-value">${escapeHTML(story.role || "Not specified")}</span></div>
                </div>
                <div>${tagList(story.skills.slice(0, 4))}</div>
                <button class="card-button" onclick="viewStory('${story.id}')">View Story →</button>
            ` : `
                <div class="card-reason">
                    <strong>Main learning:</strong><br>
                    ${escapeHTML(story.reason || story.mistakes || "More preparation and practice can help.")}
                </div>
                <div class="card-details">
                    <div><span class="detail-label">Company</span><span class="detail-value">${escapeHTML(story.company)}</span></div>
                    <div><span class="detail-label">CGPA</span><span class="detail-value">${escapeHTML(story.cgpa)}</span></div>
                </div>
                <button class="card-button" onclick="viewStory('${story.id}')">Lessons Learned →</button>
            `}
        </article>
    `;
}

function renderPlaced() {
    const stories = getStories().filter(s => s.status === "Placed");

    $("pageContent").innerHTML = `
        ${pageHeader("Placed Seniors", "Learn from students who have successfully secured placements.")}

        <div class="toolbar">
            <input class="form-control" id="seniorSearch" placeholder="Search by name or role..." oninput="filterSeniors('placed')">
            <select class="form-control" id="companyFilter" onchange="filterSeniors('placed')">
                <option value="">All Companies</option>
                ${COMPANIES.map(c => `<option>${c}</option>`).join("")}
                <option>Other</option>
            </select>
            <select class="form-control" id="branchFilter" onchange="filterSeniors('placed')">
                <option value="">All Branches</option>
                ${[...new Set(stories.map(s => s.branch))].map(b => `<option>${escapeHTML(b)}</option>`).join("")}
            </select>
        </div>
        <div class="card-grid" id="seniorGrid">
            ${stories.map(s => seniorCard(s, true)).join("") || emptyState("No placed stories yet.")}
        </div>
    `;
}

function renderUnplaced() {
    const stories = getStories().filter(s => s.status === "Unplaced");

    $("pageContent").innerHTML = `
        ${pageHeader("Unplaced Seniors", "Every interview is a learning opportunity. Explore experiences and lessons from seniors.")}

        <div class="toolbar">
            <input class="form-control" id="seniorSearch" placeholder="Search by name..." oninput="filterSeniors('unplaced')">
            <select class="form-control" id="companyFilter" onchange="filterSeniors('unplaced')">
                <option value="">All Companies</option>
                ${COMPANIES.map(c => `<option>${c}</option>`).join("")}
                <option>Other</option>
            </select>
            <select class="form-control" id="branchFilter" onchange="filterSeniors('unplaced')">
                <option value="">All Branches</option>
                ${[...new Set(stories.map(s => s.branch))].map(b => `<option>${escapeHTML(b)}</option>`).join("")}
            </select>
        </div>

        <div class="card-grid" id="seniorGrid">
            ${stories.map(s => seniorCard(s, false)).join("") || emptyState("No unplaced stories yet.")}
        </div>
    `;
}

function filterSeniors(type) {
    const search = $("seniorSearch").value.toLowerCase();
    const company = $("companyFilter").value;
    const branch = $("branchFilter").value;

    const placed = type === "placed";

    const results = getStories().filter(s =>
        s.status === (placed ? "Placed" : "Unplaced") &&
        (s.name + " " + s.role).toLowerCase().includes(search) &&
        (!company || s.company === company) &&
        (!branch || s.branch === branch)
    );

    $("seniorGrid").innerHTML =
        results.map(s => seniorCard(s, placed)).join("") ||
        emptyState("No matching stories found.");
}

function emptyState(message) {
    return `<div class="empty-state">
        <h3>No stories found</h3>
        <p>${escapeHTML(message)}</p>
    </div>`;
}

// ---------- SENIOR PROFILE / STORY MODAL ----------

function viewStory(id) {
    const story = getStories().find(s => s.id === id);
    if (!story) return;

    openModal(`
        <div class="profile-large">
            <div class="avatar">${initials(story.name)}</div>
            <div>
                <h2>${escapeHTML(story.name)}</h2>
                <p class="muted">${escapeHTML(story.branch)} · CGPA ${escapeHTML(story.cgpa)} · ${escapeHTML(story.graduation)}</p>
                <span class="badge ${story.status === "Unplaced" ? "unplaced" : ""}">
                    ${escapeHTML(story.status)}
                </span>
            </div>
        </div>

        <div class="modal-section">
            <h3>Placement Details</h3>
            <p>Company: ${escapeHTML(story.company)}</p>
            <p>Role: ${escapeHTML(story.role || "Not specified")}</p>
            <p>Package: ${story.package ? escapeHTML(story.package) + " LPA" : "Not specified"}</p>
        </div>

        <div class="modal-section">
            <h3>Skills</h3>
            ${tagList(story.skills)}
        </div>

        <div class="modal-section">
            <h3>Interview Rounds</h3>
            ${story.rounds.map((r, i) => `
                <div class="round-row">
                    <strong>Round ${i + 1}: ${escapeHTML(r.name)}</strong>
                    <p>${escapeHTML(r.description)}</p>
                </div>
            `).join("")}
        </div>

        <div class="modal-section">
            <h3>Aptitude Topics Asked</h3>
            <p>${escapeHTML(story.aptitude)}</p>
        </div>

        <div class="modal-section">
            <h3>Coding Questions</h3>
            <p>${escapeHTML(story.coding)}</p>
        </div>

        <div class="modal-section">
            <h3>Resume Summary and Tips</h3>
            <p>${escapeHTML(story.resume)}</p>
            <p style="margin-top:8px">${escapeHTML(story.resumeTips)}</p>
        </div>

        <div class="modal-section">
            <h3>Preparation Timeline</h3>
            <p>${escapeHTML(story.timeline)}</p>
        </div>

        <div class="modal-section">
            <h3>Mistakes and Lessons</h3>
            <p>${escapeHTML(story.mistakes)}</p>
        </div>

        <div class="modal-section">
            <h3>Advice for Juniors</h3>
            <p>${escapeHTML(story.advice)}</p>
        </div>
    `);
}

// ---------- INTERVIEW EXPERIENCES ----------

function renderInterviews() {
    $("pageContent").innerHTML = `
        ${pageHeader("Interview Experiences", "Explore company-wise interview rounds, difficulty and preparation tips.")}

        <div class="toolbar">
            <select class="form-control" id="interviewFilter" onchange="filterInterviews()">
                <option value="">All Companies</option>
                ${COMPANIES.map(c => `<option>${c}</option>`).join("")}
                <option>Other</option>
            </select>
        </div>

        <div id="interviewList"></div>
    `;
    filterInterviews();
}

function filterInterviews() {
    const company = $("interviewFilter").value;
    const stories = getStories().filter(s =>
        !company || s.company === company
    );

    $("interviewList").innerHTML = stories.map(s => `
        <div class="panel">
            <div class="card-top">
                <div class="avatar">${initials(s.name)}</div>
                <div style="flex:1">
                    <h3>${escapeHTML(s.company)} · ${escapeHTML(s.role || "Interview Experience")}</h3>
                    <small class="muted">${escapeHTML(s.name)} · ${escapeHTML(s.branch)}</small>
                </div>
                <span class="badge">${escapeHTML(s.difficulty)}</span>
            </div>

            ${s.rounds.map((r, i) => `
                <div class="round-row">
                    <strong>Round ${i + 1}: ${escapeHTML(r.name)}</strong>
                    <p>${escapeHTML(r.description)}</p>
                </div>
            `).join("")}

            <p class="muted" style="margin-top:12px">
                <strong>Preparation tip:</strong> ${escapeHTML(s.advice)}
            </p>

            <button class="helpful-button" onclick="markHelpful('${s.id}')">
                Helpful · <span id="help-${s.id}">${Number(s.helpful) || 0}</span>
            </button>
            <button class="helpful-button" onclick="viewStory('${s.id}')">Full Story</button>
        </div>
    `).join("") || emptyState("No interview experiences available for this company.");
}

function markHelpful(id) {
    const user = getCurrentUser();
    const key = user.id + "_" + id;
    const votes = DB.get("ppt_helpful", []);

    if (votes.includes(key)) {
        showToast("You have already marked this story helpful.");
        return;
    }

    const stories = getStories();
    const story = stories.find(s => s.id === id);

    if (!story) return;

    story.helpful = (Number(story.helpful) || 0) + 1;
    votes.push(key);

    DB.set("ppt_stories", stories);
    DB.set("ppt_helpful", votes);

    const count = $("help-" + id);
    if (count) count.textContent = story.helpful;

    showToast("Thank you for your feedback!");
}

// ---------- RESUME PLANNING ----------

function renderResume() {
    const companySkills = {
        Amazon: ["DSA", "Problem Solving", "OOP", "System Design basics"],
        TCS: ["Java", "Python", "SQL", "Aptitude"],
        Infosys: ["Programming", "DBMS", "Communication", "Problem Solving"],
        Deloitte: ["Analytical Skills", "SQL", "Communication", "Projects"],
        Accenture: ["Coding", "Aptitude", "Cloud Basics", "Communication"],
        Wipro: ["Java", "C", "Python", "DBMS"]
    };

    $("pageContent").innerHTML = `
        ${pageHeader("Resume Planning", "Build your skills and prepare a clear, professional resume.")}

        <section class="panel">
            <h3>Company-wise Skills to Prepare</h3>
            <div class="card-grid">
                ${Object.entries(companySkills).map(([company, skills]) => `
                    <div class="senior-card">
                        <h3>${company}</h3>
                        <p class="muted">Suggested preparation areas</p>
                        <div style="margin-top:12px">${tagList(skills)}</div>
                    </div>
                `).join("")}
            </div>
            <p class="muted" style="margin-top:15px">
                These are general preparation suggestions, not official or guaranteed hiring requirements.
                Always check the latest job description for each role.
            </p>
        </section>

        <section class="panel">
            <h3>Year-wise Preparation Roadmap</h3>
            <div class="roadmap">
                <div class="roadmap-item">
                    <h4>1st Year</h4>
                    <ul>
                        <li>Learn programming basics.</li>
                        <li>Explore technology fields.</li>
                        <li>Improve communication.</li>
                        <li>Understand basic mathematics.</li>
                    </ul>
                </div>
                <div class="roadmap-item">
                    <h4>2nd Year</h4>
                    <ul>
                        <li>Learn DSA fundamentals.</li>
                        <li>Study DBMS and OOP.</li>
                        <li>Build small projects.</li>
                        <li>Practise basic aptitude.</li>
                    </ul>
                </div>
                <div class="roadmap-item">
                    <h4>3rd Year</h4>
                    <ul>
                        <li>Practise coding problems.</li>
                        <li>Prepare a resume.</li>
                        <li>Apply for internships.</li>
                        <li>Attend mock interviews.</li>
                    </ul>
                </div>
                <div class="roadmap-item">
                    <h4>4th Year</h4>
                    <ul>
                        <li>Revise technical subjects.</li>
                        <li>Practise company tests.</li>
                        <li>Prepare HR questions.</li>
                        <li>Apply and attend interviews.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="panel">
            <h3>Resume Preparation Checklist</h3>
            <p class="muted">Tick each item as you complete it. Use the print button to save a copy.</p>
            <div class="checklist" id="resumeChecklist">
                ${[
                    "Add your full name and contact details.",
                    "Write a short professional summary.",
                    "Mention your educational qualifications.",
                    "Include relevant technical skills.",
                    "Add academic or personal projects.",
                    "Describe your contribution to each project.",
                    "Add internships and certifications if applicable.",
                    "Check grammar and spelling.",
                    "Keep the resume clear and concise.",
                    "Save the final resume as a PDF."
                ].map((item, i) => `
                    <label><input type="checkbox" class="resume-check" data-index="${i}"> ${item}</label>
                `).join("")}
            </div>
            <button class="btn btn-primary" onclick="window.print()">Print / Save Checklist</button>
        </section>
    `;
}

// ---------- SHARE EXPERIENCE FORM ----------

function renderShareForm() {
    const user = getCurrentUser();

    if (!user || user.role !== "Senior") {
        navigate("dashboard");
        return;
    }

    $("pageContent").innerHTML = `
        ${pageHeader("Share Your Experience", "Your placement journey can help another student prepare better.")}

        <form id="shareForm" class="panel" novalidate>
            <div id="shareSuccess"></div>

            <div class="form-section">
                <h3>01 · Personal Information</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Name</label>
                        <input class="form-control" value="${escapeHTML(user.name)}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Branch</label>
                        <input class="form-control" value="${escapeHTML(user.branch)}" disabled>
                    </div>
                    <div class="form-group">
                        <label>CGPA</label>
                        <input class="form-control" value="${escapeHTML(user.cgpa)}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Graduation Year</label>
                        <input class="form-control" value="${escapeHTML(user.graduation)}" disabled>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3>02 · Placement Details</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Placement Status</label>
                        <select class="form-control" id="shareStatus">
                            <option>Placed</option>
                            <option>Unplaced</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Company</label>
                        <select class="form-control" id="shareCompany" onchange="toggleOtherCompany()">
                            ${COMPANIES.map(c => `<option>${c}</option>`).join("")}
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group hidden" id="otherCompanyGroup">
                        <label>Other Company Name</label>
                        <input class="form-control" id="otherCompany">
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <input class="form-control" id="shareRole" placeholder="Job role">
                    </div>
                    <div class="form-group">
                        <label>Package (LPA)</label>
                        <input class="form-control" id="sharePackage" type="number" min="0" step=".1" placeholder="e.g. 8">
                    </div>
                    <div class="form-group">
                        <label>Number of Interview Rounds</label>
                        <select class="form-control" id="roundCount" onchange="renderRoundInputs()">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4" selected>4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3>03 · Interview Round Details</h3>
                <div id="roundInputs"></div>
            </div>

            <div class="form-section">
                <h3>04 · Technical Preparation</h3>
                <div class="form-group">
                    <label>Aptitude Topics Asked</label>
                    <textarea class="form-control" id="shareAptitude" placeholder="Mention aptitude topics..."></textarea>
                </div>
                <div class="form-group">
                    <label>Coding Questions Asked</label>
                    <textarea class="form-control" id="shareCoding" placeholder="Mention coding questions..."></textarea>
                </div>
                <div class="form-group">
                    <label>Skills That Helped You</label>
                    <div class="tag-input-wrap">
                        <input class="form-control" id="skillInput" placeholder="Enter a skill and click Add">
                        <button type="button" class="btn btn-outline" onclick="addSkill()">Add</button>
                    </div>
                    <div id="skillTags" style="margin-top:10px"></div>
                </div>
            </div>

            <div class="form-section">
                <h3>05 · Resume Information</h3>
                <div class="form-group">
                    <label>Resume File (optional)</label>
                    <input class="form-control" type="file" id="resumeFile" accept=".pdf,.doc,.docx">
                    <small class="muted">Only the file name is saved. The file itself is not uploaded.</small>
                </div>
                <div class="form-group">
                    <label>Resume Summary</label>
                    <textarea class="form-control" id="shareResume" placeholder="Describe the important points in your resume..."></textarea>
                </div>
                <div class="form-group">
                    <label>Resume Tips</label>
                    <textarea class="form-control" id="shareResumeTips" placeholder="What should juniors remember while preparing a resume?"></textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>06 · Preparation Journey</h3>
                <div class="form-group">
                    <label>When Did You Start Preparing?</label>
                    <input class="form-control" id="shareTimeline" placeholder="e.g. Started in second year">
                </div>
                <div class="form-group">
                    <label>Resources Used</label>
                    <textarea class="form-control" id="shareResources" placeholder="Mention books, websites, courses or practice platforms..."></textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>07 · Lessons and Advice</h3>
                <div class="form-group">
                    <label>Mistakes Made</label>
                    <textarea class="form-control" id="shareMistakes" placeholder="What would you do differently?"></textarea>
                </div>
                <div class="form-group">
                    <label>Lessons for Juniors</label>
                    <textarea class="form-control" id="shareAdvice" placeholder="Share practical advice for juniors..."></textarea>
                </div>
                <div class="form-group">
                    <label>Difficulty</label>
                    <select class="form-control" id="shareDifficulty">
                        <option>Easy</option>
                        <option selected>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
            </div>

            <div class="form-error" id="shareError"></div>
            <button type="submit" class="btn btn-primary">Submit Experience →</button>
        </form>
    `;

    selectedTags = [];
    renderRoundInputs();
    $("shareForm").addEventListener("submit", submitExperience);
}

function toggleOtherCompany() {
    $("otherCompanyGroup").classList.toggle(
        "hidden", $("shareCompany").value !== "Other"
    );
}

function renderRoundInputs() {
    const count = Number($("roundCount").value);
    const names = ["Aptitude", "Coding", "Technical", "HR", "Additional Round"];

    $("roundInputs").innerHTML = Array.from({length: count}, (_, i) => `
        <div class="form-group">
            <label>Round ${i + 1}: ${names[i] || "Additional Round"}</label>
            <textarea class="form-control round-description" data-name="${names[i] || "Additional Round"}"
                placeholder="Describe the questions and experience in this round..."></textarea>
        </div>
    `).join("");
}

function addSkill() {
    const input = $("skillInput");
    const value = input.value.trim();

    if (!value) return;
    if (selectedTags.some(t => t.toLowerCase() === value.toLowerCase())) {
        showToast("Skill already added.");
        return;
    }

    selectedTags.push(value);
    input.value = "";

    $("skillTags").innerHTML = selectedTags.map((tag, i) => `
        <span class="tag">${escapeHTML(tag)}
            <button type="button" onclick="removeSkill(${i})"
                style="background:none;border:0;color:inherit;margin-left:5px">×</button>
        </span>
    `).join("");
}

function removeSkill(index) {
    selectedTags.splice(index, 1);
    $("skillTags").innerHTML = selectedTags.map((tag, i) => `
        <span class="tag">${escapeHTML(tag)}
            <button type="button" onclick="removeSkill(${i})"
                style="background:none;border:0;color:inherit;margin-left:5px">×</button>
        </span>
    `).join("");
}

function submitExperience(event) {
    event.preventDefault();

    const user = getCurrentUser();
    const status = $("shareStatus").value;
    const company = $("shareCompany").value === "Other"
        ? $("otherCompany").value.trim()
        : $("shareCompany").value;

    const role = $("shareRole").value.trim();
    const packageValue = $("sharePackage").value;

    const rounds = [...document.querySelectorAll(".round-description")].map(el => ({
        name: el.dataset.name,
        description: el.value.trim()
    }));

    const error = $("shareError");
    error.textContent = "";

    if (!company) {
        error.textContent = "Please enter a company name.";
        return;
    }

    if (!rounds.length || rounds.some(r => !r.description)) {
        error.textContent = "Please describe every interview round.";
        return;
    }

    if (!role || !$("shareAptitude").value.trim() ||
        !$("shareCoding").value.trim() || !selectedTags.length ||
        !$("shareAdvice").value.trim() || !$("shareTimeline").value.trim()) {
        error.textContent = "Please complete the required placement, technical and advice fields.";
        return;
    }

    if (status === "Placed" && (!packageValue || Number(packageValue) <= 0)) {
        error.textContent = "Please enter a valid package for placed status.";
        return;
    }

    if (packageValue && Number(packageValue) < 0) {
        error.textContent = "Package cannot be negative.";
        return;
    }

    const file = $("resumeFile").files[0];

    const story = {
        id: makeId(),
        name: user.name,
        branch: user.branch,
        cgpa: user.cgpa,
        graduation: user.graduation,
        status,
        company,
        role,
        package: status === "Placed" ? packageValue : "",
        reason: status === "Unplaced" ? $("shareMistakes").value.trim() : "",
        rounds,
        skills: [...selectedTags],
        aptitude: $("shareAptitude").value.trim(),
        coding: $("shareCoding").value.trim(),
        resume: $("shareResume").value.trim() || "Not provided",
        resumeFileName: file ? file.name : "",
        resumeTips: $("shareResumeTips").value.trim(),
        timeline: $("shareTimeline").value.trim() +
            ". Resources: " + $("shareResources").value.trim(),
        mistakes: $("shareMistakes").value.trim(),
        advice: $("shareAdvice").value.trim(),
        difficulty: $("shareDifficulty").value,
        helpful: 0,
        date: new Date().toISOString().slice(0, 10)
    };

    saveStory(story);

    $("shareSuccess").innerHTML = `
        <div class="success-message">
            ✓ Your experience has been shared successfully!
            It is now available in the placement stories.
        </div>
    `;

    $("shareForm").reset();
    selectedTags = [];
    showToast("Experience published successfully!");

    setTimeout(() => {
        navigate(status === "Placed" ? "placed" : "unplaced");
    }, 1200);
}

// ---------- MY PROFILE ----------

function renderProfile() {
    const user = getCurrentUser();
    const myStories = getStories().filter(s => s.name === user.name);

    $("pageContent").innerHTML = `
        ${pageHeader("My Profile", "Manage your account and view your information.")}

        <section class="panel">
            <div class="profile-large">
                <div class="avatar">${initials(user.name)}</div>
                <div>
                    <h2>${escapeHTML(user.name)}</h2>
                    <p class="muted">${escapeHTML(user.email)}</p>
                    <span class="badge">${escapeHTML(user.role)}</span>
                </div>
            </div>

            <div class="card-details">
                <div><span class="detail-label">Branch</span><span class="detail-value">${escapeHTML(user.branch || "Not specified")}</span></div>
                <div><span class="detail-label">Role</span><span class="detail-value">${escapeHTML(user.role)}</span></div>
                ${user.role === "Junior" ? `
                    <div><span class="detail-label">Year</span><span class="detail-value">${escapeHTML(user.year)}</span></div>
                ` : `
                    <div><span class="detail-label">CGPA</span><span class="detail-value">${escapeHTML(user.cgpa)}</span></div>
                    <div><span class="detail-label">Graduation Year</span><span class="detail-value">${escapeHTML(user.graduation)}</span></div>
                    <div><span class="detail-label">Placement Status</span><span class="detail-value">${escapeHTML(user.status)}</span></div>
                `}
            </div>

            <button class="btn btn-outline" onclick="showAccountSwitcher()">Switch Account</button>
        </section>

        <section class="panel">
            <h3>My Shared Experiences</h3>
            ${user.role === "Senior" ? `
                <p class="muted">Stories you have shared on this account.</p>
                ${myStories.length ? myStories.map(s => `
                    <div class="story-mini">
                        <div class="avatar">${initials(s.company)}</div>
                        <div style="flex:1">
                            <strong>${escapeHTML(s.company)}</strong>
                            <small>${escapeHTML(s.status)} · ${formatDate(s.date)}</small>
                        </div>
                        <button class="text-button" onclick="viewStory('${s.id}')">View</button>
                    </div>
                `).join("") : '<p class="muted">You have not shared any stories yet.</p>'}
            ` : `
                <p class="muted">You are using a Junior account. Explore senior experiences to plan your preparation.</p>
            `}
        </section>
    `;
}

// ---------- MODAL HELPERS ----------

function openModal(content) {
    $("modalContent").innerHTML = content;
    $("modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    $("modal").classList.add("hidden");
    document.body.style.overflow = "";
}

// ---------- APP STARTUP ----------

function startApp() {
    const user = getCurrentUser();

    if (user) {
        $("landing").classList.add("hidden");
        $("authScreen").classList.add("hidden");
        $("app").classList.remove("hidden");

        updateTopbar();
        navigate("dashboard");
    } else {
        $("landing").classList.remove("hidden");
        $("authScreen").classList.add("hidden");
        $("app").classList.add("hidden");

        renderLanding();
    }
}

// Close dropdown when clicking outside.
document.addEventListener("click", event => {
    const wrap = document.querySelector(".profile-menu-wrap");

    if (wrap && !wrap.contains(event.target)) {
        $("profileDropdown").classList.add("hidden");
    }
});

// Start the website.
startApp();