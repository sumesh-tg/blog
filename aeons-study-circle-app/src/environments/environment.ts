// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:"http://localhost:1337",
  firebaseConfig : {
    apiKey: "AIzaSyBuOsLXEhcljv2Ikwcz46nyTvpoYBXBcBE",
    authDomain: "aeonsstudycircle-web.firebaseapp.com",
    databaseURL: "https://aeonsstudycircle-web.firebaseio.com",
    projectId: "aeonsstudycircle-web",
    storageBucket: "aeonsstudycircle-web.appspot.com",
    messagingSenderId: "694514346883",
    appId: "1:694514346883:web:c87ac9af8d120100efa4b6",
    measurementId: "G-B6CVL4Y7P6"
  },
  postCollectionsName:"test_posts",
  quizCategoryCollectionName:"test_quiz_cat",
  quizQuestionsCollectionName:"test_quiz_questions"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
