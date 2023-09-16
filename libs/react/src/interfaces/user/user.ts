//set this to a user type
//
// {
//   "id": "f18727ea-b0b9-42fb-a9c8-9eca50dee4fd",
//   "company_id": null,
//   "password": "null",
//   "nickname": "qaalib.farah",
//   "family_name": "Qaalib",
//   "given_name": "Farah",
//   "name": "Qaalib Farah",
//   "email": "qaalib.farah@coldclimate.com",
//   "email_verified": null,
//   "phone_number": "null",
//   "phone_verified": null,
//   "picture": "https://lh3.googleusercontent.com/a/AAcHTtcvnhidfGSVTPHr8xqFDckKPQKxjE1AaNRLCCCm=s96-c",
//   "last_login": "2023-06-01T17:58:28.000Z",
//   "last_ip": "144.86.169.76",
//   "last_password_reset": null,
//   "roles": "cold:admin",
//   "permissions": null,
//   "app_metadata": null,
//   "user_metadata": {
//   "stats": {
//     "logins_count": 20
//   },
//   "client": {
//     "name": "cold-ui-nx",
//       "metadata": {},
//     "client_id": "3MVVb0vmZ7zYXalG3XhAJ9MMcgdKmpKQ"
//   },
//   "request": {
//     "ip": "144.86.169.76",
//       "body": {},
//     "geoip": {
//       "cityName": "Burnsville",
//         "latitude": 44.7601,
//         "timeZone": "America/Chicago",
//         "longitude": -93.2748,
//         "countryCode": "US",
//         "countryName": "United States",
//         "countryCode3": "USA",
//         "continentCode": "NA",
//         "subdivisionCode": "MN",
//         "subdivisionName": "Minnesota"
//     },
//     "query": {
//       "nonce": "NHduZjdnQnozd2t6a35ZZFpFNHJETXJvSUNRdlBxSTNQLTdIMC5FZkNaMw==",
//         "scope": "openid profile email",
//         "state": "R1ozRWJ5RWVFNHg1S3FfUHY0akxiTzZLd35CdjVzM0RyeDZXS2JrNFFvZQ==",
//         "prompt": "none",
//         "audience": "https://api.cold-climate.dev",
//         "client_id": "3MVVb0vmZ7zYXalG3XhAJ9MMcgdKmpKQ",
//         "auth0Client": "eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMi4xLjAifQ==",
//         "organization": "org_G03LwhsdwOzrSQr7",
//         "redirect_uri": "http://localhost:4200",
//         "response_mode": "web_message",
//         "response_type": "code",
//         "code_challenge": "lnFn2FKC9NKUigsav6bN7JQkP8Hw0KBqHN9skIBznAg",
//         "code_challenge_method": "S256"
//     },
//     "method": "GET",
//       "hostname": "dev-6qt527e13qyo4ls6.us.auth0.com",
//       "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
//   },
//   "transaction": {
//     "state": "R1ozRWJ5RWVFNHg1S3FfUHY0akxiTzZLd35CdjVzM0RyeDZXS2JrNFFvZQ==",
//       "locale": "en",
//       "prompt": [
//       "none"
//     ],
//       "protocol": "oidc-basic-profile",
//       "acr_values": [],
//       "ui_locales": [],
//       "redirect_uri": "http://localhost:4200",
//       "response_mode": "web_message",
//       "response_type": [
//       "code"
//     ],
//       "requested_scopes": [
//       "openid",
//       "profile",
//       "email"
//     ]
//   },
//   "user_metadata": {}
// },
//   "identities": [
//   "google-oauth2|112288932075209720794"
// ],
//   "multifactor": [],
//   "multifactor_updated": null,
//   "tenant": "cold-climate-staging",
//   "blocked": false,
//   "blocked_for": null,
//   "guardian_authenticators": null,
//   "created_at": "2023-06-01T17:58:28.000Z",
//   "updated_at": "2023-05-21T20:04:03.192Z"
// }

/**
 *   id                      String    @id
 *   company_id              String?
 *   password                String?
 *   nickname                String?
 *   family_name             String?
 *   given_name              String?
 *   name                    String?
 *   email                   String    @unique
 *   email_verified          DateTime?
 *   phone_number            String?
 *   phone_verified          DateTime?
 *   picture                 String?
 *   last_login              DateTime?
 *   last_ip                 String?
 *   last_password_reset     DateTime?
 *   roles                   String    @default("company:member")
 *   permissions             Json?
 *   app_metadata            Json?
 *   user_metadata           Json?
 *   identities              Json?
 *   multifactor             String[]  @default([])
 *   multifactor_updated     DateTime?
 *   tenant                  String?
 *   blocked                 Boolean?  @default(false)
 *   blocked_for             String?
 *   guardian_authenticators Json?
 *   created_at              DateTime
 *   updated_at              DateTime  @default(now())
 */
