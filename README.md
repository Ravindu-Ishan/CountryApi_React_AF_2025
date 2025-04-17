[![Netlify Status](https://api.netlify.com/api/v1/badges/4d7b2e75-7a72-4c13-b18b-e415ae82d8a7/deploy-status)](https://app.netlify.com/sites/nationsinfo/deploys)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Clone the project using git


```bash
git clone <repository-url>
```

2. Open a terminal inside the project directory

### For development 

```bash
npm run dev
```

### For production build

```bash
npm run build
```

### To run the production build locally
```bash
npm run start
```

## Environment configuration

This project uses google maps api
- Create an API key by following google maps api guide 
- https://developers.google.com/maps/documentation/javascript/get-api-key


## Report

#### Author : IT22358752 - B K R I Sasmin
#### Y3.S2.WE.01.01 - SLIIT - 2025
#### AF Frontend Application Assignment report

### Introduction

- The api restcountries was used as the backend api for the frontend project
> https://www.restcountries.com/
- NextJS framework , currently recommended by React as of v19.1 was used to initialize the project 
> https://react.dev/learn/creating-a-react-app
- Flowbite React along with Tailwind CSS were used as CSS frameworks of the project
> https://flowbite-react.com/
> https://tailwindcss.com/
- Google Maps Embed API was used to display a country location on a google map
> https://developers.google.com/maps/documentation/embed/get-started


### Endpoints Used from restcountries api

> https://restcountries.com/v3.1/all?fields=name,flags
- Used to retrieve a the full list of available countries. Only the country name and flag is retrieved to optimize load times.
> https://restcountries.com/v3.1/name/{name}?fullText=true
- Used to retrieve all available information about a country to display details of a selected country.
> https://restcountries.com/v3.1/region/{region}
- Used to retrieve countries in a specific region. This endpoint was used as a filtering option.
> https://restcountries.com/v3.1/lang/{language}
- Used to retrieve countries that use the defined language. This endpoint was used as a filtering option.

### Challenges faced
1. Theme issues and react flowbite components not rendering properly.
2. Implementing the location view deemed difficult as the backend api did not provide an embedded url and instead provided shortened urls, therefore loading their urls inside iframes was not possible.
3. Production build time issues due to type safety.

### How the challenges were resolved

1. Reading documentation and manually initializing flowbite react based on guidelines and removing uncessary classes from gloabl tailwind css file.
2. Used Google Maps Embed API and the latitude and longitude coordinates provided by the backend rescountries api.
3. Implemented type safety and referred nextjs documentation to solve production build errors.


