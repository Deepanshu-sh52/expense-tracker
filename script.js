const transaction=[
    {
        id:1,
        name:'salary',
        amount:-2123,
        date:new Date(),
        type:"expense"

    },
     {
        id:2,
        name:'haircut',
        amount:21,
        date:new Date(),
        type:"income"

    },
     {
        id:1,
        name:'concert ticket',
        amount:212,
        date:new Date(),
        type:"income"

    }
];
const formatter= new Intl.NumberFormat('en-In',{
    style:'currency',
    currency:'INR',
    signDisplay:'always',
});
const list=document.getElementById("transactionList");
const currentstate=document.querySelector('#currentstate');
function rendorList()
{
    list.innerHTML = "";
    if(transaction.length===0)
    {
        currentstate.textContent="No transaction";
        return;
    }
    transaction.forEach(function(transaction)
    {
        const li=document.createElement('li');
        li.innerHTML=`

           <div class="name">
           <h4>${transaction.name}</h4>
           <p>${new Date(transaction.date).toLocaleDateString()}</p>
           </div>

           <div class = "amount ${transaction.type}">
             <span>${formatter.format(transaction.amount)} </span>
           </div>

           <div class="action">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

           </div>
 
           `;


        list.appendChild(li);

    });
}
rendorList();