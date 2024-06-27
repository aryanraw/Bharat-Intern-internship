const data2 = await fetchUrl(`${forecastUrl}?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,alerts&appid=${apiKey}`);
    //   console.log(data2);