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
function nextPromise(buffer) {
  return new Promise(function(resolve){
    //console.log('next');
    return tarHelper.untar(buffer).then(resolve);
  });
}

function Wait() {
  return new Promise(function(r){ setTimeout(r, 2)});
}

describe('Memory', function(){
  this.timeout(30000);
  it('Should not increase', function(done){
    var heapSize = window.performance.memory.totalJSHeapSize;
    loadFile('base/spec/data/test.tar').then(function (data) {
      expect(data.status).to.equal(200);
      var chain = Promise.resolve();
      for(var i=0; i < 1000; ++i){
        chain = chain.then(function(){
          // TODO: Test with a larger tar.
          var buf = data.buffer.slice();
          return nextPromise(buf);
        }).then(Wait);
      }
      chain.then(function () {
        setTimeout(function(){
          expect(window.performance.memory.totalJSHeapSize).to.be.closeTo(heapSize, 1000, 'Unexpected heap size.');
          done();
        },5000);
      }).catch(done);
    }).catch(done)
  });
});