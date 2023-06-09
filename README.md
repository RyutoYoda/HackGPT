# HackGPT/4YOU

このプログラムは、自己紹介を基に起承転結を意識した4コマ漫画を生成します。ユーザーが自己紹介文を入力すると、AIモデルがそれを元に漫画のパネルごとの文章と画像を生成します。

インストール
1.このプログラムを動作させるには、以下の手順に従ってください。
Pythonをインストールします（バージョン3.7以上）。

2.必要なライブラリをインストールします。以下のコマンドを実行してください。

```pip install fastapi openai-python aiofiles uvicorn jinja2```


3.OpenAIのAPIキーを取得します。APIキーはOpenAIのプラットフォームにサインアップし、アカウントダッシュボードで生成できます。

4,`server.py `ファイルをダウンロードします。

5.`server.py` ファイルをテキストエディタで開き、APIキーを設定します。以下の行を編集し、APIキーを挿入してください。

```openai.api_key = "YOUR_API_KEY"```

6.コマンドラインで次のコマンドを実行して、サーバーを起動します。

```uvicorn server:app --reload```

7.ブラウザで `http://localhost:8000` にアクセスします。すると、自己紹介4コマ漫画のウェブインターフェースが表示されます。

# 使用方法
1.自己紹介文を入力してください。テキストボックスに自己紹介の文章を入力します。

2.「生成」ボタンをクリックしてください。すると、AIモデルが自己紹介文に基づいて漫画のパネルごとの文章と画像を生成します。

3.生成された漫画が表示されます。各パネルのキャプションと画像が表示されるので、読みながら楽しんでください。

4.もう一度自己紹介文を入力して新しい漫画を生成する場合は、手順1から3を繰り返してください。

# 注意事項
このプログラムはAIモデルを使用しているため、生成される漫画の内容や品質は完全に制御できません。予期しない結果が得られることもあります。
