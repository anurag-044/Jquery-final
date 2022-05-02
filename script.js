$(document).ready(function () {
//    $(window).on("load", function () {
        Showtable();
        color();
        complete();
        callme();
//    });
    $("#proname_l").hide();
    $(".task_l").hide();
    var proname_ch = true;
    var task_ch = true;
    var index = 0;
    var location;
    $("#proname").blur(function () {
        $("#proname_l").hide();
    });

    $("#addpro2").hide();
    $("#up-l").click(function () {     
      Showtable()
     
        $("#addpro").hide(500);
        $("#addpro2").show(500);
        $("#pro-l").css("background-color", "");
        $("#up-l").css("background-color", "aqua");
    });
    $("#pro-l").click(function () {
        $("#addpro").show(500);
        $("#addpro2").hide(500);
        $("#up-l").css("background-color", "");
        $("#pro-l").css("background-color", "aqua");
    });

    $("#proname").focus(function () {
        pronameCheck();
    });

    $("#proname").keyup(function () {
        pronameCheck();
    });

    function callme() {
        $(".appendtask").each(function () {
            $(this).blur(function (e) {
                e.preventDefault();
                $(".task_l").hide();
            });
            $(this).focus(function () {
                taskCheck();
            });

            $(this).keyup(function () {
                taskCheck();
            });
        });
    }

    $("#addtask").click(function () {
        $("#a").show();
        $("#a").append(
            '<div class="con"><input type="text" id="taskk" class="appendtask" value="" placeholder="Task"  />' +
            ' <input type="checkbox" name="required" id="required" class="required_class">' +
            '    <img src="minus-solid.svg" class="btnRemove" alt="" width="20px">' +
            '<lable class="task_l"></lable> </div>'
        );
        complete();
        taskCheck();
        callme();
       
    });
    $("body").on("click", ".btnRemove", function () {
        $(this).parent("div.con").remove();
    });

    function color() {
        $("#pro-l").css("background-color", "aqua");
    }

    function pronameCheck() {
        editdata()
        var proname = $("#proname").val();
        var regex_proname = /^[^0-9][a-zA-Z0-9_*\s+]{3,100}$/gm;
        var projectDetails = localStorage.getItem("projectDetails");
        var projectDetailsArray = JSON.parse(projectDetails);
        console.log(index)
        if(index==0){
            for (var key in projectDetailsArray) {
                if (projectDetailsArray[key].proname == proname) {
                    $("#proname_l").show();
                    $("#proname_l").html("Please not enter duplicate value");
                    $("#proname_l").css("color", "red");
                    proname_ch = false;
                    return false;
                }     
            }
        }
        if (proname == null || proname === "") {
            $("#proname_l").show();
            $("#proname_l").html("Please enter your Project");
            $("#proname_l").css("color", "red");
            proname_ch = false;
            return false;
        } else if (!regex_proname.test(proname)) {
            $("#proname_l").show();
            $("#proname_l").html(
                "Project should have more then 4 char and not start with numbers"
            );
            $("#proname_l").css("color", "red");
            proname_ch = false;
            return false;
        }
         else {
            $("#proname_l").hide();
            proname_ch = true;
            return true;
        }
    }

    function taskCheck() {
        $(".appendtask").each(function () {
            var regex_task = /^[^0-9][a-zA-Z0-9_*\s+]{3,100}$/gm;
            if ($(this).val() == null || $(this).val() == "") {
                $(".task_l").show();
                $(".task_l").html("Please enter task");
                $(".task_l").css("color", "red");
                task_ch = false;
                return false;
            } else if (!regex_task.test($(this).val())) {
                $(".task_l").show();
                $(".task_l").html("Task invalid");
                $(".task_l").css("color", "red");
                task_ch = false;
                return false;
            } else {
                $(".task_l").hide();
                task_ch = true;
                return true;
            }
        });
    }

    $("#subtn").click(function () {
        pronameCheck();
        taskCheck();
        editdata()
        var proname = $("#proname").val();

        if (proname_ch == true && task_ch == true) {
            var TaskArray = [];
            var requArray = [];

            $(".appendtask").each(function () {
                var subject = $(this).val();

                TaskArray.push(subject);
            });

            $(".required_class").each(function () {
                var requ = this.checked ? $(this).length : "";

                if (requ == 1) {
                    required = "Required";
                }
                if (requ == 0) {
                    required = "Not Required";
                }

                requArray.push(required);
            });

            let obj = {
                proname: `${proname}`,
                Task: `${TaskArray}`,
                Required: `${requArray}`,
            };

            var projectDetails = localStorage.getItem("projectDetails");
            var projectDetailsArray = JSON.parse(projectDetails);
            var projectDetailsBlankArray = [];
            if (index == 0) {
                if (projectDetails == null) {
                    projectDetailsBlankArray.push(obj);
                    localStorage.setItem(
                        "projectDetails",
                        JSON.stringify(projectDetailsBlankArray)
                    );
                } else {
                    projectDetailsArray.push(obj);
                    localStorage.setItem(
                        "projectDetails",
                        JSON.stringify(projectDetailsArray)
                    );
                }
            } else if (index == 1) {
                projectDetailsArray.splice(location, 1, obj);
                localStorage.setItem(
                    "projectDetails",
                    JSON.stringify(projectDetailsArray)
                );
            }
        } else {
            return false;
        }
    });

    function Showtable() {
        var projectDetails = localStorage.getItem("projectDetails");
        var projectDetailsArray = JSON.parse(projectDetails);
        var taskblank = [];
        var taskblankstr = "";
        var requblank = [];
        var requblankstr = "";
        var table = "<table id='myTableData' border='1' cellpadding='10'>";
        table += "<tr>";
        table += "<th>Project Name</th>";
        table += "<th>Task</th>";
        table += "<th>Required</th>";
        table += "<th>Action</th>";
        if (projectDetailsArray == null) {
            return false;
        }
        for (let i = 0; i < projectDetailsArray.length; i++) {
            table += "<tr>";

            table += "<td>" + projectDetailsArray[i].proname + "</td>";
            table += "<td>" + " " + "</td>";
            table += "<td>" + " " + "</td>";
            table +=
                "<td>" +
                ' <img src="pen-to-square-solid.svg" alt="" width="20px" class="update"> ' +
                "</td>";
            table +=
                "<td>" +
                '<img src="trash-can-solid.svg" alt="" width="20px" class="del">' +
                "</td>";

            taskblankstr = projectDetailsArray[i].Task;
            taskblank = taskblankstr.split(",");
            requblankstr = projectDetailsArray[i].Required;
            requblank = requblankstr.split(",");

            for (let j = 0; j < taskblank.length; j++) {
                table += "<tr><td>" + " " + "</td>";
                table += "<td>" + taskblank[j] + "</td>";
                table += "<td>" + requblank[j] + "</td>";
            }
            table += "</tr>";
        }
        table += "</table>";
        $("#mydata").html(table);
        deletedata();
        editdata();
    }

    function deletedata() {
        var del = $(".del");
        var projectDetails = localStorage.getItem("projectDetails");
        var projectDetailsArray = JSON.parse(projectDetails);

        for (let i = 0; i < del.length; i++) {
            $(del[i]).click(function () {
                projectDetailsArray.splice(i, 1);
                localStorage.setItem(
                    "projectDetails",
                    JSON.stringify(projectDetailsArray)
                );
                Showtable();
            });
        }
    }

    function editdata() {
       
        var update = $(".update");
        var projectDetails = localStorage.getItem("projectDetails");
        var projectDetailsArray = JSON.parse(projectDetails);
        var taskblankedit = [];
        var taskblankstredit = "";
        var requblankedit = [];
        var requblankstredit = "";
        for (let i = 0; i < update.length; i++) {
            $(update[i]).click(function () {
               

                $("#addpro").show(500);
                $("#addpro2").hide(500);
                $("#proname").val(projectDetailsArray[i].proname);
                taskblankstredit = projectDetailsArray[i].Task;
                taskblankedit = taskblankstredit.split(",");
                requblankstredit = projectDetailsArray[i].Required;
                requblankedit = requblankstredit.split(",");

                console.log(taskblankedit.length);

                $("#taskk").val(taskblankedit[0]);

                for (let j = 1; j < taskblankedit.length; j++) {
                    $("#a").append(
                        '<div class="con"><input type="text" id="task" class="appendtask" value=' +
                        taskblankedit[j] +
                        '  placeholder="Task"  />' +
                        ' <input type="checkbox" name="required" id="required" class="required_class">' +
                        '    <img src="minus-solid.svg" class="btnRemove" alt="" width="20px">' +
                        '<lable class="task_l"></lable> </div>'
                    );                   
                    location = i;
                }
                index = 1;
            });
        }
    }

    function complete() {
        var projectDetails = localStorage.getItem("projectDetails");
        var projectDetailsArray = JSON.parse(projectDetails);
        var tasklist = [];
        var taskstr = "";
            	if(projectDetails==null){
		
	return;
        }       

        for (let i = 0; i < projectDetailsArray.length; i++) {
            taskstr += projectDetailsArray[i].Task + ",";
            tasklist = taskstr.split(",");
        }

        console.log(tasklist);

        $(".appendtask").each(function () {
            $(this).autocomplete({
                source: tasklist,
            });
        });
    }
});
