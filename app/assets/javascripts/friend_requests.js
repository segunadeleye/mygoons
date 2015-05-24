$(document).ready(function() {
  $('.accept-request').click(function() {
    $form = $(this).parent()
    $form.fadeOut(function() {
      $('<span/>').addClass('text-primary').text('Request Accepted!').insertBefore(this);
    });
  });
});
