import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import common from "./common";
import product from "./product";
import video from "./video";
import blog from "./blog";
import auth from "./auth";
import customer from "./customer";
import donation from "./donation";
import lostfinds from "./lostfinds";
import veterinaries from "./veterinaries";
import pets from "./pets";
import services from "./services";

export default history =>
  combineReducers({
    router: connectRouter(history),
    common,
    product,
    video,
    blog,
    auth,
    customer,
    donation,
    lostfinds,
    veterinaries,
    pets,
    services
  });
