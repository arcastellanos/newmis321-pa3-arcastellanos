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
      Songs.reverse();
      createTable();
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

    
    let th4 = document.createElement('TH')
    th4.width = 200
    th4.appendChild(document.createTextNode('Date'))
    tr.appendChild(th4)

    let th5 = document.createElement('TH')
    th5.width = 400
    th5.appendChild(document.createTextNode(''))
    tr.appendChild(th5)
    
    Songs.forEach((song)=>{
        if(song.deleted == true){return;}
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
        
        
        let td4 = document.createElement('TD')
        td4.width = 100
        td4.appendChild(document.createTextNode(`${song.dateAdded}`))
        
        tr.appendChild(td4)
        


        let newBut = document.createElement('button')
        newBut.setAttribute("onclick", `EditSong('${song.id}')`)
        newBut.style = 'margin: 15px; padding: 10px; height: 40px'
        newBut.textContent = "Edit"
        
        tr.appendChild(newBut)

        let newBut1 = document.createElement('button')
        newBut1.setAttribute("onclick", `FavoriteSong('${song.id}')`)
        newBut1.style = 'margin: 10px; padding: 10px; height: 40px'
        newBut1.textContent = "Favorite"
        
        tr.appendChild(newBut1)
        let newBut2 = document.createElement('button')
        newBut2.setAttribute("onclick", `DeleteSong('${song.id}')`)
        newBut2.style = 'margin: 20px; padding: 10px; height: 40px'
        newBut2.textContent = "Delete"

        
        tr.appendChild(newBut2)
        

    })
    
    app.appendChild(table)
}

async function EditSong(id){
    let newSong = 2
    let date = new Date()
    date = date.toLocaleDateString('en-us')
    let localArtist = document.getElementById("editArtist").value
    let localTitle = document.getElementById("editTitle").value
    for(let i = 0; i < Songs.length; i++){
        if(Songs[i].id == id){
            console.log(Songs[i].title)
            newSong = {
                id : Songs[i].id,
                artist : localArtist,
                title : localTitle,
                dateAdded : Songs[i].dateAdded,
                deleted : Songs[i].deleted,
                favorited : Songs[i].favorited
            }
        }
    }
    console.log(newSong.artist)

    await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify(newSong),
    });
    location.reload();
    handleOnLoad()
}



async function DeleteSong(id){
    let newSong = 2
    let date = new Date()
    date = date.toLocaleDateString('en-us')

    for(let i = 0; i < Songs.length; i++){
        if(Songs[i].id == id){
            newSong = {
            id : Songs[i].id,
            title : Songs[i].title,
            artist : Songs[i].artist,
            dateAdded : Songs[i].dateAdded,
            deleted : true,
            favorited : Songs[i].favorited
            }
            
        }
    }
    console.log(newSong.title)
    await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify(newSong),
    });
    location.reload();
    handleOnLoad()
}

async function FavoriteSong(id){
    let newSong = 2
    let date = new Date()
    date = date.toLocaleDateString('en-us')

    for(let i = 0; i < Songs.length; i++){
        if(Songs[i].id == id){
            newSong = {
                id : Songs[i].id,
                title : Songs[i].title,
                artist : Songs[i].artist,
                dateAdded : Songs[i].dateAdded,
                deleted : Songs[i].deleted,
                favorited : !Songs[i].favorited
            }

        }
    }
    
    await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify(newSong),
      });    
      location.reload();
      handleOnLoad()
}

document.querySelector('#Song').addEventListener('submit', function(e){
    e.preventDefault()
    let date = new Date()
    date = date.toLocaleDateString('en-us')
    let song ={
        Title: e.target.elements.Title.value, 
        Artist: e.target.elements.Artist.value, 
        Favorited: false, 
        Deleted: false, 
        DateAdded: date
    }
    fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify(song),
      });
    location.reload()
    handleOnLoad()
    //addRow(song)
    e.target.elements.Title.value = ''
    e.target.elements.Artist.value = ''
})

