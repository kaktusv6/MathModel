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
		this.cure1 = 0;
		this.cure2 = 0;
		this.cure3 = 0;
		this.immune1 = 0;
		this.immune2 = 0;
		this.immune3 = 0;
	}
}
