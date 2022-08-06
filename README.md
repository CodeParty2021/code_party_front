# CodeParty フロントエンド

目次
- [環境構築（Docker）](#環境構築docker)
- [環境構築（従来）](#環境構築従来)
- [アイコンシステム](/commands/IconImporter/README.md)

# 環境構築（Docker）
- dockerまたはdocker desktopをインストール
  - [docker desktopのインストールはこちらから](https://www.docker.com/products/docker-desktop/)
- dockerまたはdocker desktopを起動
- リポジトリをクローン
- プロジェクトディレクトリに以下のファイルを作成
  - .env
    - 内容は[こちら](https://www.notion.so/env-6c50632c787043b4a34d58680bf9a4fe)をコピー
  - .env.backend
    - 内容は[こちら](https://www.notion.so/750a8dca400848d1a0ee8c8b1613d343)をコピー
  - .env.firebase
    - 内容は[こちら](https://www.notion.so/Firebase-9ea6d66210d9401a9ca06fa795ab7500)をコピー
- プロジェクトディレクトリで以下のコマンドを実行
```
$ docker-compose build
$ docker-compose up -d
```
- ここまでで、フロントエンド・Storybook・バックエンド・Firebaseのそれぞれのコンテナが作成されます。
- node_modulesはホスト側に作成されないので、VSCodeのDocker拡張機能などを利用してコンテナ内で作業することをお勧めします。
  - 編集内容はホスト側と同期されるので、コンテナを消してもコードの編集内容は残ります。

## Dockerで困ったとき
- パッケージを追加したい
  - コンテナ内で`yarn add`をした後に`docker-compose restart`でコンテナを再起動
- node_modulesを作り直したい
  - まずはコンテナを削除
  - frontend-node-modulesというDocker Volumeを削除
  - `docker-compose up -d`を実行（環境丸ごと作り直したい場合は`docker-compose build --no-cache`）
- node_modulesがホスト側にあるとDockerが正常に動作しない可能性があります
  - Volumeのnode_modulesより、ホスト側のnode_modulesが優先的に参照される場合があるみたいです。

# 環境構築（従来）

1. ライブラリインストール

```bash
yarn
```

2. env ファイルの生成

```
vi .env
```

中身は[こちら](https://www.notion.so/ea4344dedbb444818cb1aad0f7b6b612?p=6c50632c787043b4a34d58680bf9a4fe)をコピー(notion リンクなので未招待の人は Teru まで)

3. モックアップサーバーの起動(別のターミナル推奨)

```bash
$ cd mock_server
$ json-server -w db.json --port 3001
```

4. 起動

```bash
yarn start
```

5. テスト

```bash
yarn test
```

スナップショットテストでエラーが出たときは内容を確認し問題がなければ u を押すことでスナップショットをアップデートできる。

以上

# Storybook について

StoryBook を利用することで UI コンポーネントを確認することができる。

以下のコマンドで起動

```
yarn storybook
```

# Node.js のバージョン管理ツールの導入

## Windows ユーザの場合

### 事前準備

node.js を既にインストールしている場合は一度アンインストールしてください。

### nodist の導入

https://github.com/nullivex/nodist/releasesからNodistSetup-vx.x.x.exeをダウンロード  
（今回は v0.9.1 をダウンロードしました）

### いろいろインストール

- Node.js のインストール

```
> nodist + 16.11.0
> nodist 16.11.0
```

- npm のバージョン合わせ

```
> nodist npm match
```

- yarn のインストール

```
npm install -g yarn
```

- git のインストール  
  https://git-scm.com/ここからダウンロードしてインストール

## Mac ユーザの場合

nodenv なるものをインストールするらしい。  
ちげくんの ScrapBox を参考にインストールしてください。
https://scrapbox.io/chige12memo/Mac_book_%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89

# 確認

```
> node -v
v16.11.0
> npm -v
8.0.0
> yarn -v
1.22.17
> git --version
git version 2.33.0.windows.2
> npx create-react-app --version
Need to install the following packages:
  create-react-app
Ok to proceed? (y) y
npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.
4.0.3
```

# ダウンロード

このリポジトリをクローン

```
git clone https://github.com/CodeParty2021/code_party_front.git
```

# パッケージのインストール

このプロジェクトをクローンした後、プロジェクトルートディレクトリで以下を実行

```
> yarn
```

# ローカルサーバの起動

```
> cd code_party_front
code_party_front > yarn start
http://localhost:3000にアクセスするとReactのページが表示される
```

# React プロジェクト作成で実行したコマンド

```
> npx create-react-app code_party_front --template typescript
色々出てくる
最後にHappy hacking!が出てきたらOK
```

# その他、メモ

## nodist 関連でなんかエラー出た時

- PATH not updated, original length x > 1024 が出た時
- 環境変数に C:\Program Files (x86)\Nodist\bin を追加しましょう．
- cb.apply is not a function が出た時
- nodist npm match を実行しましょう。
- そのほか
- 頑張って調べて！

## その他、nodist の参考

https://qiita.com/satoyan419/items/56e0b5f35912b9374305

以下、React のデフォルト README

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
