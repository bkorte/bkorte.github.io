var bkit = {};

bkit.init = function(){
  // Show the world we have JS by removing the no-js class from the html tag
  document.getElementsByTagName('html')[0].classList.remove('no-js');

  bkit.services.init();
  bkit.portfolio.init();
}

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
}

document.addEventListener('DOMContentLoaded', bkit.init);
