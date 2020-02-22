// find the object for current time
var now = moment().format("dddd, MMMM Do");
// find the current hour
var currentHour = moment().hours();
// console.log(now);
console.log(currentHour);
var currentDayEl = $("#currentDay");
var containerEL = $(".container");
var schedule = [];
var preSchedule = localStorage.getItem(now);

currentDayEl.text(now);

if(preSchedule != null){
    schedule = JSON.parse(preSchedule);
}

for(var i = 9; i <= 17; i++){
    var newRow = $("<div>");
    var hourCol = $("<div>");
    var textArea = $("<textarea>");
    var saveBtn = $("<div id=" + i + ">");
    var hour = ((i + 11) % 12 + 1);
    var suffix = i >= 12 ? "PM" : "AM";

    newRow.addClass("row");
    hourCol.addClass("col-1 hour text-right");
    textArea.addClass("description col-10");
    saveBtn.addClass("col-1 btn saveBtn far fa-save");

    if(i === currentHour){
        textArea.addClass("present");
    }else if(i < currentHour){
        textArea.addClass("past");
    }else{
        textArea.addClass("future");
    }

    for(var j = 0; j < schedule.length; j++){
        if(i.toString() === schedule[j].hour){
            textArea.val(schedule[j].description);
        }
    }

    hourCol.text(hour + " " + suffix);

    newRow.append(hourCol);
    newRow.append(textArea);
    newRow.append(saveBtn);

    saveBtn.on("click", saveBtnClick);

    containerEL.append(newRow);
}

function saveBtnClick(){
    var found = false;
    console.log("btn clicked");
    var btnClicked = $(this);
    console.log(btnClicked);
    var hr = btnClicked[0].id;
    console.log(hr);
    var desc = btnClicked[0].previousElementSibling.value;
    console.log(desc);
    for(var k = 0; k < schedule.length; k++){
        if(hr === schedule[k].hour){
            schedule[k].description = desc;
            found = true;
        }
    }

    if(!found){
        schedule.push({hour: hr, description: desc});
    }
    
    localStorage.setItem(now, JSON.stringify(schedule));
}