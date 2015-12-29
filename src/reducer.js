import { combineReducers } from 'redux'
import { ADD_TEXT, CLEAR_TEXT } from './actions';

/*
  Reducer:
  ReducerはAction Creatorから渡されたデータに変更をもとに新しい state を返す。
  stateは Reducer が返した新しい state に更新され、View (Appコンポーネント) が新しい state を元に再描画される。
*/

// アプリ起動時のstate
let initialState = [
  {
    id: 0,
    text: 'Hello Redux and React!'
  }
]

let text = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TEXT:
            //ADD_TEXTアクションが来た時は現状の state に新しく生成されるオブジェクトをプラスして state を返す
            return [
                // Spread Operatorで現状の state を全て要素として配列の中に展開する: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_operator
                ...state,
                //下記はADD_TEXTアクションによって新たに state に追加されるオブジェクト
                {
                  id: action.id,
                  text: action.text
                }
            ];
          case CLEAR_TEXT:
                // CLEAT_TEXTアクションが来た場合には空の配列を返して state を初期化する
            return []
        default:
            return state
    }
};

// entry.js内部で Provider コンポーネントにセットするデータストア. <Provider>以下でthis.props.stateの形でアクセス可能。
export const store = combineReducers(
  {
    storedText : text
  }
)
