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
  this.timeout(20000);
  it('Should not increase', function(done){
    loadFile('base/spec/data/test.tar').then(function (data) {
      expect(data.status).to.equal(200);
      var chain = Promise.resolve();
      for(var i=0; i < 1000; ++i){
        chain = chain.then(function(){
          return nextPromise(data.buffer.slice());
        }).then(Wait);
      }
      var heapSize = window.performance.memory.totalJSHeapSize;
      chain.then(function () {
        window.gc();
        setTimeout(function(){
          expect(window.performance.memory.totalJSHeapSize).to.be.below(heapSize*1.2, 'Unexpected heap size.');
          done();
        },6000);
      }).catch(done);
    }).catch(done)
  });
});