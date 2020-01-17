class CalendarViewOrg{
    constructor(){
        this.calendar = {
            monthName : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
            data : null, 
            currentDay : 0, 
            currentMonth : 0, 
            currentYear : 0
          }
          this.myModel=null;
          
    }
    init=function(model){
      this.myModel=model; 
      var now = new Date(),
    nowMth = now.getMonth(),
    nowYear = parseInt(now.getFullYear());
    
    var mth = document.getElementById("selectmonth");
    for (var i = 0; i < 12; i++) {
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = this.calendar.monthName[i];
      if (i==nowMth) { opt.selected = true; }
      mth.appendChild(opt);
    }
    var year = document.getElementById("selectyear");
    for (var i = nowYear-10; i<=nowYear+10; i++) {
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = i;
      if (i==nowYear) { opt.selected = true; }
      year.appendChild(opt);
    }
      
      var form = "<h1>"  + " Create event</h1>";
      form += "<div id='eventdate'>" + "</div>";
      form += "<textarea id='eventdetails' required>"  + "</textarea>";
      form += "<input type='button' value='Close' onclick='controllerOrg.closeForm()'/>";
      form += "<input type='button' value='Delete' onclick='controllerOrg.deletion(viewOrg)'/>";
      form += "<input type='submit' value='Save'/>";
      var newForm = document.createElement("form");
      newForm.id = 'form';
      newForm.innerHTML = form;
      var container = document.getElementById("event");
      container.innerHTML = "";
      container.appendChild(newForm);
      document.getElementById('form').style.visibility = 'hidden';

      var container = document.getElementById("container");
    var table = document.createElement("table");
    table.id = "calendar";
    container.innerHTML = "";
    container.appendChild(table);
    var head  = document.createElement("thead");
    table.appendChild(head);
    var row = document.createElement("tr"),
            cell = null,
            days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
        for (var d of days) {
          cell = document.createElement("th");
          cell.innerHTML = d;
          row.appendChild(cell);
        }
        row.classList.add("head");
        head.appendChild(row);
    }

  update=function(model) {
    this.myModel=model; 
        var total = 35;
        var daysRow = document.createElement("tr");
        daysRow.classList.add("day");
        for (var i=0; i<total; i++) {
          var day = document.createElement("td");
          day.classList.add('dd');
          daysRow.appendChild(day);
          if (i!=0 && (i+1)%7==0) {
            var table = document.getElementById('calendar');
          table.appendChild(daysRow);
            daysRow = document.createElement("tr");
            daysRow.classList.add("day");
          }
        }
    

    }
    render = function (cells) {
      if (cells.length === 42){
        var daysRow = document.createElement("tr");
        daysRow.id = 'extra';
        daysRow.classList.add("day");
        for (var i=0; i<7; i++) {
          var day = document.createElement("td");
          day.classList.add('dd');
          daysRow.appendChild(day);
          if (i!=0 && (i+1)%7==0) {
            var table = document.getElementById('calendar');
          table.appendChild(daysRow);
            daysRow = document.createElement("tr");
            daysRow.classList.add("day");
          }
        }
      } else {
        var extra = document.getElementById('extra');
        if(extra){
          extra.remove();
        }
      }
      var daysRow = document.getElementsByClassName("dd");
        
        for (var j=0; j<daysRow.length; j++){
          daysRow[j].innerHTML = '';
          if(daysRow[j].classList.contains("blank")){
            daysRow[j].classList.remove("blank");
          }
        }
        
        for (var i=0; i<cells.length; i++) {
          if (cells[i]=="b") { daysRow[i].classList.add("blank"); }
          else {
            daysRow[i].innerHTML = "<div class='daynumber'>"+cells[i]+"</div>";
          
            
              if (this.calendar.data[[cells[i]] +'/'+ this.calendar.currentMonth +'/'+ this.calendar.currentYear]) {
              
                daysRow[i].innerHTML += "<div class='evt'>" + this.calendar.data[[cells[i]] +'/'+ this.calendar.currentMonth +'/'+ this.calendar.currentYear] + "</div>";
                }
                
              
              
            
          }
          
          
        }
    }
}
  