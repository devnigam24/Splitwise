export default function() {
  this.namespace = '/api';

  this.get('/allUsers', function() {
    return {
      data: [
      {
        'firstName': 'dev',
        'lastName': 'nigam',
        'userEmail': 'someemail@test.com',
        'userPassword': 'testPassword123'
      }
      ]
    };
  });
}
