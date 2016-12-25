class City {
	constructor(nameCity, typePopulation, population,
		pInfected, pVacinated, tSaturation)
	{
		this.name = nameCity;
		this.typePopulation = typePopulation;
		this.population = population*1;
		this.infected = this.population/100 * pInfected;
		this.vacinated = this.population/100 * pVacinated;
		this.tSaturation = tSaturation*1;
		this.oneWeek = 0;
		this.twoWeeks = 0;
		this.threeWeeks = 0;
	}
}
