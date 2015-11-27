$(function() {

  $('text').each(function() {
      var txt = $(this);

      var input = $("<textarea></textarea>").val(txt.text());
      input.appendTo($('#editor'));
      input.on('input', function() {
          txt.text(input.val());
      });
  })
 });
