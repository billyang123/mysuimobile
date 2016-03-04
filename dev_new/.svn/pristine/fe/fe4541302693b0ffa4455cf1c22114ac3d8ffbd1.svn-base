/*!
 * =====================================================
 * zanfuwu by yangbinbin - http://m.zanfuwu.com/
 *
 * =====================================================
 */
$(function () {
  'use strict';
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
  })
  $(document).on("pageInit", "#pageIndex", function(e, id, page) {
      // if ($.initSwiper) {
      //   $.initSwiper($('.js-banner-swiper'));
      //   $.initSwiper($('.js-shutdown-swiper'));
      // }
  })
  $.init();
});

(function(){
	
})()