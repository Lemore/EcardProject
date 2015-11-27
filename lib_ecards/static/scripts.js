$(function() {

  $('text').each(function() {
      var txt = $(this);

      var id = "input_" + txt.parent().attr("id");
      var jq_id = "#" + id;

      var input = $("<div class='input-group'><br/><input type='text' class='form-control' id='"+ id + "' placeholder='" + txt.text() + "' aria-describedby='basic-addon1'></input></div>").val(txt.text());
      input.appendTo($('#editor'));
      input.on('input', function() {
          txt.text($(jq_id).val());
      });

  })
 });
