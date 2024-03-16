// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // production: false,
  production:true,

  imageUrl: "https://www.avvatta.com:8100/avvata/public/uploads/newverticalbanners/",
   // www.avvatta.com:8100
   //apiUrl : "https://www.avvatta.com:8100/public/userApi/",
   apiUrl : "https://zm.avvatta.com:8100/public/userApi/",
  // apiUrl : "https://ng.avvatta.com:8100/public/userApi/",
  // apiUrl : "http://192.168.0.128/netflix/public/userApi/",
  // http://192.168.0.129/netflix/public/userApi/erosnowcontentall?steps=6
  leapUrl: 'http://avvatta.com:8012/avvatta_jwt/public/api/',

  erosNowApi : "https://apistg.erosnow.com/",
  syavulaApiBaseUrl: 'https://www.siyavula.com',
  googleAnalyticsKey : "G-50K49E7JW8",
  gaTrackingId: "G-50K49E7JW8"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
