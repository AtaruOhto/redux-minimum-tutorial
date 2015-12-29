export const ADD_TEXT = 'ADD_TEXT'
export const CLEAR_TEXT = 'CLEAR_TEXT'
let textId = 1

/*
  Action Creator:
  Appコンポーネント (src/App.js) から呼ばれる Action Creator群
  App.jsから呼ばれ、Action Creator内部で生成されたオブジェクトはreducer (./reducers) に渡される。
*/

//addText (Action Creator) : Appコンポーネント (App.js) でAddボタンを呼び出した時に呼ばれる。
// type (何のアクションなのかを示す定数であり必須) とApp.jsから渡されたテキストを包含したオブジェクトを return する。
export function addText(newText) {
    return {
        type: ADD_TEXT,
        id: textId++,
        text: newText
    };
}

//clearText (Action Creator) : Appコンポーネント (App.js) でClearボタンを呼び出した時に呼ばれる。
export function clearText() {
    return {
        type: CLEAR_TEXT
    };
}
