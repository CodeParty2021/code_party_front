# 概要
`public/icons`下にあるSVGアイコンをコンポーネントに変換して指定したディレクトリ下に配置するコマンドです。

コンポーネントのデフォルトの保存先は`src/components/icons`になっています。

# 使用例
全てのアイコンを変換する
```
> yarn icon:importAll
```

# コマンド一覧
### `yarn icon:help`
- ヘルプを表示する

### `yarn icon:importAll`
- `public/icons`下にあるすべてのアイコンを変換して保存する（ファイルが存在する場合は上書きされない）

### `yarn icon:import iconName1 iconName2 ...`
- `public/icons`下にある指定されたアイコンを変換して上書き保存する
- アイコンの指定方法
  - SVGファイルのアイコン名の部分を引数に指定してください
  - 例
    - hogeIcon1_32.svg -> hogeIcon1
    - hoge_hoge_16.svg -> hoge_hoge
- 例
  ```
  # hogeIcon1とhoge_icon2を変換する場合
  > yarn icon:import hogeIcon1 hoge_icon2
  ```
# ファイル名の規則
- `{iconName}_{size}.svg`という形式で`public/icons`に保存してください
  - `iconName`: アイコン名．英数字と\_(アンダースコア)が使用できます．
  - `size`: アイコンサイズ．数字のみ使用できます．
- ファイル名の例
  ```
  hoge_16.svg       // OK
  hoge_hoge_128.svg // OK
  hogeHoge_8.svg    // OK
  
  hoge.hoge_8.svg   // NG：使用できない文字（ピリオド）が含まれている
  hoge_hoge.svg     // NG：アイコンサイズが無い
  ```
