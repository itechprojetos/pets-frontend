import { call, put } from 'redux-saga/effects'
import api /*{ API_TOKEN, USER_ID }*/ from '../../services/api'
import actions from "../actions";
import { Product } from "../../models/Product"

export function* getHighlights() {
  try {
    // google storage permissions allUsers
    // const { data } = yield call(api.get, '/services/app/...')
    const { data } = yield call(api.get, '/services/app/ProfessionalServices/GetAll?MaxResultCount=10')

    if (data.success) {
      yield put({
        type: actions.ProductTypes.GET_HIGHLIGHTS_SUCCESS,
        payload: data.result.items
      });
    } else {
      yield put({ type: actions.ProductTypes.GET_HIGHLIGHTS_ERROR });
    }
  } catch (e) {
    console.log("getHighlights exception: ", e);
    yield put({ type: actions.ProductTypes.GET_HIGHLIGHTS_ERROR });
  }
}

export function* getProducts(action) {
  // const {payload} = action
  // payload.id // store id
  try {
    // google storage permissions allUsers
    // const { data } = yield call(api.get, '/services/app/...')
    const data = {
      success: true,
      products: [
        new Product({
          id: 1,
          imageUrl: "https://storage.googleapis.com/dospets/destaque1.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sellerName: "Eduardo Daolio",
          rate: 3,
          price: 50.0,
          bookmarked: false
        }),
        new Product({
          id: 2,
          imageUrl: "https://storage.googleapis.com/dospets/destaque2.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sellerName: "Eduardo Daolio",
          rate: 4,
          price: 200.0,
          bookmarked: false
        }),
        new Product({
          id: 3,
          imageUrl: "https://storage.googleapis.com/dospets/destaque3.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sellerName: "Eduardo Daolio",
          rate: 2,
          price: 200.0,
          bookmarked: false
        }),
        new Product({
          id: 4,
          imageUrl: "https://storage.googleapis.com/dospets/destaque4.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sellerName: "Eduardo Daolio",
          rate: 5,
          price: 100.0,
          bookmarked: false
        }),
        new Product({
          id: 5,
          imageUrl: "https://storage.googleapis.com/dospets/destaque5.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sellerName: "Eduardo Daolio",
          rate: 3,
          price: 200.0,
          bookmarked: false
        }),
        new Product({
          id: 6,
          imageUrl: "https://storage.googleapis.com/dospets/destaque6.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sellerName: "Eduardo Daolio",
          rate: 1,
          price: 200.0,
          bookmarked: false
        }),
        new Product({
          id: 7,
          imageUrl: "https://storage.googleapis.com/dospets/destaque7.jpg",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sellerName: "Eduardo Daolio",
          rate: 5,
          price: 300.0,
          bookmarked: false
        }),
        new Product({
          id: 8,
          imageUrl: "https://storage.googleapis.com/dospets/destaque8.jpg",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          name: "Eduardo Daolio",
          sellerName: "Eduardo Daolio",
          rate: 3,
          price: 200.0,
          bookmarked: false
        })
      ]
    };
    if (data.success) {
      yield put({
        type: actions.ProductTypes.GET_PRODUCTS_SUCCESS,
        payload: data.products
      });
    } else {
      yield put({ type: actions.ProductTypes.GET_PRODUCTS_ERROR });
    }
  } catch (e) {
    console.log("getProducts exception: ", e);
    yield put({ type: actions.ProductTypes.GET_PRODUCTS_ERROR });
  }
}
