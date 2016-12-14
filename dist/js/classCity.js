console.log('connect class City');
function getPopulation (typePopulation) {
	if (typePopulation == 'Мегаполис') {
		return 10000;
	}
	return 100;
}

class City {
	constructor(nameCity, typePopulation, pInfected, pVacinated, tSaturation) {
		this.name = nameCity;
		this.population = getPopulation(typePopulation);
		this.infected = this.population/100 * pInfected;
		this.vacinated = this.population/100 * pVacinated;
		this.tSaturation = tSaturation;
	}
}