// 隐形图片
 var transprant_img=9;

//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload=function(){
  document.getElementById("inputNums").value=''
  document.getElementById("tranNums").value=""
}


//判断是否有路径（逆序数）
function judgeHaveSolution(){
  console.log("判断是否有解，空格数字是："+transprant_img)
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

  //console.log("数字排列串："+str+" 逆序数个数"+inversion_number)
	// 逆序数为偶数,则返回有解,反之返回无解，
	if(inversion_number%2==0) return true; 
	else {return false};
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


var first = "";
var last = "123456789";
var walk_timer;
var result;

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
     console.log("bfs里的："+transprant_img)
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

function cheater_ce(str){ 
  route = "";
  first = str;

  if(first==last){ 
    alert("win"); 
    return -2,-2;
  }
  else{
    result = doubleBFS(); //这里多算了一次..不严重的话就不改了吧_(:з」∠)_
    if(result==-1) return -1,-1;
    else {
      // alert("这个布局最少需要" + result + "步才能完成");
      var word_route= "";
      for (var i = 0; i < route.length; i++) {
        if(route[i]=="0") word_route += "d";
        else if(route[i]=="1") word_route += "a";
        else if(route[i]=="2") word_route += "s";
        else if(route[i]=="3") word_route += "w";
      }
      // alert("从空位移动方向看步骤为： " + word_route + "  才能完成");
      return result,word_route;
      }
    
  }
}

//判断是否有路径（逆序数）
function judgeHaveSolutionStr(str){

  var inversion_number=0; //逆序数
  // 正常的求逆序数
      for (var i = 0; i < str.length; i++) { //i在前，j在后，求逆序数,从1求到9，要去掉空白块再排列
        if(str[i]==transprant_img) continue;
        for (var j = i+1; j < str.length; j++) {
          if(str[j]==transprant_img) continue;
          if(str[i]>str[j]){
            inversion_number++;          
          } 
        }
      }

  //console.log("数字排列串："+str+" 逆序数个数"+inversion_number)
	// 逆序数为偶数,则返回有解,反之返回无解，
	if(inversion_number%2==0) return true; 
	else {return false};
}


function change_nums(str,from,to){

  var new_str="";
  for(var i=0;i<str.length;i++){
    if(str[i]==from) new_str+=to;
   else if(str[i]==to) new_str+=from;
    else new_str+=str[i]
  }
  return new_str;
}

function change_strs(str,transprant_img){

  var new_str="";
  for(var i=0;i<str.length;i++){
    if(str[i]=='0') new_str+=transprant_img;
    else new_str+=str[i]
  }
  return new_str;
}


function findTransprantImg(str,transprant_img){
      for(var i=0;i<str.length;i++){
        if(str[i]==transprant_img)
        return i
      }
}

var qiangzhi_walks=140;

function ceshi(){
  transprant_img=document.getElementById("tranNums").value
  var str=document.getElementById("inputNums").value
  str=change_strs(str,transprant_img)

  if(!judgeHaveSolutionStr(str)){
    var res="这个无解哦！！！再试试其他布局吧";
  }else{
    result,route=cheater_ce(str,transprant_img)
    if(result>qiangzhi_walks){
  
      for(var i=0;i<qiangzhi_walks;i++){
  
        if(route[i]=='w'){
          id=findTransprantImg(str,transprant_img)
          console.log(id,transprant_img,str[id-3])
          str=change_nums(str,String(transprant_img),str[id-3])
        }else if(route[i]=='s'){
          id=findTransprantImg(str,transprant_img)
  
          console.log(id,transprant_img,str[id+3])
          str=change_nums(str,String(transprant_img),str[id+3])
        }else if(route[i]=='a'){
          id=findTransprantImg(str,transprant_img)
          console.log(id,transprant_img,str[id-1])
          str=change_nums(str,String(transprant_img),str[id-1])
        }else if(route[i]=='d'){
          id=findTransprantImg(str,transprant_img)
          console.log(id,transprant_img,str[id+1])
          str=change_nums(str,String(transprant_img),str[id+1])
        }
        console.log("到达强制步数时的序列："+str+"  第i步；"+i);
      }
      var res="最少需要走"+result+"步,"+  "</br>" +"路径是 : "+route+"\n"+"到达强制交换步数时序列是："+str;
    }else{
      if(route=="-2"){
        var res="你已经赢了！"
      }else{
        var res="最少需要走"+result+"步,"+  "</br>" +"路径是 : "+route;
      }
     
    }
  }
  document.getElementById("result_id").innerHTML=res
  set();
}

