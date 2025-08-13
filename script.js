const transaction=[
    {
        id:1,
        name:'salary',
        amount:2123,
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

// variables
const list=document.getElementById("transactionList");
const currentstate=document.querySelector('#currentstate');
const form=document.querySelector('#transactionForm');
const balance=document.querySelector('#balance');
const expense=document.querySelector('#expense');
const income=document.querySelector('#income');

function UpdateTotal()
{
    const totolincome=transaction.filter(function(transaction){
        return transaction.type=="income"
    }).reduce(function(total,transaction){
          return total+transaction.amount
    },0)

    const totolexpense=transaction
    .filter(function(transaction){
        return transaction.type=="expense";
    })
    .reduce(function(total,transaction){
          return total+transaction.amount
    },0)


    const totalbalance=totolincome-totolexpense;

    balance.textContent=formatter.format(totalbalance);
    income.textContent=formatter.format(totolincome);
    expense.textContent=formatter.format(totolexpense*-1);
}

form.addEventListener('submit',addTransition);

function rendorList()
{
    list.innerHTML = "";
    if(transaction.length===0)
    {
        currentstate.textContent="No transaction";
        return;
    }
    else{
         currentstate.textContent="";
    }
    transaction.forEach(function(transaction)
    {
        const sign=('income'===(transaction.type))? 1 : -1;
        const li=document.createElement('li');
        li.innerHTML=`
           <div class="name">
           <h4>${transaction.name}</h4>
           <p>${new Date(transaction.date).toLocaleDateString()}</p>
           </div>

           <div class = "amount ${transaction.type}">
             <span>${formatter.format(transaction.amount*sign)} </span>
           </div>

           <div class="action">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransition(${transaction.id})">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          </div>
 
           `;
        list.appendChild(li);

    });
}
rendorList();
UpdateTotal();

function deleteTransition(id)
{
    alert("delete item")
    const index=transaction.findIndex(function(transaction){
       return transaction.id===id;
    })
    if(index !==-1)
    {
       transaction.splice(index,1);
    }
    rendorList();
    UpdateTotal();
}

function addTransition(e)
{
    e.preventDefault();
    const formData=new FormData(this);

    transaction.push({
        id: transaction.length + 1,
        name: formData.get("name"),
        amount:parseFloat(formData.get("amount")),
        date:new Date(formData.get("date")),
        type: "on"===formData.get("type") ? "income"  : "expense"
       });

    this.reset();

    rendorList();
    UpdateTotal();
}