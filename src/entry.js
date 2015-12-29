/* ライブラリのインポート */
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider }  from 'react-redux'

/* Appコンポーネントのインポート */
import App from './App'
/* Reducerから Store をインポート */
import { store } from './reducer'

/*
  Entry Point:
  Appコンポーネント (App.jsからインポート) をProviderコンポーネント (react-reduxからインポート) でラップする
  さらに、createStore() メソッドで生成した Store をProviderコンポーネントに設定する
*/

//createStore() メソッドで Store を生成する。
let applicationStore = createStore(store);
let rootElement = document.querySelector('#root');

render (
    <Provider store={applicationStore}>
        <App />
    </Provider>,
    // rootElement下にコンポーネントを生成
    rootElement
);
