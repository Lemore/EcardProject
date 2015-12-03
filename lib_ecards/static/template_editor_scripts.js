var started = false;
var tool="rect",currentcolor="black",currentfill="white";
var color = [["black","green","red","blue"],["gold","violet","pink","orange"],["grey","cyan","purple","indigo"],["yellow","magenta","brown","silver"]]
var x, y,startx,starty,cx,cy;
canvascp=document.getElementById('colorpicker');
contextcp = canvascp.getContext('2d');
canvasp=document.getElementById('paint');
contextp = canvasp.getContext('2d');
var container = canvasp.parentNode;
canvas = document.createElement('canvas');
contextcp.strokeRect(0,0,50,50);
canvas.id = 'painttemp';
canvas.width = canvasp.width;
canvas.height = canvasp.height;
container.appendChild(canvas);
context = canvas.getContext('2d');
tool_select = document.getElementById('toolselect');

if(data==undefined)
	var data=[];
  var db;
  drawcolorpicker();
  init();
  drawcanvas();

function init(){
    canvas.addEventListener('mousemove',Mousemove,false)
    canvas.addEventListener('mousedown', Mousedown, false);
    canvas.addEventListener('mouseup', Mouseup, false);
    clear.addEventListener('click', clearcanvas, false);
    load.addEventListener('click', loadimage, false);
    save.addEventListener('click', saveimage, false);
    tool_select.addEventListener('change', toolchange, false);
    canvascp.addEventListener('mousedown',changecolor,false);
    contextcp.strokeStyle="white";
    contextcp.strokeRect(0,0,50,50);
    contextcp.strokeStyle="black";
}

function drawcolorpicker(){
    for(var i=0;i<4;i=i+1){
        for(var j=0;j<4;j=j+1)
        {
           contextcp.fillStyle=color[i][j];
           contextcp.fillRect(j*50,i*50,50,50);
           contextcp.strokeRect(j*50,i*50,50,50);
       }
    }
}


function changecolor (e){
MouseClick(e);
contextcp.strokeStyle="black";
drawcolorpicker();
contextcp.strokeStyle="white";
contextcp.strokeRect(Math.floor(cx/50)*50,Math.floor(cy/50)*50,50,50);
currentcolor=color[Math.floor(cy/50)][Math.floor(cx/50)];
context.strokeStyle=currentcolor;
  }
  function clearcanvas()
  {
   document.location.href="/"

  }
  function toolchange(){
   tool=tool_select.value;
  }
  function update() {
 contextp.drawImage(canvas, 0, 0);
 context.clearRect(0, 0, canvas.width, canvas.height);
  }
   function MouseClick(e){
 if (e.pageX != undefined && e.pageY != undefined) {
 cx = e.pageX;
 cy = e.pageY;
 }
 cx =cx- canvascp.offsetLeft-10;
 cy =cy-canvascp.offsetTop-80;
   }
   function Mousedown (e) {
    MousePos(e);
    startx=x;
    starty=y;
    started=true;
   }
   function drawcanvas(){
   var obj={},i=0;

    while(data.length!=i)
    {
    obj=data[i];
    if(obj.type=="rect"){

    context.strokeStyle=obj.color;
    drawrect(obj.x1,obj.y1,obj.x2,obj.y2);
    }
    else if(obj.type=="line"){
    context.strokeStyle=obj.color;
    drawline(obj.x1,obj.y1,obj.x2,obj.y2);
    }
    else if(obj.type=="circle"){
 context.strokeStyle=obj.color;
    drawcircle(obj.x,obj.y,obj.r);
    }
    update();
    i++

    }


    context.strokeStyle=currentcolor;

   }
   function saveimage(){
 if(imagename.value=="")
 alert("Image name cannot be empty") ;
 else{
 db=JSON.stringify(data);
 $.post("/"+imagename.value,{pname:imagename.value,pdata:db},function(data,status){alert(status);});

 }

   }
   function loadimage(){
    if(imagename.value=="")
 alert("Image name cannot be empty");
 else{

 document.location.href="/"+imagename.value;

 }
   }
   function Mouseup (e) {
    started =false;
    update();
    var obj={};
    if(tool=="rect"){
    obj.type="rect";
    obj.color=currentcolor;
    obj.x1=startx;
    obj.y1=starty;
    obj.x2=x;
    obj.y2=y;
    }
    else if(tool=="line"){
    obj.type="line";
    obj.x1=startx;
    obj.y1=starty;
    obj.x2=x;
    obj.y2=y;
    obj.color=currentcolor;
    }
    else if(tool=="circle"){
 obj.type="circle";
    obj.x=startx;
    obj.y=starty;
    obj.r=Math.abs(startx-x);
    obj.color=currentcolor;
    }
    data.push(obj);



   }
   function MousePos(e){
     if (e.pageX != undefined && e.pageY != undefined) {
 x = e.pageX;
 y = e.pageY;
 }

 x -= canvas.offsetLeft;
 y -= canvas.offsetTop;

    }
   function Mousemove (e) {
    MousePos(e);
    if(tool=="rect"){
   if(started){
   drawrect(startx,starty,x,y);
   }
   }

   else if(tool=="line"){
   if(started){
   drawline(startx,starty,x,y);
   }
   }

   else if(tool=="circle"){
   if(started){
   drawcircle(startx,starty,Math.abs(startx-x));
 }
 }


    }
    function drawrect(x1,y1,x2,y2){
   var w,h,x,y;
   context.clearRect(0, 0, canvas.width, canvas.height);
   w=Math.abs(x1-x2);
   h=Math.abs(y1-y2);
   x=Math.min(x1,x2);
   y=Math.min(y1,y2);
   context.strokeRect(x,y,w,h);
   }
   function drawline(x1,y1,x2,y2){
     context.clearRect(0, 0, canvas.width, canvas.height);
   context.beginPath();
 context.moveTo(x1,y1);
 context.lineTo(x2,y2);
 context.stroke();
 context.closePath();

    }
    function drawcircle(x,y,r){
     context.clearRect(0, 0, canvas.width, canvas.height);
   context.beginPath();
 context.arc(x,y,r, 0, 2*Math.PI, false);
 context.stroke()
     context.closePath();
    }
