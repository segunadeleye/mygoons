$(document).ready(function() {
  $('.add-friend').click(function() {
    $form = $(this).parent()
    $form.fadeOut(function() {
      $('<span/>').addClass('text-primary').text('Request sent!').insertBefore(this);
    });
  });
});
