document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.includes('/grades/')) {
    const match = path.match(/grade(\d+)\.html/);
    if (match) {
      const grade = match[1];
      const main = document.querySelector('main');

      // Button to mark grade as complete
      const btn = document.createElement('button');
      btn.id = 'complete-grade';
      const completed = localStorage.getItem('grade' + grade) === 'complete';
      btn.textContent = completed ? 'Grade Completed' : 'Mark as Complete';
      btn.disabled = completed;
      btn.addEventListener('click', () => {
        localStorage.setItem('grade' + grade, 'complete');
        btn.textContent = 'Grade Completed';
        btn.disabled = true;
      });
      main.appendChild(btn);

      // Navigation links
      const nav = document.createElement('div');
      nav.className = 'grade-nav';
      const gradeNum = parseInt(grade, 10);
      if (gradeNum > 1) {
        const prev = document.createElement('a');
        prev.href = `grade${gradeNum - 1}.html`;
        prev.textContent = 'Previous Grade';
        nav.appendChild(prev);
      }
      if (gradeNum < 16) {
        if (nav.firstChild) {
          nav.appendChild(document.createTextNode(' | '));
        }
        const next = document.createElement('a');
        next.href = `grade${gradeNum + 1}.html`;
        next.textContent = 'Next Grade';
        nav.appendChild(next);
      }
      main.appendChild(nav);
    }
  } else {
    const items = document.querySelectorAll('ol li');
    let completedCount = 0;
    items.forEach(li => {
      const link = li.querySelector('a');
      const match = link.getAttribute('href').match(/grade(\d+)\.html/);
      if (match) {
        const grade = match[1];
        if (localStorage.getItem('grade' + grade) === 'complete') {
          li.classList.add('completed');
          completedCount++;
        }
      }
    });
    const progress = document.createElement('p');
    progress.id = 'progress';
    progress.textContent = `Completed ${completedCount} of ${items.length} grades`;
    const main = document.querySelector('main');
    main.insertBefore(progress, main.firstChild);
  }
});
