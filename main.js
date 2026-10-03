/**
 * COMPUTER SCIENCE LEARNING PLATFORM
 * Core Engine: Bilingual (Khmer & English), Particle Canvas, 3D Tilt, Theme, Search, Progress, Visualizers
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTheme();
  initLanguage();
  initNavigation();
  initSearch();
  initProgress();
  initTabs();
  initAccordions();
  initCodeCopy();
  initScrollTop();
  initCardTilt();
  SoundFX.initUI();
  initCyberLab();
  initVisualizers();
  initMatrixRain();
  initLiveCodeSandbox();
  initTuringCyberBot();
  initCursorSparks();
  initSmoothPageTransitions();
  initButtonRipples();
});

/* ==========================================================================
   1. FLOATING CYBER PARTICLES BACKGROUND CANVAS
   ========================================================================== */
function initParticles() {
  let canvas = document.getElementById('particles-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particleCount = Math.min(width > 768 ? 48 : 22, 60);
  const particles = [];
  const maxDistance = 140;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, '
    });
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();

      // Connect adjacent nodes
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / maxDistance) * 0.22;
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Mouse proximity interaction
      if (mouse.x !== null) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - mdist / 120) * 0.35})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. BILINGUAL TRANSLATION ENGINE (Khmer & English)
   ========================================================================== */
const CS_I18N = {
  en: {
    nav_home: "Home",
    nav_curriculum: "Core Curriculum ▾",
    nav_foundations: "⚡ Foundations & Logic",
    nav_ds: "📦 Data Structures",
    nav_algo: "⚙️ Algorithms & Visualizer",
    nav_prog: "💻 Programming & Memory",
    nav_os: "🖥️ Operating Systems",
    nav_net: "🌐 Computer Networking",
    nav_db: "🗄️ Databases & SQL",
    nav_specs: "Specializations",
    nav_res: "Resources",
    nav_dash: "Dashboard",
    nav_about: "About",
    nav_contact: "Contact",
    search_placeholder: "Search algorithms, data structures, systems, SQL...",
    hero_badge: "🚀 Open-Access University-Grade CS Curriculum",
    hero_title: "Empower Your Mind with",
    hero_title_accent: "Computer Science",
    hero_sub: "From discrete mathematics and low-level memory architectures to distributed consensus and neural networks. Learn with live visualizers, real code environments, and interactive knowledge checks.",
    hero_btn_start: "Start Learning Track →",
    hero_btn_demo: "⚡ Try Algorithm Visualizer",
    stat_tracks: "Core Disciplines",
    stat_topics: "Interactive Topics",
    stat_free: "Free & Open Source",
    stat_xp: "Gamified Progress",
    section_track_badge: "Structured Learning Tracks",
    section_track_title: "Master the Complete Computing Stack",
    section_track_sub: "A rigorous, structured path engineered to bridge the gap between abstract academic theory and practical software engineering.",
    card_foundations_desc: "Discrete mathematics, number systems, two's complement, Boolean algebra, and Big-O computational complexity.",
    card_ds_desc: "Continuous vs linked memory, Stacks, Queues, Binary Search Trees, Heaps, and Hash Table collision strategies.",
    card_algo_desc: "Divide and conquer, Quick Sort, Merge Sort, Dijkstra's shortest path, Dynamic Programming, and step-by-step playback.",
    card_prog_desc: "Stack vs Heap memory management, garbage collection, OOP vs Functional paradigms, and compiler AST pipelines.",
    card_os_desc: "Process lifecycle, CPU scheduling algorithms, virtual memory paging, multithreading, and deadlock prevention.",
    card_net_desc: "The 7-Layer OSI model, TCP/IP handshake, DNS resolution architecture, HTTP/3 (QUIC), and CIDR subnet calculation.",
    card_db_desc: "Relational modeling, Normalization (1NF to BCNF), ACID transaction isolation, B+ Tree indexing, and live SQL runner.",
    card_specs_desc: "Machine Learning, Deep Neural Networks, Modern Cryptography, Distributed Systems, Cloud Architecture, and Quantum basics.",
    card_res_desc: "Hand-selected seminal textbooks, classic papers, printable Big-O complexity tables, Git cheatsheets, and interview prep.",
    btn_explore: "Explore Track →",
    daily_title: "Daily CS Challenge",
    daily_heading: "Test Your Fundamentals Today",
    daily_desc: "Earn +100 XP and boost your study streak by tackling daily multiple-choice challenges across algorithms, data structures, and computer architecture.",
    daily_btn: "Go to Dashboard & Daily Quiz →",
    mark_complete: "Mark as Complete (+100 XP)",
    mark_completed: "✓ Completed (+100 XP Earned)",
    bookmark_btn: "☆ Bookmark",
    bookmarked_btn: "★ Bookmarked",
    bot_status: "CS Assistant",
    ticker_live_badge: "⚡ LIVE CS STREAM",
    hero_top_ticker_badge: "🔥 CS FRONTIER"
  },
  km: {
    nav_home: "ទំព័រដើម",
    nav_curriculum: "កម្មវិធីសិក្សាគោល ▾",
    nav_foundations: "⚡ មូលដ្ឋានគ្រឹះ & តក្កវិទ្យា",
    nav_ds: "📦 រចនាសម្ព័ន្ធទិន្នន័យ (DS)",
    nav_algo: "⚙️ ក្បួនដោះស្រាយ & ម៉ាស៊ីនពិសោធន៍",
    nav_prog: "💻 ការសរសេរកូដ & អង្គចងចាំ",
    nav_os: "🖥️ ប្រព័ន្ធប្រតិបត្តិការ (OS)",
    nav_net: "🌐 បណ្តាញកុំព្យូទ័រ (Networking)",
    nav_db: "🗄️ មូលដ្ឋានទិន្នន័យ & SQL",
    nav_specs: "ជំនាញឯកទេស",
    nav_res: "ឯកសារជំនួយ",
    nav_dash: "ផ្ទាំងគ្រប់គ្រង",
    nav_about: "អំពីយើង",
    nav_contact: "ទំនាក់ទំនង",
    search_placeholder: "ស្វែងរកមេរៀន, ក្បួនដោះស្រាយ, SQL...",
    hero_badge: "🚀 កម្មវិធីសិក្សាវិទ្យាសាស្ត្រកុំព្យូទ័រកម្រិតសាកលវិទ្យាល័យបើកទូលាយ",
    hero_title: "អភិវឌ្ឍសមត្ថភាពគំនិតជាមួយ",
    hero_title_accent: "វិទ្យាសាស្ត្រកុំព្យូទ័រ",
    hero_sub: "ចាប់ផ្តើមពីគណិតវិទ្យាឌីសគ្រីត និងស្ថាបត្យកម្មអង្គចងចាំ រហូតដល់ប្រព័ន្ធចែកចាយទូទាំងពិភពលោក និងបញ្ញាសិប្បនិម្មិត (AI)។ សិក្សាជាមួយម៉ាស៊ីនពិសោធន៍កូដផ្ទាល់ និងលំហាត់តេស្តសមត្ថភាព។",
    hero_btn_start: "ចាប់ផ្តើមរៀនឥឡូវនេះ →",
    hero_btn_demo: "⚡ សាកល្បងម៉ាស៊ីនពិសោធន៍ក្បួនដោះស្រាយ",
    stat_tracks: "មុខវិជ្ជាស្នូល",
    stat_topics: "ប្រធានបទអន្តរកម្ម",
    stat_free: "ឥតគិតថ្លៃ ១០០%",
    stat_xp: "ប្រព័ន្ធពិន្ទុ XP",
    section_track_badge: "ផ្លូវសិក្សាមានរចនាសម្ព័ន្ធច្បាស់លាស់",
    section_track_title: "ក្តាប់យកជំនាញកុំព្យូទ័រពេញលេញ",
    section_track_sub: "កម្មវិធីសិក្សាស្តង់ដារដើម្បីផ្សារភ្ជាប់ទ្រឹស្តីសិក្សាស្រាវជ្រាវ ទៅនឹងការបង្កើតកម្មវិធីជាក់ស្តែងក្នុងវិស័យបច្ចេកវិទ្យា។",
    card_foundations_desc: "គណិតវិទ្យាឌីសគ្រីត, ប្រព័ន្ធលេខគោលពីរ, Two's complement, តក្កវិទ្យាប៊ូលីន, និងកម្រិតស្មុគស្មាញ Big-O។",
    card_ds_desc: "ការគ្រប់គ្រងអង្គចងចាំ, Stacks, Queues, Binary Search Trees, Heaps, និងវិធីដោះស្រាយការជាន់គ្នាក្នុង Hash Table។",
    card_algo_desc: "ក្បួន Divide and Conquer, Quick Sort, Merge Sort, ផ្លូវខ្លីបំផុត Dijkstra, Dynamic Programming, និងការបង្ហាញចលនាផ្ទាល់។",
    card_prog_desc: "ការគ្រប់គ្រងអង្គចងចាំ Stack vs Heap, ប្រព័ន្ធសម្អាតកូដ GC, គោលការណ៍ OOP ទល់នឹង Functional, និងដំណើរការ Compiler AST។",
    card_os_desc: "វដ្តជីវិតរបស់ Process, ក្បួនបែងចែក CPU (Scheduling), ការគ្រប់គ្រង Virtual Memory, Multithreading, និងការទប់ស្កាត់ Deadlock។",
    card_net_desc: "គំរូ ៧ ស្រទាប់ OSI, ការតភ្ជាប់ TCP/IP Handshake, ស្ថាបត្យកម្ម DNS, ពិធីការ HTTP/3 (QUIC), និងការគណនា CIDR Subnet។",
    card_db_desc: "ការរៀបចំទម្រង់ Relational, Normalization (1NF ដល់ BCNF), គោលការណ៍ ACID, សន្ទស្សន៍ B+ Tree, និងផ្ទាំងសរសេរកូដ SQL ផ្ទាល់។",
    card_specs_desc: "ការរៀនរបស់ម៉ាស៊ីន (Machine Learning), បណ្តាញប្រសាទសិប្បនិម្មិត, គ្រីបតូក្រាហ្វ៊ី, Cloud, និងមូលដ្ឋានគ្រឹះ Quantum។",
    card_res_desc: "សៀវភៅគោលល្បីៗលើពិភពលោក (CLRS, Tanenbaum), ឯកសារស្រាវជ្រាវប្រវត្តិសាស្ត្រ, តារាង Big-O, និងសន្លឹកកិច្ចការ Git/Linux។",
    btn_explore: "ចូលមើលមេរៀន →",
    daily_title: "ការប្រកួតប្រជែងប្រចាំថ្ងៃ",
    daily_heading: "តេស្តសមត្ថភាពមូលដ្ឋានគ្រឹះរបស់អ្នកថ្ងៃនេះ",
    daily_desc: "ទទួលបាន +100 XP និងបង្កើនថ្ងៃសិក្សាជាប់ៗគ្នា (Streak) តាមរយៈការឆ្លើយសំណួរពហុជ្រើសរើសជុំវិញក្បួនដោះស្រាយ និងស្ថាបត្យកម្មកុំព្យូទ័រ។",
    daily_btn: "ទៅកាន់ផ្ទាំងគ្រប់គ្រង & តេស្តប្រចាំថ្ងៃ →",
    mark_complete: "កត់ចំណាំថាបានរៀនចប់ (+100 XP)",
    mark_completed: "✓ បានបញ្ចប់ (+100 XP ទទួលបាន)",
    bookmark_btn: "☆ ចំណាំទុក",
    bookmarked_btn: "★ បានចំណាំ",
    bot_status: "ជំនួយការ AI",
    ticker_live_badge: "⚡ ចរន្តវិទ្យាសាស្ត្រកុំព្យូទ័រ",
    hero_top_ticker_badge: "🔥 ព្រំដែនវិទ្យាសាស្ត្រកុំព្យូទ័រ"
  }
};

let currentLang = localStorage.getItem('cs_lang') || 'en';

function initLanguage() {
  applyLanguage(currentLang);

  // Setup language button in navbar
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'km' : 'en';
      localStorage.setItem('cs_lang', currentLang);
      applyLanguage(currentLang);
      showToast(currentLang === 'km' ? 'បានប្តូរទៅជា ភាសាខ្មែរ 🇰🇭' : 'Switched to English 🇺🇸');
    });
  }
}

function applyLanguage(lang) {
  const dict = CS_I18N[lang] || CS_I18N.en;

  if (lang === 'km') {
    document.body.classList.add('lang-km');
  } else {
    document.body.classList.remove('lang-km');
  }

  // Update button label
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.innerHTML = lang === 'km' ? '<span>🇰🇭 ខ្មែរ</span>' : '<span>🇺🇸 EN</span>';
    langToggle.title = lang === 'km' ? 'ប្តូរទៅភាសាអង់គ្លេស' : 'Switch to Khmer language';
  }

  // Translate all marked elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Translate search input placeholder
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.placeholder = dict.search_placeholder;
  }

  // Update CS Marquee Ticker & Hero Typewriter
  if (typeof updateTickerContent === 'function') {
    updateTickerContent(lang);
  }
  if (typeof initHeroTypewriter === 'function') {
    initHeroTypewriter();
  }
}

/* ==========================================================================
   3. 3D CARD TILT MICRO-INTERACTION
   ========================================================================== */
function initCardTilt() {
  if (window.innerWidth <= 768) return; // Disable on touch mobile for performance

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   4. THEME ENGINE (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('cs_theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('cs_theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
      showToast(isLight ? 'Light theme activated ☀️' : 'Dark cyberpunk theme activated 🌙');
    });
  }
}

function updateThemeIcon(isLight) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = isLight 
      ? '<svg class="cs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
      : '<svg class="cs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  }
}

/* ==========================================================================
   5. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const header = document.querySelector('.site-header');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const expanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
}

/* ==========================================================================
   6. GLOBAL SEARCH SYSTEM (Ctrl + K)
   ========================================================================== */
const searchDatabase = [
  { title: "Binary, Hex & Number Systems", cat: "Foundations", url: "foundations.html#numbers", snippet: "Two's complement, binary arithmetic, and bitwise operations" },
  { title: "Boolean Algebra & Logic Gates", cat: "Foundations", url: "foundations.html#logic", snippet: "AND, OR, XOR, De Morgan's Laws, truth tables, combinational logic" },
  { title: "Big-O Asymptotic Complexity", cat: "Foundations", url: "foundations.html#big-o", snippet: "Time & Space complexity, O(1), O(log n), O(n), O(n log n), O(n²)" },
  { title: "Arrays & Dynamic Memory", cat: "Data Structures", url: "data-structures.html#arrays", snippet: "Contiguous allocation, amortized resizing, memory locality" },
  { title: "Linked Lists (Singly & Doubly)", cat: "Data Structures", url: "data-structures.html#linked-lists", snippet: "Pointer nodes, reversal, cycle detection with Floyd's algorithm" },
  { title: "Stacks & Queues", cat: "Data Structures", url: "data-structures.html#stacks-queues", snippet: "LIFO, FIFO, Monotonic stacks, circular queues, interactive sandbox" },
  { title: "Binary Search Trees (BST)", cat: "Data Structures", url: "data-structures.html#trees", snippet: "Tree traversals (inorder, preorder, postorder), AVL and Red-Black balancing" },
  { title: "Hash Tables & Collision Handling", cat: "Data Structures", url: "data-structures.html#hash-tables", snippet: "Hash functions, separate chaining, open addressing, Robin Hood hashing" },
  { title: "Graphs: Adjacency Matrix & Lists", cat: "Data Structures", url: "data-structures.html#graphs", snippet: "Directed, undirected, weighted, topological ordering" },
  { title: "Interactive Sorting Visualizer", cat: "Algorithms", url: "algorithms.html#sorting", snippet: "Bubble Sort, Selection Sort, Insertion Sort, Quick Sort step-by-step" },
  { title: "Binary Search & Divide and Conquer", cat: "Algorithms", url: "algorithms.html#search", snippet: "Logarithmic time search, lower bound, binary search on answers" },
  { title: "Graph Traversals (BFS, DFS, Dijkstra)", cat: "Algorithms", url: "algorithms.html#graphs", snippet: "Shortest path, priority queues, cycle finding, connected components" },
  { title: "Dynamic Programming & Memoization", cat: "Algorithms", url: "algorithms.html#dp", snippet: "Overlapping subproblems, optimal substructure, 0/1 Knapsack, Longest Common Subsequence" },
  { title: "Memory Architecture: Stack vs Heap", cat: "Programming", url: "programming.html#memory", snippet: "Stack frames, pointer allocation, garbage collection, RAII" },
  { title: "Programming Paradigms", cat: "Programming", url: "programming.html#paradigms", snippet: "Object-oriented, functional, declarative, concurrent paradigms" },
  { title: "Compiler Pipeline & ASTs", cat: "Programming", url: "programming.html#compilers", snippet: "Lexing, parsing, syntax trees, optimization, bytecode vs native assembly" },
  { title: "Processes & Threads", cat: "Operating Systems", url: "operating-systems.html#processes", snippet: "Process control blocks (PCB), context switching, multi-threading" },
  { title: "CPU Scheduling Algorithms", cat: "Operating Systems", url: "operating-systems.html#scheduling", snippet: "FCFS, SJF, Round Robin, interactive Gantt chart simulator" },
  { title: "Virtual Memory & Paging", cat: "Operating Systems", url: "operating-systems.html#memory", snippet: "Page tables, TLB, page faults, LRU page replacement" },
  { title: "Deadlocks & Dining Philosophers", cat: "Operating Systems", url: "operating-systems.html#deadlocks", snippet: "Coffman conditions, mutual exclusion, deadlock prevention & avoidance" },
  { title: "OSI 7-Layer & TCP/IP Model", cat: "Networking", url: "networking.html#osi", snippet: "Physical to Application layer encapsulation, packet journey" },
  { title: "DNS Resolution Architecture", cat: "Networking", url: "networking.html#dns", snippet: "Root nameservers, TLD, authoritative DNS, caching TTL" },
  { title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)", cat: "Networking", url: "networking.html#http", snippet: "Multiplexing, header compression, UDP/QUIC 0-RTT handshakes" },
  { title: "Subnetting & CIDR Calculator", cat: "Networking", url: "networking.html#subnetting", snippet: "IP addressing, subnet masks, slash notation, broadcast addresses" },
  { title: "Relational Modeling & SQL", cat: "Databases", url: "databases.html#relational", snippet: "Schemas, primary keys, foreign keys, live interactive SQL runner" },
  { title: "ACID Properties & Transactions", cat: "Databases", url: "databases.html#acid", snippet: "Atomicity, Consistency, Isolation, Durability, write-ahead logs" },
  { title: "Database Indexing & B+ Trees", cat: "Databases", url: "databases.html#indexing", snippet: "Clustered vs non-clustered indexes, range queries, execution plans" },
  { title: "Artificial Intelligence & ML", cat: "Specializations", url: "specializations.html#ai", snippet: "Supervised learning, deep neural networks, transformer architecture, LLMs" },
  { title: "Cybersecurity & Cryptography", cat: "Specializations", url: "specializations.html#security", snippet: "Symmetric AES, Asymmetric RSA/ECC, hashing SHA-256, zero-trust security" },
  { title: "Cloud Systems & Distributed Computing", cat: "Specializations", url: "specializations.html#cloud", snippet: "CAP theorem, Raft consensus, microservices, containerization" },
  { title: "Curated Books & Research Papers", cat: "Resources", url: "resources.html#books", snippet: "Classic textbooks (CLRS, Tanenbaum, SICP) and seminal computing papers" },
  { title: "Comprehensive Cheat Sheets", cat: "Resources", url: "resources.html#cheatsheets", snippet: "Big-O reference table, Git commands, Linux shell commands" },
  { title: "Gamified Progress & Badges", cat: "User Dashboard", url: "progress.html", snippet: "View your XP, study streaks, quiz badges, and curriculum mastery" }
];

function initSearch() {
  const triggerBtn = document.getElementById('search-trigger');
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  if (!modal || !input) return;

  function openModal() {
    modal.classList.add('open');
    input.focus();
    renderSearchResults(input.value.trim());
  }

  function closeModal() {
    modal.classList.remove('open');
    input.value = '';
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? closeModal() : openModal();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  input.addEventListener('input', () => {
    renderSearchResults(input.value.trim());
  });

  function renderSearchResults(query) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';

    const filtered = query === '' 
      ? searchDatabase.slice(0, 7)
      : searchDatabase.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.cat.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase())
        );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<li style="padding: 1.5rem; text-align: center; color: var(--text-muted);">${currentLang === 'km' ? 'រកមិនឃើញប្រធានបទនេះទេ។ សូមសាកល្បងពាក្យ "Sorting", "Trees", "SQL", ឬ "Memory"' : 'No CS topics found for "' + query + '". Try "Sorting", "Trees", "SQL", or "Memory".'}</li>`;
      return;
    }

    filtered.forEach(item => {
      const li = document.createElement('li');
      li.className = 'search-item';
      li.innerHTML = `
        <a href="${item.url}">
          <div>
            <div style="font-weight: 600; color: #fff; margin-bottom: 2px;">${item.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${item.snippet}</div>
          </div>
          <span class="badge badge-cyan">${item.cat}</span>
        </a>
      `;
      li.querySelector('a').addEventListener('click', closeModal);
      resultsContainer.appendChild(li);
    });
  }
}

/* ==========================================================================
   7. PROGRESS & GAMIFICATION ENGINE
   ========================================================================== */
const DEFAULT_PROGRESS = {
  xp: 150,
  level: 1,
  completedLessons: ['foundations_numbers'],
  bookmarked: [],
  streak: 3
};

function getProgress() {
  try {
    const data = localStorage.getItem('cs_learning_progress');
    return data ? JSON.parse(data) : DEFAULT_PROGRESS;
  } catch (e) {
    return DEFAULT_PROGRESS;
  }
}

function saveProgress(prog) {
  localStorage.setItem('cs_learning_progress', JSON.stringify(prog));
  updateHeaderProgress();
}

function updateHeaderProgress() {
  const prog = getProgress();
  const pill = document.getElementById('header-progress-pill');
  if (pill) {
    const lvlText = currentLang === 'km' ? `កម្រិត ${prog.level}` : `Lvl ${prog.level}`;
    pill.innerHTML = `
      <svg class="cs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      <span>${lvlText} • ${prog.xp} XP</span>
    `;
  }
}

function initProgress() {
  updateHeaderProgress();

  const completeBtn = document.getElementById('mark-complete-btn');
  if (completeBtn) {
    const topicId = completeBtn.getAttribute('data-topic-id') || window.location.pathname;
    const prog = getProgress();

    if (prog.completedLessons.includes(topicId)) {
      completeBtn.classList.remove('btn-outline-cyan');
      completeBtn.classList.add('btn-primary');
      completeBtn.innerHTML = currentLang === 'km' ? '✓ បានបញ្ចប់ (+100 XP ទទួលបាន)' : '✓ Completed (+100 XP Earned)';
    }

    completeBtn.addEventListener('click', () => {
      const current = getProgress();
      if (!current.completedLessons.includes(topicId)) {
        current.completedLessons.push(topicId);
        current.xp += 100;
        current.level = Math.floor(current.xp / 250) + 1;
        saveProgress(current);

        completeBtn.classList.remove('btn-outline-cyan');
        completeBtn.classList.add('btn-primary');
        completeBtn.innerHTML = currentLang === 'km' ? '✓ បានបញ្ចប់ (+100 XP ទទួលបាន)' : '✓ Completed (+100 XP Earned)';
        showToast(currentLang === 'km' ? '🎉 អបអរសាទរ! អ្នកបានបញ្ចប់មេរៀននេះ និងទទួលបាន +100 XP!' : '🎉 Topic Completed! +100 XP added to your dashboard!');
      } else {
        showToast(currentLang === 'km' ? 'អ្នកបានរៀនចប់ និងទទួល XP សម្រាប់មេរៀននេះរួចហើយ!' : 'You have already mastered and earned XP for this topic!');
      }
    });
  }

  const bookmarkBtn = document.getElementById('bookmark-btn');
  if (bookmarkBtn) {
    const topicId = bookmarkBtn.getAttribute('data-topic-id') || window.location.pathname;
    const prog = getProgress();

    if (prog.bookmarked.includes(topicId)) {
      bookmarkBtn.classList.add('bookmarked');
      bookmarkBtn.innerHTML = currentLang === 'km' ? '★ បានចំណាំ' : '★ Bookmarked';
    }

    bookmarkBtn.addEventListener('click', () => {
      const current = getProgress();
      const index = current.bookmarked.indexOf(topicId);
      if (index === -1) {
        current.bookmarked.push(topicId);
        bookmarkBtn.innerHTML = currentLang === 'km' ? '★ បានចំណាំ' : '★ Bookmarked';
        showToast(currentLang === 'km' ? '📌 បានរក្សាទុកក្នុងបញ្ជីចំណាំរបស់អ្នក!' : '📌 Lesson saved to your personal dashboard bookmarks!');
      } else {
        current.bookmarked.splice(index, 1);
        bookmarkBtn.innerHTML = currentLang === 'km' ? '☆ ចំណាំទុក' : '☆ Bookmark';
        showToast(currentLang === 'km' ? 'បានលុបចេញពីបញ្ជីចំណាំ' : 'Bookmark removed.');
      }
      saveProgress(current);
    });
  }
}

/* ==========================================================================
   8. TABS, ACCORDIONS & CODE COPY
   ========================================================================== */
function initTabs() {
  document.querySelectorAll('.tabs-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const container = nav.closest('.tabs-container') || nav.parentElement;
    const panes = container.querySelectorAll('.tab-pane');

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;
        SoundFX.playClick();
        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        if (panes[idx]) panes[idx].classList.add('active');
      });
    });
  });
}

function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });
}

function initCodeCopy() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-window').querySelector('code, pre');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<span>✓ Copied!</span>';
          setTimeout(() => { btn.innerHTML = original; }, 2000);
        });
      }
    });
  });
}

/* ==========================================================================
   9. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="cs-icon" style="color:var(--cyan)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   10. SCROLL TO TOP
   ========================================================================== */
function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   11. INTERACTIVE VISUALIZERS (Foundations, Algorithms, DS, OS, SQL)
   ========================================================================== */
function initVisualizers() {
  // A. Number Base Converter (Foundations Page)
  const decInput = document.getElementById('base-dec-input');
  const binOutput = document.getElementById('base-bin-output');
  const hexOutput = document.getElementById('base-hex-output');
  const bitsContainer = document.getElementById('interactive-bits');

  if (decInput && binOutput && hexOutput) {
    function updateBases(val) {
      let num = parseInt(val, 10);
      if (isNaN(num)) num = 0;
      if (num > 255) num = 255;
      if (num < 0) num = 0;

      decInput.value = num;
      const binStr = (num >>> 0).toString(2).padStart(8, '0');
      binOutput.textContent = binStr;
      hexOutput.textContent = '0x' + num.toString(16).toUpperCase().padStart(2, '0');

      if (bitsContainer) {
        bitsContainer.innerHTML = '';
        for (let i = 0; i < 8; i++) {
          const bitVal = binStr[i];
          const bitBox = document.createElement('button');
          bitBox.className = `btn btn-sm ${bitVal === '1' ? 'btn-primary' : 'btn-secondary'}`;
          bitBox.style.minWidth = '34px';
          bitBox.textContent = bitVal;
          bitBox.title = `Bit position ${7 - i} (weight ${Math.pow(2, 7 - i)})`;
          bitBox.addEventListener('click', () => {
            const flipped = num ^ (1 << (7 - i));
            updateBases(flipped);
          });
          bitsContainer.appendChild(bitBox);
        }
      }
    }

    decInput.addEventListener('input', (e) => updateBases(e.target.value));
    updateBases(42);
  }

  // B. Sorting Visualizer (Algorithms Page)
  const sortCanvas = document.getElementById('sort-canvas');
  const sortLog = document.getElementById('sort-log');
  const sortPlayBtn = document.getElementById('sort-play-btn');
  const sortShuffleBtn = document.getElementById('sort-shuffle-btn');
  const sortAlgoSelect = document.getElementById('sort-algo-select');

  if (sortCanvas && sortPlayBtn) {
    let array = [45, 12, 89, 34, 76, 23, 58, 91, 15, 67, 30, 82];
    let isSorting = false;

    function renderBars(activeIndices = [], sortedIndices = []) {
      sortCanvas.innerHTML = '';
      array.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${val * 2.2}px`;
        bar.textContent = val;
        if (activeIndices.includes(idx)) bar.classList.add('active');
        if (sortedIndices.includes(idx)) bar.classList.add('sorted');
        sortCanvas.appendChild(bar);
      });
    }

    renderBars();

    if (sortShuffleBtn) {
      sortShuffleBtn.addEventListener('click', () => {
        if (isSorting) return;
        array = array.sort(() => Math.random() - 0.5);
        renderBars();
        if (sortLog) sortLog.textContent = currentLang === 'km' ? 'បានច្របល់ទិន្នន័យអារេឡើងវិញ។ រួចរាល់ដើម្បីដំណើរការ!' : 'Array randomized. Ready to execute sorting algorithm.';
      });
    }

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    async function bubbleSort() {
      isSorting = true;
      sortPlayBtn.disabled = true;
      const n = array.length;
      let sorted = [];

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          renderBars([j, j + 1], sorted);
          if (sortLog) sortLog.textContent = currentLang === 'km' 
            ? `កំពុងប្រៀបធៀប array[${j}]=${array[j]} និង array[${j+1}]=${array[j+1]}`
            : `Comparing array[${j}]=${array[j]} and array[${j+1}]=${array[j+1]}`;
          await sleep(150);

          if (array[j] > array[j + 1]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            renderBars([j, j + 1], sorted);
            await sleep(150);
          }
        }
        sorted.push(n - i - 1);
      }
      renderBars([], Array.from({length: n}, (_, k) => k));
      if (sortLog) sortLog.textContent = currentLang === 'km' 
        ? 'Bubble Sort បានបញ្ចប់ជោគជ័យ! កម្រិតស្មុគស្មាញ O(n²)' 
        : 'Bubble Sort completed! Total complexity: O(n²) comparisons.';
      isSorting = false;
      sortPlayBtn.disabled = false;
    }

    async function selectionSort() {
      isSorting = true;
      sortPlayBtn.disabled = true;
      const n = array.length;
      let sorted = [];

      for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          renderBars([j, minIdx], sorted);
          if (sortLog) sortLog.textContent = currentLang === 'km'
            ? `ស្វែងរកធាតុដែលតូចបំផុត។ សន្ទស្សន៍តូចបំផុតបច្ចុប្បន្ន: ${minIdx} (${array[minIdx]})`
            : `Scanning for minimum element. Current min index: ${minIdx} (val: ${array[minIdx]})`;
          await sleep(120);
          if (array[j] < array[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
          let temp = array[i];
          array[i] = array[minIdx];
          array[minIdx] = temp;
        }
        sorted.push(i);
        renderBars([], sorted);
        await sleep(120);
      }
      renderBars([], Array.from({length: n}, (_, k) => k));
      if (sortLog) sortLog.textContent = currentLang === 'km'
        ? 'Selection Sort បានបញ្ចប់ជោគជ័យ!'
        : 'Selection Sort complete! Total passes: n-1.';
      isSorting = false;
      sortPlayBtn.disabled = false;
    }

    sortPlayBtn.addEventListener('click', () => {
      if (isSorting) return;
      const algo = sortAlgoSelect ? sortAlgoSelect.value : 'bubble';
      if (algo === 'selection') {
        selectionSort();
      } else {
        bubbleSort();
      }
    });
  }

  // C. Data Structure Sandbox (Stack & Queue)
  const dsContainer = document.getElementById('ds-elements-container');
  const stackPushBtn = document.getElementById('stack-push-btn');
  const stackPopBtn = document.getElementById('stack-pop-btn');
  const queuePushBtn = document.getElementById('queue-push-btn');
  const queuePopBtn = document.getElementById('queue-pop-btn');
  const dsStatus = document.getElementById('ds-status-text');

  if (dsContainer) {
    let dsData = [10, 25, 42];

    function renderDS() {
      dsContainer.innerHTML = '';
      if (dsData.length === 0) {
        dsContainer.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">${currentLang === 'km' ? 'រចនាសម្ព័ន្ធទិន្នន័យទទេ (Underflow state)' : 'Structure is currently empty (Underflow state)'}</span>`;
        return;
      }
      dsData.forEach((val, idx) => {
        const node = document.createElement('div');
        node.className = 'ds-node';
        node.textContent = val;
        dsContainer.appendChild(node);

        if (idx < dsData.length - 1) {
          const arrow = document.createElement('span');
          arrow.className = 'ds-pointer';
          arrow.textContent = '→';
          dsContainer.appendChild(arrow);
        }
      });
    }

    renderDS();

    if (stackPushBtn) {
      stackPushBtn.addEventListener('click', () => {
        const nextVal = Math.floor(Math.random() * 90) + 10;
        dsData.push(nextVal);
        renderDS();
        if (dsStatus) dsStatus.textContent = currentLang === 'km' 
          ? `បានបញ្ចូល [${nextVal}] ទៅលើកំពូល Stack (Push - LIFO O(1))`
          : `Pushed element [${nextVal}] to Top of Stack. (LIFO O(1))`;
      });
    }

    if (stackPopBtn) {
      stackPopBtn.addEventListener('click', () => {
        if (dsData.length === 0) {
          if (dsStatus) dsStatus.textContent = currentLang === 'km' ? 'មិនអាច Pop បានទេ: Stack Underflow!' : 'Cannot Pop: Stack Underflow!';
          return;
        }
        const popped = dsData.pop();
        renderDS();
        if (dsStatus) dsStatus.textContent = currentLang === 'km'
          ? `បានទាញយកធាតុ [${popped}] ពីកំពូល Stack (Pop - LIFO O(1))`
          : `Popped element [${popped}] from Top of Stack. (LIFO O(1))`;
      });
    }

    if (queuePushBtn) {
      queuePushBtn.addEventListener('click', () => {
        const nextVal = Math.floor(Math.random() * 90) + 10;
        dsData.push(nextVal);
        renderDS();
        if (dsStatus) dsStatus.textContent = currentLang === 'km'
          ? `បានបញ្ចូល [${nextVal}] ទៅខាងក្រោយ Queue (Enqueue - FIFO O(1))`
          : `Enqueued element [${nextVal}] to Rear of Queue. (FIFO O(1))`;
      });
    }

    if (queuePopBtn) {
      queuePopBtn.addEventListener('click', () => {
        if (dsData.length === 0) {
          if (dsStatus) dsStatus.textContent = currentLang === 'km' ? 'មិនអាច Dequeue បានទេ: Queue Underflow!' : 'Cannot Dequeue: Queue Underflow!';
          return;
        }
        const dequeued = dsData.shift();
        renderDS();
        if (dsStatus) dsStatus.textContent = currentLang === 'km'
          ? `បានទាញយកធាតុ [${dequeued}] ពីមុខ Queue (Dequeue - FIFO O(1))`
          : `Dequeued element [${dequeued}] from Front of Queue. (FIFO O(1))`;
      });
    }
  }

  // D. Interactive SQL Sandbox (Databases Page)
  const sqlInput = document.getElementById('sql-query-input');
  const sqlRunBtn = document.getElementById('sql-run-btn');
  const sqlOutput = document.getElementById('sql-results-table');
  const sqlMessage = document.getElementById('sql-feedback-msg');

  if (sqlInput && sqlRunBtn && sqlOutput) {
    const studentsTable = [
      { id: 1, name: "Ada Lovelace", major: "Computer Science", gpa: 4.0, grade: 98 },
      { id: 2, name: "Alan Turing", major: "Mathematics", gpa: 3.95, grade: 96 },
      { id: 3, name: "Grace Hopper", major: "Computer Science", gpa: 3.9, grade: 94 },
      { id: 4, name: "Claude Shannon", major: "Electrical Eng", gpa: 3.85, grade: 92 },
      { id: 5, name: "Linus Torvalds", major: "Software Eng", gpa: 3.8, grade: 89 },
      { id: 6, name: "Margaret Hamilton", major: "Software Eng", gpa: 4.0, grade: 99 }
    ];

    function runQuery(q) {
      const clean = q.trim().toUpperCase();
      let filtered = [...studentsTable];

      if (clean.includes("WHERE GRADE > 90") || clean.includes("WHERE GRADE >= 90")) {
        filtered = filtered.filter(s => s.grade >= 90);
      } else if (clean.includes("WHERE GPA > 3.9") || clean.includes("WHERE GPA >= 3.9")) {
        filtered = filtered.filter(s => s.gpa >= 3.9);
      } else if (clean.includes("WHERE MAJOR = 'COMPUTER SCIENCE'") || clean.includes("WHERE MAJOR='COMPUTER SCIENCE'")) {
        filtered = filtered.filter(s => s.major === "Computer Science");
      }

      let html = `
        <table class="cs-table">
          <thead>
            <tr><th>id</th><th>name</th><th>major</th><th>gpa</th><th>grade</th></tr>
          </thead>
          <tbody>
      `;
      filtered.forEach(row => {
        html += `<tr><td>${row.id}</td><td><strong>${row.name}</strong></td><td>${row.major}</td><td>${row.gpa}</td><td>${row.grade}</td></tr>`;
      });
      html += `</tbody></table>`;
      sqlOutput.innerHTML = html;

      if (sqlMessage) {
        sqlMessage.innerHTML = `<span style="color: var(--emerald);">✓ ${currentLang === 'km' ? 'បានដំណើរការ Query ជោគជ័យ' : 'Query executed successfully'}: ${filtered.length} row(s) returned.</span>`;
      }
    }

    sqlRunBtn.addEventListener('click', () => {
      runQuery(sqlInput.value);
    });

    runQuery(sqlInput.value);
  }
}

/* ==========================================================================
   12. WEB AUDIO API CYBER SOUND ENGINE (Synthesized Audio)
   ========================================================================== */
const SoundFX = {
  ctx: null,
  enabled: localStorage.getItem('cs_sfx') !== 'false',

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  },

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  },

  playBlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  },

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = this.ctx.currentTime + idx * 0.065;
        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.22);
      });
    } catch(e) {}
  },

  initUI() {
    const sfxBtn = document.getElementById('sfx-toggle');
    const updateIcon = () => {
      if (sfxBtn) {
        sfxBtn.innerHTML = this.enabled ? '🔊' : '🔇';
        sfxBtn.title = this.enabled 
          ? (currentLang === 'km' ? 'បិទសំឡេង Cyber SFX' : 'Mute Cyber Sound Effects')
          : (currentLang === 'km' ? 'បើកសំឡេង Cyber SFX' : 'Enable Cyber Sound Effects');
      }
    };
    updateIcon();

    if (sfxBtn) {
      sfxBtn.addEventListener('click', () => {
        this.enabled = !this.enabled;
        localStorage.setItem('cs_sfx', this.enabled);
        updateIcon();
        if (this.enabled) {
          this.playClick();
          showToast(currentLang === 'km' ? 'បានបើកសំឡេង Cyber SFX 🔊' : 'Cyber SFX Enabled 🔊');
        } else {
          showToast(currentLang === 'km' ? 'បានបិទសំឡេង 🔇' : 'Cyber SFX Muted 🔇');
        }
      });
    }

    // Attach sound to interactive buttons and cards
    document.querySelectorAll('.btn, .nav-link, .card, .lang-switcher-btn, .search-trigger-btn, .progress-pill, .quiz-option-btn').forEach(el => {
      el.addEventListener('mouseenter', () => this.playHover());
      el.addEventListener('click', () => this.playClick());
    });
  }
};

/* ==========================================================================
   13. CYBER CONFETTI CANNON
   ========================================================================== */
function fireConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  let canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#38bdf8'];

  for (let i = 0; i < 48; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 3;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // friction
      p.alpha -= 0.016;
      p.rotation += p.vRot;

      if (p.alpha > 0) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (active) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

/* ==========================================================================
   14. CYBER LAB CONTROLLER (Big-O Race, Binary Streamer, Wisdom Spin)
   ========================================================================== */
function initCyberLab() {
  // Tab 1: Big-O Race
  const raceBtn = document.getElementById('race-start-btn');
  const sizeSelect = document.getElementById('race-size-select');
  const bars = {
    o1: document.getElementById('race-bar-o1'),
    ologn: document.getElementById('race-bar-ologn'),
    on: document.getElementById('race-bar-on'),
    onlogn: document.getElementById('race-bar-onlogn'),
    on2: document.getElementById('race-bar-on2')
  };
  const times = {
    o1: document.getElementById('race-time-o1'),
    ologn: document.getElementById('race-time-ologn'),
    on: document.getElementById('race-time-on'),
    onlogn: document.getElementById('race-time-onlogn'),
    on2: document.getElementById('race-time-on2')
  };

  if (raceBtn && sizeSelect) {
    raceBtn.addEventListener('click', () => {
      SoundFX.playClick();
      const n = parseInt(sizeSelect.value, 10);

      Object.values(bars).forEach(b => { if (b) b.style.width = '0%'; });

      setTimeout(() => {
        if (bars.o1) { bars.o1.style.width = '100%'; times.o1.textContent = '1 operation (~0.0001 ms)'; }
      }, 50);

      setTimeout(() => {
        const logVal = Math.round(Math.log2(n));
        if (bars.ologn) { bars.ologn.style.width = '94%'; times.ologn.textContent = `${logVal} operations (~0.002 ms)`; }
      }, 150);

      setTimeout(() => {
        if (bars.on) { bars.on.style.width = '78%'; times.on.textContent = `${n.toLocaleString()} operations (~0.15 ms)`; }
      }, 350);

      setTimeout(() => {
        const nlogn = Math.round(n * Math.log2(n));
        if (bars.onlogn) { bars.onlogn.style.width = '62%'; times.onlogn.textContent = `${nlogn.toLocaleString()} operations (~1.2 ms)`; }
      }, 600);

      setTimeout(() => {
        const n2 = n * n;
        if (bars.on2) { 
          bars.on2.style.width = '15%'; 
          times.on2.textContent = n >= 10000 ? `⚠️ ${n2.toExponential(1)} operations (Bottleneck!)` : `${n2.toLocaleString()} operations (~180 ms)`; 
        }
        SoundFX.playSuccess();
        fireConfetti();
      }, 900);
    });
  }

  // Tab 2: Live Binary & Cipher Streamer
  const textInput = document.getElementById('binary-stream-input');
  const binOutput = document.getElementById('binary-stream-output');
  const hexOutput = document.getElementById('hex-stream-output');
  const cipherOutput = document.getElementById('cipher-stream-output');

  if (textInput && binOutput) {
    function updateStream() {
      const text = textInput.value;
      if (!text) {
        binOutput.textContent = '01000011 01010011 00100000 01000001 01100011 01100001 01100100 01100101 01101101 01111001';
        if (hexOutput) hexOutput.textContent = '0x43 0x53 0x20 0x41 0x63 0x61 0x64 0x65 0x6D 0x79';
        if (cipherOutput) cipherOutput.textContent = 'E9 F9 8A EB C9 CB CE CF C7 D3';
        return;
      }

      let binStr = '';
      let hexStr = '';
      let cipherStr = '';

      for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        binStr += code.toString(2).padStart(8, '0') + ' ';
        hexStr += '0x' + code.toString(16).toUpperCase().padStart(2, '0') + ' ';
        cipherStr += (code ^ 0xAA).toString(16).toUpperCase().padStart(2, '0') + ' ';
      }

      binOutput.textContent = binStr.trim();
      if (hexOutput) hexOutput.textContent = hexStr.trim();
      if (cipherOutput) cipherOutput.textContent = cipherStr.trim();
    }

    textInput.addEventListener('input', updateStream);
    updateStream();
  }

  // Tab 3: Daily CS Wisdom & XP
  const wisdomBtn = document.getElementById('wisdom-spin-btn');
  const wisdomQuote = document.getElementById('wisdom-quote-text');
  const wisdomAuthor = document.getElementById('wisdom-author-text');

  const csQuotes = [
    { q: "Programs must be written for people to read, and only incidentally for machines to execute.", a: "Harold Abelson (SICP)" },
    { q: "Talk is cheap. Show me the code.", a: "Linus Torvalds (Linux & Git)" },
    { q: "Simplicity is prerequisite for reliability.", a: "Edsger W. Dijkstra" },
    { q: "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human.", a: "Alan Turing" },
    { q: "It's not a bug – it's an undocumented feature.", a: "Anonymous Pioneer" },
    { q: "There are only two hard things in Computer Science: cache invalidation and naming things.", a: "Phil Karlton" }
  ];

  if (wisdomBtn && wisdomQuote) {
    wisdomBtn.addEventListener('click', () => {
      SoundFX.playSuccess();
      const rand = csQuotes[Math.floor(Math.random() * csQuotes.length)];
      wisdomQuote.textContent = `"${rand.q}"`;
      if (wisdomAuthor) wisdomAuthor.textContent = `— ${rand.a}`;

      const prog = getProgress();
      prog.xp += 25;
      saveProgress(prog);

      fireConfetti();
      showToast(currentLang === 'km' ? '🎉 អ្នកទទួលបាន +25 XP ពីប្រាជ្ញាកុំព្យូទ័រប្រចាំថ្ងៃ!' : '🎉 You earned +25 XP from Daily CS Wisdom!');
    });
  }
}

/* ==========================================================================
   13. MATRIX DIGITAL RAIN VISUALIZER MODE
   ========================================================================== */
let matrixAnimationId = null;
let isMatrixActive = false;

function initMatrixRain() {
  let overlay = document.getElementById('matrix-rain-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'matrix-rain-overlay';
    overlay.innerHTML = `
      <canvas id="matrix-canvas"></canvas>
      <div class="matrix-control-bar">
        <span style="display:flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;"></span>
          MATRIX DIGITAL RAIN ACTIVE
        </span>
        <button class="matrix-close-btn" id="matrix-close-btn">✕ Exit Matrix [ESC]</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const closeBtn = document.getElementById('matrix-close-btn');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const chars = '010101010101ABCDEF0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜXYZ+-*/=%<>{}[]';
  const fontSize = 16;
  let drops = [];

  function resetDrops() {
    const columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -40);
    }
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (Math.random() > 0.88) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#22c55e';
        ctx.shadowBlur = 0;
      }

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    if (isMatrixActive) {
      matrixAnimationId = requestAnimationFrame(drawMatrix);
    }
  }

  window.toggleMatrixRain = function(state) {
    isMatrixActive = state !== undefined ? state : !isMatrixActive;
    if (isMatrixActive) {
      resizeCanvas();
      resetDrops();
      ctx.fillStyle = 'rgb(3, 7, 18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      overlay.classList.add('active');
      SoundFX.playSuccess();
      drawMatrix();
      showToast(currentLang === 'km' ? '🟢 បានបើកដំណើរការ Matrix Mode! ចុច [ESC] ដើម្បីបិទ' : '🟢 Matrix Digital Rain activated! Press [ESC] to exit.');
    } else {
      overlay.classList.remove('active');
      if (matrixAnimationId) cancelAnimationFrame(matrixAnimationId);
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', () => window.toggleMatrixRain(false));
  }

  const trigger = document.getElementById('matrix-rain-trigger');
  if (trigger) {
    trigger.addEventListener('click', () => window.toggleMatrixRain(true));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMatrixActive) {
      window.toggleMatrixRain(false);
    }
    if (e.shiftKey && (e.key === 'M' || e.key === 'm') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      window.toggleMatrixRain();
    }
  });
}

/* ==========================================================================
   14. LIVE IN-BROWSER CODE RUNNER & SANDBOX
   ========================================================================== */
function initLiveCodeSandbox() {
  const editor = document.getElementById('sandbox-editor');
  const runBtn = document.getElementById('sandbox-run-btn');
  const resetBtn = document.getElementById('sandbox-reset-btn');
  const presetSelect = document.getElementById('sandbox-preset-select');
  const outputConsole = document.getElementById('sandbox-output');
  const metricsEl = document.getElementById('sandbox-metrics');

  if (!editor || !runBtn) return;

  const presets = {
    fibonacci: `// 🌟 Dynamic Programming: Fibonacci Sequence Generator (O(n))
function fibonacci(n) {
  const seq = [0, 1];
  for (let i = 2; i <= n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

console.log("Generating Fibonacci numbers up to n = 15:");
const result = fibonacci(15);
console.log("Complete Sequence: [ " + result.join(", ") + " ]");
console.log("15th Fibonacci Number F(15) =", result[15]);
console.log("Golden Ratio Approximation (F(15)/F(14)):", (result[15] / result[14]).toFixed(6));`,

    binary_search: `// 🔍 Binary Search Algorithm (O(log n))
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  let step = 1;
  console.log("Searching for target value: " + target);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    console.log(\`Step \${step++}: inspect index \${mid} (val: \${arr[mid]}) in range [\${left}..\${right}]\`);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const dataset = [3, 8, 14, 21, 35, 42, 59, 73, 88, 95];
console.log("Sorted Array:", JSON.stringify(dataset));
const foundIndex = binarySearch(dataset, 42);
console.log("🎉 Target found at index:", foundIndex);`,

    palindrome: `// 🔄 Palindrome & String Symmetry Checker
function checkPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = clean.split('').reverse().join('');
  const isMatch = clean === reversed;

  console.log("Original String: \\"" + str + "\\"");
  console.log("Normalized:      \\"" + clean + "\\"");
  console.log("Reversed:        \\"" + reversed + "\\"");
  console.log("Verdict:         " + (isMatch ? "✅ IS A VALID PALINDROME" : "❌ NOT A PALINDROME"));
  return isMatch;
}

checkPalindrome("A man, a plan, a canal: Panama");
console.log("-----------------------------------------");
checkPalindrome("Computer Science Platform");`,

    bubble_sort: `// 🔢 Bubble Sort Step-by-Step Tracer
function bubbleSort(arr) {
  const a = [...arr];
  let passes = 0, swaps = 0;
  console.log("Initial Array: ", JSON.stringify(a));

  for (let i = 0; i < a.length; i++) {
    passes++;
    let swapped = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        swapped = true;
      }
    }
    console.log(\`Pass \${passes}: \${JSON.stringify(a)}\`);
    if (!swapped) break;
  }

  console.log(\`✓ Sorted array in \${passes} passes with \${swaps} swaps.\`);
  return a;
}

bubbleSort([64, 34, 25, 12, 22, 11, 90]);`,

    prime_sieve: `// 🧮 Sieve of Eratosthenes (Prime Numbers Generator)
function sievePrimes(max) {
  const isPrime = new Array(max + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let p = 2; p * p <= max; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= max; i += p) isPrime[i] = false;
    }
  }

  const primes = [];
  for (let i = 2; i <= max; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

console.log("Calculating all Prime Numbers up to 100:");
const primes = sievePrimes(100);
console.log("Total Primes Found:", primes.length);
console.log("Primes:", primes.join(", "));`
  };

  editor.value = presets.fibonacci;

  if (presetSelect) {
    presetSelect.addEventListener('change', () => {
      SoundFX.playClick();
      const val = presetSelect.value;
      if (presets[val]) editor.value = presets[val];
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      SoundFX.playClick();
      const val = presetSelect ? presetSelect.value : 'fibonacci';
      if (presets[val]) editor.value = presets[val];
      showToast(currentLang === 'km' ? 'បានកំណត់កូដឡើងវិញ!' : 'Code reset to preset template.');
    });
  }

  function executeCode() {
    SoundFX.playClick();
    const code = editor.value;
    outputConsole.innerHTML = '';

    const logs = [];
    const originalLog = console.log;

    console.log = function(...args) {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      originalLog.apply(console, args);
    };

    const startTime = performance.now();
    let hasError = false;

    try {
      const runner = new Function(code);
      runner();
    } catch (err) {
      hasError = true;
      logs.push('❌ Runtime Error: ' + err.message);
    } finally {
      console.log = originalLog;
    }

    const duration = (performance.now() - startTime).toFixed(2);

    if (metricsEl) {
      metricsEl.textContent = hasError 
        ? `⚠️ Exit with Error (${duration} ms)`
        : `⏱️ Executed in ${duration} ms • Memory: ~4KB`;
      metricsEl.style.color = hasError ? '#f43f5e' : '#22c55e';
    }

    logs.forEach(log => {
      const line = document.createElement('div');
      line.className = 'console-line';
      if (log.startsWith('❌')) line.classList.add('error');
      else if (log.startsWith('✓') || log.startsWith('🎉') || log.includes('✅')) line.classList.add('success');
      line.textContent = log;
      outputConsole.appendChild(line);
    });

    if (!hasError) {
      SoundFX.playSuccess();
      fireConfetti();
      const prog = getProgress();
      prog.xp += 20;
      saveProgress(prog);
      showToast(currentLang === 'km' ? '🎉 កូដដំណើរការជោគជ័យ! +20 XP ទទួលបាន' : '🎉 Code executed successfully! +20 XP earned');
    }
  }

  runBtn.addEventListener('click', executeCode);

  editor.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      executeCode();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
    }
  });
}

/* ==========================================================================
   15. TURING AI CYBERBOT (Interactive Bilingual CS Assistant)
   ========================================================================== */
function initTuringCyberBot() {
  if (document.querySelector('.cyberbot-fab')) return;

  const fab = document.createElement('div');
  fab.className = 'cyberbot-fab';
  fab.id = 'cyberbot-trigger';
  fab.innerHTML = `
    <div class="cyberbot-avatar-box">🤖</div>
    <div class="cyberbot-fab-info">
      <span class="cyberbot-fab-title">Turing AI</span>
      <span class="cyberbot-fab-status">
        <span class="cyberbot-pulse-dot"></span>
        <span data-i18n="bot_status">CS Assistant</span>
      </span>
    </div>
  `;
  document.body.appendChild(fab);

  const windowEl = document.createElement('div');
  windowEl.className = 'cyberbot-window';
  windowEl.id = 'cyberbot-modal';
  windowEl.innerHTML = `
    <div class="cyberbot-header">
      <div class="cyberbot-header-left">
        <div class="cyberbot-avatar-box" style="width:32px;height:32px;font-size:1.05rem;">🤖</div>
        <div>
          <div class="cyberbot-header-title">Turing CyberBot</div>
          <div class="cyberbot-header-sub">AI CS Mentor • 🇰🇭 &amp; 🇺🇸</div>
        </div>
      </div>
      <div class="cyberbot-header-actions">
        <button class="cyberbot-icon-btn" id="cyberbot-matrix-btn" title="Toggle Matrix Rain">🌧️</button>
        <button class="cyberbot-icon-btn" id="cyberbot-clear-btn" title="Clear chat">🗑️</button>
        <button class="cyberbot-icon-btn" id="cyberbot-close-btn" title="Close">✕</button>
      </div>
    </div>

    <div class="cyberbot-body" id="cyberbot-messages">
      <div class="cyberbot-msg bot">
        <div class="cyberbot-msg-avatar">🤖</div>
        <div class="cyberbot-msg-bubble">
          <div>សួស្តី! ខ្ញុំជា <strong>Turing AI</strong> ជំនួយការវិទ្យាសាស្ត្រកុំព្យូទ័ររបស់អ្នក។ អ្នកអាចសួរខ្ញុំអំពី Big-O, Data Structures, Algorithms, SQL, OS ឬលេង Pop Quiz ភ្លាមៗ!</div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">Greetings! Ask me any CS concept, type code requests, or try a rapid pop quiz.</div>
          <div class="cyberbot-chips-container">
            <button class="cyberbot-chip" data-query="តើ Big-O ជាអ្វី?">⚡ Big-O ជាអ្វី?</button>
            <button class="cyberbot-chip" data-query="Stack vs Queue ខុសគ្នាយ៉ាងណា?">📦 Stack vs Queue?</button>
            <button class="cyberbot-chip" data-query="ACID ក្នុង Database ជាអ្វី?">🗄️ ACID ក្នុង SQL</button>
            <button class="cyberbot-chip" data-query="Dijkstra Shortest Path">⚙️ Dijkstra Algorithm</button>
            <button class="cyberbot-chip" data-query="/quiz">🎯 Pop Quiz ភ្លាមៗ!</button>
            <button class="cyberbot-chip" data-query="/matrix">🌧️ Matrix Mode</button>
          </div>
        </div>
      </div>
    </div>

    <div class="cyberbot-footer">
      <form class="cyberbot-input-form" id="cyberbot-form">
        <input type="text" class="cyberbot-input" id="cyberbot-input" placeholder="សួរសំណួរ CS ឬវាយ /help..." autocomplete="off">
        <button type="submit" class="cyberbot-send-btn" id="cyberbot-send">➤</button>
      </form>
    </div>
  `;
  document.body.appendChild(windowEl);

  const messagesContainer = document.getElementById('cyberbot-messages');
  const inputEl = document.getElementById('cyberbot-input');
  const formEl = document.getElementById('cyberbot-form');
  const closeBtn = document.getElementById('cyberbot-close-btn');
  const clearBtn = document.getElementById('cyberbot-clear-btn');
  const matrixBtn = document.getElementById('cyberbot-matrix-btn');

  function openBot() {
    windowEl.classList.add('open');
    SoundFX.playClick();
    setTimeout(() => inputEl.focus(), 200);
  }

  function closeBot() {
    windowEl.classList.remove('open');
    SoundFX.playClick();
  }

  fab.addEventListener('click', () => {
    windowEl.classList.contains('open') ? closeBot() : openBot();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeBot);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      appendBotMsg(currentLang === 'km' 
        ? '🗑️ បានសម្អាតប្រវត្តិសារ។ តើអ្នកចង់សិក្សាអំពីប្រធានបទអ្វីបន្តទៀត?'
        : '🗑️ Chat history cleared. What would you like to explore next?');
    });
  }

  if (matrixBtn) {
    matrixBtn.addEventListener('click', () => {
      if (typeof window.toggleMatrixRain === 'function') {
        window.toggleMatrixRain();
      }
    });
  }

  function appendUserMsg(text) {
    const msg = document.createElement('div');
    msg.className = 'cyberbot-msg user';
    msg.innerHTML = `
      <div class="cyberbot-msg-avatar">👤</div>
      <div class="cyberbot-msg-bubble">${escapeHtml(text)}</div>
    `;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendBotMsg(html) {
    SoundFX.playBlip();
    const msg = document.createElement('div');
    msg.className = 'cyberbot-msg bot';
    msg.innerHTML = `
      <div class="cyberbot-msg-avatar">🤖</div>
      <div class="cyberbot-msg-bubble">${html}</div>
    `;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    msg.querySelectorAll('.cyberbot-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-query');
        handleUserQuery(q);
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  const botQuizzes = [
    {
      q: "តើ Time Complexity នៃ Binary Search លើ Sorted Array ស្មើនឹងប៉ុន្មាន?",
      opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      ans: 1,
      exp: "ត្រឹមត្រូវ! Binary Search ចែកទំហំស្វែងរកជាពីររាល់ជំហាន ដូច្នេះ Complexity គឺ O(log n)។"
    },
    {
      q: "រចនាសម្ព័ន្ធទិន្នន័យ (Data Structure) ណាដែលដំណើរការតាមគោលការណ៍ LIFO?",
      opts: ["Queue", "Stack", "Binary Tree", "Linked List"],
      ans: 1,
      exp: "ត្រឹមត្រូវ! Stack ដំណើរការបែប Last-In, First-Out (ដាក់ចូលក្រោយគេ ចេញមុនគេ)។"
    },
    {
      q: "ក្នុង Database គោលការណ៍ 'A' ក្នុង ACID តំណាងអោយអ្វី?",
      opts: ["Asynchronous", "Atomicity", "Availability", "Authentication"],
      ans: 1,
      exp: "ត្រឹមត្រូវ! Atomicity មានន័យថា ប្រតិបត្តិការ Transaction ត្រូវតែជោគជ័យទាំងអស់ ឬបរាជ័យទាំងអស់ (All or Nothing)។"
    },
    {
      q: "ស្រទាប់ (Layer) ទី ៤ នៃ 7-Layer OSI Model គឺអ្វី?",
      opts: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"],
      ans: 1,
      exp: "ត្រឹមត្រូវ! Layer 4 គឺ Transport Layer (ទទួលខុសត្រូវលើ TCP / UDP)។"
    }
  ];

  function triggerBotQuiz() {
    const q = botQuizzes[Math.floor(Math.random() * botQuizzes.length)];
    let optsHtml = '';
    q.opts.forEach((opt, idx) => {
      optsHtml += `<button class="cyberbot-quiz-opt" data-idx="${idx}">${String.fromCharCode(65 + idx)}. ${opt}</button>`;
    });

    const quizBoxHtml = `
      <div style="font-weight:700;color:var(--cyan);margin-bottom:4px;">🎯 Quick Pop-Quiz (+25 XP)</div>
      <div style="font-size:0.88rem;margin-bottom:8px;">${q.q}</div>
      <div class="cyberbot-quiz-box">
        <div class="cyberbot-quiz-options">${optsHtml}</div>
      </div>
    `;
    appendBotMsg(quizBoxHtml);

    const latestMsg = messagesContainer.lastElementChild;
    const buttons = latestMsg.querySelectorAll('.cyberbot-quiz-opt');

    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        const chosen = parseInt(this.getAttribute('data-idx'), 10);
        buttons.forEach(b => b.disabled = true);

        if (chosen === q.ans) {
          this.classList.add('correct');
          SoundFX.playSuccess();
          fireConfetti();
          const prog = getProgress();
          prog.xp += 25;
          saveProgress(prog);
          setTimeout(() => {
            appendBotMsg(`🎉 <strong>ចម្លើយត្រឹមត្រូវ! +25 XP!</strong><br>${q.exp}`);
          }, 350);
        } else {
          this.classList.add('wrong');
          buttons[q.ans].classList.add('correct');
          SoundFX.playClick();
          setTimeout(() => {
            appendBotMsg(`❌ មិនទាន់ត្រឹមត្រូវទេ។ ចម្លើយពិតគឺ <strong>${q.opts[q.ans]}</strong>។<br>${q.exp}`);
          }, 350);
        }
      });
    });
  }

  function handleUserQuery(query) {
    if (!query || !query.trim()) return;
    const text = query.trim();
    appendUserMsg(text);

    const lower = text.toLowerCase();

    if (lower === '/matrix') {
      window.toggleMatrixRain(true);
      appendBotMsg('🟢 បានបើកដំណើរការ Matrix Digital Rain! ចុចប៊ូតុង ✕ Exit ឬចុចគ្រាប់ចុច [ESC] ដើម្បីត្រឡប់មកវិញ។');
      return;
    }
    if (lower === '/quiz') {
      setTimeout(triggerBotQuiz, 300);
      return;
    }
    if (lower === '/wisdom' || lower === '/quote') {
      const quotes = [
        "Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson",
        "Talk is cheap. Show me the code. — Linus Torvalds",
        "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra"
      ];
      const r = quotes[Math.floor(Math.random() * quotes.length)];
      appendBotMsg(`💡 <em>"${r}"</em>`);
      return;
    }
    if (lower === '/help') {
      appendBotMsg(`
        <strong>ពាក្យបញ្ជាដែលមាន (Available Commands):</strong><br>
        • <code>/quiz</code> : តេស្តសំណួរ Pop Quiz យក +25 XP<br>
        • <code>/matrix</code> : បើកផ្ទាំងភ្លៀងកូដ Matrix Digital Rain<br>
        • <code>/wisdom</code> : ទទួលយកសម្រង់គំនិតប្រាជ្ញាកុំព្យូទ័រ<br>
        • ឬសួរសំណួរដូចជា: <em>Big-O, Stack vs Queue, Dijkstra, ACID, Sorting, Memory</em>
      `);
      return;
    }

    setTimeout(() => {
      let reply = '';

      if (lower.includes('big-o') || lower.includes('big o') || lower.includes('complexity') || lower.includes('កម្រិតស្មុគ')) {
        reply = `
          ⚡ <strong>Big-O Notation (កម្រិតស្មុគស្មាញក្បួនដោះស្រាយ)</strong><br>
          Big-O ពិពណ៌នាអំពីល្បឿន ឬទំហំអង្គចងចាំដែល Algorithm ត្រូវការ នៅពេលទំហំទិន្នន័យ (n) កើនឡើងធំខ្លាំង (Asymptotic Growth)៖<br>
          • <strong>O(1)</strong>: Constant Time (លឿនបំផុត ដូចជា Hash Map Lookup)<br>
          • <strong>O(log n)</strong>: Logarithmic (ដូចជា Binary Search)<br>
          • <strong>O(n)</strong>: Linear (រត់រង្វិលជុំ Loop ម្តងលើ Array)<br>
          • <strong>O(n log n)</strong>: Merge Sort, Quick Sort<br>
          • <strong>O(n²)</strong>: Nested Loops (ដូចជា Bubble Sort)<br>
          👉 <a href="foundations.html#big-o" style="color:var(--cyan);text-decoration:underline;">អានមេរៀនពេញលេញអំពី Big-O ទីនេះ</a>
        `;
      } else if (lower.includes('stack') || lower.includes('queue')) {
        reply = `
          📦 <strong>Stack vs Queue</strong><br>
          • <strong>Stack</strong>: ដំណើរការតាម <strong>LIFO</strong> (Last-In, First-Out)។ ធាតុដែលបញ្ចូលក្រោយគេ នឹងត្រូវទាញចេញមុនគេ (Push &amp; Pop)។ ឧទាហរណ៍៖ Undo/Redo, Browser Back button, Function Call Stack។<br>
          • <strong>Queue</strong>: ដំណើរការតាម <strong>FIFO</strong> (First-In, First-Out)។ ធាតុដែលចូលមុនគេ នឹងចេញមុនគេ (Enqueue &amp; Dequeue)។ ឧទាហរណ៍៖ Printer spooler, CPU Task Queue, Message brokers។<br>
          👉 <a href="data-structures.html#stacks-queues" style="color:var(--cyan);text-decoration:underline;">សាកល្បង Simulator Stack &amp; Queue ទីនេះ</a>
        `;
      } else if (lower.includes('dijkstra') || lower.includes('shortest path') || lower.includes('ផ្លូវខ្លី')) {
        reply = `
          ⚙️ <strong>Dijkstra's Algorithm (ក្បួនស្វែងរកផ្លូវខ្លីបំផុត)</strong><br>
          បង្កើតឡើងដោយលោក Edsger Dijkstra ក្នុងឆ្នាំ 1956។ ប្រើសម្រាប់រកផ្លូវខ្លីបំផុតពី Single Source ទៅកាន់ Node ផ្សេងៗក្នុង Weighted Graph (គ្មាន Negative Weights) ដោយប្រើ Min-Priority Queue។<br>
          • Time Complexity: <strong>O((V + E) log V)</strong> ជាមួយ Binary Heap។<br>
          👉 <a href="algorithms.html#graphs" style="color:var(--cyan);text-decoration:underline;">ចូលមើលចលនា Visualization Dijkstra ទីនេះ</a>
        `;
      } else if (lower.includes('acid') || lower.includes('database') || lower.includes('sql') || lower.includes('ទិន្នន័យ')) {
        reply = `
          🗄️ <strong>ACID Properties ក្នុង Relational Database</strong><br>
          • <strong>A - Atomicity</strong>: ជោគជ័យទាំងអស់ ឬបរាជ័យទាំងអស់ (All or Nothing)។<br>
          • <strong>C - Consistency</strong>: ទិន្នន័យត្រូវគោរពតាម Rules &amp; Constraints ជានិច្ច។<br>
          • <strong>I - Isolation</strong>: Transactions ដែលរត់ដំណាលគ្នា មិនត្រូវរំខានគ្នាទៅវិញទៅមកឡើយ។<br>
          • <strong>D - Durability</strong>: នៅពេល Commit រួច ទិន្នន័យនឹងមិនបាត់បង់ឡើយ ទោះដាច់ភ្លើងក៏ដោយ។<br>
          👉 <a href="databases.html#acid" style="color:var(--cyan);text-decoration:underline;">សាកល្បង Live SQL Runner ទីនេះ</a>
        `;
      } else if (lower.includes('sort') || lower.includes('រៀបលំដាប់') || lower.includes('bubble') || lower.includes('merge')) {
        reply = `
          🔄 <strong>Sorting Algorithms (ក្បួនរៀបលំដាប់ទិន្នន័យ)</strong><br>
          • <strong>Bubble Sort</strong>: O(n²) — សាមញ្ញ តែយឺតសម្រាប់ទិន្នន័យធំ។<br>
          • <strong>Merge Sort</strong>: O(n log n) — Divide and Conquer, Stable, ត្រូវការ Extra Memory O(n)។<br>
          • <strong>Quick Sort</strong>: O(n log n) average — ប្រើ Pivot, In-place មិនបាច់ប្រើ Memory បន្ថែមច្រើន។<br>
          👉 <a href="algorithms.html#sorting" style="color:var(--cyan);text-decoration:underline;">ចូលមើលម៉ាស៊ីនពិសោធន៍ Sorting Visualizer ផ្ទាល់</a>
        `;
      } else if (lower.includes('memory') || lower.includes('heap') || lower.includes('អង្គចងចាំ')) {
        reply = `
          💻 <strong>Memory Architecture: Stack vs Heap</strong><br>
          • <strong>Stack</strong>: លឿនបំផុត, បែងចែកស្វ័យប្រវត្តិតាម Function Call Frame (LIFO), ទំហំមានកំណត់ (អាចកើតមាន Stack Overflow)។<br>
          • <strong>Heap</strong>: Dynamic memory allocation (<code>malloc</code>, <code>new</code>), ទំហំធំជាង, យឺតជាងបន្តិច និងត្រូវការ Garbage Collection ឬ Manual Free ដើម្បីចៀសវាង Memory Leak។<br>
          👉 <a href="programming.html#memory" style="color:var(--cyan);text-decoration:underline;">អានមេរៀនលម្អិតអំពី Memory ទីនេះ</a>
        `;
      } else if (lower.includes('os') || lower.includes('deadlock') || lower.includes('process') || lower.includes('thread')) {
        reply = `
          🖥️ <strong>Operating Systems &amp; Concurrency</strong><br>
          • <strong>Process vs Thread</strong>: Process មាន Address Space ដាច់ដោយឡែកពីគ្នា រីឯ Threads ក្នុង Process តែមួយចែករំលែក Memory ជាមួយគ្នា។<br>
          • <strong>Deadlock (ការគាំងដំណើរការ)</strong> កើតឡើងនៅពេល Threads រង់ចាំ Resource គ្នាទៅវិញទៅមកជាវដ្តបិទជិត (Circular Wait) ក្រោមលក្ខខណ្ឌ Coffman ទាំង ៤។<br>
          👉 <a href="operating-systems.html" style="color:var(--cyan);text-decoration:underline;">ចូលមើលម៉ាស៊ីន CPU Round Robin Scheduler</a>
        `;
      } else if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('បញ្ញាសិប្បនិម្មិត')) {
        reply = `
          🧠 <strong>Artificial Intelligence &amp; Deep Learning</strong><br>
          AI សម័យទំនើបពឹងផ្អែកលើ Artificial Neural Networks និងស្ថាបត្យកម្ម Transformer ដែលប្រើយន្តការ Self-Attention។<br>
          • វិស័យស្នូល៖ Supervised Learning, Reinforcement Learning, Computer Vision, និង LLMs។<br>
          👉 <a href="specializations.html#ai" style="color:var(--cyan);text-decoration:underline;">ស្វែងយល់ពី Roadmap ជំនាញ AI &amp; Data Science</a>
        `;
      } else {
        reply = currentLang === 'km' ? `
          🤖 <strong>ឆ្លើយតបសំណួរ៖</strong><br>
          សំណួររបស់អ្នកពាក់ព័ន្ធនឹង <em>"${escapeHtml(text)}"</em>។ ក្នុងវេទិកា CS Academy នេះ យើងមានមេរៀនពេញលេញចាប់ពី <strong>មូលដ្ឋានគ្រឹះកុំព្យូទ័រ</strong> រហូតដល់ <strong>ស្ថាបត្យកម្មប្រព័ន្ធកម្រិតខ្ពស់</strong>!<br>
          តើអ្នកចង់៖
          <div class="cyberbot-chips-container" style="margin-top:8px;">
            <button class="cyberbot-chip" data-query="⚡ Big-O ជាអ្វី?">ពន្យល់ Big-O</button>
            <button class="cyberbot-chip" data-query="Stack vs Queue ខុសគ្នាយ៉ាងណា?">Stack vs Queue</button>
            <button class="cyberbot-chip" data-query="/quiz">សាកល្បង Pop Quiz</button>
            <button class="cyberbot-chip" data-query="/matrix">បើក Matrix Rain</button>
          </div>
        ` : `
          🤖 <strong>Turing AI Response:</strong><br>
          Regarding <em>"${escapeHtml(text)}"</em>: Our platform covers comprehensive topics from fundamental binary logic to distributed cloud architectures.<br>
          Explore these quick modules:
          <div class="cyberbot-chips-container" style="margin-top:8px;">
            <button class="cyberbot-chip" data-query="⚡ Big-O ជាអ្វី?">Explain Big-O</button>
            <button class="cyberbot-chip" data-query="Stack vs Queue">Stack vs Queue</button>
            <button class="cyberbot-chip" data-query="/quiz">Take Pop Quiz</button>
            <button class="cyberbot-chip" data-query="/matrix">Matrix Rain Mode</button>
          </div>
        `;
      }

      appendBotMsg(reply);
    }, 400);
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = inputEl.value;
    inputEl.value = '';
    handleUserQuery(val);
  });

  document.querySelectorAll('.cyberbot-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      handleUserQuery(q);
    });
  });
}

/* ==========================================================================
   16. INTERACTIVE CURSOR SPARK CONSTELLATION
   ========================================================================== */
function initCursorSparks() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let canvas = document.getElementById('cursor-spark-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cursor-spark-canvas';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const sparks = [];
  let mouse = { x: -100, y: -100, lastX: -100, lastY: -100 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 6 && sparks.length < 40) {
      sparks.push({
        x: mouse.x,
        y: mouse.y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.4,
        size: Math.random() * 2.5 + 1.2,
        alpha: 0.8,
        color: Math.random() > 0.5 ? '6, 182, 212' : '139, 92, 246'
      });
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    }
  });

  function renderSparks() {
    ctx.clearRect(0, 0, width, height);

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.025;
      s.size = Math.max(0.2, s.size * 0.96);

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
      ctx.shadowColor = `rgba(${s.color}, 0.8)`;
      ctx.shadowBlur = 6;
      ctx.fill();
    }

    requestAnimationFrame(renderSparks);
  }

  renderSparks();
}

/* ==========================================================================
   17. SMOOTH PAGE & LINK NAVIGATION TRANSITIONS
   ========================================================================== */
function ensurePageLoader() {
  let loader = document.getElementById('cyber-page-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'cyber-page-loader';
    document.body.prepend(loader);
  }
  return loader;
}

function highlightCurrentNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop().split('#')[0];
    
    if (linkPath === currentPath) {
      link.classList.add('active');
      const parentDropdown = link.closest('.has-dropdown');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    } else if (!link.closest('.has-dropdown')) {
      if (currentPath !== 'index.html' && linkPath === 'index.html') {
        link.classList.remove('active');
      }
    }
  });
}

function initSmoothPageTransitions() {
  const loader = ensurePageLoader();
  highlightCurrentNavLink();

  document.body.classList.remove('page-transitioning');
  if (loader) loader.classList.remove('active');

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-transitioning');
    if (loader) loader.classList.remove('active');
    highlightCurrentNavLink();
  });

  document.addEventListener('click', (e) => {
    // Allow user to use middle click or ctrl/cmd click to open in new tab naturally
    if (e.ctrlKey || e.metaKey || e.button === 1) return;

    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Handle hash anchor jumps smoothly with navbar clearance
    if (href.startsWith('#')) {
      if (href.length > 1) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          SoundFX.playClick();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetEl.classList.remove('target-highlight');
          void targetEl.offsetWidth; // force reflow
          targetEl.classList.add('target-highlight');
          setTimeout(() => targetEl.classList.remove('target-highlight'), 1600);
          history.pushState(null, null, href);
        }
      }
      return;
    }

    // Ignore special protocols
    if (
      href.startsWith('javascript:') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.hasAttribute('download') ||
      link.getAttribute('target') === '_blank'
    ) {
      return;
    }

    // Ignore external origin links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        const url = new URL(href);
        if (url.origin !== window.location.origin) return;
      } catch (err) {
        return;
      }
    }

    // If clicking link of current page, smoothly scroll to top
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const targetPath = href.split('/').pop().split('#')[0];
    if (targetPath === currentPath && !href.includes('#')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Play sound & show top loader without blocking standard navigation
    try {
      if (typeof SoundFX !== 'undefined' && SoundFX.playBlip) {
        SoundFX.playBlip();
      }
    } catch(err) {}

    const loaderEl = ensurePageLoader();
    if (loaderEl) loaderEl.classList.add('active');
  });
}

/* ==========================================================================
   18. INTERACTIVE BUTTON CLICK RIPPLE WAVE
   ========================================================================== */
function initButtonRipples() {
  const rippleTargets = '.btn, .tab-btn, .nav-link, .search-trigger-btn, .icon-btn, .progress-pill, .cyberbot-chip, .cyberbot-fab, .cyberbot-send-btn, .brand-link, .quiz-opt';

  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest(rippleTargets);
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';

    const size = Math.max(rect.width, rect.height) * 1.5;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    btn.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 600);
  });
}

/* ==========================================================================
   19. INFINITE COMPUTER SCIENCE TICKER STREAMERS (TOP & BOTTOM)
   ========================================================================== */
const CS_TOP_TICKER_DATA = {
  en: [
    { icon: "🧠", title: "P vs NP Problem:", desc: "The $1,000,000 Millennium Prize Question in Theoretical Computation" },
    { icon: "⚡", title: "Quantum Computing:", desc: "Qubits, Superposition, Entanglement & Shor's Factoring Polynomial" },
    { icon: "💡", title: "Alan Turing (1936):", desc: "Universal Turing Machine & The Undecidability of the Halting Problem" },
    { icon: "🌐", title: "Shannon's Law:", desc: "Information Entropy & The Theoretical Maximum Capacity of Communication Channels" },
    { icon: "💻", title: "Von Neumann Model:", desc: "Stored-Program Architecture, CPU Instruction Cycle & System Bus" },
    { icon: "🛡️", title: "CAP Theorem:", desc: "Consistency, Availability, and Partition Tolerance Trade-offs in Distributed Clusters" },
    { icon: "🤖", title: "Neural Transformers:", desc: "Self-Attention Mechanism & Scaling Laws Driving Modern Frontier AI" },
    { icon: "📜", title: "Dijkstra's Maxim:", desc: "\"Computer science is no more about computers than astronomy is about telescopes.\"" }
  ],
  km: [
    { icon: "🧠", title: "បញ្ហា P vs NP:", desc: "សំណួរតម្លៃ $1,000,000 ដ៏ល្បីល្បាញបំផុតក្នុងទ្រឹស្តីកុំព្យូទ័រ (Millennium Prize)" },
    { icon: "⚡", title: "Quantum Computing:", desc: "Qubits, Superposition និងក្បួនដោះស្រាយបំបែកលេខសម្ងាត់ Shor" },
    { icon: "💡", title: "ម៉ាស៊ីន Turing (1936):", desc: "Universal Machine ដែលជាគ្រឹះនៃកុំព្យូទ័រ និងបញ្ហា Halting Problem" },
    { icon: "🌐", title: "ច្បាប់ Shannon:", desc: "ទ្រឹស្តីព័ត៌មាន Binary Entropy និងកម្រិតអតិបរមានៃការបញ្ជូនទិន្នន័យ" },
    { icon: "💻", title: "ស្ថាបត្យកម្ម Von Neumann:", desc: "Stored-Program, វដ្តដំណើរការ CPU Instruction, Registers & Bus" },
    { icon: "🛡️", title: "ទ្រឹស្តីបទ CAP:", desc: "តុល្យភាពរវាង Consistency, Availability & Partition ក្នុងប្រព័ន្ធ Distributed" },
    { icon: "🤖", title: "គំរូ Transformer:", desc: "យន្តការ Self-Attention ដែលផ្លាស់ប្តូរវិស័យបញ្ញាសិប្បនិម្មិត AI ទាំងស្រុង" },
    { icon: "📜", title: "ទស្សនវិជ្ជា Dijkstra:", desc: "\"វិទ្យាសាស្ត្រកុំព្យូទ័រមិនមែនត្រឹមតែកុំព្យូទ័រ ដូចតារាសាស្ត្រមិនមែនត្រឹមតេឡេស្កុបឡើយ\"" }
  ]
};

const CS_TICKER_DATA = {
  en: [
    { icon: "⚙️", title: "Algorithms:", desc: "O(1) Constant ➔ O(log n) Binary Search ➔ O(n log n) Merge Sort ➔ Dynamic Programming" },
    { icon: "📦", title: "Data Structures:", desc: "Dynamic Arrays • Stacks (LIFO) • Queues (FIFO) • Binary Search Trees • Hash Tables" },
    { icon: "💻", title: "Memory & Systems:", desc: "Stack vs Heap • Pointer Arithmetic • Virtual Memory Paging • Garbage Collection" },
    { icon: "🖥️", title: "Operating Systems:", desc: "CPU Round Robin • Multithreading • Mutex Locks • Deadlock Prevention" },
    { icon: "🌐", title: "Networking:", desc: "7-Layer OSI • TCP 3-Way Handshake • DNS Hierarchy • HTTP/3 QUIC • CIDR Subnetting" },
    { icon: "🗄️", title: "Databases:", desc: "ACID Guarantees • Relational Normalization • B+ Tree Indexing • Live SQL Engine" },
    { icon: "🧠", title: "AI & Neural Nets:", desc: "Deep Learning • Transformer Architecture • Self-Attention • Backpropagation • LLMs" },
    { icon: "🔐", title: "Cybersecurity:", desc: "AES-256 Encryption • RSA Public Key • Zero Trust Architecture • SHA-256 Hashing" }
  ],
  km: [
    { icon: "⚙️", title: "ក្បួនដោះស្រាយ (Algorithms):", desc: "O(1) Constant ➔ O(log n) Binary Search ➔ O(n log n) Merge Sort ➔ Dynamic Programming" },
    { icon: "📦", title: "រចនាសម្ព័ន្ធទិន្នន័យ (Data Structures):", desc: "Arrays • Stacks (LIFO) • Queues (FIFO) • Binary Search Trees • Hash Tables" },
    { icon: "💻", title: "ការសរសេរកូដ & អង្គចងចាំ:", desc: "Stack vs Heap • Pointer Arithmetic • Virtual Memory Paging • Garbage Collection" },
    { icon: "🖥️", title: "ប្រព័ន្ធប្រតិបត្តិការ (OS):", desc: "CPU Round Robin • Multithreading • Mutex Locks • ការទប់ស្កាត់ Deadlock" },
    { icon: "🌐", title: "បណ្តាញកុំព្យូទ័រ (Networking):", desc: "គំរូ ៧ ស្រទាប់ OSI • TCP Handshake • ស្ថាបត្យកម្ម DNS • HTTP/3 QUIC • Subnetting" },
    { icon: "🗄️", title: "មូលដ្ឋានទិន្នន័យ (Databases):", desc: "គោលការណ៍ ACID • Relational Normalization • B+ Tree Indexing • Live SQL Runner" },
    { icon: "🧠", title: "បញ្ញាសិប្បនិម្មិត (AI):", desc: "បណ្តាញប្រសាទសិប្បនិម្មិត • Transformer Attention • Deep Learning • LLMs" },
    { icon: "🔐", title: "សន្តិសុខប្រព័ន្ធ (Cybersecurity):", desc: "AES-256 Encryption • RSA Public Key • Zero Trust • SHA-256 Hashing" }
  ]
};

function updateTickerContent(lang) {
  // 1. Update Top Ticker (Frontiers & Breakthroughs)
  const topTrack = document.getElementById('hero-card-top-ticker-track');
  if (topTrack) {
    const topItems = CS_TOP_TICKER_DATA[lang] || CS_TOP_TICKER_DATA.en;
    let topHtml = '';
    for (let set = 0; set < 2; set++) {
      topItems.forEach(item => {
        topHtml += `
          <div class="hero-top-ticker-item">
            <span class="ticker-icon">${item.icon}</span>
            <strong class="top-ticker-title">${item.title}</strong>
            <span>${item.desc}</span>
          </div>
          <div class="hero-top-ticker-sep">✦</div>
        `;
      });
    }
    topTrack.innerHTML = topHtml;
  }

  // 2. Update Bottom Ticker (Core Computing Stack)
  const bottomTracks = [
    document.getElementById('hero-card-ticker-track'),
    document.getElementById('cs-ticker-track')
  ].filter(Boolean);

  if (bottomTracks.length > 0) {
    const items = CS_TICKER_DATA[lang] || CS_TICKER_DATA.en;
    let html = '';
    for (let set = 0; set < 2; set++) {
      items.forEach(item => {
        html += `
          <div class="hero-ticker-item cs-ticker-item">
            <span class="ticker-icon">${item.icon}</span>
            <strong class="ticker-title">${item.title}</strong>
            <span>${item.desc}</span>
          </div>
          <div class="hero-ticker-sep cs-ticker-separator">✦</div>
        `;
      });
    }
    bottomTracks.forEach(track => {
      track.innerHTML = html;
    });
  }
}

/* ==========================================================================
   20. HERO DYNAMIC CS TYPEWRITER EFFECT
   ========================================================================== */
let typewriterTimeout = null;

function initHeroTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const wordsDict = {
    en: [
      "Computer Science",
      "Algorithmic Thinking",
      "Data Structures & Trees",
      "Operating Systems & Memory",
      "Distributed Cloud Networks",
      "Relational SQL Databases",
      "Artificial Intelligence & LLMs",
      "Modern Cybersecurity"
    ],
    km: [
      "វិទ្យាសាស្ត្រកុំព្យូទ័រ",
      "ក្បួនដោះស្រាយ & Big-O",
      "រចនាសម្ព័ន្ធទិន្នន័យ & Trees",
      "ប្រព័ន្ធប្រតិបត្តិការ OS & Memory",
      "បណ្តាញកុំព្យូទ័រ & Cloud",
      "មូលដ្ឋានទិន្នន័យ SQL & ACID",
      "បញ្ញាសិប្បនិម្មិត AI & Machine Learning",
      "សន្តិសុខប្រព័ន្ធ Cybersecurity"
    ]
  };

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeStep() {
    const list = wordsDict[currentLang] || wordsDict.en;
    if (wordIndex >= list.length) wordIndex = 0;
    const currentWord = list[wordIndex];

    if (!isDeleting) {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        typewriterTimeout = setTimeout(typeStep, 2200);
        return;
      }
      typewriterTimeout = setTimeout(typeStep, 70);
    } else {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % list.length;
        typewriterTimeout = setTimeout(typeStep, 400);
        return;
      }
      typewriterTimeout = setTimeout(typeStep, 35);
    }
  }

  if (typewriterTimeout) clearTimeout(typewriterTimeout);
  typeStep();
}
