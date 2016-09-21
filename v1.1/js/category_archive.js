var $hatena_module_category = $('div.hatena-module-category');
var parent_level = 1;
/*
 * idx:処理対象カテゴリのインデックス
 * plevel:親カテゴリの階層
 * $ul:登録先のulタグ
 */
$all_li = $hatena_module_category.find('li');
function processArchive(idx,plevel,$ul) {
  flag=true;
  while(idx < $all_li.length) {
    $li = $($all_li[idx]);
    $a = $li.find('a'); 
    category_name = $a.text();
    // idxの階層を取得 
    breadcrumb = category_name.split('-');
    level = breadcrumb.length;

    // 1階層目のカテゴリであれば下線を設定
    if(level == 1 && idx > 0) {
      $li.attr('class',$($all_li[idx-1]).attr('class')+' on-border');
    }

    // idxの階層 < 親階層であればループを抜ける
    if(level < plevel) {
      if(plevel > 2) {
        $($all_li[idx-1]).css('padding-bottom','0px');
      }
      return idx-1;
    }
    // idxの階層 = 親の階層であればidxを$ulに登録
    else if(level == plevel) {
      $a.text(breadcrumb[level-1]);
      if($ul != null) {
        // 2階層目以下であればulの中に要素を入れ込む
        $li.appendTo($ul);
      } else {
        $opend_span = $('<span class="hatena-breadcrumb-plus-toggle-button" id="opend-'+idx+'">▼</span>');
        $closed_span = $('<span class="hatena-breadcrumb-plus-toggle-button" id="closed-'+idx+'">▶</span>');
        $closed_span.css('visibility','hidden');
        $opend_span.css('display','none');
        $li.prepend($closed_span);
        $li.prepend($opend_span);
      }
    }
    // idxの階層 > 親階層であれば$ulを新規に作成
    // 親カテゴリに$ulを挿入し、idx,idxの階層,$ulを引数に再帰処理呼び出し
    else {
      id = idx-1;
      ulid = "hatena-breadcrumb-plus-toggle-"+id;
      $new_ul = $('<ul id="'+ulid+'" type="square"></ul>');
      if(level > 2) {
        $new_ul.attr('class','hatena-breadcrumb-plus-child2'); 
      } else {
        $new_ul.attr('class','hatena-breadcrumb-plus-child1'); 
        $new_ul.css('display','none');
      }

      $($all_li[id]).append($new_ul);
      // 子カテゴリがある場合
      // ・カテゴリのpadding-bottomは0pxに設定
      // ・閉じるボタンを表示する
      $('#closed-'+(id)).css({'visibility':'visible','display':'inline'});
      $('#opend-'+(id)).on('click',{_id:id,_toggle:'close'},toggleCategory);
      $('#closed-'+(id)).on('click',{_id:id,_toggle:'open'},toggleCategory);

      idx = processArchive(idx,level,$new_ul);
    }
    idx += 1;
  }

  return idx;
}

function toggleCategory(e) {
  if(e.data._toggle == 'close') {
    $('#hatena-breadcrumb-plus-toggle-'+e.data._id).toggle();
    $('#closed-'+e.data._id).toggle();
    $('#opend-'+e.data._id).toggle();
  } else if(e.data._toggle == 'open') {
    $('#hatena-breadcrumb-plus-toggle-'+e.data._id).toggle();
    $('#opend-'+e.data._id).toggle();
    $('#closed-'+e.data._id).toggle();
  }
}

$(document).ready(function(){
  if(typeof $hatena_module_category != "undefined") {
    processArchive(0,1,null);
  }
});
