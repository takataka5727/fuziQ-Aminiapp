window.MINI_APP_CONFIG = {
  brand: { name: "FUJIFILM", eventName: "PHOTO EXPERIENCE 2026" },
  liff: {
    id: "2011094337-1TOiUQpw",
    url: "https://liff.line.me/2011094337-1TOiUQpw"
  },
  cameras: [
    { id:"x100vi", series:"X Series", name:"X100VI", image:"./assets/camera-x100vi.jpg", note:"毎日を作品に変える、プレミアムコンパクト" },
    { id:"xt5", series:"X Series", name:"X-T5", image:"./assets/camera-xt5.jpg", note:"写真を撮る歓びを、クラシックな操作感で" },
    { id:"xh2", series:"X Series", name:"X-H2", image:"./assets/camera-xh2.png", note:"高解像で静止画も映像も妥協しない" },
    { id:"xs20", series:"X Series", name:"X-S20", image:"./assets/camera-xs20.jpg", note:"軽やかに持ち歩ける旅のオールラウンダー" },
    { id:"xm5", series:"X Series", name:"X-M5", image:"./assets/camera-xm5.jpg", note:"小さなボディで表現はもっと自由に" },
    { id:"gfx100sii", series:"GFX Series", name:"GFX100S II", image:"./assets/camera-gfx100sii.jpg", note:"ラージフォーマットが描く圧倒的な立体感" },
    { id:"gfx100ii", series:"GFX Series", name:"GFX100 II", image:"./assets/camera-gfx100ii.jpg", note:"最高峰の画質と機動力をプロの手に" },
    { id:"mini-evo", series:"チェキ instax", name:"mini Evo", image:"./assets/instax-mini-evo.png", note:"撮る、選ぶ、プリントする楽しさを一台に" },
    { id:"mini-12", series:"チェキ instax", name:"mini 12", image:"./assets/instax-mini-12.png", note:"いつでも明るく、かわいく撮れるチェキ" },
    { id:"wide-evo", series:"チェキ instax", name:"WIDE Evo", image:"./assets/instax-wide-evo.png", note:"日常をワイドにダイナミックに残す" }
  ],
  questions: [
    { id:"reasons", type:"multi", kicker:"CAMERA IMPRESSION", title:"そのカメラを気に入った理由を教えてください。", help:"あてはまるものをすべて選んでください。", options:["デザイン・質感","画質・色表現","操作のしやすさ","サイズ・重さ","レンズの種類","動画性能","ファインダー","スタッフの説明"] },
    { id:"scenes", type:"multi", max:3, kicker:"YOUR PHOTOGRAPHY", title:"どんなシーンで使ってみたいですか？", help:"最大3つまで選べます。", options:["旅行・街歩き","家族・日常","ポートレート","風景・自然","スポーツ","ペット","動画・Vlog","仕事・作品制作"] },
    { id:"frequency", type:"single", kicker:"CAMERA EXPERIENCE", title:"普段、カメラでどのくらい撮影しますか？", options:["ほぼ毎日","週に1〜2回","月に数回","旅行やイベントのとき","ほとんど撮影しない"] },
    { id:"satisfaction", type:"rating", kicker:"EVENT EXPERIENCE", title:"本日のイベントはいかがでしたか？", help:"星の数で満足度を教えてください。" },
    { id:"highlights", type:"multi", kicker:"EVENT HIGHLIGHTS", title:"特に良かった体験を教えてください。", options:["実機のタッチ＆トライ","撮影体験コーナー","プリント体験","写真家のトーク","スタッフへの相談","展示・会場デザイン"] },
    { id:"intent", type:"single", kicker:"NEXT STEP", title:"気に入ったカメラを今後購入・検討したいですか？", options:["ぜひ購入したい","前向きに検討したい","もう少し情報を集めたい","今回は体験のみ","まだわからない"] },
    { id:"profile", type:"profile", kicker:"ABOUT YOU", title:"最後に、あなたについて教えてください。", ages:["10代","20代","30代","40代","50代","60代以上","回答しない"], visits:["ひとりで","家族と","友人・知人と","仕事関係で"] },
    { id:"comment", type:"textarea", optional:true, kicker:"YOUR VOICE", title:"ご意見・ご感想をお聞かせください。", help:"気になったことや、今後体験したい企画など自由にご記入ください。" }
  ]
};
