/*
 * イベント名、ブース、スタンプ、景品などの差し替えはこのファイルで行えます。
 * QRコードに設定する値は各ブースの qrValue です。
 */
window.MINI_APP_CONFIG = {
  brand: {
    name: "FUJIFILM",
    eventName: "FUJIFILM PHOTO EXPERIENCE 2026",
    shortEventName: "PHOTO EXPERIENCE 2026",
  },

  theme: {
    primary: "#e60012",
    primaryStrong: "#b5000e",
    ink: "#151515",
    muted: "#6d6d6d",
    background: "#f2f2ef",
    surface: "#ffffff",
  },

  welcome: {
    eyebrow: "CAMERA STAMP RALLY",
    title: "カメラと出会う、\n4つのブースをめぐろう。",
    description: "会場内の対象ブースでQRコードを読み取って、かわいいカメラスタンプを集めよう。すべて集めるとイベント限定アイテムをプレゼント！",
    eventDate: "2026.08.22 SAT — 23 SUN",
    venue: "FUJIFILM PHOTO EXPERIENCE 会場",
    startLabel: "スタンプラリーをはじめる",
  },

  rally: {
    totalLabel: "全4ブース",
    progressTitle: "STAMP COLLECTION",
    completeMessage: "すべてのカメラと出会いました！",
    scanButton: "QRコードを読み取る",
    mapTitle: "BOOTH GUIDE",
    mapDescription: "番号順でなくても、好きなブースから回れます。",
  },

  booths: [
    {
      id: "xh2",
      number: "01",
      zone: "X SERIES",
      name: "X-H2",
      boothName: "ACTION STUDIO",
      description: "高解像とスピード感のある撮影を体験",
      location: "Aホール・入口右手",
      image: "./assets/camera-xh2.png",
      stampColor: "#ffb8ae",
      accentColor: "#c82e25",
      stampTitle: "アクションカメラ",
      stampStyle: "burst",
      qrValue: "FUJIFILM-STAMP:xh2",
    },
    {
      id: "xs20",
      number: "02",
      zone: "X SERIES",
      name: "X-S20",
      boothName: "TRAVEL & VLOG",
      description: "軽やかな旅とVlog撮影を体験",
      location: "Aホール・中央",
      image: "./assets/camera-xs20.jpg",
      stampColor: "#aee2cc",
      accentColor: "#23735c",
      stampTitle: "トラベルカメラ",
      stampStyle: "ticket",
      qrValue: "FUJIFILM-STAMP:xs20",
    },
    {
      id: "gfx100ii",
      number: "03",
      zone: "GFX SERIES",
      name: "GFX100 II",
      boothName: "PRO PORTRAIT",
      description: "最高峰の立体感とポートレート撮影を体験",
      location: "Bホール・入口左手",
      image: "./assets/camera-gfx100ii.jpg",
      stampColor: "#c8c2ec",
      accentColor: "#4d4388",
      stampTitle: "プロフェッショナル",
      stampStyle: "square",
      qrValue: "FUJIFILM-STAMP:gfx100ii",
    },
    {
      id: "instax-mini-12",
      number: "04",
      zone: "instax™",
      name: "mini 12",
      boothName: "COLORFUL PRINT",
      description: "パステルカラーのチェキプリントを体験",
      location: "Bホール・中央",
      image: "./assets/instax-mini-12.png",
      stampColor: "#b9dcf4",
      accentColor: "#3979a5",
      stampTitle: "ふんわりチェキ",
      stampStyle: "flower",
      qrValue: "FUJIFILM-STAMP:instax-mini-12",
    },
  ],

  completion: {
    eyebrow: "ALL STAMPS COMPLETE!",
    title: "コンプリート！",
    description: "4つのブースをめぐって、4種類のカメラスタンプを集めました。",
    instruction: "景品交換カウンターで、スタッフに次の画面を見せてください。",
    buttonLabel: "景品交換画面を表示する",
  },

  reward: {
    eyebrow: "EVENT REWARD",
    title: "イベント限定\nカメラステッカーセット",
    description: "スタンプラリー達成特典",
    counter: "景品交換カウンター",
    staffInstruction: "この画面をスタッフにお見せください",
    caution: "交換操作はスタッフが行います。ご自身では押さないでください。",
    staffButton: "スタッフの方が操作してください",
    confirmTitle: "景品をお渡ししますか？",
    confirmDescription: "交換済みにすると元に戻せません。景品をお渡ししてから操作してください。",
    exchangeButton: "景品をお渡しして交換済みにする",
    exchangedTitle: "交換済み",
    exchangedDescription: "景品のお渡しが完了しました",
  },
};



