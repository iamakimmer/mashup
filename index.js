
  var $token = $('#token');
  var $album = $('#album');
  var $albumlist = $('#albumlist');
  
    function findTagFromInstagram(tag) {
      console.log('tag', tag);
      $.ajax({
        url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=ce95cb4e56c146c994457b48a839f6a8',
        dataType: 'jsonp',
        success: function(result) {
          for (var i = 0; i < result.data.length; i++) {
            var url = result.data[i].images.thumbnail.url;
            $('#instagramdetails').append('<img src="' + url + '"/>');
          }
        }
      });
    };


    $('#submit').on('click', function() {
      $.ajax({
        url: "https://api.spotify.com/v1/browse/new-releases",
        dataType: 'json',
        data: {
          country: 'US',
          limit: 10
        },
        success: function(data, status) {
          $album.html('');
          $albumlist.html('');
          $('#instagramdetails').html('');

          data.albums.items.forEach(function(album) {
            var name = album.name.replace(/[^A-Z0-9]/ig, '');   
            var $imageCover = $('<img class="albumcover" data-name="' + name + '" data-uri="' + album.uri + '" width="100" height="100" src="' + album.images[0].url + '"/>');
            $albumlist.append($imageCover);
            $imageCover.on('click', function() {
              var image = $(this);
              var uri = image.data('uri');
              var name = image.data('name');
              var iframe = '<iframe class="spotifylink" src="https://embed.spotify.com/?uri=' + uri + '&" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';
              $album.html(iframe);
              var albumName = name;     
              findTagFromInstagram(albumName);    
            });            
          });

          
        },
        error: function(data) {
          alert(data.responseJSON.error.message);
        },
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + $token.val());
        }
      });
    });
