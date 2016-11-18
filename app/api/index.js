import { getUserData } from '../actions/menuActions';

export const loadUserData = (callback) => {
  VK.Api.call('users.get', {fields: 'photo_200'}, function(r) {
    if(r.error) {
      return;
    } else {
      var user = r.response;
      callback(user[0]);
    }
  });
};
