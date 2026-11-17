const products = [
  {id:'monstera',name:'Monstera Deliciosa',category:'Plants',price:18500,tag:'Bestseller',image:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80',description:'A sculptural tropical favourite for bright, indirect light.'},
  {id:'snake',name:'Snake Plant',category:'Plants',price:12000,tag:'Easy care',image:'https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=700&q=80',description:'Resilient, architectural greenery for modern spaces.'},
  {id:'pothos',name:'Golden Pothos',category:'Plants',price:8500,tag:'Beginner friendly',image:'https://images.unsplash.com/photo-1597055181300-e3633a917c7d?auto=format&fit=crop&w=700&q=80',description:'Trailing foliage that brings softness to any corner.'},
  {id:'ceramic',name:'Textured Ceramic Pot',category:'Pots',price:14500,tag:'Hand-finished',image:'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80',description:'A tactile neutral planter with a timeless silhouette.'},
  {id:'terracotta',name:'Terracotta Planter',category:'Pots',price:9500,tag:'Natural clay',image:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80',description:'Breathable clay for healthy roots and warm styling.'},
  {id:'soil',name:'Organic Potting Mix',category:'Garden Care',price:6500,tag:'Root essentials',image:'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80',description:'A nourishing growing medium for everyday planting.'},
  {id:'watering',name:'Brass Watering Can',category:'Tools',price:22000,tag:'Garden edit',image:'https://images.unsplash.com/photo-1599685315640-7ec6a9d7c4c4?auto=format&fit=crop&w=700&q=80',description:'A considered tool that looks beautiful on display.'},
  {id:'shears',name:'Pruning Shears',category:'Tools',price:11000,tag:'Made to last',image:'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=700&q=80',description:'A reliable essential for keeping plants in shape.'}
];

const money = amount => new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(amount);
function readCart(){
  try {
    const saved=JSON.parse(localStorage.getItem('erogarden-cart')||'{}');
    return saved && typeof saved==='object' && !Array.isArray(saved) ? saved : {};
  } catch { return {}; }
}
const state={filter:'All',cart:readCart()};
const grid=document.getElementById('productGrid');
const cartPanel=document.getElementById('cart');
const profilePanel=document.getElementById('profile');
let toastTimer;
let lastFocused=null;

function notify(message){
  const el=document.getElementById('toast');
  el.textContent=message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),2200);
}

function renderProducts(){
  const visible=products.filter(p=>state.filter==='All'||p.category===state.filter);
  grid.innerHTML=visible.map(p=>(
    '<article class="product-card">'+
      '<div class="product-media">'+
        '<img src="'+p.image+'" alt="'+p.name+'" loading="lazy" decoding="async" sizes="(min-width:1024px) 22vw, (min-width:640px) 30vw, 48vw" onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80\'">'+
        '<span class="product-tag">'+p.tag+'</span>'+
      '</div>'+
      '<div class="product-info">'+
        '<p class="product-category">'+p.category+'</p>'+
        '<h3 class="product-name">'+p.name+'</h3>'+
        '<p class="product-price">'+money(p.price)+'</p>'+
        '<button class="add-to-cart" type="button" data-add="'+p.id+'" aria-label="Add '+p.name+' to cart"><span aria-hidden="true">＋</span> Add to cart</button>'+
      '</div>'+
    '</article>'
  )).join('');
}

function count(){
  return Object.values(state.cart).reduce((n,q)=>n+(Number(q)||0),0);
}

function persist(){
  try { localStorage.setItem('erogarden-cart',JSON.stringify(state.cart)); }
  catch(error){ console.warn('Cart could not be saved on this device:',error); }
  renderCart();
}

function renderCart(){
  const qty=count();
  document.getElementById('headerCartCount').textContent=qty;
  document.getElementById('bottomCartCount').textContent=qty;
  const lines=products.filter(p=>Number(state.cart[p.id])>0);
  document.getElementById('cartItems').innerHTML=lines.length?lines.map(p=>(
    '<article class="flex gap-3 border-b border-[#DCDDD5] pb-3">'+
      '<img src="'+p.image+'" alt="" class="h-20 w-20 object-cover" loading="lazy">'+
      '<div class="min-w-0 flex-1">'+
        '<h3 class="text-sm font-semibold">'+p.name+'</h3>'+
        '<p class="mt-1 text-sm font-bold text-sage">'+money(p.price)+'</p>'+
        '<div class="mt-2 flex items-center gap-2">'+
          '<button class="quantity-btn" type="button" data-qty="'+p.id+'" data-delta="-1" aria-label="Decrease '+p.name+' quantity">−</button>'+
          '<span class="min-w-5 text-center text-xs font-semibold">'+state.cart[p.id]+'</span>'+
          '<button class="quantity-btn" type="button" data-qty="'+p.id+'" data-delta="1" aria-label="Increase '+p.name+' quantity">＋</button>'+
          '<button class="ml-auto min-h-[40px] px-2 text-[11px] text-red-800" type="button" data-remove="'+p.id+'">Remove</button>'+
        '</div>'+
      '</div>'+
    '</article>'
  )).join(''):'<div class="py-12 text-center"><span class="font-display text-4xl text-sage">erogarden</span><p class="mt-3 font-semibold">Your cart is taking root</p><p class="mt-1 text-xs text-muted">Add something lovely to get started.</p></div>';

  const total=lines.reduce((sum,p)=>sum+p.price*Number(state.cart[p.id]),0);
  document.getElementById('cartSubtotal').textContent=money(total);
  const orderText=lines.map(p=>p.name+' × '+state.cart[p.id]+' — '+money(p.price*Number(state.cart[p.id]))).join('\n');
  const checkout=document.getElementById('checkoutBtn');
  checkout.href=lines.length?'https://wa.me/?text='+encodeURIComponent('Hello Erogarden Global, I would like to place an order:\n'+orderText+'\nSubtotal: '+money(total)+'\nPlease confirm availability and delivery.'):'#';
  checkout.classList.toggle('opacity-50',!lines.length);
  checkout.setAttribute('aria-disabled',String(!lines.length));
}

function openPanel(panel){
  lastFocused=document.activeElement;
  panel.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  const closeButton=panel.querySelector('button[aria-label^="Close"]');
  if(closeButton)closeButton.focus({preventScroll:true});
}
function closePanel(panel){
  panel.classList.add('hidden');
  if(cartPanel.classList.contains('hidden')&&profilePanel.classList.contains('hidden'))document.body.classList.remove('overflow-hidden');
  if(lastFocused&&typeof lastFocused.focus==='function')lastFocused.focus({preventScroll:true});
}

grid.addEventListener('click',event=>{
  const button=event.target.closest('[data-add]');
  if(!button)return;
  const id=button.dataset.add;
  state.cart[id]=(Number(state.cart[id])||0)+1;
  persist();
  button.innerHTML='<span aria-hidden="true">✓</span> Added';
  notify('Added to your cart');
  window.setTimeout(()=>{if(button.isConnected)button.innerHTML='<span aria-hidden="true">＋</span> Add to cart'},900);
});

document.addEventListener('click',event=>{
  const filter=event.target.closest('[data-filter]');
  if(filter){
    state.filter=filter.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button===filter)));
    renderProducts();
  }
  const shortcut=event.target.closest('[data-category]');
  if(shortcut){
    state.filter=shortcut.dataset.category;
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===state.filter)));
    renderProducts();
    document.getElementById('marketplace').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  const quantityButton=event.target.closest('[data-qty]');
  if(quantityButton){
    const id=quantityButton.dataset.qty;
    state.cart[id]=(Number(state.cart[id])||0)+Number(quantityButton.dataset.delta);
    if(state.cart[id]<=0)delete state.cart[id];
    persist();
  }
  const removeButton=event.target.closest('[data-remove]');
  if(removeButton){delete state.cart[removeButton.dataset.remove];persist();}
});

document.getElementById('headerCart').addEventListener('click',()=>openPanel(cartPanel));
document.querySelector('[data-nav="cart"]').addEventListener('click',event=>{event.preventDefault();openPanel(cartPanel)});
document.querySelector('[data-nav="profile"]').addEventListener('click',event=>{event.preventDefault();openPanel(profilePanel)});
document.getElementById('closeCart').addEventListener('click',()=>closePanel(cartPanel));
document.getElementById('closeProfile').addEventListener('click',()=>closePanel(profilePanel));
[cartPanel,profilePanel].forEach(panel=>panel.addEventListener('click',event=>{if(event.target===panel)closePanel(panel)}));
document.getElementById('profileServices').addEventListener('click',()=>closePanel(profilePanel));
document.getElementById('checkoutBtn').addEventListener('click',event=>{if(!count())event.preventDefault()});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    if(!cartPanel.classList.contains('hidden'))closePanel(cartPanel);
    if(!profilePanel.classList.contains('hidden'))closePanel(profilePanel);
  }
});
document.getElementById('year').textContent=new Date().getFullYear();

const navLinks=[...document.querySelectorAll('[data-nav]')];
const sections=['home','marketplace','services','philosophy'];
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    navLinks.forEach(link=>link.removeAttribute('aria-current'));
    const active=navLinks.find(link=>link.dataset.nav===entry.target.id);
    if(active)active.setAttribute('aria-current','page');
    else document.querySelector('[data-nav="marketplace"]').setAttribute('aria-current','page');
  }),{rootMargin:'-25% 0px -65% 0px'});
  sections.forEach(id=>{const section=document.getElementById(id);if(section)observer.observe(section)});
}

let deferredPrompt;
const installButton=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredPrompt=event;
  installButton.classList.remove('hidden');
});
installButton.addEventListener('click',async()=>{
  if(!deferredPrompt)return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt=null;
  installButton.classList.add('hidden');
});
window.addEventListener('appinstalled',()=>notify('Erogarden added to your home screen'));
if('serviceWorker' in navigator&&location.protocol.startsWith('http')){
  window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(error=>console.warn('Service worker registration failed:',error)));
}

renderProducts();
renderCart();