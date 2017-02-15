<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript">
  $('#main-inner').ready(function(){
    "use strict";
    var pc_width = 600;
    var device = window.screen.width < pc_width ? 'sp' : 'pc';
    device = (device == 'pc' && $(window).width() > pc_width) ? 'pc' : 'sp';
    var view_sec_num = 5 <!-- ここに1回あたりの表示記事数を設定 -->
    var sections = $('#main-inner > div.archive-entries > section');
    if((sections.length > view_sec_num) && device == 'sp') {
      var page_index = 0;
      var $entries_archive = null;
      var archive_num = 0;
      $entries_archive = $('<div id="entries-archive-' + archive_num + '"></div>');
      $entries_archive.insertBefore(sections[0]);
      for(var i=0; i < view_sec_num; i++) {
        $(sections[i]).appendTo($entries_archive);
        page_index += 1;
      }
      archive_num += 1;
      for(var i=view_sec_num; i < sections.length; i++) {
        if(page_index==view_sec_num) {
          var $read_more_link = $('<p style="text-align:center;background:#ddd"><a href="javascript:void(0)" style="line-height:3;font-size:80%:">もっと表示する</a></p>');
          $read_more_link.on('click',{archive_num: archive_num},function(e){
            $(e.target).hide();
            $('#entries-archive-' + e.data.archive_num).fadeIn("slow");
          });
          var $before_archive = $('#entries-archive-' + (archive_num-1));
          $before_archive.append($read_more_link);

          $entries_archive = $('<div id="entries-archive-' + archive_num + '"></div>');
          $entries_archive.hide();
          $entries_archive.insertAfter($before_archive);
          page_index = 0;
          archive_num += 1;
        }
        $(sections[i]).appendTo($entries_archive);
        page_index += 1;
      }
      $entries_archive.hide();
    }
});
</script>
