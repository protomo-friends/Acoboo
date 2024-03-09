# 開発方針
開発する上での方向性

1. linterとformatterとテストに従う
2. git flowに従う
https://docs.github.com/ja/get-started/using-github/github-flow

3. issue駆動
4. immutableにできるんならimmutableにする
5. 相互レビューする

# 開発時命名規則
コード上のものはlinterに従う

ここで改めて列挙してもいいかも。

## ブランチ
issueの名前から作成する。
{}がメタ要素として。
{label type}/{issue番号}_{issueタイトルを英語にしたものをスネークケースで}
1つのissueに対して複数のブランチが必要になったら、新しくissueを作成する。

## commit comment
https://www.conventionalcommits.org/ja/v1.0.0/

Conventional Commitsでcommentを書く
scopeは、変更したファイルがある場合はfront/backendのrootdir直下のdirを書く。複数dirに跨って変更している場合は無しにする。
