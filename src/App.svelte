<script>
import { onMount } from 'svelte';
import dateformat from 'dateformat';
import List from './List.svelte';
import Search from './Search.svelte';
import { makeGetRequest } from './api.js';
import { Alert, Spinner, Jumbotron } from 'sveltestrap';

const baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'f6537aeb04644db59d677a3a9ba7f121';

let city = 'london';
let items = [];
let error = {
	color: 'danger',
	message: '',
};

$: city2 = city || '';

onMount(() => {
	getWeather(city);
});

const transformWeatherData = (weather) => {
	return weather.list.map((item, index) => {
		const data = {};
		const date = new Date(item.dt * 1000);
		const iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
		
		data.date = dateformat(date, "mmm dS, yyyy, h TT");
		data.id = index;
		data.iconUrl = iconUrl;
		data.desc = item.weather[0].description;
		data.temp = item.main.temp;
		data.min = item.main.temp_min;
		data.max = item.main.temp_max;

		return data;		
	});
};

const handleCall = (event) => {
	getWeather(event.detail.city);
};

const getWeather = async (city) => {
	try {
		const res = await makeGetRequest({
			q: city,
			units: 'metric',
		})

		if (res.ok) {
			try {
				const weather = await res.json();
				items = transformWeatherData(weather);
				console.log(items);
			} catch (err) {
				error.message = err.statusText || 'There has been an error.';
			}
		}
	} catch (err) {
		error.message = err.statusText || 'There has been an error.';
	}
};

</script>


<div class="container">
	<Jumbotron>
		{#if !city2.length}
		<h2>Enter city</h2>
		{:else}
		<h2 class="jumbo-text">
			Forecast for <span class="city-name">{city2}</span>
		</h2>
		{/if}
	</Jumbotron>

	<div class="search-container">
		<Search bind:city on:message={handleCall}/>
	</div>

	{#if !city.length}
		<Alert color="info">
			<p class="info-message">Enter city</p>			
		</Alert>
	{:else if items.length }
		<List {items} />
	{:else}
		<div class="error-loading-container">
			{#if error.message.length}
				<Alert color={error.color}>
					<p class="error-message">{error.message}</p>
				</Alert>
			{:else}
				<Spinner color="primary" size="lg" type="grow" />
			{/if}
		</div>
	{/if}

</div>

<style>
	.container {
		padding-top: 2%;
	}

	.jumbo-text {
		text-align: center;
	}

	.jumbo-text .city-name {
		text-transform: capitalize;
	}

	.search-container {
		display: flex;
		justify-content: center;
		margin: 2%;
	}

	.error-loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 5%;
	}
	
	.error-message, .info-message {
		text-align: center;
	}
</style>
