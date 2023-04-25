//data gửi từ backEnd
function showHome(){
    //ở url này  với method get sẽ gửi về data từ backEnd
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
        },
        success: (products) => {
        console.log(products);
            let html = ``;
        products.forEach(item =>{
            html += `<h3 style="display: inline-block;"> ${item.id} - Price: ${item.price} - Name: ${item.name}</h3>
                     <button style="display: inline-block;" id="idDelete" value="${item.id}" onclick="deleteProduct()">Delete</button>
                     <button type="button"  style="display: inline-block;" id="idUpdate" onclick="showFormUpdate(${item.id})">Update</button><br>`
        })
            $('#body').html(html)
        }
    })
}

function showFormAdd(){
let htmlFormAdd = `
                   <input type="text" id="price" placeholder="price">
                   <input type="text" id="image" placeholder="image">
                   <input type="text" id="name" placeholder="name">
                   <input type="text" id="category" placeholder="category">
                   <button type="submit" onclick="add()">submit</button>`

    $('#body').html(htmlFormAdd)
}

//function ở trong btn add submit
//frontEnd gui len server 1 doi tuong bang phuong thuc post
function add(){
    let price = $('#price').val()
    let image = $('#image').val()
    let name = $('#name').val()
    let category = $('#category').val()
    let product = {
        name: name,
        price: price,
        image: image,
        category: category
    }
    console.log(product)
    //ở url này với method post sẽ gửi lên data từ frontend
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
        },
        //đối tượng XMLHttpRequest chỉ có thể gửi và nhận dữ liệu dưới dạng chuỗi, không thể trực tiếp truyền đối tượng JavaScript
        data: JSON.stringify(product),
        success: (message) => {
            console.log(message)
            showHome()
        }
    })
}
//frontEnd gui len 1 doi tuong bang phuong thuc delete
function deleteProduct(){
    let idDelete = $('#idDelete').val()
    let productToDelete = {
        idDelete:idDelete
    }
    console.log(productToDelete)
    $.ajax({
        type:'DELETE',
        url: 'http://localhost:3000/products',
        headers: {
            'Content-Type': 'application/json'
        },
        data:JSON.stringify(productToDelete),
        success: (message)=>{
            console.log(message);
            showHome()
        }
    })
}
// frontEnd gui len mot doi tuong day du cac truong (co ca id)

function showFormUpdate(id){
    //truyền một biến từ button update vào chỗ :id
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/${id}`,
        success: function(product) {
            console.log(product)
            let htmlFormUpdate = `
                   <input type="text" id="id" name="id" value="${product[0].id}">
                   <input type="text" id="price" name="price" value="${product[0].price}">
                   <input type="text" id="image" name="image" value="${product[0].image}">
                   <input type="text" id="name" name="name" value="${product[0].name}">
                   <input type="text" id="category" name="category" value="${product[0].category ? product[0].category.id : ''}">
                   <button type="submit" onclick="update(${product[0].id})">submit</button>`
            $('#body').html(htmlFormUpdate)
        }
    });
}

function update(){
    let id = $('#id').val();
    let price = $('#price').val();
    let image = $('#image').val();
    let name = $('#name').val();
    let category = $('#category').val();
    let productToUpdate = {
        id: id,
        name: name,
        price: price,
        image: image,
        category: category
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/products/${id}`,
        headers:{
            'Content-Type': 'application/json',
        },
        data:JSON.stringify(productToUpdate),
        success: (message)=>{
            console.log('message' + message)
            showHome()
        }
    })
}







