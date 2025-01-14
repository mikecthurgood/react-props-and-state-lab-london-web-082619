import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {

  onChangeType = (e) => {
    this.setState({
      ...this.state,
      filters: {
        type: e.target.value
      }
    })
  }

  onAdoptPet = (id) => {
    this.setState({
      pets: this.state.pets.map(pet => {
        // debugger
        if (pet.id !== id) return pet
        return {
          ...pet,
          isAdopted: true
        }
      })
    })
  }

  fetchAPI = URL => {
    fetch(URL)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ ...this.state, pets: json })
        // debugger
      })
  }

  onFindPetsClick = () => {
    console.log('arrrgggghhhh')
    const type = this.state.filters.type
    const API = '/api/pets'
    switch (type) {
      case 'all': this.fetchAPI(API)
        break;
      case 'cat': this.fetchAPI(`${API}?type=cat`)
        break;
      case 'dog': this.fetchAPI(`${API}?type=dog`)
        break;
      case 'micropig': this.fetchAPI(`${API}?type=micropig`)
        break;
    }
  }

  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
