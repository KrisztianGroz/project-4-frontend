angular
  .module('robocombat')
  .controller('RobotsIndexCtrl', RobotsIndexCtrl)
  .controller('RobotsNewCtrl', RobotsNewCtrl)
  .controller('RobotsShowCtrl', RobotsShowCtrl)
  .controller('RobotsEditCtrl', RobotsEditCtrl);

RobotsIndexCtrl.$inject = ['Robot'];
function RobotsIndexCtrl(Robot) {
  const vm = this;

  vm.all = Robot.query();
  console.log(vm.all);

}

RobotsNewCtrl.$inject = ['Robot', 'User', '$state'];
function RobotsNewCtrl(Robot, User, $state) {
  const vm = this;
  vm.robot = {};
  vm.users = User.query();

  function robotsCreate() {
    Robot
      .save({ robot: vm.robot })
      .$promise
      .then(() => $state.go('robotsIndex'));
  }

  vm.create = robotsCreate;
}

RobotsShowCtrl.$inject = ['Robot', 'User', 'Comment', '$stateParams', '$state', '$auth'];
function RobotsShowCtrl(Robot, User, Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.robot = Robot.get($stateParams);

  function robotsDelete() {
    vm.robot
      .$remove()
      .then(() => $state.go('robotsIndex'));
  }

  vm.delete = robotsDelete;

  function robotsUpdate() {
    Robot
      .update({id: vm.robot.id, robot: vm.robot });
  }

  function addComment() {
    vm.comment.robot_id = vm.robot.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.robot.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.robot.comments.indexOf(comment);
        vm.robot.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

  function toggleAttending() {
    const index = vm.robot.attendee_ids.indexOf(vm.currentUser.id);
    if (index > -1) {
      vm.robot.attendee_ids.splice( index, 1);
      vm.robot.attendees.splice( index, 1);
    } else {
      vm.robot.attendee_ids.push( vm.currentUser.id);
      vm.robot.attendees.push( vm.currentUser);

    }
    robotsUpdate();
  }
  vm.toggleAttending = toggleAttending;

  function isAttending() {
    return $auth.getPayload() && vm.robot.$resolved && vm.robot.attendee_ids.includes(vm.currentUser.id);
  }
  vm.isAttending = isAttending;
}

RobotsEditCtrl.$inject = ['Robot', 'User', '$stateParams', '$state'];
function RobotsEditCtrl(Robot, User, $stateParams, $state) {
  const vm = this;

  Robot.get($stateParams).$promise.then((robot) => {
    vm.robot = robot;
    vm.robot.date = new Date(robot.date);
  });

  vm.users = User.query();

  function robotsUpdate() {
    Robot
      .update({id: vm.robot.id, robot: vm.robot })
      .$promise
      .then(() => $state.go('robotsShow', { id: vm.robot.id }));
  }

  vm.update = robotsUpdate;
}
