const apiurl = 'https://api.exchangerate-api.com/v4/latest/USD';
const form = document.getElementById('convertform');
const input = document.getElementById('Amount');
const result = document.getElementById('Result');
const basecurrency = document.getElementById('Basecurrency');
const targetcurrency = document.getElementById('Targetcurrency');

document.addEventListener('DOMContentLoaded', async() =>{
    
        try{
            const response = await fetch(apiurl);

        const data = await response.json();
        const currencies = Object.keys(data.rates);

    
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            option2.value = currency;
            option2.textContent = currency;
            basecurrency.appendChild(option1);
            targetcurrency.appendChild(option2);
        });
    } catch (error) {
        console.error('Error loading currencies:', error);
        alert('Failed to load currency options.');
    }
});
form.addEventListener('submit', async(event) =>{
    event.preventDefault();
    const amount = parseFloat(input.value);
    if(isNaN(amount) || amount<=0){
        alert("Invalid amount entered!");
        return;
    }
    const base = basecurrency.value;
    const target = targetcurrency.value;

    await convertcurrency(base,target,amount);
});

async function convertcurrency(base,target,amount) {
    try {
        const response = await fetch(apiurl + base);
        const data = await response.json();
        const rate = data.rates[target];
        if(!rate){
            alert('Rate not available!');
            return;
            
        }

        const convertedamount = rate*amount;
        result.textContent =  `${amount} ${base} = ${convertedamount} ${target}`;
        
        
    } catch (error) {
        console.error('Error converting currency:', error);
        alert('Failed to convert. Please try again.');
        
    }
    
}
