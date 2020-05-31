function Dialog(obj) {
	this.id = obj.id;
	this.dialog = document.getElementById(this.id);
	this._w = obj._w < 150 ? 150 : obj._w;
	this._h = obj._h < 150 ? 150 : obj._h;
	this.title= obj.title;
	this.content = obj.content;
	this.location = obj.location;
	this.top = obj.top;
	this.left = obj.left;
	this.posX = this.dialog.left;
	this.posY = this.dialog.top;
	this.body = document.getElementById("body");
	this.titID = document.getElementsByClassName("da-title")[0];
	this.da_head = document.getElementsByClassName("da-header")[0];
	this.contsID = document.getElementsByClassName("da-body")[0].getElementsByTagName("p")[0];
	this.closeID = document.getElementsByClassName("close")[0];
	this.btn_default = document.getElementsByClassName("btn-default")[0];
	this.btn_primary = document.getElementsByClassName("btn-primary")[0];
	this.move = obj.move;
	this.callback = obj.callback; //用户自定义的函数名
	//先调用初始化方法
	this.init();
	this.addEvent();
}
//初始化代码
Dialog.prototype.init = function() {
	
	this.dialog.style.width = this._w + "px";
	this.dialog.style.height = this._h + "px";
	this.titID.innerHTML = this.title;
	this.contsID.innerHTML = this.content;
	if (this.location == "top") {
		this.dialog.style.transform = "translate(-50%, 0)";
	} else
	if (this.location == "left") {
		this.dialog.style.setProperty('left', '0');
		this.dialog.style.setProperty('transform', 'initial');
	} else
	if (this.location == "right") {
		this.dialog.style.setProperty('left', 'initial');
		this.dialog.style.setProperty('transform', 'initial');
		this.dialog.style.setProperty('right', '0');
		//使用setProperty()方法设置属性的值为“initial”将重置该属性为其初始值，达到删除该属性的任何效果。

	} else
	if (this.location[0].top != null || this.location[0].right != null || this.location[0].bottom != null || this.location[
			0].left != null) {
		this.dialog.className = "da-dialog";
		//先清空原有的定位属性
		this.dialog.style.setProperty('left', 'initial');
		this.dialog.style.setProperty('top', 'initial');
		this.dialog.style.setProperty('right', 'initial');
		this.dialog.style.setProperty('bottom', 'initial');
		// 定义新的位置
		this.dialog.style.top = this.location[0].top;
		this.dialog.style.right = this.location[0].right;
		this.dialog.style.bottom = this.location[0].bottom;
		this.dialog.style.left = this.location[0].left;
	} else {
		this.dialog.style.setProperty('top', '50%');
	}
}
Dialog.prototype.addEvent = function() {
	var that = this;
	//点击X时，隐藏
	if (this.closeID) {
		this.closeID.addEventListener("click", function() {
			that.dialog.style.display = "none";
			that.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
		}, false);
	}
	//点击关闭按钮，隐藏
	if (this.btn_default) {
		this.btn_default.addEventListener("click", function() {
			that.dialog.style.display = "none";
			that.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
		})
	}
	

	if (this.btn_primary) {
		this.btn_primary.addEventListener("click", function() {
			that.dialog.style.display = "none";
			that.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
			if (that.callback) {
				that.callback.call(null); //调用同名的全局函数
			}
		})
	} else {
		return;
	}

	if (this.move) {
		this.da_head.style.cursor = "move";
		//判断是移动端还是pc端,true为移动端，false为pc端
		this.device = (/android|iphone|ipad|webos|blackberry/i.test(window.navigator.userAgent.toLowerCase()));
		this.clickEvent = this.device ? "touchstart" : "mousedown";
		this.moveEvent = this.device ? "touchmove" : "mousemove";
		this.endEvent = this.device ? "touchend" : "mouseup";
		// 添加鼠标点击或手机点击事件
		var that = this;
		this.da_head.addEventListener(this.clickEvent, function(evt) {
			var event = evt || window.event;
			// 获取鼠标点击或手指点击时的视口坐标
			that.dialog.style.left = that.posX + "px";
			that.dialog.style.top = that.posY + "px";
			that.isMouseDown = true; //鼠标按下
		}, false);
		this.da_head.addEventListener(this.moveEvent, function(evt) {
			if (!that.isMouseDown) {
				return false;
			} else {
				var event = evt || window.event;
				that.dialog.style.setProperty('transform', 'initial'); //将该属性清空
				var x2 = that.device ? event.touches[0].clientX : event.clientX;
				var y2 = that.device ? event.touches[0].clientY : event.clientY;
				that.dialog.style.left = x2 /* - document.body.offsetWidth / 2 */ - that.dialog.offsetWidth / 2 + "px";
				that.dialog.style.top = y2 - ($(".da-header")[0].offsetHeight / 2) + "px";
			}
		}, false);
		this.da_head.addEventListener(this.endEvent, function(evt) {
			that.isMouseDown = false; //鼠标未按下
			that.posX = that.dialog.offsetLeft;
			that.posY = that.dialog.offsetTop;
		}, false);
	}
}

var dia = { //让提示框显示，默认是隐藏
	onclick: function(id) {
		// document.getElementById(id).style.transform = "translate3d(0,100px,0)";
		document.getElementById(id).style.setProperty('display', 'block');
		
	}
}
