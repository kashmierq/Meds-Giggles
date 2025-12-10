document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [
    { id:1, name:"Biogesic", price:120, qty:1, img:"https://via.placeholder.com/150" },
    { id:2, name:"Vitamin C", price:95, qty:2, img:"https://via.placeholder.com/150" }
  ];

  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutForm = document.getElementById("checkout-form");
  const confirmBtn = document.getElementById("confirm-order");
  const cancelBtn = document.getElementById("cancel-order");
  const successModal = document.getElementById("checkout-success");
  const closeSuccess = document.getElementById("close-success");

  function formatPHP(amount){ return "₱"+amount.toLocaleString("en-PH"); }

  function loadCart(){
    container.innerHTML="";
    if(cart.length===0){
      container.innerHTML=`<p class="text-center text-gray-600 col-span-full">Your cart is empty.</p>`;
      totalDisplay.textContent="₱0"; return;
    }

    cart.forEach((item,index)=>{
      const subtotal=item.price*item.qty;
      const div=document.createElement("div");
      div.className="flower-card bg-white p-5 rounded-xl shadow-soft border flex flex-col justify-between";
      div.innerHTML=`
        <div class="flex justify-between items-start mb-4">
          <input type="checkbox" class="checkout-checkbox mt-2" data-index="${index}" />
          <img src="${item.img}" class="w-full h-40 object-cover rounded-lg mb-4">
        </div>
        <h3 class="text-xl font-bold text-primary-green">${item.name}</h3>
        <p class="text-gray-700 mt-1">₱${item.price} x ${item.qty}</p>
        <div class="flex justify-between items-center mt-2">
          <div class="flex items-center gap-3">
            <button onclick="changeQty(${index},-1)" class="bg-accent-red text-white w-8 h-8 rounded-full">-</button>
            <span class="text-xl font-bold">${item.qty}</span>
            <button onclick="changeQty(${index},1)" class="bg-primary-green text-white w-8 h-8 rounded-full">+</button>
          </div>
          <p class="font-bold text-accent-red">₱${subtotal}</p>
        </div>
      `;
      container.appendChild(div);
    });

    document.querySelectorAll(".checkout-checkbox").forEach(cb => cb.addEventListener("change", updateSelectedTotal));
    updateSelectedTotal();
  }

  window.changeQty=(index,val)=>{
    cart[index].qty+=val;
    if(cart[index].qty<=0) cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();
  }

  function updateSelectedTotal(){
    const checkboxes=document.querySelectorAll(".checkout-checkbox");
    let total=0;
    checkboxes.forEach(cb=>{
      if(cb.checked){
        const idx=parseInt(cb.dataset.index);
        total+=cart[idx].price*cart[idx].qty;
      }
    });
    totalDisplay.textContent=formatPHP(total);
  }

  checkoutBtn.addEventListener("click", ()=>{
    const selected=document.querySelectorAll(".checkout-checkbox:checked");
    if(selected.length===0){ alert("Please select at least one item."); return; }
    checkoutForm.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", ()=> checkoutForm.classList.add("hidden"));

  confirmBtn.addEventListener("click", ()=>{
    const email=document.getElementById("cust-email").value.trim();
    const name=document.getElementById("cust-name").value.trim();
    const phone=document.getElementById("cust-phone").value.trim();
    const address=document.getElementById("cust-address").value.trim();
    const terms=document.getElementById("terms").checked;

    if(!email||!name||!phone||!address){ alert("Please fill all fields."); return; }
    if(!terms){ alert("You must accept the Terms & Conditions."); return; }

    const selected=document.querySelectorAll(".checkout-checkbox:checked");
    const selectedIndexes=Array.from(selected).map(cb=>parseInt(cb.dataset.index));

    cart=cart.filter((_,i)=>!selectedIndexes.includes(i));
    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();

    checkoutForm.classList.add("hidden");
    successModal.classList.remove("hidden");
  });

  closeSuccess.addEventListener("click", ()=> successModal.classList.add("hidden"));

  loadCart();
});
