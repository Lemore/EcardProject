$(function() {

    var img = document.getElementById('picture');
    var img_width = img.clientWidth;
    var img_height = img.clientHeight;

    var canvasDiv = document.getElementById('canvasDiv');

    var dataObjects=[];
    var mouseX = 0;
    var mouseY = 0;

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
    var tool="rect";
    var currentcolor = "black";
    var fillcolor = "";
    var textcolor = "white";
    var text_font = "Noot";
    font_size = "50";

    var red = "";
    var green = "";
    var blue = "";

    canvas = document.createElement('canvas');
    canvas.setAttribute('width', img_width);
    canvas.setAttribute('height', img_height);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    var imageObj = new Image();
    var recordid = document.URL.slice(0, -1).split("/").pop();
//    imageObj.src = 'http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=stream&dps_pid=' + pic_url;
    imageObj.src = $('#picture').attr('src');


    imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0, img_width, img_height);
    };

//    var imageData = context.getImageData(0, 0, img_width, img_height);
//    var img_data = imageData.data;// RETURNS ALL ZEROS - WHY???

    $('#canvas').mousedown(function(e){
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;
        fillcolor = getFillColor();
//        currentcolor = getPixelColor(mouseX, mouseY);
//        console.log(currentcolor);
        paint = true;
//        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });


    $('#canvas').mousemove(function(e){
      if(paint){
            redraw();
            drawrect(mouseX, mouseY, e.pageX - this.offsetLeft, e.pageY - this.offsetTop, fillcolor);

//            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      }

    });

    $('#canvas').mouseup(function(e){
        paint = false;

        var obj={};
        obj.type="rect";

        obj.color=currentcolor;
        obj.fill=fillcolor;
        obj.font = text_font;
        obj.font_size = font_size;
//        obj.text_color = text_color;

        obj.x1=mouseX;
        obj.y1=mouseY;
        obj.x2=e.pageX - this.offsetLeft;
        obj.y2=e.pageY - this.offsetTop;

        if(obj.x1 != obj.x2 || obj.y1 != obj.y2) {
            dataObjects.push(obj);
        }

        redraw();
    });


    $('#canvas').mouseleave(function(e){
        paint = false;
    });

    $('#clear').click(function(e){
        dataObjects=[];
        paint = false;
        redraw();
    });

    $('#back').click(function(e){
        history.go(-1);
    });


    $('#save').click(function(e){
        console.log($(this));

        var csrfToken = $("[name='csrfmiddlewaretoken']").val()
        var regions = getRegionsStr();

        $.ajax({
            method: "POST",

            url: "/add_picture_template",
            data: {
                csrfmiddlewaretoken: csrfToken,
                recordid: recordid,
                regions: regions,
            },
            success: function(data) {
                 console.log;
                 dataObjects=[];
                 paint = false;
                 redraw();
            },
            failure: function(errMsg) {alert(errMsg)}
        })
    });


//    $('#colorpicker').click(function(e){
//        paint = false;
//    });

    $("#col_red").on('input', function() {
        red = $(this).val();
    });

    $("#col_green").on('input', function() {
        green = $(this).val();
    });

    $("#col_blue").on('input', function() {
        blue = $(this).val();
    });

    $("#font_size").on('input', function() {
        font_size = $(this).val();
    });

    $('#select_font').on('click', 'a', function(e) {
        text_font = $(e.target).text();
        $('#text_font').val(text_font);
    });

//    $('#select_text_color').on('click', 'a', function(e) {
//        text_color = $(e.target).text();
//        $('#text_color').val(text_color);
//    });

    function redraw(){
//      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        context.drawImage(imageObj, 0, 0, img_width, img_height);
//        context.drawImage(imageObj, 69, 50);
        var i = 0;
        while(dataObjects.length!=i) {
            obj=dataObjects[i];
            if(obj.type=="rect"){
                context.strokeStyle=obj.color;
                context.fillStyle=obj.fill;
                drawrect(obj.x1,obj.y1,obj.x2,obj.y2, obj.fill);
                context.font = obj.font_size + "px " + obj.font;
                context.strokeStyle="black";
                context.lineWidth = 2;
                context.fillStyle="white";
                context.textAlign = "center";
                context.fillText("\u05D3\u05D5\u05D2\u05DE\u05D0",obj.x1 + (obj.x2 - obj.x1)/2 ,obj.y1 + (obj.y2 - obj.y1)/2);
                context.strokeText("\u05D3\u05D5\u05D2\u05DE\u05D0",obj.x1 + (obj.x2 - obj.x1)/2 ,obj.y1 + (obj.y2 - obj.y1)/2);

            }
            i++;
        }

//      context.strokeStyle = "#df4b26";
//      context.lineJoin = "round";
//      context.lineWidth = 5;


//      for(var i=0; i < clickX.length; i++) {
//        context.beginPath();
//        if(clickDrag[i] && i){
//          context.moveTo(clickX[i-1], clickY[i-1]);
//         }else{
//           context.moveTo(clickX[i]-1, clickY[i]);
//         }
//         context.lineTo(clickX[i], clickY[i]);
//         context.closePath();
//         context.stroke();
//      }
    }


//    function getPixelColor(x, y) {//DOESN'T WORK
//        console.log(img_data);
//
//        var red = img_data[((img_width * y) + x) * 4];
//        var green = img_data[((img_width * y) + x) * 4 + 1];
//        var blue = img_data[((img_width * y) + x) * 4 + 2];
//        var alpha = img_data[((img_width * y) + x) * 4 + 3];
//
//        console.log(red);
//        console.log(green);
//        console.log(blue);
//        console.log(alpha);
//
//        var color = new Color([red, green, blue]);
//        return color;
//    }

    function getFillColor() {
        var color = "";
        if(red != "" && green != "" && blue != "")
            color = "rgb(" + red + "," + green + "," + blue + ")";
//        var color = new Color([red, green, blue]);
        console.log (color);

        return color;
    }

    function getRegionsStr () {
        var regions = "[";

        var i = 0;
        while(dataObjects.length!=i) {
            obj=dataObjects[i];
            if(obj.type=="rect"){
                if (i > 0) {
                    regions = regions + ',';
                }
                regions = regions + '{"transform" : "", "id" :' + (i+1);
                regions = regions + ', "x": ' + obj.x1;
                regions = regions + ', "y": ' + obj.y1;
                regions = regions + ', "width" : ' + (obj.x2 - obj.x1);
                regions = regions + ', "height" : ' + (obj.y2 - obj.y1);
                regions = regions + ', "color" : \"' + fillcolor + '\"';
//                regions = regions + ', "color" : "rgb(220,230,225)" '

                regions = regions + ', "img_w" : ' + img_width;
                regions = regions + ', "img_h" : ' + img_height;
                regions = regions + ', "txt_x" : ' + (obj.x1 + (obj.x2 - obj.x1)/2);
                regions = regions + ', "txt_y" : ' + (obj.y1 + (obj.y2 - obj.y1)/2);
                regions = regions + ', "txt_color" : "white" ';
                regions = regions + ', "font" : \"' + obj.font + '\"';
                regions = regions + ', "font_size" : ' + obj.font_size;
                regions = regions + ', "text" : "" }';
            }
            i++;
        }

        regions = regions + "]";

        console.log (regions);

        return regions;
    }

    function drawrect(x1,y1,x2,y2, color){
        var w,h,x,y;
        //context.clearRect(0, 0, canvas.width, canvas.height);
        w=Math.abs(x1-x2);
        h=Math.abs(y1-y2);
        x=Math.min(x1,x2);
        y=Math.min(y1,y2);
        context.fillStyle = color;
        context.strokeStyle = currentcolor;
        context.lineWidth = 1;
        context.strokeRect(x,y,w,h);

        if(color != "") {
            context.fillRect(x,y,w,h);
        }
    }

});
