class CalendarControllerButtons {
  constructor() {
      this.myModel = null;
  }



  start = function(model) {
      this.myModel = model;


  };

  closeForm = function() {
      document.getElementById("form").style.visibility = 'hidden';
  };



  deletion = function(view) {
      if (confirm("Remove event?")) {
          delete view.calendar.data[view.calendar.currentDay + '/' + view.calendar.currentMonth + '/' + view.calendar.currentYear];
          calendOrg.deleteValue(view.calendar.currentDay + '/' + view.calendar.currentMonth + '/' + view.calendar.currentYear, viewOrg)
          localStorage.setItem('data', JSON.stringify(view.calendar.data));

          calendOrg.checkStorage(viewOrg);
          viewOrg.render(calendOrg.createDate(viewOrg));
          controllerOrg.closeForm();
      }

  }
}

var calendOrg = new CalendarModel;
var viewOrg = new CalendarViewOrg;
var controllerOrg = new CalendarControllerButtons;
document.addEventListener('DOMContentLoaded', function() {
  calendOrg.start(viewOrg);
  calendOrg.init(viewOrg);
  viewOrg.init(calendOrg);
  viewOrg.update(calendOrg);
  controllerOrg.start(calendOrg);
  var a = calendOrg.createDate(viewOrg);
  calendOrg.checkStorage(viewOrg);
  viewOrg.render(a);

  viewOrg.calendar.data[viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear] = document.getElementById("eventdetails").value;
  calendOrg.addValue(viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear, viewOrg.calendar.data[viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear], viewOrg);
  localStorage.setItem('data', JSON.stringify(viewOrg.calendar.data));
  calendOrg.createDate(viewOrg);
  calendOrg.getValue(viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear, viewOrg);
  calendOrg.checkStorage(viewOrg);
  controllerOrg.closeForm();

  document.getElementById("setcalendar").addEventListener("click", function() {
      calendOrg.createDate(viewOrg);
      viewOrg.render(calendOrg.createDate(viewOrg));
  });
  var day = document.getElementsByClassName('dd');

  for (var i = 0; i < day.length; i++) {
      day[i].addEventListener("click", function() {
          document.getElementById('form').style.visibility = 'visible';
          viewOrg.calendar.currentDay = this.getElementsByClassName("daynumber")[0].innerHTML;
          document.getElementById('eventdetails').innerText = viewOrg.calendar.data[viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear] ? viewOrg.calendar.data[viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear] : "";


      });
  }
  var form = document.getElementById('form');
  form.addEventListener("submit", function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      viewOrg.calendar.data[viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear] = document.getElementById("eventdetails").value;
      calendOrg.addValue(viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear, viewOrg.calendar.data[viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear], viewOrg);
      localStorage.setItem('data', JSON.stringify(viewOrg.calendar.data));
      calendOrg.createDate(viewOrg);
      calendOrg.getValue(viewOrg.calendar.currentDay + '/' + viewOrg.calendar.currentMonth + '/' + viewOrg.calendar.currentYear, viewOrg);
      calendOrg.checkStorage(viewOrg);
      controllerOrg.closeForm();
  });
});