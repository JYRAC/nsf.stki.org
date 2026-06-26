# NSF PROJECTs 公式ホームページ

全国の中高生が主体となって活動する「NSF PROJECTs（能登半島地震・学生による支援募金プロジェクト）」の公式Webサイトのリポジトリです。

## 🌐 公開URL
https://2026nsfproject.github.io/nsf.stki.org/index.html
---

## 🛠️ 技術スタック & 共通仕様
* **フロントエンド:** HTML5 / CSS3
* **CSSフレームワーク:** [Tailwind CSS v4](https://tailwindcss.com/) (CDN経由で導入)
* **フォント:** Noto Sans JP (Google Fonts)
* **デザインルール:** * 背景・ベース: `bg-slate-50` / `text-slate-800`
  * メイン・アクセントカラー: 鮮やかなブルー（`bg-blue-600` / `text-blue-600`）
  * テキスト強調: `font-black` (Noto Sans JPの太字特性を活かした力強いウエイト)

---

## 📁 フォルダ構成とファイル役割

```text
├── index.html        # トップページ（Vision、OUR GOAL、活動概要、インスタ連携）
├── about.html        # 団体概要ページ（団体目標、6期代表挨拶、応援メッセージ）
├── projects.html     # プロジェクト一覧（各活動への導線ページ）
├── hatenaki.html     # 果てなき復興プロジェクト（メインページ）
├── fukushima.html    # FUKUSHIMA 2026（果てなき復興PJ・福島編特設サイト）
├── umaimon.html      # 能登うまいもん再発見プロジェクト
├── mamoneru.html     # Mamoneruプロジェクト
├── mamomizu.html     # Mamomizuプロジェクト
├── survival.html     # survival Academyプロジェクト
├── bifrost.html      # NSF Bifröst
├── apply.html        # メンバー加入・応募用ページ
├── contact.html      # お問い合わせページ
├── 新logo.jpg         # 共通ヘッダー等で使用する組織ロゴ
├── NSF_.JPG          # 各ページのメインビジュアル（ヒーローエリア）背景画像
├── IMG_1413.jpg      # 公式マスコット「えぬくま」画像
└── photo/            # 各ページの掲載写真・顔写真格納用フォルダ
    ├── representative.png  # 6期代表・高野怜生 氏 写真
    ├── sakai.jpg           # 坂井学 氏 写真
    └── komaba.jpg          # 馳浩 氏 写真
📢 更新・編集時の重要ルール（広報局・PL向け）
1. 共通ヘッダー・フッターの統一
メニュー構成の変更（例：新規プロジェクトの追加や削除）を行う場合は、すべてのHTMLファイルの <header> および <footer> のコードを同時に書き換えて統一してください。

⚠️ 注意: 「全国生徒会防災サミット」は管轄変更に伴い、全メニューから削除済みです。今後復活させたり別の外部連携を入れたりする場合を除き、追加しないでください。

2. レスポンシブ対応（スマホ・PC表示）
レイアウトは基本的にスマホ環境での縦並びスクロール（写真→テキスト→ボタン）をベースとし、PC画面（md: や lg: クラス）で崩れないよう検証してください。

応援メッセージ等の顔写真は、顔が見えやすくなるよう w-24 h-24（約100px四方）のサイズ指定を維持してください。

3. 写真のフォールバック設定
about.html などの応援メッセージエリアには、画像ファイルが万が一読み込めなかった場合（パスミスや削除時）に、自動でグレーのSVGアイコンに切り替わるCSSクラス（.avatar-box）が組まれています。写真の差し替え時は画像タグがこのクラス内にあることを確認してください。

📝 開発・編集フロー
各PLから「情報提供フォーム」で集約されたテキストや素材を回収する。

ローカル環境で対象のHTML（例：umaimon.html等）のテキストや画像パスを書き換える。

ブラウザでスマートフォン表示・PC表示の崩れがないか目視でデバッグする。

変更分をGitHubにプッシュ（またはアップロード）し、本番環境に反映させる。

© 2026 NSF PROJECTs. All Rights Reserved.
