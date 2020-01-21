class CalendarModel {
    constructor(myView) {
        this.myView = myView;


    }

    start = function(view) {
        this.myView = view;
    }

    checkStorage(view) {
        view.calendar.data = localStorage.getItem('data');
        view.calendar.data = JSON.parse(view.calendar.data);
    }

    createDate = function(view) {

        view.calendar.currentMonth = parseInt(document.getElementById("selectmonth").value);
        view.calendar.currentYear = parseInt(document.getElementById("selectyear").value);
        var daysInMonth = new Date(view.calendar.currentYear, view.calendar.currentMonth + 1, 0).getDate(),
            startDay = new Date(view.calendar.currentYear, view.calendar.currentMonth, 1).getDay(),
            endDay = new Date(view.calendar.currentYear, view.calendar.currentMonth, daysInMonth).getDay();
        var cells = [];
        if (startDay != 1) {
            var blanks = startDay == 0 ? 7 : startDay;
            for (var i = 1; i < blanks; i++) {
                cells.push("b");
            }
        }
        for (var i = 1; i <= daysInMonth; i++) {
            cells.push(i);
        }
        if (endDay != 0) {
            var blanks = endDay == 6 ? 1 : 7 - endDay;
            for (var i = 0; i < blanks; i++) {
                cells.push("b");
            }
        }
        return cells
    }



    handleErrors = function(e) {
        if (e) {
            alert(e);
            return false;
        }
        return true;
    }

    handleSuccess = function(data) {
        var self = this;
        let viewOrg = self.myView;
        if (self.handleErrors(data.error)) {
            //self.getValue(viewOrg.calendar.currentDay +'/'+ viewOrg.calendar.currentMonth +'/'+ viewOrg.calendar.currentYear, viewOrg);
            viewOrg.calendar.data = JSON.parse(localStorage.getItem('data'));
            var a = self.createDate(viewOrg);
            viewOrg.render(a);
        }

    }

    updateServerStorage = function(pswd, view) {
        var url = "https://cors-anywhere.herokuapp.com/https://fe.it-academy.by/AjaxStringStorage2.php";
        var handle = 'altushka';
        var self = this;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                f: 'UPDATE',
                n: handle,
                v: JSON.stringify(view.calendar.data),
                p: pswd
            },
            success: function(data) {
                self.handleSuccess(data);
                //localStorage.setItem("cal-" + view.calendar.currentMonth + "-" + view.calendar.currentYear, JSON.stringify(view.calendar.data));

                //var a = self.createDate(view);
                //	view.render(a);
            }
        });
    }
    init = function(view) {
        let self = this;
        view.calendar.data = localStorage.getItem('data')


        if (view.calendar.data == {}) {
            view.calendar.data = localStorage.setItem('data', {})
        }

        var url = "https://cors-anywhere.herokuapp.com/https://fe.it-academy.by/AjaxStringStorage2.php";
        var handle = 'altushka';

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                f: 'READ',
                n: handle
            },
            success: function(data) {
                if (self.handleErrors(data.error)) {
                    if ("" == data.result) {

                        $.ajax({
                            url: url,
                            type: 'POST',
                            dataType: 'json',
                            cache: false,
                            data: {
                                f: 'INSERT',
                                n: handle,
                                v: JSON.stringify(view.calendar.data)
                            },
                            success: self.handleSuccess
                        });
                    } else {

                        view.calendar.data = JSON.parse(data.result);
                        localStorage.setItem('data', JSON.stringify(view.calendar.data))
                    }
                }
            }
        });

    }

    addValue = function(key, value, view) {

        var mview = view
        let self = this;
        var url = "https://cors-anywhere.herokuapp.com/https://fe.it-academy.by/AjaxStringStorage2.php";
        var handle = 'altushka';
        var pswd = Math.random();
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                f: 'LOCKGET',
                n: handle,
                p: pswd
            },
            success: function(data) {
                if (self.handleErrors(data.error)) {
                    view.calendar.data = JSON.parse(data.result);
                    view.calendar.data[key] = value;
                    localStorage.setItem('data', JSON.stringify(view.calendar.data));
                    self.updateServerStorage(pswd, mview);
                }
            }
        });
    }

    getValue = function(key, view) {
        var url = "https://cors-anywhere.herokuapp.com/https://fe.it-academy.by/AjaxStringStorage2.php";
        var handle = 'altushka';
        var self = this;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                f: 'READ',
                n: handle
            },
            success: function(data) {
                if (self.handleErrors(data.error)) {
                    view.calendar.data = JSON.parse(data.result);

                    if (key in view.calendar.data) {
                        var a = self.createDate(view);
                        view.render(a);
                        localStorage.setItem('data', JSON.stringify(view.calendar.data));
                    }
                }
            }
        });

    }
    deleteValue = function(key, view) {
        var url = "https://cors-anywhere.herokuapp.com/https://fe.it-academy.by/AjaxStringStorage2.php";
        var handle = 'altushka';
        var self = this;
        var mview = view;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                f: 'READ',
                n: handle
            },
            success: function(data) {
                if (self.handleErrors(data.error)) {
                    view.calendar.data = JSON.parse(data.result);
                    if (key in view.calendar.data) {
                        delete view.calendar.data[key];
                        var pswd = Math.random();
                        $.ajax({
                            url: url,
                            type: 'POST',
                            dataType: 'json',
                            cache: false,
                            data: {
                                f: 'LOCKGET',
                                n: handle,
                                p: pswd
                            },
                            success: function(data) {
                                if (self.handleErrors(data.error)) {
                                    self.updateServerStorage(pswd, mview);

                                }
                            }
                        });
                    }
                }
            }
        });
    }
}