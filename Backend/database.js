const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require("./activity-classroom-firebase-adminsdk-94ks0-57f615dad3.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;