var tarHelper = require('../dist/browser-untar').default.instance();
function loadFile(path) {
  return new Promise(function (resolve) {
    var r = new XMLHttpRequest();

    r.onload = function (e) {
      var status = r.status;
      var buffer = r.response;
      resolve({status: status, buffer: buffer});
    };

    r.open('GET', path);
    r.responseType = 'arraybuffer';
    r.send();
  });
}
describe('Extraction', function(){
  it('Should extract all file', function(done){
    loadFile('base/spec/data/test.tar').then(function (data) {
      expect(data.status).to.equal(200);
      tarHelper.untar(data.buffer).then(function (files) {
        files.forEach(function(f){
          console.log(f.name);
        });
        done();
      }).catch(done);
    }).catch(done)
  });
});