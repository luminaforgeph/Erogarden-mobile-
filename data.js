/* Erogarden's own product catalogue and future service taxonomy.
   Keep first-party products separate from independent provider listings. */
window.EROGARDEN_DATA = Object.freeze({
  whatsappNumber: "", // Add the verified international number, digits only, before launch.
  products: [
    {id:"monstera",name:"Monstera Deliciosa",category:"Plants",price:18500,tag:"Bestseller",image:"https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80",description:"A sculptural tropical favourite for bright, indirect light."},
    {id:"snake",name:"Snake Plant",category:"Plants",price:12000,tag:"Easy care",image:"https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=700&q=80",description:"Resilient, architectural greenery for modern spaces."},
    {id:"pothos",name:"Golden Pothos",category:"Plants",price:8500,tag:"Beginner friendly",image:"https://images.unsplash.com/photo-1597055181300-e3633a917c7d?auto=format&fit=crop&w=700&q=80",description:"Trailing foliage that brings softness to any corner."},
    {id:"ceramic",name:"Textured Ceramic Pot",category:"Pots",price:14500,tag:"Hand-finished",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",description:"A tactile neutral planter with a timeless silhouette."},
    {id:"terracotta",name:"Terracotta Planter",category:"Pots",price:9500,tag:"Natural clay",image:"https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80",description:"Breathable clay for healthy roots and warm styling."},
    {id:"soil",name:"Organic Potting Mix",category:"Garden Care",price:6500,tag:"Root essentials",image:"https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80",description:"A nourishing growing medium for everyday planting."},
    {id:"watering",name:"Brass Watering Can",category:"Tools",price:22000,tag:"Garden edit",image:"https://images.unsplash.com/photo-1599685315640-7ec6a9d7c4c4?auto=format&fit=crop&w=700&q=80",description:"A considered tool that looks beautiful on display."},
    {id:"shears",name:"Pruning Shears",category:"Tools",price:11000,tag:"Made to last",image:"https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=700&q=80",description:"A reliable essential for keeping plants in shape."}
  ],
  serviceCategories: [
    {id:"landscape-design",name:"Landscape design"},
    {id:"planting-installation",name:"Planting & installation"},
    {id:"garden-maintenance",name:"Garden maintenance"},
    {id:"fumigation",name:"Fumigation & pest care"},
    {id:"estate-gardening",name:"Estate gardening"}
  ]
});
