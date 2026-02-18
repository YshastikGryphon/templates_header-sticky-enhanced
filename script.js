document.addEventListener('DOMContentLoaded', () => { 


stickyHeader();
function stickyHeader() {
  // options
  const header = document.querySelector('header');
  let maxOffset = header.getBoundingClientRect().height; // how far header can travel

  // update if screen is changed
  window.addEventListener('resize', () => {
    maxOffset = header.getBoundingClientRect().height;
  });

  // function params
  let _fixedPosition = 0; // point where header is "anchored". calculates distance to viewport top
  let _prevMoveIsUp = false;
  let _curScroll = document.documentElement.scrollTop;
  let _lastScroll = document.documentElement.scrollTop;
  
  // main function
  function check() {
    _curScroll = document.documentElement.scrollTop;

    // safari and android fix
    if (_curScroll < 0) {
      header.style.top = `0px`;
      return;
    };

    if (_lastScroll > _curScroll) {
      // page moving to top
      header.classList.add('--scrolling-top');
      header.classList.remove('--scrolling-bottom');

      // reset if user was moving to bottom
      if (_prevMoveIsUp === false) {
        if (!(_fixedPosition - _curScroll >= (-1 * maxOffset))) {
          _fixedPosition = _curScroll - maxOffset;
        };
      };

      // header visual and class
      if (_fixedPosition - _curScroll >= 0) {
        header.style.top = `0px`;
        header.classList.remove('--moving'); // header is in a intermediate state
        header.classList.add('--visible'); // header is visible
        header.classList.remove('--hidden'); // header is out of bounds
        header.classList.add('--limit-top'); // fully shown
        header.classList.remove('--limit-bottom'); // fully hidden
      } else {
        header.style.top = `${_fixedPosition - _curScroll}px`;
        header.classList.add('--moving');
        header.classList.add('--visible');
        header.classList.remove('--hidden');
        header.classList.remove('--limit-top');
        header.classList.remove('--limit-bottom');
      };
      _prevMoveIsUp = true;
    } else {
      // page moving to bottom
      header.classList.remove('--scrolling-top');
      header.classList.add('--scrolling-bottom');

      // trigger reset
      if (_prevMoveIsUp === true) {
        if (!(_fixedPosition - _curScroll <= 0)) {
          _fixedPosition = _curScroll;
        };
      };

      // header visual and class
      if (_fixedPosition - _curScroll <= (-1 * maxOffset)) {
        header.style.top = `-${maxOffset}px`;
        header.classList.remove('--moving');
        header.classList.remove('--visible');
        header.classList.add('--hidden');
        header.classList.add('--limit-bottom');
        header.classList.remove('--limit-top');
      } else {
        header.style.top = `${_fixedPosition - _curScroll}px`;
        header.classList.add('--moving');
        header.classList.add('--visible');
        header.classList.remove('--hidden');
        header.classList.remove('--limit-bottom');
        header.classList.remove('--limit-top');
      };

      _prevMoveIsUp = false;
    };
    _lastScroll = _curScroll;
  };

  // watch scroll
  window.addEventListener('scroll', () => {
    check();
  }, { passive: true } );
  check();
};


});