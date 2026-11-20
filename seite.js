(function(){
  // Filter auf der Reisen-Seite
  var chips = document.querySelectorAll(".chip");
  var grid = document.getElementById("grid");
  if (chips.length && grid) {
    var empty = document.querySelector(".empty");
    function setze(f){
      chips.forEach(function(c){ c.setAttribute("aria-pressed", String(c.dataset.f === f)); });
      var n = 0;
      grid.querySelectorAll(".card").forEach(function(k){
        var an = f === "Alle" || k.dataset.thema === f;
        k.hidden = !an; if (an) n++;
      });
      if (empty) empty.hidden = n > 0;
    }
    chips.forEach(function(c){ c.addEventListener("click", function(){ setze(c.dataset.f); }); });
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (h) chips.forEach(function(c){ if (c.dataset.f === h) setze(h); });
  }

  // Anfrageformular: baut den Text, den man per Mail schickt
  var form = document.getElementById("anfrage");
  if (!form) return;
  var q = new URLSearchParams(location.search);
  if (q.get("reise")) form.elements.reise.value = q.get("reise");
  if (q.get("termin")) form.elements.termin.value = q.get("termin");
  var out = document.getElementById("out"), text = document.getElementById("out-text");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var name = form.elements.name.value.trim(), mail = form.elements.mail.value.trim();
    var ok = name && /.+@.+\..+/.test(mail);
    document.getElementById("f-err").hidden = !!ok;
    if (!ok) return;
    var sel = form.elements.reise;
    var reise = sel.value ? sel.options[sel.selectedIndex].text : "noch offen";
    var body = "Hallo Ron,\n\nich interessiere mich für: " + reise +
      (form.elements.termin.value.trim() ? "\nTermin: " + form.elements.termin.value.trim() : "") +
      "\nPersonen: " + form.elements.personen.value +
      (form.elements.text.value.trim() ? "\n\n" + form.elements.text.value.trim() : "") +
      "\n\nViele Grüße\n" + name + "\n" + mail;
    text.textContent = body;
    document.getElementById("mailto").href = "mailto:ron@perduss.media?subject=" + encodeURIComponent("Anfrage: " + reise) + "&body=" + encodeURIComponent(body);
    out.hidden = false;
    out.scrollIntoView({block:"nearest"});
  });
  document.getElementById("copy").addEventListener("click", function(){
    var fertig = function(){ document.getElementById("copied").hidden = false; };
    try {
      navigator.clipboard.writeText(text.textContent).then(fertig, function(){ waehle(); });
    } catch (e) { waehle(); }
    function waehle(){ var r = document.createRange(); r.selectNodeContents(text); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  });
})();

document.querySelectorAll('.clip video').forEach(function(v,_,a){v.addEventListener('play',function(){a.forEach(function(o){if(o!==v)o.pause()})})});
