import { useEffect, useState } from "react"

const localCache = {}

export default function useBreedList(animal) {
	const [breedList, setBreedList] = useState([])
	const [status, setStatus] = useState("unloaded")

	useEffect(() => {
		if (!animal) {
			setBreedList([])
		} else if (localCache[animal]) {
			setBreedList(localCache[animal])
		} else {
			requestBreedList()
		}

		async function requestBreedList() {
			setBreedList([])
			setStatus("loading")

			const res = await fetch(
				`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
			)

			const json = await res.json()
			localCache[animal] = json.breeds || []
			setBreedList(localCache[animal])
			setStatus("loaded")
		}
	}, [animal])

	return [breedList, status]
}
