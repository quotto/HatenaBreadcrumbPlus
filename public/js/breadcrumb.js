var host = $(location).attr('host');
function remapBreadcrumb(breadcrumb){
  new_breadcrumb_html='';
  for(var i=0;i<breadcrumb.length;i++) {
    url_category=[];
    for(var j=0;j<=i;j++) {
      url_category[j]=breadcrumb[j];
    }
    new_breadcrumb_html += '<span class="breadcrumb-child" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="breadcrumb-child-link" href="http://'+host+'/archive/category/'+url_category.join('-')+'" itemprop="url"><span itemprop="title">'+breadcrumb[i]+'</span></a></span>';
    if(i+1<breadcrumb.length) {
      new_breadcrumb_html += '<span class="breadcrumb-gt"> &gt;</span>';
    }
  }
  if(new_breadcrumb_html != '') {
    $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first').prop('outerHTML',new_breadcrumb_html);
  }
}

function remapArticleCategory(categories) {
  var index=0;
  while(typeof categories[index+1] != 'undefined' && categories[index+1].text.includes('-')) {
    index+=1;
  }

  breadcrumb_array = categories[index].text.split('-');
  remapBreadcrumb(breadcrumb_array)

  category_num = categories.length;
  for(var i=0;i<category_num;i++) {
    category_branch = categories[i].text.split('-');
    categories[i].text=category_branch[category_branch.length-1];
  }
}

function remapCategoryBreadcrumb(breadcrumb) {
  new_breadcrumb_html='';
  for(var i=0;i<breadcrumb.length;i++) {
    if(i+1<breadcrumb.length) {
      url_category=[];
      for(var j=0;j<=i;j++) {
        url_category[j]=breadcrumb[j];
      }
      new_breadcrumb_html += '<span class="breadcrumb-child" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="breadcrumb-child-link" href="http://'+host+'/archive/category/'+url_category.join('-')+'" itemprop="url"><span itemprop="title">'+breadcrumb[i]+'</span></a></span>';
      new_breadcrumb_html += '<span class="breadcrumb-gt"> &gt;</span>';
    } else {
      new_breadcrumb_html += '<span class="breadcrumb-child" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">'+breadcrumb[i]+'</span>';
    }
  }
  if(new_breadcrumb_html != '') {
    $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first').prop('outerHTML',new_breadcrumb_html);
  }
}

function remapArchiveCategory(categories) {
  for(var i=0;i<categories.length;i++) {
    category_branch = categories[i].text.split('-');
    categories[i].text=category_branch[category_branch.length-1];
  }
}
$(document).ready(function(){
var $entry_categories = $('#main-inner > article.entry > div.entry-inner > header > div.entry-categories > a');
if($entry_categories.length>0) {
  remapArticleCategory($entry_categories);
}
var $archive_entries = $('#main-inner > div.archive-entries');
if($archive_entries.length > 0) {
  $breadcrumb_child = $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first');
  breadcrumbs = $breadcrumb_child.find('span').text().split('-');
  remapCategoryBreadcrumb(breadcrumbs);

  $archive_entries.each(function(){
    remapArchiveCategory($(this).find('section > div.categories > a'));
  });
}

var $hatena_module_category = $('div.hatena-module-category');
if(typeof $hatena_module_category != "undefined") {
  $li = $hatena_module_category.find('li');
  $li.each(function(index,category){
    $a = $(category).find('a');
    category_name = $a.text();
    breadcrumb = category_name.split('-');
    if(breadcrumb.length > 1) {
      indent = 10 * (breadcrumb.length-1);
      $(category).css('padding-left',indent+'px');
      $(category).attr('class','hatena-breadcrumb-plus-child'); 
      $a.text('- '+breadcrumb[breadcrumb.length-1]);
    }
    else {
      $(category).attr('class','hatena-breadcrumb-plus-parent');
      if(typeof $li[index-1] != "undefined") {
        $($li[index-1]).attr('class',$($li[index-1]).attr('class')+' on-border');
      }
    }
  });
}});
