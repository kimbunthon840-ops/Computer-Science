/**
 * COMPUTER SCIENCE LEARNING PLATFORM
 * Quiz Engine: Question banks, interactive test taking, instant feedback & XP reward system
 */

const CS_QUIZ_BANK = {
  foundations: [
    {
      q: "What is the two's complement 8-bit binary representation of the decimal number -5?",
      options: [
        "11111011",
        "10000101",
        "11111010",
        "11110101"
      ],
      correct: 0,
      explanation: "To find two's complement of -5: (1) Find binary of +5 = 00000101; (2) Invert all bits (one's complement) = 11111010; (3) Add 1 = 11111011."
    },
    {
      q: "Which asymptotic time complexity represents the growth rate of finding an element in a balanced Binary Search Tree?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(1)"
      ],
      correct: 1,
      explanation: "In a balanced binary search tree, the height is logarithmic (log₂ n), so search, insertion, and deletion operate in O(log n) time."
    },
    {
      q: "According to De Morgan's Laws, what is the boolean equivalence of NOT (A AND B)?",
      options: [
        "(NOT A) AND (NOT B)",
        "(NOT A) OR (NOT B)",
        "A OR B",
        "NOT (A OR B)"
      ],
      correct: 1,
      explanation: "De Morgan's first theorem states that ¬(A ∧ B) ≡ (¬A) ∨ (¬B). Negating a conjunction turns it into a disjunction of negations."
    }
  ],

  "data-structures": [
    {
      q: "What is the worst-case time complexity of inserting a key into a Hash Table that handles collisions using separate chaining?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      correct: 2,
      explanation: "In the worst case (e.g. poor hash function hashing all keys to the exact same bucket), the chain degenerates into a linked list of length n, giving O(n)."
    },
    {
      q: "Which data structure is fundamentally used by the call stack for recursive function execution?",
      options: [
        "Queue (FIFO)",
        "Stack (LIFO)",
        "Circular Buffer",
        "Max Heap"
      ],
      correct: 1,
      explanation: "The call stack operates on Last-In, First-Out (LIFO) semantics, pushing stack frames on invocation and popping on return."
    },
    {
      q: "Which tree traversal order yields keys in ascending sorted order when applied to a valid Binary Search Tree?",
      options: [
        "Pre-order (Root, Left, Right)",
        "In-order (Left, Root, Right)",
        "Post-order (Left, Right, Root)",
        "Level-order (Breadth First)"
      ],
      correct: 1,
      explanation: "In-order traversal visits all nodes with keys smaller than the root, then the root itself, then larger keys, producing monotonic sorted order."
    }
  ],

  algorithms: [
    {
      q: "Which sorting algorithm achieves an average time complexity of O(n log n) and is NOT comparison-based?",
      options: [
        "Quick Sort",
        "Merge Sort",
        "Radix Sort",
        "Heap Sort"
      ],
      correct: 2,
      explanation: "Radix Sort processes keys digit-by-digit or bucket-by-bucket, allowing O(d · (n + k)) time, bypassing the Ω(n log n) comparison lower bound."
    },
    {
      q: "Which algorithm finds the single-source shortest path on a weighted graph with NON-NEGATIVE edge weights?",
      options: [
        "Dijkstra's Algorithm",
        "Bellman-Ford Algorithm",
        "Floyd-Warshall Algorithm",
        "Kruskal's Algorithm"
      ],
      correct: 0,
      explanation: "Dijkstra's algorithm uses a greedy approach with a priority queue in O((V + E) log V) time. If edge weights can be negative, Bellman-Ford is required."
    },
    {
      q: "What are the two core prerequisite properties required to solve a problem with Dynamic Programming?",
      options: [
        "Greedy choice property and deterministic transitions",
        "Optimal substructure and overlapping subproblems",
        "Divisibility and linear independence",
        "Binary branching and memoized caching"
      ],
      correct: 1,
      explanation: "Dynamic programming applies when the global optimum can be constructed from optimal solutions to subproblems (optimal substructure) and subproblems recur repeatedly (overlapping subproblems)."
    }
  ],

  programming: [
    {
      q: "Where are dynamic variables allocated via 'malloc' (in C) or 'new' (in C++/Java) stored in memory?",
      options: [
        "Call Stack",
        "Heap Memory",
        "Data / BSS Segment",
        "Code / Text Segment"
      ],
      correct: 1,
      explanation: "Dynamically allocated memory requested during program execution lives in the Heap, requiring explicit deallocation or garbage collection."
    },
    {
      q: "Which programming concept states that objects should be replaceable with instances of their subtypes without altering program correctness?",
      options: [
        "Single Responsibility Principle",
        "Liskov Substitution Principle",
        "Interface Segregation Principle",
        "Dependency Inversion Principle"
      ],
      correct: 1,
      explanation: "The 'L' in SOLID stands for Liskov Substitution Principle (LSP), formulated by Barbara Liskov in 1987."
    }
  ],

  "operating-systems": [
    {
      q: "Which CPU scheduling algorithm allocates fixed time slices (quanta) cyclically to each process in the ready queue?",
      options: [
        "First-Come, First-Served (FCFS)",
        "Shortest Job First (SJF)",
        "Round Robin (RR)",
        "Priority Scheduling"
      ],
      correct: 2,
      explanation: "Round Robin uses preemption with a defined time quantum, ensuring responsiveness and preventing process starvation in time-sharing systems."
    },
    {
      q: "Which of the following is NOT one of Coffman's four necessary conditions for a deadlock to occur?",
      options: [
        "Mutual Exclusion",
        "Hold and Wait",
        "No Preemption",
        "Preemptive Priority Inversion"
      ],
      correct: 3,
      explanation: "Coffman's four conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, and 4. Circular Wait."
    }
  ],

  networking: [
    {
      q: "At which layer of the 7-Layer OSI Model does the Router primarily operate?",
      options: [
        "Layer 2 - Data Link Layer",
        "Layer 3 - Network Layer",
        "Layer 4 - Transport Layer",
        "Layer 7 - Application Layer"
      ],
      correct: 1,
      explanation: "Routers inspect IP packet headers and make routing decisions at Layer 3 (Network Layer). Switches operate primarily at Layer 2 (MAC addresses)."
    },
    {
      q: "How many usable host IP addresses are available in a standard IPv4 /24 subnet (e.g. 192.168.1.0/24)?",
      options: [
        "256",
        "254",
        "255",
        "128"
      ],
      correct: 1,
      explanation: "A /24 subnet has 2^(32-24) = 2^8 = 256 addresses. Subtract 2 for the Network ID (.0) and Broadcast address (.255), leaving 254 usable host addresses."
    }
  ],

  databases: [
    {
      q: "In ACID database transaction guarantees, what does the 'I' stand for?",
      options: [
        "Integrity",
        "Isolation",
        "Indexing",
        "Immutability"
      ],
      correct: 1,
      explanation: "Isolation ensures concurrent transactions execute without interfering with one another, preventing dirty reads and phantom reads."
    },
    {
      q: "Which normal form requires that all non-key attributes be fully functionally dependent on the entire primary key, eliminating partial dependencies?",
      options: [
        "First Normal Form (1NF)",
        "Second Normal Form (2NF)",
        "Third Normal Form (3NF)",
        "Boyce-Codd Normal Form (BCNF)"
      ],
      correct: 1,
      explanation: "2NF requires 1NF + no partial dependency on candidate keys (every non-prime attribute depends on the whole key)."
    }
  ]
};

class QuizController {
  constructor(containerId, category = 'foundations') {
    this.container = document.getElementById(containerId);
    this.category = category;
    this.questions = CS_QUIZ_BANK[category] || CS_QUIZ_BANK.foundations;
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.renderQuestion();
  }

  renderQuestion() {
    const qData = this.questions[this.currentIndex];
    this.answered = false;

    this.container.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-badge">
          <svg class="cs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <span>${this.category.toUpperCase().replace('-', ' ')} KNOWLEDGE CHECK</span>
        </div>
        <div class="quiz-progress-text">Question ${this.currentIndex + 1} of ${this.questions.length}</div>
      </div>

      <div class="quiz-question-title">${qData.q}</div>

      <div class="quiz-options-list">
        ${qData.options.map((opt, idx) => `
          <button class="quiz-option-btn" data-index="${idx}">
            <span class="quiz-option-letter">${String.fromCharCode(65 + idx)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>

      <div class="quiz-feedback-box" id="quiz-feedback"></div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-primary btn-sm" id="quiz-next-btn" style="display: none;">Next Question →</button>
      </div>
    `;

    // Attach listeners
    this.container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.answered) return;
        const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
        this.checkAnswer(selectedIdx, btn);
      });
    });

    const nextBtn = this.container.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
          this.renderQuestion();
        } else {
          this.renderResults();
        }
      });
    }
  }

  checkAnswer(selectedIdx, selectedBtn) {
    this.answered = true;
    const qData = this.questions[this.currentIndex];
    const isCorrect = selectedIdx === qData.correct;
    const feedbackBox = this.container.querySelector('#quiz-feedback');
    const nextBtn = this.container.querySelector('#quiz-next-btn');

    this.container.querySelectorAll('.quiz-option-btn').forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === qData.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      this.score++;
      feedbackBox.className = 'quiz-feedback-box correct';
      feedbackBox.innerHTML = `<strong>✓ Correct!</strong> ${qData.explanation}`;
    } else {
      feedbackBox.className = 'quiz-feedback-box wrong';
      feedbackBox.innerHTML = `<strong>✗ Incorrect.</strong> ${qData.explanation}`;
    }

    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  renderResults() {
    const percentage = Math.round((this.score / this.questions.length) * 100);
    const passed = percentage >= 65;

    // Award XP
    if (passed && typeof getProgress === 'function' && typeof saveProgress === 'function') {
      const prog = getProgress();
      prog.xp += 100;
      prog.level = Math.floor(prog.xp / 250) + 1;
      saveProgress(prog);
      if (typeof showToast === 'function') {
        showToast(`🎉 Quiz Passed! You earned +100 XP! (Score: ${percentage}%)`);
      }
    }

    this.container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">${passed ? '🏆' : '📚'}</div>
        <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: #fff;">${passed ? 'Assessment Mastered!' : 'Keep Practicing!'}</h3>
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
          You scored <strong>${this.score} out of ${this.questions.length}</strong> (${percentage}%)
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary" id="quiz-retry-btn">Retry Assessment</button>
          <a href="progress.html" class="btn btn-secondary">View Learning Dashboard</a>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector('#quiz-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.currentIndex = 0;
        this.score = 0;
        this.renderQuestion();
      });
    }
  }
}

// Auto-initialize quizzes on any page with data-quiz-category
document.addEventListener('DOMContentLoaded', () => {
  const quizWidgets = document.querySelectorAll('[data-quiz-category]');
  quizWidgets.forEach(elem => {
    const category = elem.getAttribute('data-quiz-category');
    new QuizController(elem.id, category);
  });
});
