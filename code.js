function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function render_items(items) {
  // find the div container
  var container = document.getElementById('items');
  // empty it from any existing html
  container.innerHTML = null;
  // prepare the list of items
  var list = document.createElement('ul');
  // for each item, append a child element to the list
  for (var i = 0; i < items.length; i++) {
    // prepare the delete link
    var delete_link = document.createElement('a');
    delete_link.setAttribute('href', '#');
    delete_link.appendChild(document.createTextNode('del'));
    // prepare the child element
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(items[i] + ' [ '));
    li.appendChild(delete_link);
    li.appendChild(document.createTextNode(' ]'));
    // add it to the list
    list.appendChild(li);
  }
  // append the list to the div container
  container.appendChild(list);
}

console.log('HTML5 Storage supported: ' + supports_html5_storage());

if (supports_html5_storage()) {

  // retrieve the local storage list of items if any
  var db = {};

  // set up the array of items
  db.items = [];
  
  // assign an event to the submit button
  var submit_button = document.getElementById('new-item-submit');
  
  submit_button.onclick = function(e) {
    // make sure we do not submit the form
    e.preventDefault();
    // get the value from the text field
    var new_item = document.getElementById('new-item');
    console.log('New item value: ' + new_item.value);
    // push it to the current list of items
    db.items.push(new_item.value);
    // clear the field
    new_item.value = '';
    // re-render the list of items
    render_items(db.items);
  };

}