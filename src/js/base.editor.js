if ( $('meta[property="id"]').attr('content') !== undefined ){
  $("#editorAccess").attr('href', "https://cascade.xavier.edu/entity/open.act?id="+ $('meta[property="id"]').attr('content') +"&type=page&action=edit");
}