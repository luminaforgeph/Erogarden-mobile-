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
const state = {filter:'All',cart:JSON.parse(localStorage.getItem('erogarden-cart')||'{}')};
const grid = document.getElementById('productGrid');
const cartPanel = document.getElementById('cart');
const profilePanel = document.getElementById('profile');
let toastTimer;
function notify(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
function renderProducts(){
  const visible=products.filter(p=>state.filter==='All'||p.category===state.filter);
  grid.innerHTML=visible.map(p=>`<article class="product-card group">
    <div class="relative aspect-[4/4.2] bg-stone-100"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80'"><span class="absolute left-2 top-2 bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-forest">${p.tag}</span></div>
    <div class="p-3"><p class="text-[9px] font-bold uppercase tracking-[.15em] text-muted">${p.category}</p><h3 class="mt-1 line-clamp-2 min-h-10 text-sm font-semibold">${p.name}</h3><p class="mt-1 text-sm font-bold text-forest">${money(p.price)}</p><button class="add-to-cart mt-3 flex w-full items-center justify-center gap-2 bg-forest px-3 text-xs font-bold text-white transition hover:bg-[#20382f]" data-add="${p.id}"><span>＋</span> Add to cart</button></div>
  </article>`).join('');
}
function persist(){localStorage.setItem('erogarden-cart',JSON.stringify(state.cart));renderCart()}
function count(){return Object.values(state.cart).reduce((n,q)=>n+q,0)}
function renderCart(){
  const qty=count();document.getElementById('headerCartCount').textContent=qty;document.getElementById('bottomCartCount').textContent=qty;
  const lines=products.filter(p=>state.cart[p.id]);
  document.getElementById('cartItems').innerHTML=lines.length?lines.map(p=>`<article class="flex gap-3 border-b border-stone-200 pb-3"><img src="${p.image}" alt="" class="h-20 w-20 object-cover"><div class="min-w-0 flex-1"><h3 class="text-sm font-semibold">${p.name}</h3><p class="mt-1 text-sm font-bold text-forest">${money(p.price)}</p><div class="mt-2 flex items-center gap-3"><button class="quantity-btn grid min-h-[32px] min-w-[32px] place-items-center border border-stone-300" data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span class="text-xs font-semibold">${state.cart[p.id]}</span><button class="quantity-btn grid min-h-[32px] min-w-[32px] place-items-center border border-stone-300" data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">＋</button><button class="ml-auto text-[11px] text-red-700" data-remove="${p.id}">Remove</button></div></div></article>`).join(''):'<div class="py-12 text-center"><span class="text-4xl">🪴</span><p class="mt-3 font-semibold">Your cart is taking root</p><p class="mt-1 text-xs text-muted">Add something lovely to get started.</p></div>';
  const total=lines.reduce((sum,p)=>sum+p.price*state.cart[p.id],0);document.getElementById('cartSubtotal').textContent=money(total);
  const text=lines.map(p=>`${p.name} × ${state.cart[p.id]} — ${money(p.price*state.cart[p.id])}`).join('\n');
  const checkout=document.getElementById('checkoutBtn');checkout.href=lines.length?'https://wa.me/?text='+encodeURIComponent('Hello Erogarden Global, I would like to place an order:\n'+text+'\nSubtotal: '+money(total)+'\nPlease confirm availability and delivery.'): '#';
  checkout.classList.toggle('opacity-50',!lines.length);checkout.setAttribute('aria-disabled',String(!lines.length));
}
function openPanel(panel){panel.classList.remove('hidden');document.body.classList.add('overflow-hidden')}
function closePanel(panel){panel.classList.add('hidden');if(cartPanel.classList.contains('hidden')&&profilePanel.classList.contains('hidden'))document.body.classList.remove('overflow-hidden')}
grid.addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(!btn)return;const id=btn.dataset.add;state.cart[id]=(state.cart[id]||0)+1;persist();notify('Added to your cart')});
document.addEventListener('click',e=>{
  const filter=e.target.closest('[data-filter]');if(filter){state.filter=filter.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));renderProducts()}
  const shortcut=e.target.closest('[data-category]');if(shortcut){state.filter=shortcut.dataset.category;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===state.filter)));renderProducts();document.getElementById('marketplace').scrollIntoView({behavior:'smooth'})}
  const qty=e.target.closest('[data-qty]');if(qty){const id=qty.dataset.qty;state.cart[id]=(state.cart[id]||0)+Number(qty.dataset.delta);if(state.cart[id]<=0)delete state.cart[id];persist()}
  const remove=e.target.closest('[data-remove]');if(remove){delete state.cart[remove.dataset.remove];persist()}
});
document.getElementById('headerCart').addEventListener('click',()=>openPanel(cartPanel));
document.querySelector('[data-nav="cart"]').addEventListener('click',e=>{e.preventDefault();openPanel(cartPanel)});
document.querySelector('[data-nav="profile"]').addEventListener('click',e=>{e.preventDefault();openPanel(profilePanel)});
document.getElementById('closeCart').addEventListener('click',()=>closePanel(cartPanel));
document.getElementById('closeProfile').addEventListener('click',()=>closePanel(profilePanel));
[cartPanel,profilePanel].forEach(panel=>panel.addEventListener('click',e=>{if(e.target===panel)closePanel(panel)}));
document.getElementById('profileServices').addEventListener('click',()=>closePanel(profilePanel));
document.getElementById('checkoutBtn').addEventListener('click',e=>{if(!count())e.preventDefault()});
document.getElementById('year').textContent=new Date().getFullYear();
const navLinks=[...document.querySelectorAll('[data-nav]')];
const sections=['home','marketplace','services'];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.removeAttribute('aria-current'));const active=navLinks.find(a=>a.dataset.nav===entry.target.id);if(active)active.setAttribute('aria-current','page');else document.querySelector('[data-nav="marketplace"]').setAttribute('aria-current','page')} }),{rootMargin:'-25% 0px -65% 0px'});sections.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)})}
let deferredPrompt;const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.classList.remove('hidden')});
installBtn.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.classList.add('hidden')});
window.addEventListener('appinstalled',()=>notify('Erogarden added to your home screen'));
if('serviceWorker' in navigator && location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(err=>console.warn('Service worker registration failed:',err)));
renderProducts();renderCart();