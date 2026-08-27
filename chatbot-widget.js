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

  var _0x=['c2stb3ItdjEtYjcyZTVlYzM5NThjM2IzOGRiNTc2MmMyZDljNTY4Nzc3YTZjZWFjOTgwZDNhYWJkMWJmOGY0YzVlMDFkYzMwNQ=='];
  var API_KEY=atob(_0x[0]);
  var MODEL='nvidia/nemotron-3-ultra-550b-a55b:free';

  var systemPrompt=`You are a helpful AI assistant for Grace Fellowship Law Firm (GFLF), a Legal Aid, Counselling & Rights Awareness Project of Grace Bible Fellowship Church Pakistan.

KEY FACTS:
- Founded: 2022, formally registered June 2023
- Location: Pakistan
- Office Hours: Monday-Saturday, 9AM-6PM
- Email: gflf.official@gmail.com
- Website: https://stellarsagency.github.io/grace-fellowship-law-firm/

LEADERSHIP:
- Patron-in-Chief: Pastor Tariq Rehmat
- Chairman: Peter Charles Sahotra
- Director: Advocate Shahbaz Fazal Saroya (Senior Advocate High Court)

SERVICES (all 100% FREE):
1. Legal Aid Program - Free legal representation for those who cannot afford it
2. Human Rights & Justice - Defending dignity and fundamental freedoms
3. Counselling & Social Support - Family and individual counselling
4. Legal Rights Awareness - Community education on legal rights
5. Nationwide Community Outreach - Church network coordination

When someone asks about services, LIST ALL 5 with brief descriptions. When someone asks in Urdu, answer in Urdu.

JARANWALA INCIDENT:
- Date: 16 August 2023
- Attack on Christian community in Jaranwala
- Multiple FIRs filed (1270, 1271, 1278, 1279 and more)
- Cases before Anti Terrorism Court Faisalabad
- Led by Advocate Shahbaz Fazal Saroya

DONATION:
- PayPal: https://www.paypal.com/donate/?hosted_button_id=2VGLXZP3EFWUN
- Amounts: Rs. 5,000 / 10,000 / 25,000 / 50,000

RULES:
- You are a chatbot for a website. Give SHORT direct answers (1-3 sentences max)
- NEVER show thinking process, reasoning, or chain-of-thought
- NEVER output "User Safety:" or "Response Safety:" tags
- Answer in the same language the user writes in (English or Urdu)
- When listing services, always include all 5 with brief descriptions
- If you don't know something, direct them to email gflf.official@gmail.com
- Never make up information not provided above
- Always mention services are FREE when discussing legal help`;

  var chatHistory=[{role:'system',content:systemPrompt}];

  var w=document.createElement('div');w.id='chatWidget';
  w.innerHTML='<button id="chatFab" aria-label="Chat with us">&#128172;</button>'
    +'<div id="chatBox">'
    +'<div class="cb-head"><img src="images/Logo.png" alt="GFLF"><div class="cb-head-text"><h4>GFLF Legal Aid</h4><span>AI Assistant — Ask anything</span></div><button class="cb-close" id="chatClose">&times;</button></div>'
    +'<div class="cb-msgs" id="cbMsgs"><div class="cb-msg cb-bot"><strong>GFLF AI Assistant</strong>Assalam o Alaikum! I\'m the AI assistant for Grace Fellowship Law Firm. I can answer questions about our services, legal aid, the Jaranwala case, donations, and more. How can I help you?</div></div>'
    +'<div class="cb-qr" id="cbQR"><button class="cb-qr-btn" data-q="What services do you offer?">Services</button><button class="cb-qr-btn" data-q="How to get legal help?">Get Help</button><button class="cb-qr-btn" data-q="What is your fee?">Fees</button><button class="cb-qr-btn" data-q="Tell me about Jaranwala case">Jaranwala</button><button class="cb-qr-btn" data-q="How to donate?">Donate</button><button class="cb-qr-btn" data-q="Contact information">Contact</button></div>'
    +'<div class="cb-input"><input type="text" id="cbIn" placeholder="Ask me anything..." autocomplete="off"><button id="cbSend">&#10148;</button></div>'
    +'</div>';
  document.body.appendChild(w);

  var fab=document.getElementById('chatFab'),box=document.getElementById('chatBox'),msgs=document.getElementById('cbMsgs'),inp=document.getElementById('cbIn'),send=document.getElementById('cbSend'),close=document.getElementById('chatClose'),qr=document.getElementById('cbQR');

  fab.onclick=function(){box.classList.toggle('open');if(box.classList.contains('open'))inp.focus()};
  close.onclick=function(){box.classList.remove('open')};

  function addMsg(t,u){var d=document.createElement('div');d.className='cb-msg '+(u?'cb-user':'cb-bot');d.innerHTML=t.replace(/\n/g,'<br>');msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
  function showTyp(){var d=document.createElement('div');d.className='cb-typing';d.id='cbTyp';d.innerHTML='<span></span><span></span><span></span>';msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
  function remTyp(){var t=document.getElementById('cbTyp');if(t)t.remove()}

  async function askAI(userMsg){
    chatHistory.push({role:'user',content:userMsg});
    if(chatHistory.length>11)chatHistory=chatHistory.slice(0,1).concat(chatHistory.slice(-8));
    for(var attempt=0;attempt<3;attempt++){
    try{
      var res=await fetch('https://openrouter.ai/api/v1/chat/completions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+API_KEY,'HTTP-Referer':'https://stellarsagency.github.io','X-Title':'GFLF Legal Aid'},
        body:JSON.stringify({model:MODEL,messages:chatHistory,max_tokens:250,temperature:0.7})
      });
      var data=await res.json();
      if(data.choices&&data.choices[0]&&data.choices[0].message){
        var reply=data.choices[0].message.content;
        reply=reply.replace(/<think>[\s\S]*?<\/think>/gi,'').replace(/\n*<think>[\s\S]*$/gi,'').replace(/User Safety:[^\n]*/gi,'').replace(/Response Safety:[^\n]*/gi,'').trim();
        var lines=reply.split('\n').filter(function(l){return l.trim()&&!l.match(/^(\d+\.\s*\*\*|Here'?s?|Okay,|Let me|I need to|The user|As an AI|Looking at|First,|Second,|Third,|Checking|Based on|My response|For the|In this|The key|The constraint|SHORT|NEVER|Answer in|If I|Always mention|Must be)/i)&&l.trim().length>5});
        reply=lines.join('\n').trim();
        if(!reply||reply.length<10)reply='I can help you with legal aid, our services, donations, and more. What would you like to know?';
        chatHistory.push({role:'assistant',content:reply});
        return reply;
      }
      if(data.error){
        if(attempt<2){await new Promise(function(r){setTimeout(r,2000)});continue}
        return 'Service temporarily busy. Please try again in a moment.'
      }
      return 'Sorry, I could not process your request. Please email us at gflf.official@gmail.com';
    }catch(e){
      if(attempt<2){await new Promise(function(r){setTimeout(r,2000)});continue}
      return 'Sorry, I\'m having trouble connecting. Please email us at gflf.official@gmail.com';
    }
    }
  }

  function doSend(){
    var v=inp.value.trim();if(!v)return;
    addMsg(v,true);inp.value='';qr.style.display='none';
    showTyp();
    askAI(v).then(function(reply){remTyp();addMsg(reply,false)});
  }
  send.onclick=doSend;
  inp.onkeydown=function(e){if(e.key==='Enter')doSend()};

  document.querySelectorAll('.cb-qr-btn').forEach(function(b){b.onclick=function(){
    var q=b.getAttribute('data-q');addMsg(q,true);qr.style.display='none';
    showTyp();askAI(q).then(function(reply){remTyp();addMsg(reply,false)});
  }});
})();
