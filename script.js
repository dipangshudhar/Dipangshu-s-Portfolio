function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

window.addEventListener('scroll', debounce(function() {
  console.log('Scroll event debounced');
}, 200));

function smoothAnimation(callback) {
  let lastTime = 0;
  function animationLoop(time) {
    const deltaTime = time - lastTime;
    lastTime = time;

    callback(deltaTime);

    requestAnimationFrame(animationLoop);
  }
  requestAnimationFrame(animationLoop);
}

smoothAnimation(function(deltaTime) {
});

const lazyLoadImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyLoadImages.forEach(image => {
  imageObserver.observe(image);
});
