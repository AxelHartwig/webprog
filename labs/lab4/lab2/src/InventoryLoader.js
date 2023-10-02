
export default async function inventoryLoader() {
    let inventory = {};

	Promise.all([
		fetchInventory('foundations'),
		fetchInventory('proteins'),
		fetchInventory('dressings'),
		fetchInventory('extras'),
	]).then((results) => {
		results.forEach((result) => Object.assign(inventory, result));
	});

	await new Promise((resolve) => setTimeout(resolve, 1000));
	return inventory;
}

function fetchInventory(type) {
	let url = `http://localhost:8080/${type}/`;

	return safeFetchJson(url).then((names) => {
		let props = names.map((name) => fetchIngredient(url, name));
		return Promise.all(props)
            .then((p) =>p.reduce((prev, curr, i) => ({...prev, [names[i]]: curr}), {})
		);
	});
}

async function fetchIngredient(url, name) {
	return await safeFetchJson(url + name);
}





function safeFetchJson(url) {
    return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error('${url} returned status ${response.status}');
      }
      return response.json();
    });
    }

