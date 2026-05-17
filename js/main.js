document.addEventListener('DOMContentLoaded', () => {
  /* THEME TOGGLE */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check system preference or localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  /* COPY PROTECTION (Optional but requested to be maintained) */
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) e.preventDefault();
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))) e.preventDefault();
  });
  document.addEventListener('copy', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  /* CUSTOM CURSOR */
  const cur = document.getElementById('cur');
  const curR = document.getElementById('curR');
  
  if (cur && curR && window.innerWidth > 900) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    document.addEventListener('mousemove', e => { 
      mx = e.clientX; 
      my = e.clientY; 
      cur.style.left = mx + 'px'; 
      cur.style.top = my + 'px';
    });
    
    const anim = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      curR.style.left = rx + 'px';
      curR.style.top = ry + 'px';
      requestAnimationFrame(anim);
    };
    anim();
    
    document.querySelectorAll('a, button, .theme-toggle').forEach(el => {
      el.addEventListener('mouseenter', () => {
        curR.style.transform = 'translate(-50%, -50%) scale(1.5)';
        curR.style.borderColor = 'var(--accent-color)';
        curR.style.opacity = '1';
      });
      el.addEventListener('mouseleave', () => {
        curR.style.transform = 'translate(-50%, -50%) scale(1)';
        curR.style.borderColor = 'var(--accent-color)';
        curR.style.opacity = '0.5';
      });
    });
  }

  /* SCROLL REVEAL */
  const obsOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => { 
      if (e.isIntersecting) { 
        setTimeout(() => e.target.classList.add('on'), i * 100); 
        obs.unobserve(e.target);
      } 
    });
  }, obsOptions);
  
  document.querySelectorAll('.rev').forEach(el => obs.observe(el));
});
