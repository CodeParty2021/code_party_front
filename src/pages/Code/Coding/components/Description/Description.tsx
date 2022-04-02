import React from "react";
import styled from "styled-components";
type Prop = {};

export const Description: React.FC<Prop> = () => {
  const Table = styled.table`
    text-align: center;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #595959;
      width: 100px;
      height: 100px;
    }
  `;

  const Table_Robbot = styled.table`
    text-align: center;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #595959;
    }
  `;

  return (
    <div>
      <h1>コーディングの説明</h1>
      <h2>コーディングは以下の流れにそって行なってください</h2>

      <h4>1. 右のエディター画面に実行したい処理を書き込みます</h4>
      <h4>2. 画面下にある[実行する]ボタンを押して実行できます</h4>

      <h2>このゲームでは以下の情報を用いることができます</h2>

      <Table_Robbot>
        <tbody>
          <tr>
            <td>変数名</td>
            <td>情報</td>
            <td>返り値</td>
          </tr>
          <tr>
            <td>my_pos</td>
            <td>自分のロボットの状態</td>
            <td>(x,y)</td>
          </tr>
          <tr>
            <td>other_pos</td>
            <td>他のロボットの位置</td>
            <td>[(x,y),(x,y),(x,y)]</td>
          </tr>
          <tr>
            <td>field</td>
            <td>
              フィールドの状態
              <br />
              -1:空. 0~3:ロボットが存在する
            </td>
            <td>5×5のint配列</td>
          </tr>
        </tbody>
      </Table_Robbot>

      <h3>ユーザーはコードで以下の行動を指示できます</h3>
      <Table_Robbot>
        <tbody>
          <tr>
            <td>戻り値</td>
            <td>情報</td>
            <td>返り値</td>
          </tr>
          <tr>
            <td>action</td>
            <td>
              ロボットが次に行う行動 <br />{" "}
              前進(0)、右に移動(1)、後退(2)、左に移動(3)、その場で待機(4)
            </td>
            <td>int i</td>
          </tr>
        </tbody>
      </Table_Robbot>

      <h3>ステージの情報</h3>
      <h4>初期配置</h4>

      <Table>
        <tbody>
          <tr>
            <td>Player2</td>
            <td>(1,4)</td>
            <td>(2,4)</td>
            <td>(3,4)</td>
            <td>Player3</td>
          </tr>
          <tr>
            <td>(0,3)</td>
            <td>(1,3)</td>
            <td>(2,3)</td>
            <td>(3,3)</td>
            <td>(4,3)</td>
          </tr>
          <tr>
            <td>(0,2)</td>
            <td>(1,2)</td>
            <td>(2,2)</td>
            <td>(3,2)</td>
            <td>(4,2)</td>
          </tr>
          <tr>
            <td>(0,1)</td>
            <td>(1,1)</td>
            <td>(2,1)</td>
            <td>(3,1)</td>
            <td>(4,1)</td>
          </tr>
          <tr>
            <td>あなた</td>
            <td>(1,0)</td>
            <td>(2,0)</td>
            <td>(3,0)</td>
            <td>Player1</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
