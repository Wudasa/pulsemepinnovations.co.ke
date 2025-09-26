// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Statistics Animation - Production Version
document.addEventListener('DOMContentLoaded', function() {
    const circles = document.querySelectorAll('.stat-circle');
    
    if (circles.length === 0) {
        return;
    }
    
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        hasAnimated = true;
        
        circles.forEach((circle, index) => {
            const progressCircle = circle.querySelector('.progress');
            const numberSpan = circle.querySelector('span');
            const target = parseInt(circle.getAttribute('data-target'));
            const type = circle.getAttribute('data-type');
            
            if (!progressCircle || !numberSpan) {
                return;
            }
            
            // Reset initial state
            numberSpan.textContent = '0';
            progressCircle.style.strokeDasharray = '427';
            progressCircle.style.strokeDashoffset = '427';
            
            // Animate the number
            let currentNumber = 0;
            const increment = target / 60;
            
            const numberTimer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= target) {
                    currentNumber = target;
                    clearInterval(numberTimer);
                }
                numberSpan.textContent = Math.round(currentNumber);
            }, 25);
            
            // Animate the circle
            const circumference = 427;
            let targetOffset;
            
            if (type === 'percent') {
                targetOffset = circumference - (target / 100) * circumference;
            } else {
                if (target <= 20) {
                    targetOffset = circumference - (target / 20) * circumference;
                } else {
                    targetOffset = circumference - (target / 100) * circumference;
                }
            }
            
            // Start circle animation with staggered delay
            setTimeout(() => {
                progressCircle.style.strokeDashoffset = targetOffset;
            }, index * 200);
        });
    }
    
    // Scroll trigger
    function checkStatsVisibility() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection || hasAnimated) return;
        
        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger when stats section is 70% visible
        if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
            animateStats();
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', checkStatsVisibility);
    
    // Check immediately in case stats are already visible
    checkStatsVisibility();
});