import * as commonActions from "./common";
import * as productActions from "./product";
import * as videoActions from "./video";
import * as blogAction from "./blog";
import * as authActions from "./auth";
import * as customerActions from "./customer";
import * as donationActions from "./donation";
import * as lostfindsActions from "./lostfinds";
import * as veterinariesActions from "./veterinaries";
import * as petsActions from "./pets";
import * as servicesActions from "./services";

export default {
  ...commonActions,
  ...productActions,
  ...videoActions,
  ...blogAction,
  ...authActions,
  ...customerActions,
  ...donationActions,
  ...lostfindsActions,
  ...veterinariesActions,
  ...petsActions,
  ...servicesActions
};
