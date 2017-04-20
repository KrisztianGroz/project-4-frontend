angular
  .module('robocombat')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
  console.log(vm.all);
}

// UsersNewCtrl.$inject = ['User', '$state'];
// function UsersNewCtrl(User, $state) {
//   const vm = this;
//   vm.user = {};
//
//   function usersCreate() {
//     User
//       .save({ user: vm.user })
//       .$promise
//       .then(() => $state.go('usersIndex'));
//   }
//
//   vm.create = usersCreate;
// }

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth'];
function UsersShowCtrl(User,  $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });   // need to find out how to get the robot id

  vm.user = User.get($stateParams);

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('usersIndex'));
  }

  vm.delete = usersDelete;

  function usersUpdate() {
    User
      .update({id: vm.user.id, user: vm.user });
  }
  usersUpdate();
}
  // function addComment() {
  //   vm.comment.user_id = vm.user.id;
  //
  //   Comment
  //     .save({ comment: vm.comment })
  //     .$promise
  //     .then((comment) => {
  //       vm.user.comments.push(comment);
  //       vm.comment = {};
  //     });
  // }

  // vm.addComment = addComment;

  // function deleteComment(comment) {
  //   Comment
  //     .delete({ id: comment.id })
  //     .$promise
  //     .then(() => {
  //       const index = vm.user.comments.indexOf(comment);
  //       vm.user.comments.splice(index, 1);
  //     });
  // }
  //
  // vm.deleteComment = deleteComment;

//   function toggleAttending() {
//     const index = vm.user.attendee_ids.indexOf(vm.currentUser.id);
//     if (index > -1) {
//       vm.user.attendee_ids.splice( index, 1);
//       vm.user.attendees.splice( index, 1);
//     } else {
//       vm.user.attendee_ids.push( vm.currentUser.id);
//       vm.user.attendees.push( vm.currentUser);
//
//     }
//     usersUpdate();
//   }
//   vm.toggleAttending = toggleAttending;
//
//   function isAttending() {
//     return $auth.getPayload() && vm.user.$resolved && vm.user.attendee_ids.includes(vm.currentUser.id);
//   }
//   vm.isAttending = isAttending;
// }

UsersEditCtrl.$inject = ['User',  '$stateParams', '$state'];
function UsersEditCtrl(User,  $stateParams, $state) {
  const vm = this;

  User.get($stateParams).$promise.then((user) => {
    vm.user = user;
    vm.user.date = new Date(user.date);
  });

  vm.users = User.query();

  function usersUpdate() {
    User
      .update({id: vm.user.id, user: vm.user })
      .$promise
      .then(() => $state.go('usersShow', { id: vm.user.id }));
  }

  vm.update = usersUpdate;
}
