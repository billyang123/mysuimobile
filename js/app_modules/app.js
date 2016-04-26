$(function () {
  'use strict';
  if(!__app) {
      __app = {};
  }
  if(!window.localStorage){
      console.log('This browser does NOT support localStorage');
  }
  __app.varConfig = {};
  __app.includeStyleElement = function(styles,styleId){
    if (document.getElementById(styleId)) {
      return
    }
    var style = document.createElement("style");
    style.id = styleId;
    (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
    if (style.styleSheet) {
      style.styleSheet.cssText = styles;
    } else {
      style.appendChild(document.createTextNode(styles));
    }
  }
  // if($.device.android){
  //     var styles = [
  //         'body,.page-group,.page,.content{overflow: inherit !important;position: inherit;}',
  //         '.bar-tab ~ .content {padding-bottom: 2.5rem !important;}',
  //         '.bar-nav ~ .content {padding-top: 2.2rem !important;}',
  //         '.bar {position: fixed !important;z-index: 99;}.picker-modal .bar{position: static !important;}',
  //         '.modal-overlay, .popup-overlay, .preloader-indicator-overlay,.modal{position: fixed;}'
  //     ].join("");
  //     __app.includeStyleElement(styles,"forAndroidStyles");
  // }
  __app.xxFileUploader = {
    fileInput: null,
    url:null,
    singe:true,
    fileFilter: [],
    filter: function(files) {   //选择文件组的过滤方法
      return files; 
    },
    onSelect: function() {},
    onProgress: function() {},    //文件上传进度
    onSuccess: function() {},   //文件上传成功时
    onFailure: function() {},   //文件上传失败时,
    onComplete: function() {},  //文件全部上传完毕时
    funGetFiles: function(e) {    
      // 获取文件列表对象
      var files = e.target.files || e.dataTransfer.files;
      //继续添加文件
      this.fileFilter = this.fileFilter.concat(this.filter(files));
      this.funDealFiles();
      return this;
    },
    //选中文件的处理与回调
    funDealFiles: function() {
      for (var i = 0, file; file = this.fileFilter[i]; i++) {
        //增加唯一索引值
        file.index = i;
      }
      //执行选择回调
      this.onSelect(this.fileFilter);
      return this;
    },
    //文件上传
    funUploadFile: function() {
      var self = this;  
      if (location.host.indexOf("sitepointstatic") >= 0) {
        //非站点服务器上运行
        return; 
      }
      for (var i = 0, file; file = this.fileFilter[i]; i++) {
        (function(file) {
          var xhr = new XMLHttpRequest();
          if (xhr.upload) {
            // 上传中
            xhr.upload.addEventListener("progress", function(e) {
              self.onProgress(file, e.loaded, e.total);
            }, false);

            // 文件上传成功或是失败
            xhr.onreadystatechange = function(e) {
              if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                  self.onSuccess(file, xhr.responseText);
                  if (!self.fileFilter.length) {
                    //全部完毕
                    self.onComplete();  
                  }
                } else {
                  self.onFailure(file, xhr.responseText);   
                }
              }
            };

            // 开始上传
            xhr.open("POST", self.url, true);
            xhr.setRequestHeader("X_FILENAME", file.name);
            xhr.send(file);
          } 
        })(file); 
      }    
    },
    init: function() {
      var self = this;   
      //文件选择控件选择
      if (this.fileInput) {
        $(document).on("change",this.fileInput,function(e){
           self.funGetFiles(e); self.funUploadFile()
        })
        // this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); self.funUploadFile()}, false); 
      }
    }
  }
  __app.hasLoalStorage = function(appString){
    if(!__app[appString]){
       if(!localStorage[appString] || localStorage[appString]=="") localStorage[appString] = "[]";
       __app[appString] = JSON.parse(localStorage[appString]);
    }
  }
  __app.setStorage = function(string,appString){
    __app.hasLoalStorage(appString);
    for (var i = __app[appString].length - 1; i >= 0; i--) {
      if(string.indexOf(__app[appString][i])>=0){
        __app[appString].splice(i,1);
        break;
      }
      if(i==0){
        if(__app[appString].length>=6){
          __app[appString].pop();
          break;
        }
      }
    }
    __app[appString].unshift(string);
    localStorage[appString] = JSON.stringify(__app[appString]);
  }
  __app.setStorageToHtml = function(element,tempId,appString){
    __app.hasLoalStorage(appString);
    var template = Handlebars.compile($(tempId).html());
    if(__app.zfwSearchHistory.length==0){
      $(element).hide();
      return;
    }else{
      $(element).show()
    }
    $(element).html(template(__app[appString]));
  }
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
      // this.callback = this.options.callback;
      this.addItems = function(type,callback){
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

                callback && callback(html);
                self.container[type](html);
                if($('.content').height()<self.container.height()){
                  self._loadEl.show();
                }
              }

              self.page++;
            }
        })
      }
      this.init = function(callback){
        $.detachInfiniteScroll(self.$infinite);
        $.attachInfiniteScroll(self.$infinite);
        self.callback = callback;
        self.addItems("html",callback);
      }
      this._remove = function(){
        $.detachInfiniteScroll(self.$infinite);
        self._loadEl.hide();
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
            self.addItems("append",self.callback);
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
    _loadMoreLink.init(function(){
      if(oldTabLink.attr("data-more-pages")=="N"){
        $('.infinite-scroll-preloader').hide();
      }
    });
    $('.mytab-link').on('click',function(){
        oldTabLink.removeClass("active");
        oldTabLink = $(this).addClass("active");
        _loadMoreLink.set({
          "page":1,
          "data":$(this).data("params"),
          "url":$(this).data("url"),
          "loading":false,
          "loaded":false
        });
        _loadMoreLink.init(function(){
          if(oldTabLink.attr("data-more-pages")=="N"){
            $('.infinite-scroll-preloader').hide();
          }
        });
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
  __app.industryData = [];
  __app.industryPick = function(options,callback){
    var __industryData = [];
    var __industryDisplayData = [];
    var __element = options.element || "#industry-picker"
    var __instryinit = function(){
        $.each(__app.industryData,function(index,item){
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
          onClose:options.onClose,
          value:[$(__element).data("id")],
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
    if(__app.industryData.length==0 && $(__element).data("url")){
        $.ajax({
            url:$(__element).data("url"),
            dataType:"json",
            type:"get",
            success:function(res){
                __app.industryData = res;
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
              return displayValue.join(" ");
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
      var _loadMoreLink = __element.data("_loadMoreLink");
      var _propertychange = false;
      var _isCancel = true;
      if(!_loadMoreLink){
        _loadMoreLink = new __app.loadMoreLink({
            container:__content,
            url:__url,
            data:__element.data("params"),
            page:2
        });
        __element.data("_loadMoreLink",_loadMoreLink);
      }
      var __search = function(__key,callback){
          _loadMoreLink.set({
            "page":1,
            "data":__params+"&"+__keyName+"="+__key,
            "url":__url,
            "loading":false,
            "loaded":false
          });
          _loadMoreLink.init(function(){
            __app.setStorage(__key,"zfwSearchHistory");
            if(_isCancel){
              $('.infinite-scroll-preloader').hide();
            }
          });
      }
      var __cancelSearch = function(){
          __searchHotHistry.show();
          $(__content).hide();
          _loadMoreLink._remove();
          __app.setStorageToHtml("#searchHistory ul","#searchHistoryTemplate","zfwSearchHistory");
          $('input[type="search"]').val("").trigger("blur");
          _isCancel = true;
          $('.infinite-scroll-preloader').hide();
      }
      if(_propertychange) return;

      __element.on("input propertychange",'input[type="search"]',function(e){
          var __this = $(e.target);
          _isCancel = false;
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
      $(document).on("click",".js-search-tag",function(e){
        var keyWord = $.trim($(this).data("key"));
        __element.find("input").val(keyWord)
          __search(keyWord);
          __searchHotHistry.hide();
          $(__content).show();
          $("html,body,.content").scrollTop(0);
          $('input[type="search"]').trigger("focus");
          _isCancel = false;
          return false;
      })
      _propertychange = true;
  }
  __app.myTime = function(num,callback,fns){
    var self = this;
    this.num  = num;
    this.tm = setInterval(function(){
      if(self.num<=0){
        fns && fns()
        clearInterval(self.tm);
        return;
      }
      callback && callback(self.num);
      self.num--;
    },1000);
    return this;
 }
 var __send = false;
  __app.sendCode = function(element,data){
      var __this = $(element);
      var __setCodeUrl = __this.data("url");
      if(__send) return;
      __this.addClass("disabled").attr("disabled",true);
      $.ajax({
        url:__setCodeUrl,
        dataType:"json",
        type:"post",
        data:data,
        success:function(res){
          __send = true;
          if(res.errorCode!=0){
            $.closeModal();
            $.alert(res.errorInfo);
          }else{
            new __app.myTime(__this.data("num"),function(num){
              __this.text(num+"秒");
            },function(){
              __this.text("发送验证码");
              __send = false;
              __this.removeClass("disabled").removeAttr("disabled");
            })

          }
        }
      })
      return $(element);
  }
  $(document).on("pageAnimationStart",function(e, id, page){
      var title = $("#"+id).data("title");
      if(title){
        $("title").text(title);
      }
      $.closeModal();
  })
  //data-link
  $(document).on("click",'[data-link]:not(a)',function(evt){
    if($(evt.target).closest("a").length>0) return;
    if(evt.target.tagName=="A") return;
    window.location.href= $(this).data("link");

  });
  $(document).on('click','.js-confirm-dirlink', function () {
      var title = $(this).data("title");
      var text = $(this).data("text");
      var dirLink = $(this).attr("data-dir-link");
      $.confirm(title,text,function () {
          window.location.href = dirLink;
      });
  });
  $(document).on('click','.closeRefuseReason', function (e) {
      var upPriceType = $(this).data("role");
      if(upPriceType == "submit"){ 
        var dirUrl = $(this).data("dirurl");
        $.ajax({
          url:$(this).data("url"),
          type:"post",
          dataType:"json",
          data:{
            refuseReason:$("#pageRefuseReason").find('textarea').val()
          },
          success:function(res){
            if (res.errorCode == 0) {
                window.location.href = dirUrl;
            } else {
                $.alert(res.errorInfo);
            }
          }
        })
      }
      $.closeModal('#pageRefuseReason');
  });
  $(document).on('click','.js-refuse-reason', function (e) {
      $.pickerModal('#pageRefuseReason');
  });
  function iphoneValid(){
      var codeData = {};
      $(document).on("click",".js-send-code",function(){
        codeData['mobile'] = $('[name="mobile"]').val();
        codeData['code'] =  $("#codeImgInput").val();
        codeData['id'] = $('.js-getimgcode').data("id");
        __app.sendCode(this,codeData)
      })
      $(document).on("click",".js-getimgcode",function(){
          var __target = $(this);
          $.ajax({
            url:__target.data("url"),
            type:"post",
            dataType:"json",
            success:function(res){
              __target.css({'background-image':'url('+res.ref.img+')'});
              //codeData["id"] = res.ref.id;
              __target.data("id",res.ref.id);
            }
          })
      })
      $(document).on('click',"#phoneLogin",function(){
        var __target = $(this);
        var __form = $(this).closest("form");
        $.ajax({
          url:__form.attr("action"),
          type:__form.attr('method'),
          dataType:"json",
          success:function(res){
            if (res.errorCode == 0) {
                $.toast("登录成功");
                $.router.load(__form.data("dir"))
                //window.location.href=__form.data("dir");
            } else {
                $.alert(res.errorInfo);
            }
          }
        })
      })
  }
  iphoneValid();
  $(document).on('click','.zfw-clear-searchhistory',function(){
    __app.zfwSearchHistory = [];
    localStorage.zfwSearchHistory = '[]';
    $("#searchHistory ul").html("");
  })
  //修改价格
  var pageUpdatePrice = null;
  $(document).on("click",'.closeUpdatePrice',function(e){
      var upPriceType = $(this).data("role");
      if(upPriceType == "submit"){
        var newPrice = [];
        var ajaxUrl = $(this).data("url");
        var dirUrl = $(this).data("dirurl");
        $("#pageUpdatePrice").find('.newPrice').each(function(){
          newPrice.push($(this).val());
        })
        $.ajax({
          url:ajaxUrl,
          dataType:"json",
          data:{
            newPrice:newPrice.join(",")
          },
          type:"post",
          success:function(res){
              if (res.errorCode == 0) {
                  $.alert("修改价格成功", function() {
                     $.router.load(dirUrl);
                  });
              } else {
                  $.alert(res.errorInfo);
              }
          }
        })
      }
      $.closeModal('#pageUpdatePrice');
  })
  $(document).on("click",".js-update-price",function(){
      $.pickerModal('#pageUpdatePrice');
  })
  $(document).on("pageAnimationStart",function(e, id, page){
      var title = $("#"+id).data("title");
      if(title){
        $("title").text(title);
      }
  })
  $(document).on("pageLoadComplete",function(){
    $.closeModal();
  })
  $(document).on("pageInit", function(e, pageId, $page) {
      __send = false;
      if($(".js-loadding-more").length>0){
        __app.loadMore(".js-loadding-more");
      }
      if($(".js-tab-loadding-more").length>0){
        $('.buttons-tab').fixedTab({offset:$('.bar-nav').height()});
        __app.tabLoadMore({
          container:$(".js-tab-loadding-more").data("target") || "#pageClassifyItemList"
        });
      }
     
      
  });
  if($.device.ios){
    $(document).on("change","#cameraInput",function(e){
      var __this = $(this);
      var ajaxurl = $(this).data("url")||'/member/save/updateAvatar';
      $.showPreloader("图片上传中...");
      lrz(this.files[0]).then(function (rst) {
            $.ajax({  
              url: ajaxurl,  
              type: 'POST',  
              data: {
                avatar:rst.base64
              },  
              dataType: 'json',
              success: function(res) {
                  $.hidePreloader();
                  if(res.success){
                    $(".userimg").css("background-image","url("+res.picUrl+")");         
                  }else{
                    $.alert("更改头像失败！")
                  }
              }
          })
        }).catch(function (err) {
          $.alert("更改头像失败！")
            // 处理失败会执行
        }).always(function () {
            $.hidePreloader();
            // 不管是成功失败，都会执行
        });
      //__app.imageUploader("#cameraInput","#uploadImageProview","#uploadImagePopup",this.files);
    })
  }
  $(document).on('click',".js-savePageForm",function(e){
      var __form = $($(this).data("target"));
      var _dir = $(this).data("dirurl");
      $.ajax({
        url:__form.attr("action"),
        type:__form.attr("method")||"post",
        data:__form.serializeArray(),
        dataType:"json",
        success:function(res){
            if(res.errorCode != 0){
              $.alert(res.errorInfo);
            }else{
              $.router.load(_dir);
            }
        }
      })
  })
  __app.updataServerTotal = function(){
    var total = 0;
    $("#updateServer .js-inputPrice").each(function(index,item){
        var val = $.trim($(item).val());
        total += Number(val);
    })
    $("#updateServer .js-totalPrice").text(total);
    $("#updateServer [name=totalPrice]").val(total);
  }
  $(document).on("click","#updateServer .js-del-server",function(){
      $(this).closest(".card").remove();
      $($(this).data("target")).remove();
      __app.updataServerTotal();
      __app.varConfig["updateServer"].index--;
  })
  $(document).on("click","#updateServer .js-add-server-option",function(){
      var __temp = $(this).data("temp").split(",");
      var __target = $(this).data("target").split(',');
      __app.varConfig["updateServer"].index++;
      for (var i = 0; i < __temp.length; i++) {
        $(__target[i]).append($(__temp[i]).html().replace(/\{index\}/g,__app.varConfig["updateServer"].index));
      }
      $("html,body,.content").scrollTop(99999)
  })
  $(document).on("click",".more-link",function(e){
    var self = this;
     $.ajax({
          url:$(self).data("url"),
          type:"get",
          success:function(html){
            $(self).replaceWith(html);
          }
      })
  })
  $(document).on('input propertychange',"#updateServer .js-inputPrice",function(e){
      __app.updataServerTotal();
  })
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
      $('.buttons-tab').fixedTab({offset:$('#pageClassifyItem .bar-nav').length>0 ? $('#pageClassifyItem .bar-nav').height():0});
      __app.tabLoadMore();
  })
  $(document).on("pageInit", "#pageIndex", function(e, id, page) {
      
  })
  $(document).on("pageInit", "#pageOrder", function(e, id, page) {
      $('.buttons-tab').fixedTab({offset:$('#pageOrder .bar-nav').length>0 ? $('#pageOrder .bar-nav').height():0});
  })
  $(document).on("pageInit","#pageAccountInfo",function(e, id, page){
      if($.device.ios) $("#cameraInput").show();
      var toolbarTmp = '<header class="bar bar-nav"></button><button class="button button-link pull-right close-picker">完成</button><h1 class="title">{{text}}</h1></header>'
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
          picker.input.data("id",value.join(" "))
          //console.log(value)
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
          // $('[name="industry"]').val(value.join(" "));
          picker.input.data("id",value.join(" "))
      });
  })
  $(document).on("pageInit","#pageSearch",function(e, id, page){
      
      __app.search({
          element:"#searchBars",
          searchHotHistry:"#searchHotHistry"
      })
      __app.setStorageToHtml("#searchHistory ul","#searchHistoryTemplate","zfwSearchHistory");
  })
  $(document).on("pageInit", "#updateServer", function(e, id, page) {
      __app.varConfig[id] = {};
      __app.varConfig[id].index = $('#updateServer .serverListInfo .card').length;
      __app.updataServerTotal();
  })
  var myAPWkim = null;
  $(document).on("pageInit", "#pageMessages", function(e, id, page) {
      myAPWkim = new __app.myWkim();
  })
  $(document).on("pageInit", "#pageMessagesChat", function(e, id, page) {
      var flag = false;
      if(!myAPWkim) myAPWkim = new __app.myWkim();
      myAPWkim.myImChatInit();
      if(!flag) {
        myAPWkim.faceInit("#chatSendface");
        flag = true;
      }
  })

  $.init();
});
