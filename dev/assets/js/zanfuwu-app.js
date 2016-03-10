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
      this.reset = function(){
        self.set({
          loading:false,
          loaded:false,
          container:"#renxiaoTab1",
          url:"/ajax/class-item/index.html",
          data:"pageNo={index}"
        })
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
  __app.loadMore = function(){
      var _jloadding = $(".js-loadding-more");
      var options = $.extend({
          container:_jloadding.data("target"),
          url:_jloadding.data("url"),
          data:_jloadding.data("params"),
          page:2
      },options)
      var _loadMoreLink = new __app.loadMoreLink(options);
      return _loadMoreLink;
  }
  $(document).on("pageInit", function(e, pageId, $page) {
      console.log(e, pageId, $page)
      var title = $page.data("title");
      if($(".js-loadding-more").length>0){
        __app.loadMore();
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
        // var t = new Date().getTime();
        // var id = 'linkTo'+t;
        // var link = $('<a>').attr("id",id).attr("href",$(this).data("link")).attr("target",$(this).data("link-target")||"_self").css({visibility:"hidden"});
        // link.appendTo("body");
        // link[0].click();
        window.location.href= $(this).data("link");
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
  $(document).on("pageInit","#pageAccountInfo",function(e, id, page){
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
      })
      $("#city-picker").cityPicker({
      })
  })
  $.init();
});

(function(){
	
})()