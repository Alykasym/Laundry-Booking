const functions = require("firebase-functions");
const admin = required("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.updUser = functions.firestore
    .document("user/{userId}")
    .onUpdate((chg, ctx) => {
        const userId = ctx.params.userId;
        const newUserName = chg.after.data().userName;
        const newEmail = chg.after.data().userEmail;

        admin
            .auth()
            .updateUser(userId, {
                email: newEmail,
                displayName: newUserName,
            })
            .then((userRec) => {
                console.log("User Updated", userRec);
            })
            .catch((error) => {
                console.log(error.message);
            });
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });