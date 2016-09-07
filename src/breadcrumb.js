var host = $(location).attr('host');
function remapBreadcrumb(breadcrumb){
  new_breadcrumb_html='';
  for(var i=0;i<breadcrumb.length;i++) {
    url_category=[];
    for(var j=0;j<=i;j++) {
      url_category[j]=breadcrumb[j];
    }
    new_breadcrumb_html += '<span class="breadcrumb-child" itemprop="child" itemscope=" itemtype="http://data-vocabulary.org/Breadcrumb"><a class="breadcrumb-child-link" href="http://'+host+'/archive/category/'+url_category.join('-')+'" itemprop="url"><span itemprop="title">'+breadcrumb[i]+'</span></a></span>';
    if(i+1<breadcrumb.length) {
      new_breadcrumb_html += '<span class="breadcrumb-gt"> &gt;</span>';
    }
  }
  if(new_breadcrumb_html != '') {
    $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first').html(new_breadcrumb_html);
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
      new_breadcrumb_html += '<span class="breadcrumb-child" itemprop="child" itemscope=" itemtype="http://data-vocabulary.org/Breadcrumb"><a class="breadcrumb-child-link" href="http://'+host+'/archive/category/'+url_category.join('-')+'" itemprop="url"><span itemprop="title">'+breadcrumb[i]+'</span></a></span>';
      new_breadcrumb_html += '<span class="breadcrumb-gt"> &gt;</span>';
    } else {
      new_breadcrumb_html += '<span class="breadcrumb-child" itemprop="child" itemscope=" itemtype="http://data-vocabulary.org/Breadcrumb">'+breadcrumb[i]+'</span>';
    }
  }
  if(new_breadcrumb_html != '') {
    $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first').html(new_breadcrumb_html);
  }
}

function remapArchiveCategory(categories) {
  for(var i=0;i<categories.length;i++) {
    category_branch = categories[i].text.split('-');
    categories[i].text=category_branch[category_branch.length-1];
  }
}

var categories = $('#main-inner > article.entry > div.entry-inner > header > div.entry-categories > a');
if(categories.length>0) {
  remapArticleCategory(categories);
}
var $archives = $('#main-inner > div.archive-entries > section');
if($archives.length > 0) {
  $before_breadcrumb = $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first');
  breadcrumb_array = $before_breadcrumb.find('span').text().split('-');
  remapCategoryBreadcrumb(breadcrumb_array);

  $archives.each(function(){
    remapArchiveCategory($(this).find('div.categories > a'));
  });
}

var $hatena_module_category = $('div.hatena-module-category');
if(typeof $hatena_module_category != "undefined") {
  $li = $hatena_module_category.find('li');
  $li.each(function(index,category){
    $a = $(category).find('a');
    // url = $a.attr('href');
    // category_name = decodeURI(url.substr(url.lastIndexOf('/')+1));
    category_name = $a.text();
    breadcrumb = category_name.split('-');
    if(breadcrumb.length > 1) {
      indent = 10 * (breadcrumb.length-1);
      $(category).css('padding-left',indent+'px');
      $a.text('- '+breadcrumb[breadcrumb.length-1]);
    }
    else if(typeof $li[index-1] != "undefined") {
      $($li[index-1]).css('border-bottom','1px solid #dddddd');
    }
  });
}
