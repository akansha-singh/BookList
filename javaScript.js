// Book Constructor      // this will create the actual book object
function Book(title,author,isbn){
 this.title = title;
 this.author = author;
 this.isbn = isbn;
}
// UI Constructor        // set the prototypes methods to doo things like adding and deletion of the book
function UI(){}

// Add Book to List
 UI.prototype.addBookToList = function(book){         //we are passing book object in the function
 const list = document.getElementById('book-list');
 // Create tr element
 const row = document.createElement('tr');
 // Insert cols
 row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete" >X</td>
 `;
 list.appendChild(row);
}
// show alert (function)
UI.prototype.showAlert = function(message,className){
 // create div
 const div = document.createElement('div');
 // add class
 div.className = `alert ${className}`;  // ??
 // Add text  ( by making a text node and append to div)
 div.appendChild(document.createTextNode(message));
 // Get parent
 const container = document.querySelector('.container');
 // Get form
 const form = document.querySelector('#book-form');
 // Inset alert
 container.insertBefore(div,form);
//Timeout after 3 sec
setTimeout(function(){
 document.querySelector('.alert').remove();
},3000);
}

// Delete book prototype(this contain function)
UI.prototype.deleteBook = function(target){
 if(target.className === 'delete'){
   target.parentElement.parentElement.remove();
 }

}

// clear fields (function)
UI.prototype.clearFields = function(){
 document.getElementById('title').value = '';
 document.getElementById('author').value = '';
 document.getElementById('isbn').value = '';
}






// Event Listeners to add book
document.getElementById('book-form').addEventListener('submit',function(e){
 // Get form values
 const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value   // don't use comma here

 // Instantiate book
 const book = new Book(title,author,isbn);   // object constructor and the name of this object is book

 //Instantiate UI
 const ui = new UI();
// console.log(ui);  will give you all ui constructors


// Validate
if(title === '' || author === '' || isbn === ''){
 // error alert
 ui.showAlert('Please fill in all fields','error')   // here we are calling showAlert function
} else{
  // Add book to list
  ui.addBookToList(book);    // calling of function

 // Show success
 ui.showAlert('Book Added!','success');

 // clear fields
 ui.clearFields();
}
 e.preventDefault();
});


// Event listener to delete book
document.getElementById('book-list').addEventListener('click',function(e){
//Instantiate UI
 const ui = new UI();

// delete book
ui.deleteBook(e.target);  // ?? what is e.target

// show message
ui.showAlert('Book removed!','success');

e.preventDefault();
})