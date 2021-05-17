export const path: Array<{ label: string; options: Array<{ disabled: boolean; path: string; label: string }> }> = [
  { label: 'ホーム', options: [{ disabled: false, path: '/', label: 'ホーム' }] },
  {
    label: '練習について',
    options: [
      { disabled: false, path: '/practice', label: '練習について' },
      { disabled: false, path: '/practice/source', label: '参考音源' },
      { disabled: false, path: '/practice/history', label: '練習の記録' },
    ],
  },
  {
    label: '事務局からのお知らせ',
    options: [
      { disabled: false, path: '/manager', label: '事務局からのお知らせ' },
      { disabled: true, path: '/manager/selection', label: '選曲アンケート' },
      { disabled: true, path: '/manager/selection/add', label: '候補曲を投稿する' },
      { disabled: true, path: '/manager/selection/edit/:id', label: '曲情報を編集する(候補曲詳細)' },
      { disabled: true, path: '/manager/selection/detail/:id', label: '候補曲詳細' },
    ],
  },
  {
    label: '会員専用掲示板',
    options: [
      { disabled: true, path: '/bbs', label: '会員専用掲示板' },
      { disabled: true, path: '/bbs/post', label: '書き込む' },
    ],
  },
  {
    label: 'ログイン画面',
    options: [
      { disabled: false, path: '/reg', label: '登録画面' },
      { disabled: false, path: '/login', label: 'ログイン画面' },
    ],
  },
  {
    label: 'アーカイブ',
    options: [
      { disabled: false, path: '/archive', label: 'アーカイブ' },
      { disabled: false, path: '/archive/overview/:id', label: 'アーカイブ詳細' },
      { disabled: false, path: '/archive/photo/:id', label: '写真' },
      { disabled: false, path: '/archive/video/:id', label: '映像' },
      { disabled: false, path: '/archive/video/:id/:track', label: '映像 トラック指定' },
    ],
  },
  {
    label: 'ウィンズスコア',
    options: [
      { disabled: false, path: '/score', label: 'ウィンズスコア' },
      { disabled: false, path: '/score/detail/:id', label: '楽譜詳細情報' },
      { disabled: false, path: '/score/box', label: '楽譜管理箱' },
    ],
  },
  {
    label: '設定',
    options: [
      { disabled: false, path: '/setting', label: '設定' },
      { disabled: false, path: '/setting/name', label: '名前の変更' },
      { disabled: false, path: '/setting/email', label: 'メールアドレスの設定' },
      { disabled: false, path: '/setting/valid/:key', label: 'メールアドレスの認証' },
      { disabled: false, path: '/setting/password', label: 'パスワードの変更' },
      { disabled: false, path: '/setting/session', label: 'セッションの管理' },
      { disabled: false, path: '/setting/admin', label: '管理者の設定' },
      { disabled: false, path: '/setting/delete', label: 'アカウントの削除' },
      { disabled: true, path: '/setting/score', label: 'ウィンズスコアの設定' },
      { disabled: false, path: '/setting/score/admin', label: '楽譜管理者' },
      { disabled: false, path: '/setting/score/mail', label: 'CSV出力' },
      { disabled: false, path: '/setting/terms', label: 'ウィンズ会員規約' },
      { disabled: false, path: '/setting/about', label: 'このアプリについて' },
      { disabled: false, path: '/setting/license', label: 'ライセンス情報' },
    ],
  },
  {
    label: 'その他',
    options: [
      { disabled: true, path: '/cast', label: 'ライブ放送' },
      { disabled: true, path: '/record', label: 'ライブ録音' },
    ],
  },
]
