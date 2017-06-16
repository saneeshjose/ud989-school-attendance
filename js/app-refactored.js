//Exercise to not re render the whole view

$(function(){

    var model = {
        students : [
            {
                name : 'Slappy the Frog',
                daysAttended : [],
                daysMissed : 0
            },
            {
                name : 'Lilly the Lizard',
                daysAttended : [],
                daysMissed : 0
            },
            {
                name : 'Paulrus the Walrus',
                daysAttended : [],
                daysMissed : 0
            },
            {
                name : 'Gregory the Goat',
                daysAttended : [],
                daysMissed : 0
            },
            {
                name : 'Adam the Anaconda',
                daysAttended : [],
                daysMissed : 0
            }
        ]
    };

    var tableView = {
        
        $control : $('#tblAttendance tbody'),
        template : _.template( $('#student-row').html()),

        init : function ( controller ) {
            this.controller = controller;
        },
        render : function () {

            var self = this;
            model.students.forEach( function (student) {

                var tr = $(self.template(student));
                tr.find('.check').click(function(row) {

                    //Closure, because tr keeps changing
                    return function () {

                        student.daysAttended = [];
                        //Find all checkboxes from the table row
                        row.find('.check').each( function (index, check ) {

                            if ( check.checked )  {
                                student.daysAttended.push(index+1);
                            }
                        });

                        row.find('.missed-col').text(12-student.daysAttended.length);
                        self.controller.studentMarked();
                    }

                }(tr));
                self.$control.append(tr);
            });
        }

    };

    var controller = {
        
        init : function () {

            if ( !localStorage.attendancev2 ) {
                localStorage.attendancev2=JSON.stringify(model.students);
            }
            else {
                model.students = JSON.parse(localStorage.attendancev2);
            }

        },
        studentMarked: function ( ) {
            //Update local storage
            localStorage.attendancev2=JSON.stringify(model.students);
        }

    };

    controller.init();

    tableView.init(controller);
    tableView.render();

});