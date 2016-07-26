var myVoicePulgin = function(options){
	var _this = this;
	this.settings = $.extend(true,{
		tirgger:".panel-voice",
		itemTitle:".item-container",
		del:".item-after",
		modalOpt:{
			title: '<div class="title">留言最多1分钟<br><span>3</span>秒后开始</div>',
			text: '<div class="img-info"><img src="'+window.imageDomain+'/img/icon_yyli_mkf@hdpi.png" class="record-img"></div>',
			extraClass:"voice-modal",
			buttons: [
				{
				  text: '取消',
				  onClick:function(){
				  	_this.cancel();
				  }
				},
				{
				  text: '保存',
				  close: false,
				  onClick:function(){
				  	_this.saveVoice();
				  }
				}
			]
		}
	},options);
	this.voice = {
		localId:"",
		second:0,
		serverId:"#serverId"
	};
	this.interval = null;
	this.$icon = $(this.settings.tirgger).find("i.icon-voice");
	this.status = 0;//1 录音；2 播放 ; 3暂停
	this.init();
}
myVoicePulgin.prototype = {
	init:function(){
		var self = this;
		$(document).on('click',this.settings.tirgger, function () {
			if(self.status == 0) {
				self.recording();
				self.status = 1;
				return;
			}
			if(self.status == 1 || self.status == 3) {
				self.play();
				self.status = 2;
				return;
			}
			if(self.status == 2) {
				self.stop();
				self.status  = 3;
				return;
			}
		});
		$(document).on('click',this.settings.del, function () {
			self.removeVoice();
		});
	},
	play:function(){
		var self = this;
		this.$icon.removeClass('icon-voice-play').addClass('icon-voice-loading');
		if($.device.isWeixin){
			wx.playVoice({
			    localId: this.voice.localId // 需要播放的音频的本地ID，由stopRecord接口获得
			});
		}
		//倒计时
		self.tm = self.myTime(self.voice.second,0,function(num){
			$(self.settings.itemTitle).text(num+'"');
		},function(){
			
			if($.device.isWeixin){
				wx.onVoicePlayEnd({
				    success: function (res) {
				        var localId = res.localId; // 返回音频的本地ID
				        self.$icon.removeClass('icon-voice-loading').addClass('icon-voice-play');
				        //时间返回
				        $(self.settings.itemTitle).text(self.voice.second+'"');
				    }
				});
			}else{
				self.$icon.removeClass('icon-voice-loading').addClass('icon-voice-play');
				$(self.settings.itemTitle).text(self.voice.second+'"');
			}
		});
		
	},
	stop:function(){
		this.tm && clearInterval(this.tm);
		$(this.settings.itemTitle).text(this.voice.second+'"');
		this.$icon.removeClass('icon-voice-loading').addClass('icon-voice-play');
		wx.pauseVoice({
		    localId: this.voice.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
		});
		//

	},
	cancel:function(){
		var self= this;	
		if($.device.isWeixin){
			wx.stopRecord({
			    success: function (res) {
			        var localId = res.localId;
			    }
			});
		}
		self.interval && clearInterval(self.interval);
		self.tm && clearInterval(self.tm);
		self.intervalNoOver && clearInterval(self.intervalNoOver);
		self.$icon.removeClass('icon-voice-play  icon-voice-loading').addClass('icon-voice');
		$(self.settings.itemTitle).text('不想打字？试试"说"出您的需求吧');
		$(self.settings.del).addClass("item-hide");
		self.status = 0;
	},
	recording:function(){
		var self = this;
		self.$modal = $($.modal(self.settings.modalOpt));
		self.$title = self.$modal.find(".title");
		self.$span = self.$modal.find(".title span");
		self.$save = self.$modal.find(".modal-button:last-child");
		self.intervalNoOver = self.myTime(3,0,function(num){
			self.$span.text(num);
		},function(){
			if($.device.isWeixin){
				wx.startRecord();//wx.record();开始录音
				//添加微信录音停止事件
				wx.onVoiceRecordEnd({
				    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
				    complete: function (res) {
				        self.voice.localId = res.localId;
				    }
				});
			}
			self.$title.html("请说出您的需求<br><span>00:00</span>");
			self.$modal.find(".img-info").addClass("recording");

			self.interval = self.myTime(0,60,function(num){
				self.$modal.find(".title span").text(self.setTime(num));
				self.voice.second = num;
				if(num == 5){
					self.$save.addClass("btn-danger");
	     		}
			},function(){

			})

		})
	},
	saveVoice:function(){
		var self = this;
		if(this.$save.hasClass('btn-danger')){
	  		$.closeModal(".voice-modal");
	  		if($.device.isWeixin){
		  		wx.stopRecord({
				    success: function (res) {
				        self.voice.localId = res.localId;
				        self.$icon.removeClass('icon-voice').addClass('icon-voice-play');
				        $(self.settings.del).removeClass("item-hide");	  				
				        //显示时间
				        $(self.settings.itemTitle).text(self.voice.second+'"');
				        wx.uploadVoice({
						    localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
						    isShowProgressTips: 1, // 默认为1，显示进度提示
						    success: function (res) {
						        $(self.voice.serverId).val(res.serverId);
						    } 
						});
				    }
				});
		  	}else{
		  		//self.voice.serverId = res.serverId;
		  		self.$icon.removeClass('icon-voice').addClass('icon-voice-play');
		  		$(self.settings.itemTitle).text(self.voice.second+'"');
		  		$(self.settings.del).removeClass("item-hide");
		  	}
	  		self.interval && clearInterval(self.interval);
	  	}else{
	  		//$.alert("录音必须超过5秒");
	  	}
	},
	setTime:function(num){
		var m = Math.floor(num/60);
		var s = num%60;
		m = m<10?"0"+m:m;
		s = s<10?"0"+s:s;
		return m+":"+s;
	},
	myTime:function(start,end,callback,fns){
		var num = start;
		var type = 1;
		if(start-end > 0){
			type = -1
		}
		var tm = setInterval(function(){
			var flag = false;
			if(type == 1) {
				flag = (num>=end);
			}else{
				flag = (num<=end);
			}
			if(flag){
				fns && fns()
		        clearInterval(tm);
		        return;
			}
			num = num+type;
			callback && callback(num);
		},1000)
		return tm;
	},
	removeVoice:function(){
		var self= this;
		$.confirm('确定要删除已保存的录音吗？', function () {
			self.interval && clearInterval(self.interval);
			self.tm && clearInterval(self.tm);
			self.intervalNoOver && clearInterval(self.intervalNoOver);
	        //删除
	        this.voice = {
				localId:"",
				second:0,
				serverId:""
			};
			$(self.voice.serverId).val("");
			self.$icon.removeClass('icon-voice-play  icon-voice-loading').addClass('icon-voice');
			$(self.settings.itemTitle).text('不想打字？试试"说"出您的需求吧');
			$(self.settings.del).addClass("item-hide");
			self.status = 0;
	    });
	}
};
if($.device.isWeixin){
	new myVoicePulgin();
}
