var bkit = {};

bkit.init = function(){
  // Show the world we have JS by removing the no-js class from the html tag
  document.getElementsByTagName('html')[0].classList.remove('no-js');

  bkit.services.init();
  bkit.portfolio.init();

  bkit.contact.thanks();
  document.querySelector('form').addEventListener('submit', bkit.contact.validate, false);

  smoothScroll.init({
    selector: '[data-scroll]',
    speed: 500,
    easing: 'easeInOutCubic',
    updateURL: true
  });
};

bkit.services = {
  init: function() {
    var items = document.querySelectorAll('.service');

    for (i = 0; i < items.length; ++i) {
      var item = items[i];
      item.addEventListener('click', bkit.services.handleClick.bind(null, item), false);
    }
  },

  handleClick: function(el, event) {
    var items = document.querySelectorAll('.service__modal');
    for (i = 0; i < items.length; ++i) {
      if(items[i] !== el) {
        items[i].classList.remove('service__modal');
      }
    }

    el.classList.toggle('service__modal');
    smoothScroll.animateScroll(null, '#'+el.getAttribute('id'), { offset: '30', updateURL: false});

    if(event && event.target && ! event.target.classList.contains('service__details__cta__btn')) {
      event.preventDefault();
    }
  }
};

bkit.portfolio = {
  init: function(){

    var items = document.querySelectorAll('[data-waypoint]');

    for (i = 0; i < items.length; ++i) {
      var item = items[i];
      var offset = item.getAttribute('data-waypoint-offset') || '75%';

      new Waypoint({
        element: item,
        handler: function() {
          var className = item.getAttribute('data-waypoint-class');
          if(! this.element.classList.contains(className)) {
            this.element.classList.add(className);
          }
        },
        offset: offset
      });
    }
  }
};

bkit.contact = {

  validate: function(e) {
    var errors = [];
    var root = e.target;
    var required = root.querySelectorAll('[required]');

    for (i = 0; i < required.length; ++i) {
      var field = required[i];

      if(field.value === null || field.value === "") {
        field.classList.add('form__input--error');
        errors.push(field);
      } else {
        field.classList.remove('form__input--error');
      }
    }

    if(errors.length > 0) {
      document.getElementById('error').setAttribute('style', 'display: block;');
      smoothScroll.animateScroll(null, '#error', { offset: '30', updateURL: false});
      e.preventDefault();
    } else {
      document.getElementById('error').setAttribute('style', 'display: none;');
    }
  },

  thanks: function() {
    if(window.location.hash && window.location.hash == '#thanks') {
      document.getElementById('thanks').setAttribute('style', 'display: block');
    }
  }

}

document.addEventListener('DOMContentLoaded', bkit.init, false);
