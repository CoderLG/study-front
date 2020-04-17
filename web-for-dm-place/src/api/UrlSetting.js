const DEFAULTURLS = window.DEFAULTURLS;
const URLS = {};
Object.keys(DEFAULTURLS).forEach((key) => {
  URLS[key] = localStorage.getItem(key) || DEFAULTURLS[key];
});

const URLSETTING = {
  get URLS() {
    return URLS;
  },
  reset() {
    Object.keys(DEFAULTURLS).forEach((key) => {
      localStorage.setItem(key, DEFAULTURLS[key]);
    });
  },
  clear() {
    Object.keys(URLS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
window.URLSETTING = URLSETTING;
export default URLSETTING;
