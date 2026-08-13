(function () {
  "use strict";
  const config = window.MINI_APP_CONFIG;
  const app = document.getElementById("app");
  const KEY = "fujifilm-event-survey-v2";
  const saved = read();
  const state = { screen: saved.screen || "welcome", step: saved.step || 0, answers: saved.answers || {}, error: "" };
  const steps = [{ id:"favoriteCamera", type:"camera", kicker:"FAVORITE CAMERA", title:"今日いちばん気に入ったカメラはどれですか？" }, ...config.questions];

  render();
  app.addEventListener("click", onClick);
  app.addEventListener("change", onChange);
  app.addEventListener("input", onInput);

  function read() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (_) { return {}; } }
  function save() { localStorage.setItem(KEY, JSON.stringify({ screen:state.screen, step:state.step, answers:state.answers })); }
  function esc(value) { return String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function cameraById(id) { return config.cameras.find(camera => camera.id === id); }
  function image(camera, className="") { return `<img class="product-image ${className}" src="${esc(camera.image)}" alt="${esc(camera.name)} 実機商品画像" />`; }
  function header(back=false) { return `<header class="header"><button class="header-side" data-action="${back ? "back" : ""}" aria-label="${back ? "戻る" : ""}">${back ? "‹" : ""}</button><div><b>FUJIFILM</b><span>${esc(config.brand.eventName)}</span></div><button class="header-side" data-action="${back ? "pause" : ""}" aria-label="${back ? "中断" : ""}">${back ? "×" : ""}</button></header>`; }

  function render() {
    if (state.screen === "complete") app.innerHTML = complete();
    else if (state.screen === "survey") app.innerHTML = survey();
    else app.innerHTML = welcome();
  }

  function welcome() {
    const hero = config.cameras[0];
    return `<main class="screen welcome">${header()}<section class="hero"><div class="hero-words"><span>COLOR</span><span>LIGHT</span><span>MOMENT</span></div>${image(hero,"hero-camera")}<i></i></section><section class="welcome-copy"><p class="kicker">EVENT SURVEY</p><h1>今日出会った、<br>お気に入りの一台を<br>教えてください。</h1><p>本日はご来場いただき、ありがとうございます。会場で体験したカメラやイベントについて率直なご感想をお聞かせください。</p><div class="facts"><span>◷ 回答時間：約3分</span><span>✓ 回答は自動保存</span></div><button class="primary" data-action="start">アンケートに回答する <b>→</b></button><small>回答内容は、今後の商品・イベント改善のために利用します。</small></section></main>`;
  }

  function survey() {
    if (state.step >= steps.length) return review();
    const item = steps[state.step];
    const pct = ((state.step + 1) / steps.length) * 100;
    return `<main class="screen survey">${header(true)}<div class="progress"><b>${String(state.step + 1).padStart(2,"0")} / ${String(steps.length).padStart(2,"0")}</b><span><i style="width:${pct}%"></i></span></div><section class="question"><div class="question-title"><p class="kicker">${esc(item.kicker)}</p><h1>${esc(item.title)}</h1>${item.help ? `<p>${esc(item.help)}</p>` : ""}<em>${item.optional ? "任意" : "必須"}</em></div>${answer(item)}${state.error ? `<p class="error">${esc(state.error)}</p>` : ""}</section><footer><button class="primary" data-action="next" ${valid(item) ? "" : "disabled"}>${state.step === steps.length - 1 ? "回答内容を確認する" : "次へ"} <b>→</b></button></footer></main>`;
  }

  function answer(item) {
    const value = state.answers[item.id];
    if (item.type === "camera") return `<div class="camera-grid">${config.cameras.map(camera => `<button class="camera-card ${value === camera.id ? "selected" : ""}" data-camera="${esc(camera.id)}"><i>✓</i><span>${image(camera)}</span><small>${esc(camera.series)}</small><strong>${esc(camera.name)}</strong></button>`).join("")}</div>`;
    if (item.type === "multi") {
      const list = Array.isArray(value) ? value : [];
      return `<div class="choice-grid">${item.options.map(option => choice(item, option, list.includes(option), true)).join("")}</div>${item.max ? `<p class="count">${list.length} / ${item.max} 選択中</p>` : ""}`;
    }
    if (item.type === "single") return `<div class="choice-list">${item.options.map(option => choice(item, option, value === option, false)).join("")}</div>`;
    if (item.type === "rating") return `<div class="rating">${[1,2,3,4,5].map(n => `<button class="${n <= Number(value || 0) ? "on" : ""}" data-rating="${n}" aria-label="${n}点">★<small>${n}</small></button>`).join("")}<div><span>期待に届かなかった</span><span>とても満足</span></div></div>`;
    if (item.type === "profile") {
      const profile = value || {};
      return `<div class="profile"><label>年代 <b>必須</b><select data-profile="age"><option value="">選択してください</option>${item.ages.map(x => `<option ${profile.age === x ? "selected" : ""}>${esc(x)}</option>`).join("")}</select></label><label>どなたと来場しましたか？ <b>必須</b><select data-profile="visit"><option value="">選択してください</option>${item.visits.map(x => `<option ${profile.visit === x ? "selected" : ""}>${esc(x)}</option>`).join("")}</select></label><label class="check"><input type="checkbox" data-profile="updates" ${profile.updates ? "checked" : ""}><span>イベントや新製品のお知らせをLINEで受け取る（任意）</span></label></div>`;
    }
    return `<label class="textarea"><textarea maxlength="300" data-text="comment" placeholder="例：フィルムシミュレーションを比較できるコーナーが楽しかったです。">${esc(value || "")}</textarea><small><b data-count>${String(value || "").length}</b> / 300</small></label>`;
  }

  function choice(item, option, selected, multi) { return `<button class="choice ${selected ? "selected" : ""}" data-choice="${esc(option)}" data-q="${esc(item.id)}" data-multi="${multi}"><i>${selected ? "✓" : ""}</i><span>${esc(option)}</span></button>`; }
  function valid(item) {
    const value = state.answers[item.id];
    if (item.optional) return true;
    if (item.type === "multi") return Array.isArray(value) && value.length > 0;
    if (item.type === "profile") return Boolean(value && value.age && value.visit);
    return value !== undefined && value !== null && value !== "";
  }

  function review() {
    const camera = cameraById(state.answers.favoriteCamera);
    return `<main class="screen survey">${header(true)}<div class="progress"><b>CONFIRM</b><span><i style="width:100%"></i></span></div><section class="question review"><div class="question-title"><p class="kicker">REVIEW YOUR ANSWERS</p><h1>回答内容をご確認ください。</h1><p>修正する場合は「変更」を押してください。</p></div><div class="review-list"><article>${camera ? image(camera) : ""}<div><small>お気に入りのカメラ</small><strong>${esc(camera?.name || "未回答")}</strong></div><button data-edit="0">変更</button></article>${config.questions.map((q,i) => reviewRow(q,i+1)).join("")}</div></section><footer><button class="primary" data-action="submit">この内容で送信する <b>→</b></button></footer></main>`;
  }

  function reviewRow(q, step) {
    let value = state.answers[q.id];
    if (Array.isArray(value)) value = value.join("、");
    else if (q.type === "rating" && value) value = `★ ${value} / 5`;
    else if (q.type === "profile") value = value ? [value.age,value.visit,value.updates ? "お知らせを受け取る" : ""].filter(Boolean).join(" / ") : "";
    return `<article><div><small>${esc(q.title)}</small><strong>${esc(value || "回答なし")}</strong></div><button data-edit="${step}">変更</button></article>`;
  }

  function complete() {
    const camera = cameraById(state.answers.favoriteCamera) || config.cameras[0];
    return `<main class="screen complete">${header()}<section><div class="complete-check">✓</div><p class="kicker">THANK YOU</p><h1>ご回答ありがとうございました。</h1><p>いただいた声を、これからの商品やイベント体験づくりに活かしてまいります。</p></section><article class="favorite">${image(camera)}<div><small>YOUR FAVORITE</small><strong>${esc(camera.name)}</strong><p>${esc(camera.note)}</p></div></article><button class="text-button" data-action="restart">最初から回答し直す</button></main>`;
  }

  function onClick(event) {
    const camera = event.target.closest("[data-camera]");
    if (camera) { state.answers.favoriteCamera = camera.dataset.camera; state.error=""; save(); render(); return; }
    const choiceButton = event.target.closest("[data-choice]");
    if (choiceButton) {
      const q = config.questions.find(x => x.id === choiceButton.dataset.q);
      if (choiceButton.dataset.multi === "true") {
        const list = Array.isArray(state.answers[q.id]) ? [...state.answers[q.id]] : [];
        const at = list.indexOf(choiceButton.dataset.choice);
        if (at >= 0) list.splice(at,1); else if (!q.max || list.length < q.max) list.push(choiceButton.dataset.choice);
        state.answers[q.id] = list;
      } else state.answers[q.id] = choiceButton.dataset.choice;
      state.error=""; save(); render(); return;
    }
    const rating = event.target.closest("[data-rating]");
    if (rating) { state.answers.satisfaction = Number(rating.dataset.rating); save(); render(); return; }
    const edit = event.target.closest("[data-edit]");
    if (edit) { state.step=Number(edit.dataset.edit); save(); render(); window.scrollTo(0,0); return; }
    const action = event.target.closest("[data-action]");
    if (!action || !action.dataset.action) return;
    if (action.dataset.action === "start") { state.screen="survey"; save(); render(); }
    if (action.dataset.action === "pause") { state.screen="welcome"; save(); render(); }
    if (action.dataset.action === "back") { if (state.step > 0) state.step--; else state.screen="welcome"; save(); render(); window.scrollTo(0,0); }
    if (action.dataset.action === "next") { const item=steps[state.step]; if (!valid(item)) { state.error="回答を選択してください。"; render(); return; } state.step++; state.error=""; save(); render(); window.scrollTo(0,0); }
    if (action.dataset.action === "submit") { state.screen="complete"; save(); render(); window.scrollTo(0,0); }
    if (action.dataset.action === "restart") { localStorage.removeItem(KEY); state.screen="welcome"; state.step=0; state.answers={}; render(); }
  }

  function onChange(event) {
    const field = event.target.closest("[data-profile]");
    if (!field) return;
    const profile = state.answers.profile || {};
    profile[field.dataset.profile] = field.type === "checkbox" ? field.checked : field.value;
    state.answers.profile = profile; save(); render();
  }
  function onInput(event) {
    const textarea = event.target.closest("[data-text]");
    if (!textarea) return;
    state.answers.comment = textarea.value; save();
    const count = textarea.parentElement.querySelector("[data-count]"); if (count) count.textContent = textarea.value.length;
  }
})();
