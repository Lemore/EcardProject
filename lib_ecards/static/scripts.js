$(function() {

  $('text').each(function() {
      var txt = $(this);

      var id = "input_" + txt.parent().attr("id");
      var jq_id = "#" + id;

      var input = $("<div class='input-group'><br/><textarea name='" + id + "' class='form-control' id='"+ id + "' placeholder='" + txt.text() + "' aria-describedby='basic-addon1'></textarea></div>").val(txt.text());
      input.appendTo($('#editor'));
      input.on('input', function() {
//           var input_text = $(jq_id).val();
//           var rows = input_text.split("\n");
//           var tspans = rows.map(function(row) {return "<tspan>"+row+"</tspan>"}).join("")
//           txt.html(tspans);
           txt.html($(jq_id).val());

      });
    })
 });

