const url = "https://localhost:7001/api/songs";

let app = document.getElementById("app")
let Songs = []

function handleOnLoad(){
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log("test")
      Songs = data;
      console.log("test1")
      Songs.reverse();
      console.log("test2")
      createTable();
      console.log(Songs)
    });

}



function addRow(song)
{
    let tableBody = document.getElementById('songTableBody')
    let tr = document.createElement('TR')
    tableBody.appendChild(tr)
    
    let td1 = document.createElement('TD')
    td1.width = 200
    td1.appendChild(document.createTextNode(`${song.title}`))
    tr.appendChild(td1)
    
    let td2 = document.createElement('TD')
    td2.width = 100
    td2.appendChild(document.createTextNode(`${song.artist}`))
    tr.appendChild(td2)
    
    let td3 = document.createElement('TD')
    td3.width = 100
    td3.appendChild(document.createTextNode(`${song.favorited}`))
    tr.appendChild(td3)
    
    let td4 = document.createElement('TD')
    td4.width = 100
    td4.appendChild(document.createTextNode(`${song.deleted}`))
    tr.appendChild(td4)
    
    let td5 = document.createElement('TD')
    td5.width = 100
    td5.appendChild(document.createTextNode(`${song.dateAdded}`))
    tr.appendChild(td5)
    
    Songs.unshift(song)
    localStorage.setItem('mySongs', JSON.stringify(Songs))
    let table = document.getElementById('songTable')
    table.parentNode.removeChild(table)
    createTable()
    
}

function createTable()
{
    let table = document.createElement('TABLE')
    table.border = '1'
    table.id = 'songTable'
    let tableBody = document.createElement('TBODY')
    tableBody.id = 'songTableBody'
    table.appendChild(tableBody)
    
    
    let tr = document.createElement('TR')
    tableBody.appendChild(tr)
    
    let th1 = document.createElement('TH')
    th1.width = 200
    th1.appendChild(document.createTextNode('Title'))
    tr.appendChild(th1)
    
    let th2 = document.createElement('TH')
    th2.width = 200
    th2.appendChild(document.createTextNode('Artist'))
    tr.appendChild(th2)
    
    let th3 = document.createElement('TH')
    th3.width = 200
    th3.appendChild(document.createTextNode('Favorited'))
    tr.appendChild(th3)

    
    let th5 = document.createElement('TH')
    th5.width = 200
    th5.appendChild(document.createTextNode('Date'))
    tr.appendChild(th5)
    
    Songs.forEach((song)=>{
        let tr = document.createElement('TR')
        tableBody.appendChild(tr)
        
        let td1 = document.createElement('TD')
        td1.width = 300
        td1.appendChild(document.createTextNode(`${song.title}`))
        tr.appendChild(td1)
        
        let td2 = document.createElement('TD')
        td2.width = 100
        td2.appendChild(document.createTextNode(`${song.artist}`))
        tr.appendChild(td2)
        
        let td3 = document.createElement('TD')
        td3.width = 100
        td3.appendChild(document.createTextNode(`${song.favorited}`))
        tr.appendChild(td3)
        
        
        // let td4 = document.createElement('TD')
        // td4.width = 100
        // td4.appendChild(document.createTextNode(`${song.dateAdded}`))
        // <button onclick="editSong('${song.id}')" class="editbtn">edit</button>
        // tr.appendChild(td4)

        // let td5 = document.createElement('TD')
        // td5.width = 100
        // td5.appendChild(document.createTextNode(`${song.dateAdded}`))
        // <button onclick="editSong('${song.id}')" class="editbtn">edit</button>
        // tr.appendChild(td5)
    })
    
    app.appendChild(table)
}
async function editSong(){

}

document.querySelector('#Favorite').addEventListener('submit', function(e){
    e.preventDefault()
    let titleFavorite = e.target.elements.Title.value
    let Index = Songs.findIndex((obj=> obj.Title == titleFavorite && obj.Favorited == false)) 

    if(Index > -1){
        Songs[Index].Favorited = true
        }
        else{
            
            return
        }

          await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
              accept: "*/*",
              "content-type": "application/json",
            },
            body: JSON.stringify(song),
          });


    let table = document.getElementById('songTable')
    table.parentNode.removeChild(table)
    createTable()
    e.target.elements.Title.value = ''

})
document.querySelector('#Delete').addEventListener('submit', function(e){
    e.preventDefault()
    let titleDelete = e.target.elements.Title.value
    let Index = Songs.findIndex((obj=> obj.Title == titleDelete && obj.Deleted == false)) 

    if(Index > -1){
        Songs[Index].Deleted = true
        }
        else{
            
            return
        }
    localStorage.setItem('mySongs', JSON.stringify(Songs))
    let table = document.getElementById('songTable')
    table.parentNode.removeChild(table)
    createTable()
    e.target.elements.Title.value = ''

})

document.querySelector('#Song').addEventListener('submit', function(e){
    e.preventDefault()
    let currentDate = new Date().toJSON().slice(0,10)
    let song ={
        Title: e.target.elements.Title.value, 
        Artist: e.target.elements.Artist.value, 
        Favorited: false, 
        Deleted: false, 
        DateAdded: currentDate
    }
    await fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify(song),
      });
    handleOnLoad()
    addRow(song)
    e.target.elements.Title.value = ''
    e.target.elements.Artist.value = ''
})

let editButton = document.createElement('button')

editButton.classList.add("edit-Button")
dataRow.appendChild(editButton)

editButton.innerHTML = "Edit"

editButton.style.backgroundColor = 'blue'
editButton.addEventListener("click", function(){
let currID = song.id
let date = song.date
let favorited = song.favorited
let deleted = song.deleted

let newTitle = prompt("What should the title be?")
let newArtist = prompt("What should the artist be?") 
handleEdit(currID, date, favorited, deleted, newTitle, newArtist)
})