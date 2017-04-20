angular
  .module('robocombat')
  .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$state'];
function AuthCtrl($auth, $state) {
  const vm = this;
  vm.user = {};
  
  function register() {
    $auth.signup(vm.user)

      .then(() => $state.go('login'));
    console.log(vm.user);
  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
      .then(() => $state.go('home'));

  }

  vm.login = login;
}
