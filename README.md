# NSF PROJECTs Official Website

独自のAstroフレームワークとCloudflare環境で構築された、NSF PROJECTsのオフィシャルサイトです。
日本全国の中高生・学生メンバーが主体となり、「まなぶ。つなぐ。そなえる。」をテーマにした防災・復興支援活動の情報を発信しています。

---

## 📂 フォルダ構成と役割

プロジェクト内の主要なフォルダとファイルの役割は以下の通りです。

```text
├── src/
│   └── pages/          # 💡 各ページの本体（.astro ファイル）
│                       # 新しいページを追加・編集する場合はここを触ります。
├── public/             # 💡 静的アセット（画像・ファビコンなど）
│   ├── favicon.ico     # サイトのファビコン
│   ├── photo/          # プロジェクトやメンバーの顔写真
│   └── bifrost/        # Bifröst特化の画像アセット
├── functions/          # Cloudflare Pages Functions（API・バックエンド処理）
├── astro.config.mjs    # Astroの全体設定ファイル
├── wrangler.jsonc      # Cloudflareのデプロイ・Assets構成設定
└── package.json        # プロジェクトの依存関係・ビルドコマンド定義
