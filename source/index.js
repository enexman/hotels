
function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('./assets', true, /\.(scss)$/));
importAll(require.context('./blocks', true, /\.(js)$/));
