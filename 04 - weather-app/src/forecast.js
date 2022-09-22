export default class Forecast {
  constructor() {
    this.key = "UQtbNahDt0fsnakXOSGOROB2BVuoThLA";
    this.currentconditionsURI =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getCurrentConditions(cityDetails.Key);

    return { cityDetails, weather };
  }

  async getCity(cityText) {
    const query = `?apikey=${this.key}&q=${cityText}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }

  async getCurrentConditions(locationKey) {
    const query = `${locationKey}?apikey=${this.key}`;
    const response = await fetch(this.currentconditionsURI + query);
    const data = await response.json();
    return data[0];
  }
}
