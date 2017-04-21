angular
  .module('robocombat')
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl);

EventsIndexCtrl.$inject = ['Event'];
function EventsIndexCtrl(Event) {
  const vm = this;

  vm.all = Event.query();
}

EventsNewCtrl.$inject = ['Event', 'Robot', '$state'];
function EventsNewCtrl(Event, Robot, $state) {
  const vm = this;
  vm.event = {};
  vm.robots = Robot.query();

  function eventsCreate() {
    Event
      .save({ event: vm.event })
      .$promise
      .then(() => $state.go('eventsIndex'));
  }

  vm.create = eventsCreate;
}

EventsShowCtrl.$inject = ['Event', 'Robot', 'User', 'Comment', '$stateParams', '$state', '$auth'];
function EventsShowCtrl(Event, Robot, User, Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });   // need to find out how to get the robot id

  vm.event = Event.get($stateParams);
  console.log(vm.currentUser);
  function eventsDelete() {
    vm.event
      .$remove()
      .then(() => $state.go('eventsIndex'));
  }

  vm.delete = eventsDelete;

  function eventsUpdate() {
    Event
      .update({id: vm.event.id, event: vm.event });
  }

  function addComment() {
    vm.comment.event_id = vm.event.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.event.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.event.comments.indexOf(comment);
        vm.event.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

  function toggleAttending() {
    const index = vm.event.attendee_ids.indexOf(vm.currentUser.id);
    if (index > -1) {
      vm.event.attendee_ids.splice( index, 1);
      vm.event.attendees.splice( index, 1);
    } else {
      vm.event.attendee_ids.push( vm.currentUser.id);
      vm.event.attendees.push( vm.currentUser);

    }
    eventsUpdate();
  }
  vm.toggleAttending = toggleAttending;

  function isAttending() {
    return $auth.getPayload() && vm.event.$resolved && vm.event.attendee_ids.includes(vm.currentUser.id);
  }
  vm.isAttending = isAttending;
}

EventsEditCtrl.$inject = ['Event', 'User', '$stateParams', '$state'];
function EventsEditCtrl(Event, User, $stateParams, $state) {
  const vm = this;

  Event.get($stateParams).$promise.then((event) => {
    vm.event = event;
    vm.event.date = new Date(event.date);
  });

  vm.users = User.query();

  function eventsUpdate() {
    Event
      .update({id: vm.event.id, event: vm.event })
      .$promise
      .then(() => $state.go('eventsShow', { id: vm.event.id }));
  }

  vm.update = eventsUpdate;
}
