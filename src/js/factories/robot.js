angular
  .module('robocombat')
  .factory('Robot', Robot);

Robot.$inject = ['$resource', 'API_URL'];
function Robot($resource, API_URL) {
  return new $resource(`${API_URL}/robots/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
