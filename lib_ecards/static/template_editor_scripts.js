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
    var currentcolor="black";

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

    var imageData = context.getImageData(0, 0, img_width, img_height);
    var img_data = imageData.data;// RETURNS ALL ZEROS - WHY???

    $('#canvas').mousedown(function(e){
        console.log("Mouse down");
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

//        currentcolor = getPixelColor(mouseX, mouseY);
//        console.log(currentcolor);
        paint = true;
//        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });


    $('#canvas').mousemove(function(e){
      if(paint){
            redraw();
            drawrect(mouseX, mouseY, e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

//            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      }

    });

    $('#canvas').mouseup(function(e){
        console.log("Mouse Up");
        paint = false;

        var obj={};
        obj.type="rect";
        obj.color=currentcolor;
        obj.x1=mouseX;
        obj.y1=mouseY;
        obj.x2=e.pageX - this.offsetLeft;
        obj.y2=e.pageY - this.offsetTop;
        dataObjects.push(obj);
    });


    $('#canvas').mouseleave(function(e){
        console.log("Mouse leave");
        paint = false;
    });

//    function addClick(x, y, dragging){
//      clickX.push(x);
//      clickY.push(y);
//      clickDrag.push(dragging);
//    }

    $('#clear').click(function(e){
        console.log("Clear");
        dataObjects=[];
        paint = false;
        redraw();
    });

    $('#save').click(function(e){
        console.log("Saving");
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
                 console.log(data)
            },
            failure: function(errMsg) {alert(errMsg)}
        })
    });


    $('#colorpicker').click(function(e){
        paint = false;
    });

    function redraw(){
      console.log("Redraw");
//      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        context.drawImage(imageObj, 0, 0, img_width, img_height);
//        context.drawImage(imageObj, 69, 50);
        var i = 0;
        while(dataObjects.length!=i) {
            obj=dataObjects[i];
            if(obj.type=="rect"){
                context.strokeStyle=obj.color;
                drawrect(obj.x1,obj.y1,obj.x2,obj.y2);
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


    function getPixelColor(x, y) {//DOESN'T WORK
        console.log(img_data);

        var red = img_data[((img_width * y) + x) * 4];
        var green = img_data[((img_width * y) + x) * 4 + 1];
        var blue = img_data[((img_width * y) + x) * 4 + 2];
        var alpha = img_data[((img_width * y) + x) * 4 + 3];

        console.log(red);
        console.log(green);
        console.log(blue);
        console.log(alpha);

        var color = new Color([red, green, blue]);
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
                regions = regions + ', "color" : "rgb(220,230,225)" '

                regions = regions + ', "img_w" : ' + img_width;
                regions = regions + ', "img_h" : ' + img_height;
                regions = regions + ', "txt_x" : ' + (obj.x1 + (obj.x2 - obj.x1)/2);
                regions = regions + ', "txt_y" : ' + (obj.y1 + (obj.y2 - obj.y1)/2);
                regions = regions + ', "txt_color" : "black" ';
                regions = regions + ', "text" : "" }';
            }
            i++;
        }

        regions = regions + "]";

        console.log (regions);

        return regions;
    }

//    var data=[];
//    var db;
//    var tool="rect";
//    var currentcolor="black";
//    var currentfill="white";
//    var started = false;
//    var x, y,startx,starty,cx,cy;
//
//    var canvas = document.createElement('canvas');
//    var context = canvas.getContext('2d');
//    var canvasp = document.getElementById('paint');
//    var contextp = canvasp.getContext('2d');
//
//    function init(){
//    //    var color = [["black","green","red","blue"],["gold","violet","pink","orange"],["grey","cyan","purple","indigo"],["yellow","magenta","brown","silver"]]
//        var img = document.getElementById('picture');
//        var img_width = img.clientWidth;
//        var img_height = img.clientHeight;
//
////        canvascp=document.getElementById('colorpicker');
////        contextcp = canvascp.getContext('2d');
//
//        var container = canvasp.parentNode;
//
////        contextcp.strokeRect(0,0,50,50);
//        canvas.id = 'painttemp';
//        canvas.width = img_width;
//        canvas.height = img_height;
//        container.appendChild(canvas);
//
//        tool_select = document.getElementById('toolselect');
//
//        canvas.addEventListener('mousemove',Mousemove,false)
//        canvas.addEventListener('mousedown', Mousedown, false);
//        canvas.addEventListener('mouseup', Mouseup, false);
////        clear.addEventListener('click', clearcanvas, false);
////        load.addEventListener('click', loadimage, false);
//        save.addEventListener('click', saveimage, false);
////        tool_select.addEventListener('change', toolchange, false);
////        canvascp.addEventListener('mousedown',changecolor,false);
////        contextcp.strokeStyle="white";
////        contextcp.strokeRect(0,0,50,50);
////        contextcp.strokeStyle="black";
//        }
//
//
//
////    if(data==undefined)
////        var data=[];
////      var db;
//    //  drawcolorpicker();
//      init();
//      drawcanvas();
//

//    function clearcanvas() {
//        document.location.href="/"
//    }
//
////    function toolchange(){
////        tool=tool_select.value;
////    }
//
//    function update() {
//        contextp.drawImage(canvas, 0, 0);
//        context.clearRect(0, 0, canvas.width, canvas.height);
//    }
//
//
//    function MouseClick(e){
//        console.log("Mouse Click")
//        if (e.pageX != undefined && e.pageY != undefined) {
//            cx = e.pageX;
//            cy = e.pageY;
//        }
//        cx =cx- canvascp.offsetLeft-10;
//        cy =cy-canvascp.offsetTop-80;
//    }
//
//
//    function Mousedown (e) {
//        console.log("Mouse Down");
//
//        MousePos(e);
//        startx=x;
//        starty=y;
//        started=true;
//    }
//
//
//    function drawcanvas(){
//        console.log("Drawing Canvas");
//
//        var obj={},i=0;
//
//        while(data.length!=i) {
//            obj=data[i];
//            if(obj.type=="rect"){
//                context.strokeStyle=obj.color;
//                drawrect(obj.x1,obj.y1,obj.x2,obj.y2);
//            }
////            else if(obj.type=="line"){
////                context.strokeStyle=obj.color;
////                drawline(obj.x1,obj.y1,obj.x2,obj.y2);
////            }
//            update();
//            i++
//        }
//        context.strokeStyle=currentcolor;
//    }
//
//
//    function saveimage(){
//        if(imagename.value=="")
//            alert("Image name cannot be empty") ;
//        else {
//            db=JSON.stringify(data);
//            $.post("/"+imagename.value,{pname:imagename.value,pdata:db},function(data,status){alert(status);});
//        }
//    }
//
//
//    function loadimage(){
//        if(imagename.value=="")
//            alert("Image name cannot be empty");
//        else {
//            document.location.href="/"+imagename.value;
//        }
//    }
//
//
//
//    function Mouseup (e) {
//        console.log("Mouse Up");
//        started =false;
//        update();
//        var obj={};
//        if(tool=="rect"){
//            obj.type="rect";
//            obj.color=currentcolor;
//            obj.x1=startx;
//            obj.y1=starty;
//            obj.x2=x;
//            obj.y2=y;
//        }
//        data.push(obj);
//    }
//
//
//    function MousePos(e){
//        if (e.pageX != undefined && e.pageY != undefined) {
//            x = e.pageX;
//            y = e.pageY;
//        }
//
//        x -= canvas.offsetLeft;
//        y -= canvas.offsetTop;
//    }
//
//
//
//    function Mousemove (e) {
//        MousePos(e);
//        if(tool=="rect"){
//            if(started){
//                drawrect(startx,starty,x,y);
//            }
//        }
//    }
//
//
    function drawrect(x1,y1,x2,y2){
        console.log("Drawing Rect")
        var w,h,x,y;
        //context.clearRect(0, 0, canvas.width, canvas.height);
        w=Math.abs(x1-x2);
        h=Math.abs(y1-y2);
        x=Math.min(x1,x2);
        y=Math.min(y1,y2);
        context.strokeRect(x,y,w,h);
    }

});







//function drawcolorpicker(){
//    for(var i=0;i<4;i=i+1){
//        for(var j=0;j<4;j=j+1)
//        {
//           contextcp.fillStyle=color[i][j];
//           contextcp.fillRect(j*50,i*50,50,50);
//           contextcp.strokeRect(j*50,i*50,50,50);
//       }
//    }
//}


//function changecolor (e){
//MouseClick(e);
//contextcp.strokeStyle="black";
//drawcolorpicker();
//contextcp.strokeStyle="white";
//contextcp.strokeRect(Math.floor(cx/50)*50,Math.floor(cy/50)*50,50,50);
//currentcolor=color[Math.floor(cy/50)][Math.floor(cx/50)];
//context.strokeStyle=currentcolor;
//  }


