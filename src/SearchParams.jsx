import { useEffect, useState } from "react"

import Results from "./Results"
import useBreedList from "./useBreedList"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
	const [location, setLocation] = useState("Seattle, WA")
	const [animal, setAnimal] = useState("")
	const [breed, setBreed] = useState("")
	const [pets, setPets] = useState([])
	const [breeds] = useBreedList(animal)

	useEffect(() => {
		requestPets()
	}, [])

	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		)

		const json = await res.json()

		setPets(json.pets)
	}

	return (
		<div className="search-params">
			<form
				onSubmit={e => {
					e.preventDefault()
					requestPets()
				}}
			>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						onChange={e => setLocation(e.target.value)}
						placeholder="location"
						defaultValue={location}
					/>
				</label>

				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={animal}
						onChange={e => {
							setAnimal(e.target.value)
							setBreed("")
						}}
					>
						<option />
						{ANIMALS.map(animal => (
							<option key={animal} value={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>

				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						value={breed}
						onChange={e => setBreed(e.target.value)}
						disabled={breeds.length === 0}
					>
						<option />
						{breeds.map(breed => (
							<option key={breed} value={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>

			<Results pets={pets} />
		</div>
	)
}

export default SearchParams
