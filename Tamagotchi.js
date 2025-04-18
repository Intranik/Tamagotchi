const pets = [];
const MAX_PETS = 4;
class Pet {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.energy = 50;
    this.fullness = 50;
    this.happiness = 50;
    this.id = Date.now();
    this.timer = setInterval(() => this.decreaseStats(), 10000);
    this.render();
  }
  getBackgroundForType() {
    switch (this.type) {
      case 'Hund':
        return 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80';
      case 'Katt':
        return 'https://images.unsplash.com/photo-1604844429063-94b9e8d7201f?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; 
      case 'Kanin':
        return 'https://plus.unsplash.com/premium_photo-1661808819761-878bc1a39dee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'Fågel':
        return 'https://images.unsplash.com/photo-1701761995360-8ce6c9f03c54?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      default:
        return 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=600&q=80';
    }
  }
  getImageForType() {
    switch (this.type) {
      case 'Hund':
        return 'https://img.freepik.com/free-photo/portrait-cute-dog-anime-style_23-2151382146.jpg?t=st=1744975467~exp=1744979067~hmac=3d208389d9e8756a92c444b19b2cc323ab6e414b7ef2891d59987b9cbf2ae020&w=740';
      case 'Katt':
        return 'https://img.freepik.com/premium-photo/cartoon-cat-with-pink-eyes-pink-flowers-its-head_902846-16598.jpg?w=360';
      case 'Kanin':
        return 'https://img.freepik.com/premium-photo/close-up-stuffed-toy-against-wall_1048944-11936812.jpg?w=996';
      case 'Fågel':
        return 'https://img.freepik.com/free-photo/fantasy-bird-illustration_23-2151496180.jpg?t=st=1744975676~exp=1744979276~hmac=72c2aaee019965aa705ff4c7d0cb5bf09708c0531e55fd6934a85333869e905e&w=996';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/616/616408.png';
    }
  }
  render() {
    const backgroundImage = this.getBackgroundForType();
    const petDiv = document.createElement('div');
    petDiv.className = 'col-md-3';
    petDiv.id = `pet-${this.id}`;
    petDiv.innerHTML = `
    <div class="card text-center" style="background-image: url('${backgroundImage}'); background-size: cover; background-position: center; color: #fff;">
      <div class="card-body bg-dark bg-opacity-50 rounded">
        <h5 class="card-title">${this.name} (${this.type})</h5>
        <img src="${this.getImageForType()}" class="pet-img mb-2" id="img-${this.id}" width="80">
        <p>Energi: <span id="energy-${this.id}">${this.energy}</span></p>
        <p>Mättnad: <span id="fullness-${this.id}">${this.fullness}</span></p>
        <p>Lycka: <span id="happiness-${this.id}">${this.happiness}</span></p>
        <div class="btn-group">
          <button class="btn btn-success btn-sm" onclick="getPet(${this.id}).doActivity('eat')">Mata</button>
          <button class="btn btn-warning btn-sm" onclick="getPet(${this.id}).doActivity('play')">Lek</button>
          <button class="btn btn-info btn-sm" onclick="getPet(${this.id}).doActivity('nap')">Tupplur</button>
        </div>
      </div>
    </div>
    `;
    document.getElementById('petsContainer').appendChild(petDiv);
    
    
  }
  updateCard() {
    document.getElementById(`energy-${this.id}`).textContent = this.energy;
    document.getElementById(`fullness-${this.id}`).textContent = this.fullness;
    document.getElementById(`happiness-${this.id}`).textContent = this.happiness;
  }
  logAction(msg) {
    const log = document.getElementById('log');
    const time = new Date().toLocaleTimeString();
    log.innerHTML = `<div>${time} - ${msg}</div>` + log.innerHTML;
  }
  animate(activity) {
    const img = document.getElementById(`img-${this.id}`);
    img.style.transition = 'transform 0.5s';
    img.style.transform = 'none';
    setTimeout(() => {
      if (activity === 'eat') {
        img.style.transform = 'translateY(-15px)';
      } 
      else if (activity === 'play') {
        img.style.transform = 'translateX(5px)';
        setTimeout(() => img.style.transform = 'translateX(-5px)', 100);
      }
      else if (activity === 'nap') {
        img.style.transform = 'rotate(360deg)';
      }
      setTimeout(() => {
        img.style.transform = 'none';
      }, 500);
    }, 10);
  }
  doActivity(action) {
    if (action === 'eat') {
      this.fullness = Math.min(100, this.fullness + 30);
      this.happiness = Math.min(100, this.happiness + 5);
      this.energy = Math.max(0, this.energy - 15);
      this.logAction(`Du matade ${this.name}!`);
    } else if (action === 'play') {
      this.happiness = Math.min(100, this.happiness + 30);
      this.fullness = Math.max(0, this.fullness - 10);
      this.energy = Math.max(0, this.energy - 10);
      this.logAction(`Du lekte med ${this.name}!`);
    } else if (action === 'nap') {
      this.energy = Math.min(100, this.energy + 40);
      this.happiness = Math.max(0, this.happiness - 10);
      this.fullness = Math.max(0, this.fullness - 10);
      this.logAction(`Du tog en tupplur med ${this.name}!`);
    }
    this.updateCard();
    this.animate(action);
    this.checkStats();
  }
  decreaseStats() {
    this.energy = Math.max(0, this.energy - 15);
    this.fullness = Math.max(0, this.fullness - 15);
    this.happiness = Math.max(0, this.happiness - 15);
    this.updateCard();
    this.checkStats();
  }
  checkStats() {
    if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
      clearInterval(this.timer);
      document.getElementById(`pet-${this.id}`).remove();
      pets.splice(pets.findIndex(p => p.id === this.id), 1);
      this.logAction(`${this.name} sprang iväg pga misskötsel.`);
    }
  }
}
function getPet(id) {
  return pets.find(p => p.id === id);
}
document.getElementById('petForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('petName').value;
  const type = document.getElementById('animalType').value;
  if (pets.length >= MAX_PETS) {
    alert('Max 4 husdjur!');
    return;
  }
  const pet = new Pet(name, type);
  pets.push(pet);
  this.reset();
  console.log(pets);
  
});

