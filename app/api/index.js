export const logIn = (callback) => {
  VK.Auth.login(function() {
    callback(true);
  }, 1034);
};

export const logOut = (callback) => {
  VK.Auth.logout(function() {
    callback(false);
  });
};

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

export const loadAudios = (callback) => {
  VK.Api.call('audio.get', {count: 30, offset: offset, v: "5.52"}, function(r) {
    if(r.error) {
      return;
    }

    callback(r.response.items, r.response.count);
  });
};
