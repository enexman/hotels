
//SCSS
import './assets/scss/styles.scss';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

// importAll(require.context('./assets/scss', true, /\.(scss)$/));
// importAll(require.context('./blocks', true, /\.(scss)$/));

importAll(require.context('./blocks', true, /\.(js)$/));
