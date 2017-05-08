export default function() {
  this.namespace = '/api';

  this.get('/allUsersEmailArray', function() {
    console.log('mirage call');
    return ajaxGetCall('allUsersEmailArray');
  });

  this.get('/allUsersEmailAndPwd', function() {
  });

  this.post('/allRegisteredUserObjects', {'signUpObject':'signUpObject'},function(data) {
    console.log('saveUserIntoDBPromise->>' + data);
  });

  this.get('/allRegisteredUserObjects', function(data) {
    console.log(data);
  });
}

function ajaxGetCall(url) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/' + url,
    async: false,
    success: function(response) {
      console.log('Ajax Get Response ' + response);
      return response;
    },
    error: function(error) {
      if (error.status === 404) {
        console.error('Ajax Error ' + error.message);
      }
    }
  });
}
