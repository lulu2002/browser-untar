class Untar {
  /**
   * Keeps the singleton instance.
   * @type {ModelManager}
   * @static
   * @private
   */
  static _instance = undefined;
  static _desiredWorkerPoolLength = 6;
  static _workerTrimInterval = 2000;
  static CHUNK_SIZE = 1024;

  /**
   * Get the singleton manager instance.
   * @return { ModelManager } The instance.
   * @public
   */
  static instance() {
    if(Untar._instance === undefined) {
      if (!window.Worker) {
        throw new Error("No Worker implementation found.");
      }
      Untar._instance = new Untar();
    }
    return Untar._instance;
  }

  constructor() {
    this._workerCode = window.URL.createObjectURL(new Blob([`__replace__string__`]));
    this._workerPool = [];
    this.initializeWorkerPool();
    this._workerTrimInterval = setInterval(this.trimWorkerPool, Untar._workerTrimInterval)
  }

  /**
   * Removes idle workers.
   */
  trimWorkerPool = () => {
    while(this._workerPool.length > Untar._desiredWorkerPoolLength) {
      const worker = this._workerPool.pop();
      if(worker !== undefined){
        worker.terminate();
      }
    }
  };

  /**
   * Set up an initial pool of workers.
   */
  initializeWorkerPool = () => {
    for(let i = 0; i < Untar._desiredWorkerPoolLength; ++i){
      const worker = new Worker(this._workerCode);
      this._workerPool.push(worker);
    }
  };

  /**
   * Request an unused worker.
   * @return { Worker }
   */
  requestWorker = () => {
    let worker;
    worker = this._workerPool.shift();
    if (worker === undefined){
      worker = new Worker(this._workerCode);
    }
    return worker;
  };

  /**
   * Returns an idle worker to the pool.
   * @param worker
   */
  returnWorker = (worker) => {
    this._workerPool.push(worker);
  };

  untar = (buffer) => {
    if (!(buffer instanceof ArrayBuffer)) {
      throw new TypeError( "arrayBuffer is not an instance of ArrayBuffer." );
    }

    const worker = this.requestWorker();
    return new Promise((resolve, reject) => {
      const files = [];

      worker.onerror = (err) => {
        reject(err);
      };
      worker.onmessage = (message) => {
        const data = message.data;
        switch (data.type) {
          case "l":
            console[data.level]("Worker: " + data.message);
            break;
          case "e":
            files.push(new ExtractedFile(data.data));
            break;
          case "c":
            resolve(files);
            break;
          default:
            console.error('Unknown worker message!');
            worker.terminate();
            if(data.message !== undefined){
              reject(new Error(data.message));
            } else {
              reject(new Error("Unknown worker message: " + data.type));
            }
            break;
        }
      };

      // Start the unpacking of a tared resource.
      worker.postMessage({ type: "e", buffer: buffer }, [buffer]);
    }).finally(() => {
      worker.onerror = undefined;
      worker.onmessage = undefined;
      this.returnWorker(worker);
    });
  }
}

class ExtractedFile {
  constructor(file){
    this.buffer = file.buffer;
    this.name = file.name;
    this.checksum = file.checksum;
    this.gid = file.gid;
    this.linkname = file.linkname;
    this.mode = file.mode;
    this.mtime = file.mtime;
    this.size = file.size;
    this.type = file.type;
    this.uid = file.uid;
    this.ustarFormat = file.ustarFormat;
  }
  readAsString = () => {
    const buffer = this.buffer;
    const charCount = buffer.byteLength;
    const bufferView = new DataView(buffer);

    const charCodes = new Array(charCount);
    for (let i = 0; i < charCount; ++i) {
      charCodes[i] = bufferView.getUint8(i, true);
    }

    let str = '';
    while (charCodes.length > 0) {
      const chunk = charCodes.splice(0, Untar.CHUNK_SIZE);
      const decoded = String.fromCharCode.apply(null, chunk);
      str = str.concat(decoded);
    }
    return str;
  };

  readAsJson = () => {
    return JSON.parse(this.readAsString());
  };

  blob = () => {
    return new Blob([this.buffer]);
  }
}
export default Untar;