# NSF PROJECTs 公式ウェブサイト

全国の中高生が手を取り合い、未来のための防災アクションを起こす「NSF PROJECTs」の公式ホームページのソースコードです。
本プロジェクトは、管理のしやすさの改善と表示速度向上のため、モダンなフレームワークへの移行・最適化が行われています。

- **本番サイトURL**: https://nsf.stki.org/
---

## 🛠️ 技術スタック / 仕様

- **フレームワーク**: Astro
- **CSS**: Tailwind CSS
- **フォント**: Google Fonts (Noto Sans JP)
- **外部データ連携**:
  - **公式Note**: Astroのビルド時（サーバーサイド）に直接RSSフィード（XML）を取得・解析し、HTMLへ完全同期して出力（100%の表示保証と爆速化を実現）。
  - **Instagram**: Behold widget による自動埋め込み。

---

## 💻 開発環境の立ち上げ

GitHub Codespaces などのターミナルで以下を実行します。

### 1. 依存関係のインストール
```bash
npm install
