class UntarWorker {

  static onmessage(message) {
    const data = message.data;
    try {
      if (data.type === "e") {
        UntarWorker.untarBuffer(data.buffer);
      } else {
        throw new Error("Unknown message type: " + data.type);
      }
    } catch ( e ) {
      UntarWorker.postError(e);
    }
  };

  static postError(e) {
    UntarWorker.postMessage({ type: "err", message: e.message });
  };

  static postMessage(message, transfer){
    self.postMessage(message, transfer);
  }

  static untarBuffer(arrayBuffer){
    try {
      const tarFileStream = new UntarFileStream(arrayBuffer);
      while (tarFileStream.hasNext()) {
        const file = tarFileStream._readNextFile();
        UntarWorker.postMessage({ type: "e", data: file }, [file.buffer]);
      }

      UntarWorker.postMessage({ type: "c" });
    } catch (err) {
      UntarWorker.postError(err);
    }
  }
}

// Source: https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330
function decodeUTF8(bytes) {
  let s = "";
  const bytesLength = bytes.length;
  const sC = String.fromCharCode;
  const bS = "Incomplete byte sequence";
  let i = 0;
  while (i < bytesLength) {
    let c = bytes[ i++ ];
    if ( c > 127 ) {
      if ( c > 191 && c < 224 ) {
        if ( i >= bytesLength ) { throw bS; }
        c = (c & 31) << 6 | bytes[ i ] & 63;
      } else if ( c > 223 && c < 240 ) {
        if ( i + 1 >= bytesLength) { throw bS; }
        c = (c & 15) << 12 | (bytes[ i ] & 63) << 6 | bytes[ ++i ] & 63;
      } else if ( c > 239 && c < 248 ) {
        if ( i + 2 >= bytesLength ) { throw bS; }
        c = (c & 7) << 18 | (bytes[ i ] & 63) << 12 | (bytes[ ++i ] & 63) << 6 | bytes[ ++i ] & 63;
      } else {
        throw 'Unknown multibyte start.';
      }
      ++i;

      if ( c <= 0xffff ) {
        s += sC( c );
      } else if ( c <= 0x10ffff ) {
        c -= 0x10000;
        s += sC( c >> 10 | 0xd800 );
        s += sC( c & 0x3FF | 0xdc00 );
      } else {
        throw 'Code point exceeds UTF-16 reach';
      }
    }
    return s;
  }
}

class PaxHeader {
  constructor(fields) {
    this._fields = fields;
  }

  static parse = function(buffer) {
    var bytes = new Uint8Array(buffer);
    var fields = [];

    while (bytes.length > 0) {
      // Decode bytes up to the first space character; that is the total field length
      var fieldLength = parseInt(decodeUTF8(bytes.subarray(0, bytes.indexOf(0x20))));
      var fieldText = decodeUTF8(bytes.subarray(0, fieldLength));
      var fieldMatch = fieldText.match(/^\d+ ([^=]+)=(.*)\n$/);

      if (fieldMatch === null) {
        throw new Error("Invalid PAX header data format.");
      }

      var fieldName = fieldMatch[1];
      var fieldValue = fieldMatch[2];

      if (fieldValue.length === 0) {
        fieldValue = null;
      } else if (fieldValue.match(/^\d+$/) !== null) {
        // If it's a integer field, parse it as int
        fieldValue = parseInt(fieldValue);
      }
      // Don't parse float values since precision is lost

      var field = {
        name: fieldName,
        value: fieldValue
      };

      fields.push(field);

      bytes = bytes.subarray(fieldLength); // Cut off the parsed field data
    }

    return new PaxHeader(fields);
  };

  applyHeader = (file) => {
    this._fields.forEach(function(field) {
      let fieldName = field.name;
      let fieldValue = field.value;

      if (fieldName === "path") {
        // This overrides the name and prefix fields in the following header block.
        fieldName = "name";

        if (file.prefix !== undefined) {
          delete file.prefix;
        }
      } else if (fieldName === "linkpath") {
        // This overrides the linkname field in the following header block.
        fieldName = "linkname";
      }

      if (fieldValue === null) {
        delete file[fieldName];
      } else {
        file[fieldName] = fieldValue;
      }
    });
  };
}

class UntarStream {
  constructor(arrayBuffer){
    this._bufferView = new DataView(arrayBuffer);
    this._position = 0;
  }

  readString = (charCount) => {
    const charSize = 1;
    const byteCount = charCount * charSize;

    const charCodes = [];

    for (let i = 0; i < charCount; ++i) {
      const charCode = this._bufferView.getUint8(this.position() + (i * charSize), true);
      if (charCode !== 0) {
        charCodes.push(charCode);
      } else {
        break;
      }
    }

    this.seek(byteCount);
    return String.fromCharCode.apply(null, charCodes);
  };

  readBuffer = (byteCount) => {
    let buf;

    if (typeof ArrayBuffer.prototype.slice === "function") {
      buf = this._bufferView.buffer.slice(this.position(), this.position() + byteCount);
    } else {
      buf = new ArrayBuffer(byteCount);
      const target = new Uint8Array(buf);
      const src = new Uint8Array(this._bufferView.buffer, this.position(), byteCount);
      target.set(src);
    }

    this.seek(byteCount);
    return buf;
  };

  seek = (byteCount) => {
    this._position += byteCount;
  };

  peekUint32 = () => {
    return this._bufferView.getUint32(this.position(), true);
  };

  position = (newpos) => {
    if (newpos === undefined) {
      return this._position;
    } else {
      this._position = newpos;
    }
  };

  size = () => {
    return this._bufferView.byteLength;
  };
}

class UntarFileStream {
  constructor(arrayBuffer){
    this._stream = new UntarStream(arrayBuffer);
    this._globalPaxHeader = undefined;
  }

  destroy(){
    this._stream
  }

  hasNext = () => {
    // A tar file ends with 4 zero bytes
    return this._stream.position() + 4 < this._stream.size() && this._stream.peekUint32() !== 0;
  };

  _readNextFile = () => {
    const stream = this._stream;
    let file = {};
    let isHeaderFile = false;
    let paxHeader = undefined;

    const headerBeginPos = stream.position();
    const dataBeginPos = headerBeginPos + 512;

    // Read header
    file.name = stream.readString(100);
    file.mode = stream.readString(8);
    file.uid = parseInt(stream.readString(8));
    file.gid = parseInt(stream.readString(8));
    file.size = parseInt(stream.readString(12), 8);
    file.mtime = parseInt(stream.readString(12), 8);
    file.checksum = parseInt(stream.readString(8));
    file.type = stream.readString(1);
    file.linkname = stream.readString(100);
    file.ustarFormat = stream.readString(6);

    if (file.ustarFormat.indexOf("ustar") > -1) {
      file.version = stream.readString(2);
      file.uname = stream.readString(32);
      file.gname = stream.readString(32);
      file.devmajor = parseInt(stream.readString(8));
      file.devminor = parseInt(stream.readString(8));
      file.namePrefix = stream.readString(155);

      if (file.namePrefix.length > 0) {
        file.name = file.namePrefix + "/" + file.name;
      }
    }

    stream.position(dataBeginPos);

    switch (file.type) {
      case "0": // Normal file is either "0" or "\0".
      case "": // In case of "\0", readString returns an empty string, that is "".
        file.buffer = stream.readBuffer(file.size);
        break;
      case "1": // Link to another file already archived
      case "2": // Symbolic link
      case "3": // Character special device (what does this mean??)
      case "4": // Block special device
      case "5": // Directory
      case "6": // FIFO special file
      case "7": // Reserved
        break;
      case "g": // Global PAX header
        isHeaderFile = true;
        this._globalPaxHeader = PaxHeader.parse(stream.readBuffer(file.size));
        break;
      case "x": // PAX header
        isHeaderFile = true;
        paxHeader = PaxHeader.parse(stream.readBuffer(file.size));
        break;
      default: // Unknown file type
        break;
    }

    if (file.buffer === undefined) {
      file.buffer = new ArrayBuffer(0);
    }

    let dataEndPos = dataBeginPos + file.size;

    // File data is padded to reach a 512 byte boundary; skip the padded bytes too.
    if (file.size % 512 !== 0) {
      dataEndPos += 512 - (file.size % 512);
    }

    stream.position(dataEndPos);

    if (isHeaderFile) {
      file = this._readNextFile();
    }

    if (this._globalPaxHeader !== undefined) {
      this._globalPaxHeader.applyHeader(file);
    }

    if (paxHeader !== undefined) {
      paxHeader.applyHeader(file);
    }

    return file;
  }
}

if (typeof self !== "undefined") {
  // Inside the worker thread.
  self.onmessage = UntarWorker.onmessage;
}