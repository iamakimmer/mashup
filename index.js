
    var token = $('#token');
    var album = $('#album');

    $('#submit').on('click', function() {
      console.log('in here');
      $.ajax({
        url: "https://api.spotify.com/v1/browse/new-releases",
        dataType: 'json',
        data: {
          country: 'US',
          limit: 1
        },
        success: function(data, status) {

          var iframe = '<iframe class="spotifylink" src="https://embed.spotify.com/?uri=' + data.albums.items[0].uri + '&" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';
          album.html(iframe);

          var albumName = data.albums.items[0].name.replace(/[^A-Z0-9]/ig, '');
          alert(albumName);
          $.ajax({
            url: 'https://api.instagram.com/v1/tags/' + albumName + '/media/recent?client_id=ce95cb4e56c146c994457b48a839f6a8',
            dataType: 'jsonp',
            success: function(result) {
              for (var i = 0; i < result.data.length; i++) {
                var url = result.data[i].images.thumbnail.url;
                $('#instagramdetails').append('<img src="' + url + '"/>');
              }
            }
          });
        },
        error: function(data) {
          alert(data.responseJSON.error.message);
        },
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token.val());
        }
      });
  });