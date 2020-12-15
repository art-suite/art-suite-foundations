let { randomString } = require("art-standard-lib");

// MOCK A REMOTE API
let push = (arr, value) => { arr.push(value); return value; }
let session = null;
let posts = []
let comments = []

module.exports.auth = (email) => session = { email, id: randomString() };
module.exports.createPost = (body) => push(posts, { id: randomString(), userId: session.id, body });
module.exports.createComment = (postId, body) => push(comments, { id: randomString(), userId: session.id, postId, body });
module.exports.getComments = (wherePostId) => comments.filter(({ postId }) => postId == wherePostId);
module.exports.logOut = () => session = null;
