$(function() {
  console.log('Document Loaded');
  getTasks();
  $('#createTask').on('click', addTask);
  $('#tasks').on('click', '.complete', taskComplete);
  $('#tasks').on('click', '.delete', taskDelete);
}); // end doc ready

function addTask(event) {
  event.preventDefault();
  console.log('Adding task...');

  var data = $(this).closest('form').serialize();
  console.log(data);
  $("input[type=text], textarea").val("");

  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: data,
    success: function(taskData){
      console.log(taskData);
      getTasks();
    }
  }); //end ajax call

}; // end addTask function

function getTasks() {
  console.log('Getting tasks...');
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: displayTasks
  }); // end ajax call
}; // end getTasks function

function displayTasks(taskList) {
  console.log('Displaying tasks...');
  $('#tasks').empty();

  taskList.forEach(function(obj) {
    var $li = $('<li></li>');
    var $form = $('<form></form>');

    $form.append('<span>' + obj.task + '</span>');
    $form.append('<button id="'+obj.id+'" class="complete">Complete</button>');
    $form.append('<button id="'+obj.id+'" class="delete">Delete</button>');
    if (obj.complete == 1) {
      $form.addClass('completed');
    } else {
      $form.addClass('notCompleted');
    };

    $li.append($form);
    $('#tasks').append($li);
  }); // end forEach function
}; // end displayTasks function

function taskComplete(event) {
  console.log('inside taskComplete function');
  event.preventDefault();
  var taskId=$(this).attr('id');
  $.ajax({
    url: '/tasks/'+taskId,
    type: 'PUT',
    success: getTasks
  }); //end ajax call
}// end taskComplete function

function taskDelete(event) {
  event.preventDefault();
  var taskId = $(this).attr('id');

  $.ajax({
    url: '/tasks/'+taskId,
    type: 'DELETE',
    success: getTasks
  }); // end ajax call
}; // end taskDelete function
