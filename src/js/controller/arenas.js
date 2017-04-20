angular
  .module('robocombat')
  .controller('ArenasIndexCtrl', ArenasIndexCtrl);
  // .controller('ArenasNewCtrl', ArenasNewCtrl)
  // .controller('ArenasShowCtrl', ArenasShowCtrl)
  // .controller('ArenasEditCtrl', ArenasEditCtrl);

ArenasIndexCtrl.$inject = ['Arena'];
function ArenasIndexCtrl(Arena) {
  const vm = this;

  vm.all = Arena.query();

}

// ArenasNewCtrl.$inject = ['Arena', '$state'];
// function ArenasNewCtrl(Arena, $state) {
//   const vm = this;
//   vm.arena = {};
//
//   function arenasCreate() {
//     Arena
//       .save({ arena: vm.arena })
//       .$promise
//       .then(() => $state.go('arenasIndex'));
//   }
//
//   vm.create = arenasCreate;
// }
//
// ArenasShowCtrl.$inject = ['Arena', 'User', 'Comment', '$stateParams', '$state', '$auth'];
// function ArenasShowCtrl(Arena, User, Comment, $stateParams, $state, $auth) {
//   const vm = this;
//   if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
//
//   vm.arena = Arena.get($stateParams);
//
//   function arenasDelete() {
//     vm.arena
//       .$remove()
//       .then(() => $state.go('arenasIndex'));
//   }
//
//   vm.delete = arenasDelete;
//
//   function arenasUpdate() {
//     Arena
//       .update({id: vm.arena.id, arena: vm.arena });
//   }
//
//   function addComment() {
//     vm.comment.arena_id = vm.arena.id;
//
//     Comment
//       .save({ comment: vm.comment })
//       .$promise
//       .then((comment) => {
//         vm.arena.comments.push(comment);
//         vm.comment = {};
//       });
//   }
//
//   vm.addComment = addComment;
//
//   function deleteComment(comment) {
//     Comment
//       .delete({ id: comment.id })
//       .$promise
//       .then(() => {
//         const index = vm.arena.comments.indexOf(comment);
//         vm.arena.comments.splice(index, 1);
//       });
//   }
//
//   vm.deleteComment = deleteComment;
//
//   function toggleAttending() {
//     const index = vm.arena.attendee_ids.indexOf(vm.currentUser.id);
//     if (index > -1) {
//       vm.arena.attendee_ids.splice( index, 1);
//       vm.arena.attendees.splice( index, 1);
//     } else {
//       vm.arena.attendee_ids.push( vm.currentUser.id);
//       vm.arena.attendees.push( vm.currentUser);
//
//     }
//     arenasUpdate();
//   }
//   vm.toggleAttending = toggleAttending;
//
//   function isAttending() {
//     return $auth.getPayload() && vm.arena.$resolved && vm.arena.attendee_ids.includes(vm.currentUser.id);
//   }
//   vm.isAttending = isAttending;
// }
//
// ArenasEditCtrl.$inject = ['Arena', 'User', '$stateParams', '$state'];
// function ArenasEditCtrl(Arena, User, $stateParams, $state) {
//   const vm = this;
//
//   Arena.get($stateParams).$promise.then((arena) => {
//     vm.arena = arena;
//     vm.arena.date = new Date(arena.date);
//   });
//
//   vm.users = User.query();
//
//   function arenasUpdate() {
//     Arena
//       .update({id: vm.arena.id, arena: vm.arena })
//       .$promise
//       .then(() => $state.go('arenasShow', { id: vm.arena.id }));
//   }
//
//   vm.update = arenasUpdate;
// }
