/* ライブラリのインポート */
import React, { Component } from 'react'
import { connect } from 'react-redux'

/* Action Creatorのインポート */
import { addText, clearText } from './actions'

/*
  View (Reactコンポーネント):
  ユーザーの操作などを受けて dispatch() メソッドで Action Creator (./actions.jsからインポートした addText(), clearText()メソッドなど) を呼び出して、Storeにデータの変更 (stateの変更) を伝播させる
  dispatch() メソッドは connect() メソッド (react-reduxよりインポート) でラップすることにより使用可能になる
  例: this.props.dispatch(clearText())
*/

class App extends Component {

    render() {

        return (
            <div>
                <input type='text' ref='input' /><br/>
                <button onClick={(e) => this.onAddBtnClicked(e)}   >Add</button>
                <button onClick={(e) => this.onClearBtnClicked(e)} >Clear</button>
                <ul>
                  {
                    //state中のオブジェクトをループさせて<li>要素を描画。stateは selector() メソッドで指定しているものがpropsとして渡ってくる
                    this.props.state.storedText.map((obj) =>
                      <li key={obj.id} >
                        {obj.text}
                      </li>
                    )
                  }
                </ul>
            </div>
        )

    }

    //Add ボタンをクリックした時に呼び出される
    onAddBtnClicked(e) {
        let input = this.refs.input
        let text = input.value.trim()
        if (!text) return alert('何かテキストを入力してください。')
        input.value = ''
        // Appコンポーネントが connect() メソッドでラップされていることによって、dispatchメソッドを呼び出すことが可能になる
        // dispatch() メソッドで ActionCreator である addText() メソッドをラップして呼び出すことによって state の変更を伝播
        this.props.dispatch(addText(text))
    }

    //Clear ボタンをクリックした時に呼び出される
    onClearBtnClicked(e) {
        // dispatchメソッドで ActionCreator であるclearText() メソッドをラップして呼び出すことによって state の変更を伝播
        this.props.dispatch(clearText())
    }

}

// セレクターの定義: Appコンポーネントが必要とするデータを state 全体の中から取捨選択して取得する。今回は state 全体をそのままreturnしている
let selector = (state) => {
    // [storedText]というキー名はreducer.jsの最下部で設定している Store のキー名。
    console.log(state.storedText);
    return {
        state: state // Key名とvalue名が同じなので return {state} でも可: Object Literal Shorthand
    }
}

// Appコンポーネントを connect() メソッドでラップした上でエクスポート
export default connect(selector)(App)
