$(document).ready(function(){
    // Classes 
    var past = "col-10 past";
    var present = "col-10 present";
    var future = "col-10 future";

    //variable declarations
    var currentHOur = moment().hour()
    var currentDate = moment().dayOfYear();
    var calDate = moment().format("dddd, MMMM Do");
 

    function setTimeBlockBackGround (){
        if (currentHOur> parseInt($(this).attr("data-hr"))){
            $(this).siblings("textarea").attr("class", past);

        }else if (currentHOur<parseInt($(this).attr("data-hr"))){

            $(this).siblings("textarea").attr("class", future);
        }else {

            $(this).siblings("textarea").attr("class", present);
        }
    };

    function CreateStorage(){
      if (localStorage.getItem("Day") === null){
        var DayObject = {};
        DayObject[currentDate]= {};
        localStorage.setItem("Day", JSON.stringify(DayObject))
      }
    };

    function SaveTask(event){

        event.preventDefault();
        var taskItem = $(this).siblings("textarea").val();
        var hour = $(this).siblings(".hour").attr("data-hr");
        var taskList = JSON.parse(localStorage.getItem("Day"));

        taskList[currentDate][hour] = taskItem;
        localStorage.setItem("Day",JSON.stringify(taskList));
      };

  
    function populateTasks(){
      var taskList = JSON.parse(localStorage.getItem("Day"));
      for (const property in taskList[currentDate]) {
        var id = "#" + property;
         $(id).siblings("textarea").text(taskList[currentDate][property]);
      };
      };
      
      function SetPage(){
        $(".hour").each(setTimeBlockBackGround);
        $("#currentDay").text(calDate)
        CreateStorage();
        populateTasks();
      }

      SetPage();
      $("#timeblock").on("click","button", SaveTask)  
  });
