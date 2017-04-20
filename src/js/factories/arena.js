angular
  .module('robocombat')
  .factory('Arena', Arena);

Arena.$inject = ['$resource', 'API_URL'];
function Arena($resource, API_URL) {
  return new $resource(`${API_URL}/arenas/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
