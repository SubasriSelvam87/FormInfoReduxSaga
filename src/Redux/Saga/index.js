import { StudentWatcherSaga } from "./ComponentSaga/ComponentSaga";
import {all} from 'redux-saga/effects';
  

  function* rootSaga(){

    console.log("rootSaga");
    yield all([StudentWatcherSaga()])

  }
  export default rootSaga;