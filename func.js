function init()
{
    let newDiv=document.createElement("div");
    newDiv.classList.add("newDiv");
    newDiv.textContent="enter your JSON: ";
    let inputBox=document.createElement("input");
    inputBox.type = "text"; // Set input type to text
    let okButton=document.createElement("button");
    okButton.textContent="OK"
    okButton.addEventListener("click",function(){
        let input=inputBox.value;
        okButtonPress(input);
    });
    newDiv.appendChild(inputBox);
    newDiv.appendChild(okButton);
    let mainDiv=document.querySelector(".main");
    mainDiv.appendChild(newDiv);
}
function sort(a){
    // Separate arrays into two groups based on length
    const smallArrays = [];
    const largeArrays = [];
    for (const subArr of a) {
        if (subArr.length <= 2) {
            smallArrays.push(subArr);
        } else {
            largeArrays.push(subArr);
        }
    }
    // Update original array with rearranged elements
    a.length = 0; // Clear the original array
    a.push(...smallArrays, ...largeArrays); // Push small arrays first, then large arrays
}
function statistics(s) {
    const words = s.split(" "); // Split the string into an array of words
    const wordCounts = {}; // Object to store word occurrences

    // Count occurrences of each word
    for (const word of words) {
        if (wordCounts[word]) {
            wordCounts[word]++;
        } else {
            wordCounts[word] = 1;
        }
    }

    return wordCounts;
}
function okButtonPress(input)
{
    let data = JSON.parse(input);
    let countries = data.countries;
    let table = document.createElement('table');
    table.classList.add("tableDiv");
    //create the first row:
    let headerRow=document.createElement('tr');
    let headers=['Name','Population','Capital','Currency'];
    headers.forEach(headerName => {
        const th= document.createElement('th');
        th.textContent=headerName;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    countries.forEach(countrie =>{
        let tableRow= document.createElement('tr')
        Object.values(countrie).forEach(value=>{
            const tableData=document.createElement('td');
            tableData.textContent=value;
            tableRow.appendChild(tableData);    
        });    
        table.appendChild(tableRow)
    });
    const main=document.querySelector('.main');
    main.appendChild(table);
    // // Calculate statistics
    let currencyStats = getCurrenciesStats(countries);

    // Create paragraph element for statistics
    let paragraph = document.createElement('p');
    paragraph.textContent = `The number of countries is: ${countries.length} and ${currencyStats.eur || 0} of them are using eur.`;
    main.appendChild(paragraph);
}
function getCurrenciesStats(countries) {
    const currencyStats = {};
    let eurCount = 0; // Variable to count occurrences of "eur"
    
    countries.forEach(country => {
        const currency = country.currency;
        if (currencyStats[currency]) {
            currencyStats[currency]++;
        } else {
            currencyStats[currency] = 1;
        }

        // Check if currency is "eur" and increment the count
        if (currency.toLowerCase() === 'eur') {
            eurCount++;
        }
    });

    // Add the "eur" count to the currencyStats object
    currencyStats['eur'] = eurCount;

    return currencyStats;
}