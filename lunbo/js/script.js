var oDiv = document.getElementById('playImages');

var oLeftCret = getByClass(oDiv, 'left-cret')[0];
var oRightCret = getByClass(oDiv, 'right-cret')[0];
var oLeftArea = getByClass(oDiv, 'left-area')[0];
var oRightArea = getByClass(oDiv, 'right-area')[0];

var oDivSmall = getByClass(oDiv, 'thum')[0];
var oUlSmall = oDivSmall.getElementsByTagName('ul')[0];
var aLiSmall = oDivSmall.getElementsByTagName('li');

var oUlBig = getByClass(oDiv, 'main')[0];
var aLiBig = oUlBig.getElementsByTagName('li');

var nowZIndex = 2;

var now = 0;//当前图片

oUlSmall.style.height=aLiSmall.length*aLiSmall[0].offsetHeight+'px';

// 左右按钮 
oLeftCret.onmouseover = oLeftArea.onmouseover = function(){
  startMove(oLeftCret, 'opacity', 100);
}
oLeftCret.onmouseout = oLeftArea.onmouseout = function(){
  startMove(oLeftCret, 'opacity', 0);
}

oRightArea.onmouseover = oRightCret.onmouseover = function(){
  startMove(oRightCret, 'opacity', 100);
}
oRightArea.onmouseout = oRightCret.onmouseout = function(){
  startMove(oRightCret, 'opacity', 0);
}

// 大图切换
for(var i = 0; i < aLiSmall.length; i++){
  aLiSmall[i].index = i;
  aLiSmall[i].onclick = function(){
    if(this.index == now) return;   
    now = this.index;
    changePic();
  };

  aLiSmall[i].onmouseover = function(){
    startMove(this, 'opacity', 100);
  }
  aLiSmall[i].onmouseout = function(){
    if(this.index != now){
      startMove(this, 'opacity', 60);
    } 
  }
}
// 按钮切换
oLeftCret.onclick = function(){
  now--;
  if(now == -1){
    now = aLiSmall.length - 1;
  }
  changePic();
}

oRightCret.onclick = function(){
  now++;
  if(now == aLiSmall.length){
    now = 0;
  }
  changePic();
}
// 2s定时
var timer = setInterval(oRightCret.onclick, 2000);
oDiv.onmousemove = function(){
  clearInterval(timer);
}
oDiv.onmouseout = function(){
  timer = setInterval(oRightCret.onclick, 2000);
}

function getByClass(oParent, sClass){
  var aEle = oParent.getElementsByTagName('*');
  var aResult = [];
  for(var i = 0; i < aEle.length; i++){
    if(aEle[i].className == sClass){
      aResult.push(aEle[i]);
    }
  }
  return aResult;
}

function changePic(){
    aLiBig[now].style.zIndex = nowZIndex++;

    for(var i = 0; i < aLiSmall.length; i++){
      startMove(aLiSmall[i], 'opacity', 60);
    }
    startMove(aLiSmall[now], 'opacity', 100);
    aLiBig[now].children[0].style.height = 0;
    startMove(aLiBig[now].children[0], 'height', 504);

    if(now==0||now==1){
			startMove(oUlSmall, 'top', 0);
		}
		else if(now==aLiSmall.length-2){
			startMove(oUlSmall, 'top', -(now-3)*aLiSmall[0].offsetHeight);
		}
		else if(now==aLiSmall.length-1){
      startMove(oUlSmall, 'top', -(now-4)*aLiSmall[0].offsetHeight);
    }else{
			startMove(oUlSmall, 'top', -(now-2)*aLiSmall[0].offsetHeight);
		}
}
