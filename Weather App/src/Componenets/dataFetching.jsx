const key = "9cb484938498446e00861c73ac0c99de";

const iconURL = (iconid) => `https://openweathermap.org/img/wn/${iconid}@2x.png`
const dataFetching = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;

  const dataValue = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  const {
    weather,
    name,
    main: { temp, temp_min, temp_max },
    wind: { speed },
    sys: { country },
  } = dataValue;
  const { description, icon } = weather[0];

  return { name, temp, temp_min, temp_max, speed, country, description, iconURL: iconURL(icon) };
};

export default dataFetching;
