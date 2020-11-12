const charactersAPI = new APIHandler('http://localhost:8000/characters');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList().then((res) => {
      const data = res.data
      let listItems = '';
        data.forEach(character => {
          
            listItems += 
            `
            <div class="character-info">
                <div>ID: ${character.id}</div>
                <div>Name: ${character.name}</div>
                <div>Occupation: ${character.occupation}</div>
                <div>Weapon: ${character.weapon}</div>
                <div>Cartoon: ${character.cartoon}</div>
                <span class="float-right">
                    <button class="btn btn-danger" onclick="deleteCharacter(${character.id})">Delete</button>
                    <button class="btn btn-success" onclick="updateCharacter(${character.id})">Update</button>
                </span>
            </div>
           ` 
        });
        document.getElementById('fetched').innerHTML = listItems;
    })
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id = document.getElementById('character-id').value;
    charactersAPI.getOneRegister(id).then((res) => {
      const foundCharacter = res.data
      document.getElementById('name').innerHTML = foundCharacter.name
      document.getElementById('occupation').innerHTML = foundCharacter.occupation
      document.getElementById('cartoon').innerHTML = foundCharacter.cartoon
      document.getElementById('weapon').innerHTML = foundCharacter.weapon
    })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const id = document.getElementById('character-id-delete').value;
    charactersAPI.deleteOneRegister(id)
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const updatedCharacter = {
      name: document.getElementById('edit-name').value,
      occupation: document.getElementById('edit-occupation').value,
      cartoon: document.getElementById('edit-cartoon').checked,
      weapon: document.getElementById('edit-weapon').value
    }
    const id = document.getElementById('char-to-edit').value;
    charactersAPI.updateOneRegister(id, updatedCharacter).then(() => {
      document.getElementById('edit-character-form').reset();
    })
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('new-char-name').value;
    const occupation = document.getElementById('new-char-occupation').value;
    const weapon = document.getElementById('new-char-weapon').value;
    const cartoon = document.getElementById('new-char-cartoon').checked;

    const newCharacter = {
        name,
        occupation,
        weapon,
        cartoon
    }

    charactersAPI.createOneRegister(newCharacter).then(() => {
      console.log(newCharacter)
      document.getElementById('new-character-form').reset();
    })  
  });
});
