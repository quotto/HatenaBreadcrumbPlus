function remapBreadcrumb(a){new_breadcrumb_html="";for(var b=0;b<a.length;b++){url_category=[];for(var c=0;c<=b;c++)url_category[c]=a[c];new_breadcrumb_html+='<span class="breadcrumb-child" itemprop="child" itemscope=" itemtype="http://data-vocabulary.org/Breadcrumb"><a class="breadcrumb-child-link" href="http://'+host+"/archive/category/"+url_category.join("-")+'" itemprop="url"><span itemprop="title">'+a[b]+"</span></a></span>",b+1<a.length&&(new_breadcrumb_html+='<span class="breadcrumb-gt"> &gt;</span>')}""!=new_breadcrumb_html&&$("#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first").html(new_breadcrumb_html)}function remapArticleCategory(a){for(var b=0;"undefined"!=typeof a[b+1]&&a[b+1].text.includes("-");)b+=1;breadcrumb_array=a[b].text.split("-"),remapBreadcrumb(breadcrumb_array),category_num=a.length;for(var c=0;c<category_num;c++)category_branch=a[c].text.split("-"),a[c].text=category_branch[category_branch.length-1]}function remapCategoryBreadcrumb(a){new_breadcrumb_html="";for(var b=0;b<a.length;b++)if(b+1<a.length){url_category=[];for(var c=0;c<=b;c++)url_category[c]=a[c];new_breadcrumb_html+='<span class="breadcrumb-child" itemprop="child" itemscope=" itemtype="http://data-vocabulary.org/Breadcrumb"><a class="breadcrumb-child-link" href="http://'+host+"/archive/category/"+url_category.join("-")+'" itemprop="url"><span itemprop="title">'+a[b]+"</span></a></span>",new_breadcrumb_html+='<span class="breadcrumb-gt"> &gt;</span>'}else new_breadcrumb_html+='<span class="breadcrumb-child" itemprop="child" itemscope=" itemtype="http://data-vocabulary.org/Breadcrumb">'+a[b]+"</span>";""!=new_breadcrumb_html&&$("#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first").html(new_breadcrumb_html)}function remapArchiveCategory(a){for(var b=0;b<a.length;b++)category_branch=a[b].text.split("-"),a[b].text=category_branch[category_branch.length-1]}var host=$(location).attr("host"),categories=$("#main-inner > article.entry > div.entry-inner > header > div.entry-categories > a");categories.length>0&&remapArticleCategory(categories);var $archives=$("#main-inner > div.archive-entries > section");$archives.length>0&&($before_breadcrumb=$("#top-box > div.breadcrumb > div.breadcrumb-inner > span.breadcrumb-child:first"),breadcrumb_array=$before_breadcrumb.find("span").text().split("-"),remapCategoryBreadcrumb(breadcrumb_array),$archives.each(function(){remapArchiveCategory($(this).find("div.categories > a"))}));var $hatena_module_category=$("div.hatena-module-category");"undefined"!=typeof $hatena_module_category&&($li=$hatena_module_category.find("li"),$li.each(function(a,b){$a=$(b).find("a"),category_name=$a.text(),breadcrumb=category_name.split("-"),breadcrumb.length>1?(indent=10*(breadcrumb.length-1),$(b).css("padding-left",indent+"px"),$a.text("- "+breadcrumb[breadcrumb.length-1])):"undefined"!=typeof $li[a-1]&&$($li[a-1]).css("border-bottom","1px solid #dddddd")}));