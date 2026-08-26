(function(){
  var css=document.createElement('style');
  css.textContent='#chatWidget{position:fixed;bottom:24px;right:24px;z-index:9999;font-family:"Source Sans 3",sans-serif}'
    +'#chatFab{width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#c9a84c,#b8942e);color:#3d0010;border:none;font-size:1.8rem;cursor:pointer;box-shadow:0 6px 24px rgba(201,168,76,.4);transition:all .3s;display:flex;align-items:center;justify-content:center}'
    +'#chatFab:hover{transform:scale(1.1);box-shadow:0 8px 32px rgba(201,168,76,.5)}'
    +'#chatBox{position:fixed;bottom:96px;right:24px;width:440px;max-width:calc(100vw - 48px);height:600px;max-height:calc(100vh - 140px);background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.2);display:none;flex-direction:column;overflow:hidden;border:1px solid #e0e0e0}'
    +'#chatBox.open{display:flex;animation:chatIn .3s ease}'
    +'@keyframes chatIn{from{opacity:0;transform:translateY(16px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}'
    +'.cb-head{background:linear-gradient(135deg,#3d0010,#5a0016);padding:14px 16px;display:flex;align-items:center;gap:12px;flex-shrink:0}'
    +'.cb-head img{width:36px;height:36px;border-radius:50%;border:2px solid #c9a84c}'
    +'.cb-head-text h4{font-family:"Playfair Display",serif;color:#fff;font-size:.92rem;margin:0}'
    +'.cb-head-text span{font-size:.7rem;color:#e0c878;display:flex;align-items:center;gap:4px}'
    +'.cb-head-text span::before{content:"";width:6px;height:6px;background:#4caf50;border-radius:50%}'
    +'.cb-close{margin-left:auto;background:none;border:none;color:#fff;font-size:1.3rem;cursor:pointer;opacity:.7;transition:opacity .3s}'
    +'.cb-close:hover{opacity:1}'
    +'.cb-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;background:#f8f7f4}'
    +'.cb-msg{max-width:82%;padding:10px 14px;border-radius:10px;font-size:.88rem;line-height:1.55;animation:cbIn .3s ease}'
    +'@keyframes cbIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}'
    +'.cb-bot{background:#fff;color:#222;border:1px solid #e0e0e0;align-self:flex-start;border-bottom-left-radius:2px}'
    +'.cb-user{background:#800020;color:#fff;align-self:flex-end;border-bottom-right-radius:2px}'
    +'.cb-bot strong{color:#800020;display:block;margin-bottom:3px;font-size:.82rem}'
    +'.cb-bot a{color:#800020;font-weight:700;text-decoration:underline}'
    +'.cb-qr{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px;flex-shrink:0}'
    +'.cb-qr-btn{padding:6px 14px;border:1.5px solid #c9a84c;border-radius:999px;background:transparent;color:#800020;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .3s;font-family:inherit}'
    +'.cb-qr-btn:hover{background:#c9a84c;color:#3d0010}'
    +'.cb-input{display:flex;gap:6px;padding:10px 12px;border-top:1px solid #e0e0e0;background:#fff;flex-shrink:0}'
    +'.cb-input input{flex:1;padding:10px 14px;border:1.5px solid #e0e0e0;border-radius:999px;font-size:.88rem;font-family:inherit;outline:none;transition:border-color .3s}'
    +'.cb-input input:focus{border-color:#c9a84c}'
    +'.cb-input button{width:44px;height:44px;border-radius:50%;background:#c9a84c;color:#3d0010;border:none;font-size:1.2rem;cursor:pointer;transition:all .3s;flex-shrink:0;display:flex;align-items:center;justify-content:center}'
    +'.cb-input button:hover{background:#800020;color:#fff}'
    +'.cb-typing{display:flex;gap:4px;padding:10px 14px;align-self:flex-start}'
    +'.cb-typing span{width:7px;height:7px;background:#c9a84c;border-radius:50%;animation:cbTyp 1.4s infinite}'
    +'.cb-typing span:nth-child(2){animation-delay:.2s}'
    +'.cb-typing span:nth-child(3){animation-delay:.4s}'
    +'@keyframes cbTyp{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}'
    +'@media(max-width:480px){#chatBox{right:12px;bottom:84px;width:calc(100vw - 24px);height:calc(100vh - 120px)}}';
  document.head.appendChild(css);

  var resp={
    "services":"We provide 5 core services:\n\n<strong>1. Legal Aid</strong> — Free legal representation\n<strong>2. Human Rights</strong> — Defending dignity & freedoms\n<strong>3. Counselling</strong> — Family & individual support\n<strong>4. Rights Awareness</strong> — Community education\n<strong>5. Outreach</strong> — Nationwide church network",
    "legal help":"To get free legal assistance:\n\n<strong>1.</strong> Email: gflf.official@gmail.com\n<strong>2.</strong> Call: Mon-Sat, 9AM-6PM\n<strong>3.</strong> Visit our <a href='contact.html'>Contact Page</a>\n\nWe review cases and provide free counsel.",
    "fee":"Our services are <strong>100% FREE</strong> for qualifying individuals. We do not charge for legal representation, counselling, or awareness programs.",
    "jaranwala":"We provide full legal aid for the <strong>Jaranwala incident (16 Aug 2023)</strong>. Multiple FIR cases before Anti Terrorism Court Faisalabad. Visit our <a href='jaranwala.html'>Jaranwala Page</a>.",
    "donate":"Support us via:\n<strong>PayPal:</strong> <a href='https://www.paypal.com/donate/?hosted_button_id=2VGLXZP3EFWUN' target='_blank'>Donate Now</a>\n<strong>Amounts:</strong> Rs. 5K / 10K / 25K / 50K",
    "contact":"<strong>Email:</strong> gflf.official@gmail.com\n<strong>Location:</strong> Pakistan\n<strong>Hours:</strong> Mon-Sat, 9AM-6PM\nVisit <a href='contact.html'>Contact Page</a>",
    "about":"A <strong>Legal Aid &amp; Counselling Project</strong> of Grace Bible Fellowship Church Pakistan. Since 2022, registered June 2023. <a href='about.html'>Learn More</a>",
    "leadership":"<strong>Patron:</strong> Pastor Tariq Rehmat\n<strong>Chairman:</strong> Peter Charles Sahotra\n<strong>Director:</strong> Advocate Shahbaz Fazal Saroya",
    "church":"A project of <strong>Grace Bible Fellowship Church Pakistan</strong>, working nationwide for legal aid and rights awareness.",
    "rights":"Every citizen has fundamental rights:\n• Right to life & liberty\n• Right to equality\n• Right to legal representation\n• Freedom of religion\nContact us if your rights are being violated.",
    "women":"We assist women with:\n• Domestic violence\n• Property disputes\n• Family law\n• Workplace harassment\n• Inheritance rights\nAll free. <a href='contact.html'>Contact us</a>.",
    "property":"We help with:\n• Property disputes\n• Inheritance claims\n• Land grabbing cases\n• Documentation",
    "thank":"You're welcome! Feel free to ask more questions.",
    "hello":"Wa Alaikum Assalam! How can I assist you today?",
    "hi":"Hello! How can I help you?"
  };

  function getResp(q){
    var l=q.toLowerCase().trim();
    var k=Object.keys(resp);
    for(var i=0;i<k.length;i++){if(l.indexOf(k[i])!==-1)return resp[k[i]]}
    if(l.match(/service|program|what do/))return resp.services;
    if(l.match(/help|assist|need|support/))return resp["legal help"];
    if(l.match(/cost|charge|price|fee|pay/))return resp.fee;
    if(l.match(/jaranwala|incident|attack/))return resp.jaranwala;
    if(l.match(/donat|support|give|contribut/))return resp.donate;
    if(l.match(/contact|email|phone|call|address/))return resp.contact;
    if(l.match(/about|who|what is gflf/))return resp.about;
    if(l.match(/leader|chairman|director|pastor/))return resp.leadership;
    if(l.match(/church|grace bible/))return resp.church;
    if(l.match(/right|constitution|freedom/))return resp.rights;
    if(l.match(/women|woman|wife|domestic|harass/))return resp.women;
    if(l.match(/property|land|house|plot|inheritance/))return resp.property;
    if(l.match(/thank|shukriya|jazak/))return resp.thank;
    if(l.match(/assalam|salam|hello|hi|hey/))return resp.hello;
    return "I'm not sure I understand. You can ask about:\n• Our <strong>services</strong>\n• How to get <strong>legal help</strong>\n• Our <strong>fees</strong>\n• The <strong>Jaranwala</strong> case\n• How to <strong>donate</strong>\n• <strong>Contact</strong> info";
  }

  var w=document.createElement('div');w.id='chatWidget';
  w.innerHTML='<button id="chatFab" aria-label="Chat with us">&#128172;</button>'
    +'<div id="chatBox">'
    +'<div class="cb-head"><img src="images/Logo.png" alt="GFLF"><div class="cb-head-text"><h4>GFLF Legal Aid</h4><span>Online — Ask a question</span></div><button class="cb-close" id="chatClose">&times;</button></div>'
    +'<div class="cb-msgs" id="cbMsgs"><div class="cb-msg cb-bot"><strong>Grace Fellowship Law Firm</strong>Assalam o Alaikum! Welcome to GFLF Legal Aid. How can I help you today?</div></div>'
    +'<div class="cb-qr" id="cbQR"><button class="cb-qr-btn" data-q="What services do you offer?">Services</button><button class="cb-qr-btn" data-q="How to get legal help?">Get Help</button><button class="cb-qr-btn" data-q="What is your fee?">Fees</button><button class="cb-qr-btn" data-q="Tell me about Jaranwala case">Jaranwala</button><button class="cb-qr-btn" data-q="How to donate?">Donate</button><button class="cb-qr-btn" data-q="Contact information">Contact</button></div>'
    +'<div class="cb-input"><input type="text" id="cbIn" placeholder="Type your question..." autocomplete="off"><button id="cbSend">&#10148;</button></div>'
    +'</div>';
  document.body.appendChild(w);

  var fab=document.getElementById('chatFab'),box=document.getElementById('chatBox'),msgs=document.getElementById('cbMsgs'),inp=document.getElementById('cbIn'),send=document.getElementById('cbSend'),close=document.getElementById('chatClose'),qr=document.getElementById('cbQR');

  fab.onclick=function(){box.classList.toggle('open');if(box.classList.contains('open'))inp.focus()};
  close.onclick=function(){box.classList.remove('open')};

  function addMsg(t,u){var d=document.createElement('div');d.className='cb-msg '+(u?'cb-user':'cb-bot');d.innerHTML=t.replace(/\n/g,'<br>');msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
  function showTyp(){var d=document.createElement('div');d.className='cb-typing';d.id='cbTyp';d.innerHTML='<span></span><span></span><span></span>';msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
  function remTyp(){var t=document.getElementById('cbTyp');if(t)t.remove()}

  function doSend(){var v=inp.value.trim();if(!v)return;addMsg(v,true);inp.value='';qr.style.display='none';showTyp();setTimeout(function(){remTyp();addMsg(getResp(v),false)},700+Math.random()*500)}
  send.onclick=doSend;
  inp.onkeydown=function(e){if(e.key==='Enter')doSend()};

  document.querySelectorAll('.cb-qr-btn').forEach(function(b){b.onclick=function(){var q=b.getAttribute('data-q');addMsg(q,true);qr.style.display='none';showTyp();setTimeout(function(){remTyp();addMsg(getResp(q),false)},700+Math.random()*500)}});
})();
