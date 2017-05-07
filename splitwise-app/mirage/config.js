export default function() {
  this.namespace = '/api';

  this.get('/allUsersEmail', function() {
    return {
      allUsersEmailArray: ['testEmail1@test.com', 'testEmail2@test.com', 'testEmail3@test.com', 'testEmail4@test.com']
    };
  });

  this.get('/usersEmailAuth', function() {
    return {
      userPwd: {
        'testEmail1@test.com': 'testPassword1',
        'testEmail2@test.com': 'testPassword2',
        'testEmail3@test.com': 'testPassword3',
        'testEmail4@test.com': 'testPassword4'
      }
    };
  });

  this.post('/saveUserIntoDB',function(data) {
    console.log('saveUserIntoDBPromise->>' + data);
  });

  this.get('/getAllUsersFromJSONServer',function(data) {
      console.log(data);
    });
}
