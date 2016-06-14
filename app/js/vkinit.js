VK.init({
    apiId: 5505191
});

function authInfo(response) {
  if (response.session) {
    alert('user: '+response.session.mid);
  } else {
    alert('not auth');
  }
}


