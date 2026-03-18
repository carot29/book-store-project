var home = document.getElementById("main_screen");
var add = document.getElementById("add_book");
var low = document.getElementById("low_stock");
var table = document.getElementById("inv");
var inven = document.getElementById("Inv");
var dest;
home.style.display = "None";
add.style.display = "none";
low.style.display = "none";
inven.style.display = "none";

document.getElementById("start").addEventListener("click", started);

function started() {
    document.getElementById("homescreen").style.display = "none";
    home.style.display = "block";
    add.style.display = "none";
    low.style.display = "none";
    inven.style.display = "none";
}

document.getElementById("add_book_btn").addEventListener("click", add_a_book);

function add_a_book() {
    home.style.display = "none";
    add.style.display = "block";
}

document.getElementById("add_book_btn2").addEventListener("click", new_stock);

function new_stock() {
    var title = document.getElementById("title").value.trim();
    var genre = document.getElementById("genre").value.trim();
    var author = document.getElementById("author").value.trim();
    var stock = document.getElementById("stock").value.trim();

    if (stock <= 0) {
        stock = 0;
    }

    if (stock < 3) {
        stock = stock + "Ⓛ";
    }

    if (title == "" || genre == "" || author == "" || stock == "") {
        alert("error. Please input something in all boxes");
        return;
    }



    var newRow = table.insertRow(-1);

    newRow.classList.add("data_row");

    newRow.insertCell(0).textContent = title;
    newRow.insertCell(1).textContent = genre;
    newRow.insertCell(2).textContent = author;
    newRow.insertCell(3).textContent = stock;
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.getElementById("par").innerHTML = "new book(s) added! check the inventory to see it";

    add.style.display = 'none';
    home.style.display = 'block';

}

document.getElementById("inv_btn").addEventListener("click", show_inv);

function show_inv() {
    home.style.display = "none";
    inven.style.display = "block";
    document.getElementById("par").innerHTML = "";
}


function filterTable() {
    // 1. Get the search text and convert to lowercase
    const filter = document.getElementById("search_inpt").value.toLowerCase();
    const rows = table.getElementsByClassName("data_row");

    // 2. Loop through all table rows
    for (let i = 0; i < rows.length; i++) {
        const rowText = rows[i].textContent.toLowerCase();
        
        // 3. If the row contains the search text, show it; otherwise, hide it
        if (rowText.includes(filter)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

document.getElementById("back_btn").addEventListener("click", back);

function back() {
   const Search = document.getElementById("search_inpt");
    Search.value = "";
    // 2. Manually trigger a "change" or "input" event 
    // This makes sure your search code knows the data is gone
    Search.dispatchEvent(new Event('input'));
    Search.dispatchEvent(new Event('change'));
    started();
}

document.getElementById("stock_btn").addEventListener("click", low_stock);

function low_stock() {
    home.style.display = "none";
    low.style.display = "block";

    var lowStockTable = document.getElementById("tbl2");
    dest = lowStockTable.querySelector('tbody');
    
    // 2. Clear previous entries
    dest.innerHTML = "";

    // 3. Loop through the main table (the one your other functions use)
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];

        // Skip the header row (Title, Author, etc.)
        if (row.parentNode.tagName === 'THEAD' || i === 0) continue;

        let stockCell = row.cells[3]; // 4th column
        
        if (stockCell) {
            let stockValue = parseInt(stockCell.textContent.trim());

            if (!isNaN(stockValue) && stockValue < 3) {
                // 4. Clone and Append
                let newRow = row.cloneNode(true);
                dest.appendChild(newRow);
            }
        }
    }
}    
// 5. Address the "Out of place" issue
// Only show this table if we actually found low stock
if (dest.rows.length > 0) {
    lowStockTable.style.display = "table"; 
} 
else {
    lowStockTable.style.display = "none"; 
}   