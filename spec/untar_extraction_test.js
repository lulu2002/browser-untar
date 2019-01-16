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
  it('Should extract regular tar file', function(done){
    loadFile('base/spec/data/test.tar').then(function (data) {
      expect(data.status).to.equal(200);
      tarHelper.untar(data.buffer).then(function (files) {
        expect(files.length).to.equal(11);
        expect(files[0].name).to.equal('1.txt');
        expect(files[1].name).to.equal('2.txt');
        expect(files[2].name).to.equal('3.txt');
        expect(files[3].name).to.equal('511.txt');
        expect(files[4].name).to.equal('512.txt');
        expect(files[5].name).to.equal('513.txt');
        expect(files[6].name).to.equal('directory/');
        expect(files[7].name).to.equal('directory/1.txt');
        expect(files[8].name).to.equal('directory/2.txt');
        expect(files[9].name).to.equal('directory/3.txt');
        expect(files[10].name).to.equal('object.json');
        done();
      }).catch(done);
    }).catch(done)
  });

  it('Should extract pax tar file', function(done){
    loadFile('base/spec/data/test-pax.tar').then(function (data) {
      expect(data.status).to.equal(200);
      tarHelper.untar(data.buffer).then(function (files) {
        expect(files.length).to.equal(1);
        expect(files[0].name).to.equal('é.txt');
        done();
      }).catch(done);
    }).catch(done)
  });


  it('Should extract ustar tar file', function(done){
    loadFile('base/spec/data/test-ustar.tar').then(function (data) {
      expect(data.status).to.equal(200);
      tarHelper.untar(data.buffer).then(function (files) {
        expect(files.length).to.equal(1);
        expect(files[0].name).to.equal('foo');
        done();
      }).catch(done);
    }).catch(done)
  });

  it('Should extract ustar tar file with prefix', function(done){
    loadFile('base/spec/data/test-ustar-with-prefix.tar').then(function (data) {
      expect(data.status).to.equal(200);
      tarHelper.untar(data.buffer).then(function (files) {
        expect(files.length).to.equal(1);
        expect(files[0].name).to.equal('directory-000/directory-001/directory-002/directory-003/directory-004/directory-005/directory-006/foo.txt');
        done();
      }).catch(done);
    }).catch(done)
  });
});