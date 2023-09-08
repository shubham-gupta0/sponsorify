/**
 * stable version was
 * npm install --save firebase-admin@10.3 
 * @param cert, initializeApp
 * @exports db
 * git cmd
 * git rebase --onto
 * git cherry-pick
 * sudo lsof -i :port 
 * sudo kill 
 */
const admin = require("firebase-admin");
const credentials = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
const db = admin.firestore();
module.exports = {db};