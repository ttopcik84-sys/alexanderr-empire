const comparison = document.querySelector('.legacy-map');
if (comparison) {
  const buttons = [...comparison.querySelectorAll('[data-map-view]')];
  const label = comparison.querySelector('.map-state-label');
  const before = comparison.querySelector('.map-before');
  const after = comparison.querySelector('.map-after');
  let chosenByVisitor = false;
  function showMap(state) {
    comparison.dataset.mapState = state;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mapView === state)));
    before.setAttribute('aria-hidden', String(state !== 'before'));
    after.setAttribute('aria-hidden', String(state !== 'after'));
    label.textContent = state === 'before' ? 'Alexander’s Empire' : 'The Hellenistic World in 281 BCE';
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    chosenByVisitor = true;
    showMap(button.dataset.mapView);
  }));
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showMap('before');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (!chosenByVisitor) showMap('after');
        observer.disconnect();
      }
    }, {threshold: .65});
    observer.observe(comparison);
  }
}
