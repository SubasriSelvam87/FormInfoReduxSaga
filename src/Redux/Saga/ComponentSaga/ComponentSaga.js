import * as types from "../../Type/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAll, postItem, deleteItem, putItem, getId } from "../../../Services/mockApi";
import {
  getAllFail,
  getAllSuc,
  postFail,
  postSuc,
  deleteFail,
  deleteSuc,
  updateFail,
  updateSuc,
  getIdSuc,
  getIdFail,
} from "../../Action/action";

function* getApi() {
  try {
    const res = yield call(getAll);
    
    if (res.status === 200) {
      yield put(getAllSuc(res.data));
    } else {
      yield put(getAllFail("Failed to fetch data"));
    }
  } catch (error) {
    yield put(getAllFail(error.message));
  }
}

function* getIdApi(action) {
  try { 
    const res = yield call(getId,action.payload);
    
    if (res.status === 200) {
      yield put(getIdSuc(res.data));
    } else {
      yield put(getIdFail("Failed to fetch data"));
    }
  } catch (error) {
    yield put(getIdFail(error.message));
  }
}

function* postApi({ payload }) {
  try {
    const res = yield call(postItem, payload);
    
    if (res.status === 201) {
      yield put(postSuc(res.data));
    } else {
      yield put(postFail("Failed to create item"));
    }
  } catch (error) {
    yield put(postFail(error.message ));
  }
}

function* deleteApi({ payload }) {
  try {
    const res = yield call(deleteItem, payload);
    
    if (res.status === 200) {
      yield put(deleteSuc(payload)); 
    } else {
      yield put(deleteFail("Failed to delete item"));
    }
  } catch (error) {
    yield put(deleteFail(error.message));
  }
}

function* editApi({ payload }) {
  try {
    // const {id,data}=payload;
    const res = yield call(putItem, payload,payload.id);
    
    if (res.status === 200) {
      yield put(updateSuc(res.data)); 
    } else {
      yield put(updateFail("Failed to delete item"));
    }
  } catch (error) {
    yield put(updateFail(error.message));
  }
}


export function* StudentWatcherSaga() {
  yield takeLatest(types.GET_ALL_REQ, getApi);
  yield takeLatest(types.GET_ID_REQ,getIdApi);
  yield takeLatest(types.POST_REQ, postApi);
  yield takeLatest(types.DELETE_REQ, deleteApi);
  yield takeLatest(types.EDIT_REQ,editApi);
}
