import Ember from 'ember';

export function equals(params) {
  var userInSessionEmail = params[0];
  var userName = params[1];
  if(userInSessionEmail == userName){
    return true;
  }else{
    return false;
  }
}

export default Ember.Helper.helper(equals);
