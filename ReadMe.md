## About
The `browser-untar` package aims at efficiently using the browser to extract a tar archive. This is useful in applications
where several larger files are always needed at the same time. These files can then be bundled in to a .tar.gz file and efficiently
extracted in the browser.

## Usage
To use the package for downloading and extracting a tar.gz file do the following.
```javascript
// Set up a helper that can be used for multiple extractions.
const untarInstanceHelper = require('./dist/browser-untar.js').default.instance();

// Get a tar file from some where.
const tarFileRequest = fetch('file.tar.gz');

// Request browser-untar to extract all files.
const untarRequest = tarFileRequest.then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    response.arrayBuffer();
    return untarInstanceHelper.untar(arrayBuffer);
});

// Do something with the files
untarRequest.then((files) => {
      console.log(files)
});
```

## Building
If you want to build the project your self do the following.
```bash
    npm install -g yarn
    yarn install
    npm run build
```

## Tests
No tests but hopefully coming soon.

## Sources
This project was based on js-untar and much of the code has been adapted from that project.