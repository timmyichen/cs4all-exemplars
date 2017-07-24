function randomInt(a, b) {
    return Math.floor((Math.random() * (b - a + 1)) + a);
}

// taken from https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function getBlankIfNaN(input) {
  return isNaN(input) ? '[empty]' : input;
}


module.exports = {
  randomInt,
  arraysEqual,
  isEmptyObject,
  getBlankIfNaN,
};
