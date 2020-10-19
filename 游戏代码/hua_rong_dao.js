// 初始隐形图片
var transprant_img=9;
var move_walks=0;

var value_div=new Array(10);
// 初始化value_div的值，div编号和值是一致的
// value_div[x]=y 表示第x个图片在第y个的位置上
for(var i=0;i<=9;i++){
    value_div[i]=i;
}

//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload=function(){
    shuffle_div();  
    // 初始禁用交换图片的按钮
    document.getElementById("change_num_btn").disabled=true
}

// 判断是否成功
function judge(){

    var count=0;
    for(var i=1;i<=9;i++){
        if(value_div[i]==i){
            count+=1;
        }else{            
            break;
        }
    }
    if(count==9){
      tan_show_close("你赢了！！！你的步数是："+move_walks);
      return 1;
    }
    return 0;
}

// 点击图片，与隐形图片transprant_img交换位置
function move(from) {
    var from_id=String(from.id)[1];
    // from_position是目的图片所在位置
    for(var i=1;i<=9;i++){
      if(value_div[i]==from_id){
        from_position=i;
      }
      if(value_div[i]==transprant_img){
        to_position=i;
      }
    }

    // 当前元素的位置
    var from_left=from.offsetLeft;
    var from_right=from_left+from.offsetWidth;
    var from_top=from.offsetTop;
    var from_bottom=from_top+from.offsetHeight;
   
// 目的位置
    var to=document.getElementById("u"+transprant_img);
    console.log("transprant_img:  "+transprant_img)
    var to_left=to.offsetLeft;
    var to_top=to.offsetTop;
    var to_bottom=to_top+to.offsetHeight;
    var to_right=to_left+to.offsetWidth;

    // 判断被点的图片是否可以和 隐形图片 utransprant_img 交换位置
    if((from_top==to_bottom&&from_left==to_left)||
        (from_top==to_top&&from_left==to_right)||
        (from_top==to_top&&from_right==to_left)||
        (from_bottom==to_top&&from_left==to_left)){

          from.style.left=to_left+"px";
          from.style.top=to_top+"px";
          to.style.left=from_left+"px";
          to.style.top=from_top+"px";
//          交换value的值
          var value=value_div[to_position];
          value_div[to_position]=from_id;
          value_div[from_position]=transprant_img;    
          move_walks++;  
    }

    // 判断是否强制交换
    console.log(move_walks+"步数")
    // 判断是否成功
    judge();
    if(move_walks==20&&!judge()){
      // alert("你的步数已经到达20步，我们要强制交换了")
      tan_show("你的步数已经到达20步，我们要强制交换了");
      auto_change();
    }

  }
//交换后人为交换
function ren_change(){
  
    var str=document.getElementById("change_num").value
  
    if(str.length==2){
      change_from=str[0]
      change_to=str[1]

      moveByPos(change_from,change_to);
        // 交换后禁用按钮
      document.getElementById("change_num_btn").disabled=true
        // 交换图片后判断是否赢，判断是否有路径
        judge()
    }else{
      tan_show("请输入两个数字哦");
      // 重新输入
      document.getElementById("change_num_btn").disabled=false
    }

    if(!judgeHaveSolution()){
     
      console.log("人为交换后无解")
      // alert("请再次输入两个数字交换图片哦")
      tan_show("运气不够好呢,交换后无解,请再次输入两个数字交换图片哦");
      document.getElementById("change_num_btn").disabled=false
      //按钮生效，可以点击提交数字，人为交换
    }else{
      console.log("人为交换后有解")
    }
    document.getElementById("change_num").value=""

}
//强制交换
function auto_change(){
        arr=[9,1,2,3,4,5,6,7,8];
         i=arr.length;  //i=9
         console.log("强制交换前："+myToString())
        while(i){
             let j=Math.floor(Math.random()*i--);
             [arr[j], arr[i]] = [arr[i], arr[j]];
           }
              // 交换id是arr[2],arr[4]的图片
        
          var change_from=arr[3]
          var change_to=arr[5]
        
          moveByPos(change_from,change_to);
          console.log("强制交换后："+myToString())
      
      // 交换图片后判断是否赢，判断是否有路径
      judge()
    if(!judgeHaveSolution()){
     
      tan_show("你的步数已经到达49步，我们要强制交换了，"+'\n'+"交换后现在无解，请输入你想要自由交换的图片序号");
      console.log("强制交换后无解")
      //按钮生效，可以点击提交数字，人为交换
      document.getElementById("change_num_btn").disabled=false
    }else{
      console.log("强制交换后有解")
    }
      
}

// 控制弹窗的显示或隐藏
function tan_show(txt){
 
  var tanchuang=document.getElementById("tanchuang");
  // if(tanchuang.style.display="none"){
     
  // }
  tanchuang.style.display="block"
  document.getElementById("tan_text").innerText=txt

  
}

// 控制弹窗的显示或隐藏
function tan_close(){
  var tanchuang=document.getElementById("tanchuang")
  tanchuang.style.display="none"
  
}


// 图片先归位，再随机打乱图片, 交换div的位置
function shuffle_div(){

  for(var i=0;i<=9;i++){
    value_div[i]=i;
  }
  // 图片归位
  lefts=[0,0,150,300,0,150,300,0,150,300]
  tops=[0,0,0,0,150,150,150,300,300,300]
  for(var i=1;i<=9;i++){
    document.getElementById("u"+i).style.left=lefts[i]+"px";
    document.getElementById("u"+i).style.top=tops[i]+"px";
  }
  // 上次设置的隐形图片还原
   document.getElementById("u"+transprant_img).style.opacity=1;
    // 记录的步数也要清零
   move_walks=0;

  var divs=[]
    //   每个div的图片序号
  for(var i=1;i<=9;i++){
    divs[i]=document.getElementById("u"+i);
  }
  arr=[9,1,2,3,4,5,6,7,8];
  i=arr.length;  //i=9
    while(i){
      let j=Math.floor(Math.random()*i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    // 随机设置隐形图片
    transprant_img=arr[2];
    document.getElementById("u"+transprant_img).style.opacity=0.5;
    console.log("设置隐形的图片："+transprant_img)
      
    for (var i=1;i<=9;i++){
        // 第arr[i-1]个div 和 第i个div 交换位置
      divs[i].style.left=lefts[arr[i-1]]+"px";
      divs[i].style.top=tops[arr[i-1]]+"px";
      //   第i个图片在第arr[i-1]的位置上
      value_div[arr[i-1]]=i;
    }   
    console.log("shuffle之后的序列："+value_div)
    judge();
}


var pause = true;
function startAndStop(){
	// 开始计时
	var myclass = document.getElementsByClassName("image");
	if(pause){ //改字，改状态，开始计时+改div不能选定
		document.getElementById("start_and_stop").innerHTML = "结束游戏";
		for (var i = 0; i < myclass.length; i++) {
			myclass[i].style.cssText += "pointer-events: auto;"/*开始了游戏才能点按钮*/
		}
		pause = false;
        set_timer = setInterval(timer,1000);
        // 把上次设置的隐形图片恢复
        // document.getElementById("u"+transprant_img).style.opacity=0;
        // shuffle_div();
	}
	else{
		document.getElementById("start_and_stop").innerHTML = "开始游戏";
		for (var i = 0; i < myclass.length; i++) {
			myclass[i].style.cssText += "pointer-events: none;"/*停止了游戏就不能点按钮*/
		}
		pause = true;
		clearInterval(set_timer);	
	}
}

var time = 0;
// 计时函数,计时+改文字
function timer(){
  time ++;
	var sec = time%60;
	var min = (time-sec)/60;
	document.getElementById("timer").innerHTML =  min + "分" + sec + "秒";
}
//判断是否有路径（逆序数）
function judgeHaveSolution(){
  var inversion_number=0; //逆序数
  // 正常的求逆序数
      for (var i = 1; i < value_div.length; i++) { //i在前，j在后，求逆序数,从1求到9，要去掉空白块再排列
        if(value_div[i]==transprant_img) continue;
        for (var j = i+1; j < value_div.length; j++) {
          if(value_div[j]==transprant_img) continue;
          if(value_div[i]>value_div[j]){
            inversion_number++;
            
          } 
        }
      }
	// 逆序数为偶数,则返回有解,反之返回无解，
	if(inversion_number%2==0) return true; 
	else {return false};
}
//选择图片
function choose_image(img){
  img_src=img.src;
  document.getElementById("correct_img").src=img_src;

  $("#play_ground div").css('background-image',"url("+img_src+")");
  $('#correct_img').css('background-image',"url("+img_src+")"); 
  shuffle_div();
}

function HashTable() {
  var size = 0;
  var entry = new Object();
  this.add = function (key, value) {
      if (!this.containsKey(key)) {
          size++;
      }
      entry[key] = value;
  }
  this.getValue = function (key) {
      return this.containsKey(key) ? entry[key] : null;
  }
  this.remove = function (key) {
      if (this.containsKey(key) && (delete entry[key])) {
          size--;
      }
  }
  this.containsKey = function (key) {
      return (key in entry);
  }
  this.containsValue = function (value) {
      for (var prop in entry) {
          if (entry[prop] == value) {
              return true;
          }
      }
      return false;
  }
  this.getValues = function () {
      var values = new Array();
      for (var prop in entry) {
          values.push(entry[prop]);
      }
      return values;
  }
  this.getKeys = function () {
      var keys = new Array();
      for (var prop in entry) {
          keys.push(prop);
      }
      return keys;
  }
  this.getSize = function () {
      return size;
  }
  this.clear = function () {
      size = 0;
      entry = new Object();
  }
}

function Queue(){
  this.dataStore = [];
this.push = function push ( element ) {
  this.dataStore.push( element );
}     //入队
  this.pop = function pop () {
  if( this.empty() ) return 'This queue is empty';
  else this.dataStore.shift();
}     //出队	
     this.back = function back () {
     if( this.empty() ) return 'This queue is empty';
     else return this.dataStore[ this.dataStore.length - 1 ];
   }          //查看队尾元素
this.mytoString = function mytoString(){
  return this.dataStore.join('\n');
}   //显示队列所有元素
this.clear = function clear(){
  delete this.dataStore;
  this.dataStore = [];
}         //清空当前队列
this.empty = function empty(){
  if( this.dataStore.length == 0 ) return true;
  else return false;
}         //判断当前队列是否为空
this.front = function front(){
  if( this.empty() ) return 'This queue is empty';
  else return this.dataStore[ 0 ];
}          //查看队首元素
}

// 九宫格字符数组转换为字符串123546789成功,是把s[10]化成字符串
function myToString(){
    var str = "";
    for (var i = 1; i < value_div.length; i++) {
      str += value_div[i];
    }
    return str;
}


var first = "";
var last = "123456789";
var walk_timer;
var result;
function cheater(){ //开挂功能
      route = "";
      first = myToString();
      if(first==last){
        tan_show("这个布局已经赢了!")
    }else if(!judgeHaveSolution()){
      tan_show("这个布局竟然无解，看来我又要改bug了o(╥﹏╥)o,或者你重新开始也可以")
    }
      else{
        result = doubleBFS(); 
        if(result==-1) 
          tan_show("这个布局竟然无解，看来我又要改bug了o(╥﹏╥)o,或者你重新开始也可以")
        else {

          tan_show("这个布局最少需要" + result + "步才能完成")
          var word_route= "";
          for (var i = 0; i < route.length; i++) {
            if(route[i]=="0") word_route += "右";
            else if(route[i]=="1") word_route += "左";
            else if(route[i]=="2") word_route += "下";
            else if(route[i]=="3") word_route += "上";
          }
          console.log("路线是：",word_route,"需要步数是：",result)
          tan_show("从空位移动方向看步骤为： " + word_route + "  才能完成")
          }
        if(result != -1) walk_timer  = setInterval(walk, 400);
        set();
      }
}

var route; //路线里0是右，1是左，2是下，3是上
var dis = new HashTable();
var vis = new HashTable();
var route1 = new HashTable(); 
var route2 = new HashTable(); 
var q1 = new Queue();
var q2 = new Queue();
var dir = new Array([0,1],[0,-1],[1,0],[-1,0])
var str1 = "";
var str2 = "";
var str = "";
var flag = 0;
var BFSx = 0;
var BFSy = 0;
function doubleBFS(){
      // first当前状态的序列
     //q1：从前向后遍历
      q1.push(first);
      dis.add(first,1);
      vis.add(first,1);
      route1.add(first,"");
      //q2从后往前遍历
      q2.push(last);
      dis.add(last,1);
      vis.add(last,2);
      route2.add(last,""); 
      //q1,q2中元素都非空才可循环，找到答案前，任意一边为空，都说明路径不可达
      while(!q1.empty() && !q2.empty()){
      //广度双向搜索，选择节点个数较少的那个方向先扩展
        if(q1.dataStore.length < q2.dataStore.length){
          str1 = q1.front(); 
          q1.pop();
          flag = 1;
        }
        else{
          str1 = q2.front();
          q2.pop();
          flag = 2; 
        }
        //选择二维数组形式，以便于判断下一个状态的可选方向
        toMatrix(str1);
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
           //找空格在的位置
            if(m[i][j]== transprant_img){
              BFSx = i;
              BFSy = j;
              break;
            }
          }
          if(m[i][j]==transprant_img) break;
        }
        // 移动9的位置，并修改m数组的值，m数组的值是str1的位置图
        for (var i = 0; i < 4; i++) {
          str2 = ""; //每次寻找时都清零，不然会累计
          var tx = BFSx + dir[i][0];//dir上左左右四个方向
          var ty = BFSy + dir[i][1];
          if(inBoundary(tx,ty)){ //就是c++里的swap
            var temp = m[BFSx][BFSy];
            m[BFSx][BFSy] = m[tx][ty];
            m[tx][ty] = temp;
            
            // 原来函数里的tostring功能
            for (var j = 0; j < 3; j++) {
              for (var k = 0; k < 3; k++) {
                str2 += m[j][k];//str2是str1移动后的位置
              }
            }

            if(!dis.containsKey(str2)){
              dis.add(str2,dis.getValue(str1) + 1) ;
              vis.add(str2,vis.getValue(str1) );
              str = i.toString();
              if(flag == 1 ){
                q1.push(str2);
                route1.add(str2,route1.getValue(str1) + str) ;

              }else if(flag==2){
                q2.push(str2);
                route2.add(str2,route2.getValue(str1) + str) ;		
			
              }
            } 
            else{
              str = i.toString();
              //从前向后
              if(flag == 1 ){
                route1.add(str2,route1.getValue(str1) + str) ;
              }else if(flag==2){
                route2.add(str2,route2.getValue(str1) + str) ;					
              }	
               //如果两个value值相加等于3，则表示找到路径			
              if(vis.getValue(str1) + vis.getValue(str2) == 3){
               //计算距离
                var ans = dis.getValue(str1) + dis.getValue(str2) -1;
                var ahead_route;
                var later_route;
                var change_later_route = "";
                var r11 = route1.getValue(str1);
                var r12 = route1.getValue(str2);
                var r21 = route2.getValue(str1); 
                var r22 = route2.getValue(str2);
                //为了尽快地找到共同的结点，选择长的
                if(r11 && r12)	r11.length>r12.length? ahead_route=r11 : ahead_route=r12 ; //三元选择符输出长的
                else if(!r11 && r12) ahead_route=r12; //r11是null，输出r12
                else if(r11 && !r12) ahead_route=r11; //r12是null，输出r11 
                
                // 回推的方向还要再颠倒下...
                if(r21 && r22)	r21.length>r22.length? later_route=r21 : later_route=r22 ; //三元选择符输出长的
                else if(!r21 && r22) later_route=r22; //r21是null，输出r22
                else if(r21 && !r22) later_route=r21; //r22是null，输出r21
                later_route = later_route.split('').reverse().join('');
                for (var i = 0; i < later_route.length; i++) { 
                  if(later_route[i]=="0") change_later_route += "1";
                  else if(later_route[i]=="1") change_later_route += "0";
                  else if(later_route[i]=="2") change_later_route += "3";
                  else if(later_route[i]=="3") change_later_route += "2";
                }
                route = ahead_route + change_later_route ;
                return ans;
              }
            }
          //恢复现场
          var temp = m[BFSx][BFSy];
          m[BFSx][BFSy] = m[tx][ty];
          m[tx][ty] = temp;
          }
        }
      }
      return -1;
}

var m = new Array([0,0,0],[0,0,0],[0,0,0]);

//把字符串变成九宫字符数组
function toMatrix(str){ 
    for (var i = 0; i < str.length; i++) {
      m[(i-(i % 3)) / 3][i % 3] = str[i];
    }
}

function inBoundary(x,y){
return (x>=0 && x<3) && (y>=0 && y<3);
}

function set(){
    dis = new HashTable();
    vis = new HashTable();
    route1 = new HashTable();
    route2 = new HashTable(); 
    q1 = new Queue();
    q2 = new Queue();
    str1 = "";
    str2 = "";
    str = "";
    flag = 0;
    BFSx = 0;
    BFSy = 0;
    last = "123456789";
    m = new Array([0,0,0],[0,0,0],[0,0,0]);
}

var walk_times = 0 ;


function findPosition(from_number){
	for (var i = 1; i < value_div.length; i++) {
		if (value_div[i]==from_number){ //扫一遍s表，看看数字在哪个位置
			return i;
		}
	}
}


// 交换第from_pos和to_pos位置上的图片
function moveByPos(from_pos,to_pos) {
    from_num=value_div[from_pos]
    to_num=value_div[to_pos];

    from_div=document.getElementById("u"+from_num);
   to_div=document.getElementById("u"+to_num);

   from_left=from_div.style.left;
  from_top=from_div.style.top;

  from_div.style.left=to_div.style.left;
  from_div.style.top=to_div.style.top;

  to_div.style.left=from_left;
  to_div.style.top=from_top;

  value_div[from_pos]=to_num;
  value_div[to_pos]=from_num;
  console.log("move_by_pos:"+from_pos+" "+to_pos)

}

// 动画演示用到的函数
function walk(){

  var space_position = findPosition(transprant_img); //找空格的位置 这里是value_div[n]位置
  var i = walk_times;
  var myTag = document.getElementsByTagName("div");
  for (var j = 0; j < myTag.length; j++) {
    myTag[j].style.cssText += "pointer-events: none;"/*停止了游戏就不能点按钮*/
    document.getElementById("tanchuang").style.cssText += "pointer-events: auto;"
  }
  if(route[i]=="0"){ //向右走,点击移动右边的数字
    moveByPos(space_position,space_position+1);
  }
  else if (route[i]=="1"){ //向左走
    moveByPos(space_position,space_position-1);
  }
  else if (route[i]=="2"){ //向下走
    moveByPos(space_position,space_position+3);
  }
  else if (route[i]=="3"){ //向上走
    moveByPos(space_position,space_position-3);
  }
  walk_times++;
  if(walk_times == route.length){ //如果步数走到了，就关计时器，并且步数清零
    walk_times = 0;
    clearInterval(walk_timer);
    for (var j = 0; j < myTag.length; j++) {
      myTag[j].style.cssText += "pointer-events: auto;"/*停止了游戏就不能点按钮*/
    }
  }
}


