/*!
 * =====================================================
 * zanfuwu by yangbinbin - http://m.zanfuwu.com/
 *
 * =====================================================
 */
$(function () {
  'use strict';
  $.loadMoreLink = function(options){
      // 加载flag
      var self = this;
      this.options = options;
      this.loading = false;
      this.loaded = false;
      this.$container = $(this.options.container) || $('.infinite-scroll-bottom .list-container');
      this.$infinite = $('.infinite-scroll');
      this.page = 2;
      this.addItems = function(){
        $.ajax({
            url:self.$infinite.data("url"),
            type:"get",
            data:self.$infinite.data("params").replace('{index}',self.page),
            success:function(html){
              if($.trim(html) == ""){
                $.detachInfiniteScroll($('.infinite-scroll'));
                // 删除加载提示符
                $('.infinite-scroll-preloader').remove();
              }
              self.$container.append(html);
              self.page++;
            }
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
            self.addItems();
            //容器发生改变,如果是js滚动，需要刷新滚动
            $.refreshScroller();
        }, 1000);
    });
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
  $(document).on("pageInit", "#pageStoreDetail", function(e, id, page) {
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
      mySwiper.on("slideChangeEnd",function(n){
        oldTabLink.removeClass("active");
        oldTabLink = $('.mytab-link[href="#tab'+(n.activeIndex+1)+'"]').addClass("active")
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
      $.loadMoreLink({
        container:"#pageClassifyItemList"
      })
  })
  $.init();
});

(function(){
	
})()