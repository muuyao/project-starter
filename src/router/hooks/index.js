import afterEach from './after-each';

export default (router) => {
  const keys = Object.keys(afterEach);
  keys.forEach((key) => {
    router.afterEach(afterEach[key]);
  });
}
