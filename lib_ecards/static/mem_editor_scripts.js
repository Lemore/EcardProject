$(function() {

  $('text').each(function() {
      var txt = $(this);
      var id = "input_" + txt.parent().attr("id");
      var jq_id = "#" + id;

      var input = $("<div class='input-group'><br/><textarea name='" + id + "' class='form-control' id='"+ id + "' placeholder='" + txt.text() + "' aria-describedby='basic-addon1'></textarea></div>").val(txt.text());
      input.appendTo($('#editor'));
      input.on('input', function() {
           var input_text = $(jq_id).val();
           var rows = input_text.split("\n");
           var counter = 0;
           var x = parseInt(txt.attr("x"));
           var y = parseInt(txt.attr("y"));
           var font_size = parseInt(txt.css("font-size"));
           console.log(font_size);

           var tspans = rows.map(function(row) {var yPos = y + counter++ * font_size * 1.1 ; return "<tspan x=\"" + x + "\" y=\"" + yPos + "\">" +row+"</tspan>"}).join("")
           txt.html(tspans);
//           txt.html($(jq_id).val());

      });
    })
 });

