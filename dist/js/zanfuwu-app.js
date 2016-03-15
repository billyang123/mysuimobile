/*!
 * =====================================================
 * zanfuwu by yangbinbin - http://m.zanfuwu.com/
 *
 * =====================================================
 */

$(function () {
  'use strict';
  if(!__app) __app = {};  
  __app.loadMoreLink = function(options){
      // 加载flag
      var self = this;
      this.options = options;
      //容器
      this.$infinite = $('.infinite-scroll');
      this._loadEl = $('.infinite-scroll-preloader');
      this.loading = false;
      this.loaded = false;
      this.container = $(this.options.container) || $('.infinite-scroll-bottom .list-container');
      this.page = this.options.page || 1;
      this.data = this.options.data;
      this.url = this.options.url;

      this.addItems = function(type){
        $.ajax({
            url:this.url,
            type:"get",
            data:this.data.replace('{index}',self.page),
            success:function(html){
              if($.trim(html) == ""){
                $.detachInfiniteScroll(self.$infinite);
                // 删除加载提示符
                self._loadEl.hide();
              }else{
                self._loadEl.show();
              }
              self.container[type](html);
              self.page++;
            }
        })
      }
      this.init = function(){
        $.detachInfiniteScroll(self.$infinite);
        $.attachInfiniteScroll(self.$infinite);
        self.addItems("html")
      }
      this._remove = function(){
        $.detachInfiniteScroll(self.$infinite);
      }
      this.set = function(obg){
        $.each(obg,function(index,item){
            self[index] = item;
        })
      }
      this.reset = function(obg){
        self.set(obg)
        $.detachInfiniteScroll(self.$infinite);
        $.attachInfiniteScroll(self.$infinite);
      }
      $(document).on('infinite', '.infinite-scroll-bottom',function() {
        // 如果正在加载，则退出
        if (self.loading) return;
        // 设置flag
        self.loading = true;
        // 模拟1s的加载过程
        setTimeout(function() {
            // 重置加载flag
            self.loading = false;

            // 添加新条目
            self.addItems("append");
            //容器发生改变,如果是js滚动，需要刷新滚动
            $.refreshScroller();
        }, 1000);
    });
  }
  __app.tabLoadMore = function(options){
    var oldTabLink = $('.mytab-link.active');
    var options = $.extend({
        container:"#pageClassifyItemList",
        url:oldTabLink.data("url"),
        data:oldTabLink.data("params")
    },options)
    var _loadMoreLink = new __app.loadMoreLink(options)
    _loadMoreLink.init();
    $('.mytab-link').on('click',function(){
        oldTabLink.removeClass("active");
        _loadMoreLink.set({
          "page":1,
          "data":$(this).data("params"),
          "url":$(this).data("url"),
          "loading":false,
          "loaded":false,
        });
        _loadMoreLink.init();
        oldTabLink = $(this).addClass("active");
        $("html,body,.content").scrollTop(0)
        return false;
    })
  }
  __app.loadMore = function(element){
      var _jloadding = $(element);
      var options = $.extend({
          container:_jloadding.data("target"),
          url:_jloadding.data("url"),
          data:_jloadding.data("params"),
          page:2
      },options)
      var _loadMoreLink = new __app.loadMoreLink(options);
      return _loadMoreLink;
  }
  __app.industryPick = function(options,callback){
    var __industryData = [];
    var __industryDisplayData = [];
    var __element = options.element || "#industry-picker"
    var industryData = [{id:1,name:"互联网"}]
    var __instryinit = function(){
        $.each(industryData,function(index,item){
            __industryData.push(item.id)
            __industryDisplayData.push(item.name)
        })
        $(__element).picker({
          toolbarTemplate: options.toolbarTmp.replace("{{text}}",$(__element).data("title")),

          formatValue:function(picker, value, displayValue){
            callback && callback(picker, value, displayValue)
            return displayValue[0];
          },
          cssClass:"industry-pick-modal",

          cols: [
            {
              textAlign: 'center',
              values: __industryData,
              displayValues:__industryDisplayData,
              cssClass: 'picker-items-col-normal'
            }
          ]
        });
    }
    if($(__element).data("url")){
        $.ajax({
            url:$(__element).data("url"),
            dataType:"json",
            type:"get",
            success:function(res){
                industryData = res;
                __instryinit();
            }
        })
    }else{
      __instryinit();
    }
  }
  __app.cityPicker = function(options,callback){
      var ___element = options.element;
      var ___displayCols = options.displayCols||["provinces","cities","districts"];
      var setCityInit = function(){
          var format = function(data,key) {
              var result = [];
              for(var i=0;i<data.length;i++) {
                  var d = data[i];
                  if(key=="id"){
                    if(d.id == "") continue;
                    result.push(d.id);
                  }else{
                    if(d.name == "请选择") continue;
                    result.push(d.name);
                  }
              }
              if(result.length) return result;
              return [""];
          };

          var sub = function(data,key) {
              var _key = key || "name";
              if(!data.sub) return [""];
              return format(data.sub,_key);
          };

          var getCities = function(d,key) {
              var _key = key || "name";
              for(var i=0;i< raw.length;i++) {
                  if(raw[i][_key] == d) return sub(raw[i],_key);
              }
              return [""];
          };
          var getDistricts = function(p, c,key) {
              var _key = key || "name";
              for(var i=0;i< raw.length;i++) {
                  if(raw[i][_key] == p) {
                      for(var j=0;j< raw[i].sub.length;j++) {
                          if(raw[i].sub[j][_key] == c) {
                              return sub(raw[i].sub[j]);
                          }
                      }
                  }
              }
              return [""];
          };
          var raw = $.smConfig.rawCitiesData;
          var provinces = raw.map(function(d) {
              return d.name;
          });
          var provincesId = raw.map(function(d){
              return d.id;
          })
          var initCities = sub(raw[0]); 
          var initCitiesId = sub(raw[0],"id"); 

          var currentProvince = provinces[0];
          var currentCity = initCities[0];
          

          var currentProvinceId = provincesId[0];
          var currentCityId = initCitiesId[0];

          var t;
          var defaults = {
              cssClass: "city-picker",
              rotateEffect: false,  //为了性能

              onChange: function (picker, values, displayValues) {
                  var newProvinceId = picker.cols[0].value;
                  var newProvince = picker.cols[0].displayValue;
                  var newCity;
                  var newCityId;
                  if(newProvinceId !== currentProvinceId) {
                      // 如果Province变化，节流以提高reRender性能
                      clearTimeout(t);

                      t = setTimeout(function(){
                          var newCities = getCities(newProvince);
                          newCity = newCities[0];
                          //var newDistricts = getDistricts(newProvince, newCity);
                          

                          var newCitiesId = getCities(newProvinceId,"id");
                          newCityId = newCitiesId[0];
                          //var newDistrictsId = getDistricts(newProvinceId, newCityId,"id");


                          picker.cols[1].replaceValues(newCitiesId,newCities);
                          //picker.cols[2].replaceValues(newDistricts);
                          currentProvince = newProvince;
                          currentCity = newCity;

                          currentProvinceId = newProvinceId;
                          currentCityId = newCityId;

                          picker.updateValue();
                      }, 200);
                      return;
                  }
                  newCityId = picker.cols[1].value;
                  newCity = picker.cols[1].displayValue;
                  if(newCity !== currentCity) {
                      //picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                      currentCity = newCity;
                      currentCityId = newCityId;
                      picker.updateValue();
                  }
              },

              cols: [
              {
                  textAlign: 'center',
                  values: provincesId,
                  displayValues:provinces,
                  cssClass: "col-province"
              },
              {
                  textAlign: 'center',
                  values: initCitiesId,
                  displayValues:initCities,
                  cssClass: "col-city"
              }
              ]
          };
          $.fn.cityPicker = function(params) {
              return this.each(function() {
                  if(!this) return;
                  var p = $.extend(defaults, params);
                  //计算displayValue
                  if (p.displayValue) {
                      $(this).val(p.displayValue.join(' '));
                  } else {
                      var val = $(this).val();
                      val && (p.displayValue = val.split(' '));
                  }

                  if (p.displayValue) {
                      //p.value = val.split(" ");
                      if(p.displayValue[0]) {
                          currentProvince = p.displayValue[0];
                          p.cols[1].displayValues = getCities(p.displayValue[0]);
                      }
                      if(p.displayValue[1]) {
                          currentCity = p.displayValue[1];
                          
                      }
                  }
                  //计算value
                  if (p.value) {
                      $(this).data("id",p.value.join(' '));
                  } else {
                      var valId = $(this).data("id");
                      valId && (p.value = valId.split(' '));
                  }

                  if (p.value) {
                      //p.value = val.split(" ");
                      if(p.value[0]) {
                          currentProvinceId = p.value[0];
                          p.cols[1].values = getCities(p.value[0],"id");
                      }
                      if(p.value[1]) {
                          currentCityId = p.value[1];
                          
                      }
                  }
                  $(this).picker(p);
              });
          };
          $(___element).cityPicker({
            toolbarTemplate: options.toolbarTmp.replace("{{text}}",$(___element).data("title")),
            formatValue:function(picker, value, displayValue){
              callback && callback(picker, value, displayValue)
              return displayValue;
            },
            onClose:function(pick){
                options.onClose && options.onClose(pick);
            }
          });
      }
      var getAjaxCity = function(){
          $.ajax({
            url:$(___element).data("url"),
            type:"get",
            dataType:"json",
            success:function(res){
                $.smConfig.rawCitiesData = res;
                setCityInit();
            }
        })
      }
      getAjaxCity();
  }
  __app.search = function(options){
      var __element = $(options.element);
      var __keyName = __element.data("key");
      var __time = false;
      var __content = __element.data("target");
      var __url = __element.data("url");
      var __params = __element.data("params");
      var __searchHotHistry = $(options.searchHotHistry);

      var _loadMoreLink = new __app.loadMoreLink({
          container:__content,
          url:__url,
          data:__element.data("params"),
          page:2
      });
      var __search = function(__key,callback){
          _loadMoreLink.set({
            "page":1,
            "data":__params+"&"+__keyName+"="+__key,
            "url":__url,
            "loading":false,
            "loaded":false,
          });
          _loadMoreLink.init();
      }
      var __cancelSearch = function(){
          __searchHotHistry.show();
          $(__content).hide();
          _loadMoreLink._remove();
      } 
      __element.on("input propertychange",'input[type="search"]',function(e){
          var __this = $(e.target);
          __time && clearTimeout(__time);
          __time = setTimeout(function(){
              var keyWord = $.trim(__this.val());
              if(keyWord!=""){
                  __search(keyWord);
                  __searchHotHistry.hide();
                  $(__content).show();
                  $("html,body,.content").scrollTop(0);
              }else{
                __cancelSearch()
              }
          },500)
      })
      __element.on("click",".searchbar-cancel",function(){
          __cancelSearch();
      })
  }
  $(document).on("pageInit", function(e, pageId, $page) {
      var title = $page.data("title");
      if($(".js-loadding-more").length>0){
        __app.loadMore(".js-loadding-more");
      }
      if($(".js-tab-loadding-more").length>0){
        $('.buttons-tab').fixedTab({offset:$('.bar-nav').height()});
        __app.tabLoadMore({
          container:$(".js-tab-loadding-more").data("target") || "#pageClassifyItemList"
        });
      }
      if(title){
        $("title").html(title);
      }
      $(document).delegate('[data-link]:not(a)',"click",function(evt){
        if($(evt.target).closest("a").length>0) return;
        if(evt.target.tagName=="A") return;
        window.location.href= $(this).data("link");

      });
      $(document).on('click','.js-confirm-dirlink', function () {
          var title = $(this).data("title");
          var text = $(this).data("text");
          var dirLink = $(this).attr("data-dir-link");
          $.confirm(title,text,function () {
              $.router.load(dirLink);
          });
      });
  });
  $(document).on("pageInit", "#pageStoreDetail,#pageServiceDetail", function(e, id, page) {
      var ImageData = [{url:'//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg'}]
      $(document).on('click','.js-pb-standalone',function () {
        var _filed = $(this).attr("data-pb-filed");
        var _thisPhotoBrowser = $(this).data("myPhotoBrowser");
        if(!_thisPhotoBrowser){
          _thisPhotoBrowser = $.photoBrowser({
            photos : __app[_filed] || ImageData,
            theme: 'dark',
            type: 'standalone'
          })
          $(this).data("myPhotoBrowser",_thisPhotoBrowser)
        }
        _thisPhotoBrowser.open();
      });
      var mySwiper = $('#storeDetailswiper')[0].swiper;
      var oldTabLink = $('.mytab-link.active');
      $('.mytab-link').on('click',function(){
          mySwiper.slideTo($(this).attr("href").substr(4)*1-1);
          return false;
      })
      mySwiper.on("slideChangeStart",function(n,e){
        oldTabLink.removeClass("active");
        oldTabLink = $('.mytab-link[href="#tab'+(n.activeIndex+1)+'"]').addClass("active");
      })


      //收藏店铺和咨询

      // if(id=="pageStoreDetail"){
      //   $(document).delegate("click","#chatStore",function(){
      //       var sellerId = $(this).data("sellerid");
      //       $.post("/app/chat", function(data) {
      //           var res = $.parseJSON(data);
      //           if (res.errorCode == 0) {
      //               selfId = res.ref;
      //               if(window.android){
      //                   window.android.chat(sellerId);
      //               }else if(window.chat){
      //                   //ios打开
      //                   window.chat(sellerId);
      //               }
      //           } else if (res.errorCode == 40000) {
      //               if(window.android){
      //                   window.android.login();
      //               }else if(window.login){
      //                   //ios打开
      //                   window.login();
      //               }
      //           }
      //       });
      //   })
      //   $(document).delegate("click",'#collectStore',function(){
      //       var sellerId = $(this).data("sellerid");
      //       $.post("/app/store/"+sellerId+"/collect", function(data) {
      //           var res = $.parseJSON(data);
      //           if (res.errorCode == 0) {
      //               alert("collect success");
      //               // 收藏或者取消收藏成功后，修改页面上的图标状态
      //               if (res.ref.collectStatus == 1) {
      //                   $('#collectStore').removeClass("icon-shiliangzhinengduixiang103");
      //                   $('#collectStore').addClass("icon-shiliangzhinengduixiang102");
      //               } else {
      //                   $('#collectStore').removeClass("icon-shiliangzhinengduixiang102");
      //                   $('#collectStore').addClass("icon-shiliangzhinengduixiang103");
      //               }
      //               // 调用app的本地方法通知app刷新收藏列表
      //               if(window.android){
      //                   window.android.refreshCollection();
      //               }else if(window.refreshCollection){
      //                   //ios打开
      //                   window.refreshCollection();
      //               }
      //           } else if (res.errorCode == 40000) {
      //               alert("no login");
      //               if(window.android){
      //                   window.android.login();
      //               }else if(window.login){
      //                   //ios打开
      //                   window.login();
      //               }
      //           }
      //       });
      //   })
      // }
      // if(id=="pageServiceDetail"){
      //   $(document).delegate("click","#chatFuwu",function(){
      //       var fuwuId = $(this).data("fuwuid");
      //       $.post("/app/chat", function(data) {
      //           var res = $.parseJSON(data);
      //           if (res.errorCode == 0) {
      //               selfId = res.ref;
      //               if(window.android){
      //                   window.android.chat(fuwuId);
      //               }else if(window.chat){
      //                   //ios打开
      //                   window.chat(fuwuId);
      //               }
      //           } else if (res.errorCode == 40000) {
      //               // 未登录时调起app登录
      //               if(window.android){
      //                   window.android.login();
      //               }else if(window.login){
      //                   //ios打开
      //                   window.login();
      //               }
      //           }
      //       });
      //   })
      //   $(document).delegate("click","#buy'",function(){
      //       var fuwuId = $(this).data("fuwuid");
      //       $.post("/app/buy", function(data) {
      //           var res = $.parseJSON(data);
      //           if (res.errorCode == 0) {
      //               selfId = res.ref;
      //               if(window.android){
      //                   window.android.buy(fuwuId);
      //               }else if(window.buy){
      //                   //ios打开
      //                   window.buy(fuwuId);
      //               }
      //           } else if (res.errorCode == 40000) {
      //               //未登录时调起app登录
      //               if(window.android){
      //                   window.android.login();
      //               }else if(window.login){
      //                   //ios打开
      //                   window.login();
      //               }
      //           }
      //       });
      //   })
      // }


  })
  $(document).on("pageInit", "#pagePayResult_1", function(e, id, page) {
      $.modal({
        title:  '支付结果',
        text: '<div class="content-block">'+
                  '<p><a href="#" class="button button-big button-danger">支付成功</a></p>'+
                  '<p><a href="#" class="button button-big button-danger">支付遇到问题</a></p>'+
              '</div>'
      })
  })
  $(document).on("pageInit", "#pagePayResult_3", function(e, id, page) {
      $.pickerModal('#pagePayResult_picker');
  })
  $(document).on("pageInit", "#pageClassifyItem", function(e, id, page) {
      $('.buttons-tab').fixedTab({offset:$('.bar-nav').height()});
      __app.tabLoadMore();
  })
  $(document).on("pageInit", "#pageIndex", function(e, id, page) {
      
  })
  $(document).on("pageInit", "#pageOrder", function(e, id, page) {
      $('.buttons-tab').fixedTab({offset:$('.bar-nav').height()});
  })
  $(document).on("pageInit","#pageAccountInfo",function(e, id, page){
      var toolbarTmp = '<header class="bar bar-nav"></button><button class="button button-link pull-right close-picker">完成</button><h1 class="title">{{text}}</h1></header>'
      var cityArr = [];
      $(document).on('click','.userimg', function () {
          var buttons1 = [
          {
            text: '拍个照',
            bold: true,
            color: 'danger',
            onClick: function() {
              $.alert("拍个照");
            }
          },
          {
            text: '去相册选',
            color: 'danger',
            onClick: function() {
              $.alert("去相册选");
            }
          }
        ];
        var buttons2 = [
          {
            text: '取消',
            color: 'danger'
          }
        ];
        var groups = [buttons1, buttons2];
        $.actions(groups);
      });
      __app.cityPicker({
          element:"#city-picker",
          toolbarTmp:toolbarTmp,
          //displayCols:["provinces","cities"],
          onClose:function(pick){
            $.ajax({
              url:'/member/save/profileSingle',
              type:"post",
              data:{
                fieldType:"address",
                prov:pick.value[0],
                city:pick.value[1]
              },
              dataType:"json",
              success:function(res){

              }
            })
          }
        },function(picker, value, displayValue){
          cityArr = value;
          console.log(value)
      })
      __app.industryPick({element:"#industry-picker",toolbarTmp:toolbarTmp,onClose:function(pick){
        $.ajax({
          url:'/member/save/profileSingle',
          type:"post",
          data:{
            fieldType:"industry",
            fieldValue:pick.value[0]
          },
          dataType:"json",
          success:function(res){

          }
        })
      }},function(picker, value, displayValue){
          $('[name="industry"]').val(value.join(" "));
      })
      
  })
  $(document).on("pageInit","#pageSearch",function(e, id, page){
      __app.search({
          element:"#searchBars",
          searchHotHistry:"#searchHotHistry"
      })
  })
  $.init();
});

+function ($) {
  	if(!__app) __app = {};  
	var pluginName = "textareaAutoSize";
	var pluginDataName = "plugin_" + pluginName;

	var containsText = function (value) {
		return (value.replace(/\s/g, '').length > 0);
	};

	function Plugin(element, options) {
	    this.element = element;
	    this.$element = $(element);
	    this.init();
	}

	Plugin.prototype = {
	  init: function() {
	    var height = this.$element.outerHeight();
	    var diff = parseInt(this.$element.css('paddingBottom')) +
	               parseInt(this.$element.css('paddingTop')) || 0;

	    if (containsText(this.element.value)) {
	      this.$element.height(this.element.scrollHeight - diff);
	    }

	    // keyup is required for IE to properly reset height when deleting text
	    this.$element.on('input keyup', function(event) {
	      var $window = $(window);
	      var currentScrollPosition = $window.scrollTop();

	      $(this)
	        .height(0)
	        .height(this.scrollHeight - diff);

	      $window.scrollTop(currentScrollPosition);
	    });
	  }
	};
	$.fn.textareaAutoSize = function(params) {
        return this.each(function() {
            if(!this) return;
            var $this = $(this);
            if (!$this.data(pluginDataName)) {
		      $this.data(pluginDataName, new Plugin(this, params));
		    }
        });
    };
}(Zepto);