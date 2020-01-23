var host = $(location).attr('host');
var jsonld = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement':[{
    '@type': 'ListItem',
    'position': 1,
    'name': 'トップ',
    'item': 'https://'+host
  }]
}
function remapBreadcrumb(breadcrumb){
  new_breadcrumb_html='';
  for(var i=0;i<breadcrumb.length;i++) {
    url_category=[];
    for(var j=0;j<=i;j++) {
      url_category[j]=breadcrumb[j];
    }
    var category_url = 'https://'+host+'/archive/category/'+url_category.join('-');
    new_breadcrumb_html += '<span class="breadcrumb-child""><a class="breadcrumb-child-link" href="'+category_url+'"><span>'+breadcrumb[i]+'</span></a></span>';
    if(i+1<breadcrumb.length) {
      new_breadcrumb_html += '<span class="breadcrumb-gt"> &gt;</span>';
    }
    jsonld.itemListElement.push({
      '@type': 'ListItem',
      'position': i+2,
      'name': url_category[i],
      'item': category_url
    });
  }
  if(new_breadcrumb_html != '') {
    $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first').prop('outerHTML',new_breadcrumb_html);
  }

  // 記事本体のマークアップを追加
  jsonld.itemListElement.push({
    '@type': 'ListItem',
    'position': breadcrumb.length+2,
    'name': $('title').text(),
    'item': location.href
  });
  var jsonldTag = $('<script type="application/ld+json"></script>');
  jsonldTag.append(JSON.stringify(jsonld));
  $('title').after(jsonldTag);
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
      var category_url = 'https://'+host+'/archive/category/'+url_category.join('-');
      new_breadcrumb_html += '<span class="breadcrumb-child"><a class="breadcrumb-child-link" href="'+category_url+'">'+breadcrumb[i]+'</span></a></span>';
      new_breadcrumb_html += '<span class="breadcrumb-gt"> &gt;</span>';
      
      jsonld.itemListElement.push({
        '@type': 'ListItem',
        'position': i+2,
        'name': url_category[i],
        'item': category_url
      });
    } else {
      new_breadcrumb_html += '<span class="breadcrumb-child">'+breadcrumb[i]+'</span>';
      jsonld.itemListElement.push({
        '@type': 'ListItem',
        'position': i+2,
        'name': breadcrumb[i],
        'item': category_url
      });
    }
  }
  if(new_breadcrumb_html != '') {
    $('#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first').prop('outerHTML',new_breadcrumb_html);
  }
  var jsonldTag = $('<script type="application/ld+json"></script>');
  jsonldTag.append(JSON.stringify(jsonld));
  $('title').after(jsonldTag);
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
});
