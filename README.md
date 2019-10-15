# F1Hub

This project is a SSR React app (in [Next.js](https://github.com/zeit/next.js/)) which displays Formula 1 historical data back to first F1 season in 1950. Data comes from [Ergast Developer API](https://ergast.com/mrd/). Layout is based on [Material-UI](https://material-ui.com/).

Live demo: https://f1-hub.kozlovvski.now.sh

## Current tasks

* Find a better way to fetch drivers and constructors photos. Currently I use page images from Wikipedia API, but that works poorly for constructors. I consider using Bing Search API, but free version comes with only 3 requests per second and that won't work for pages displaying multiple drivers/constructors
* Setup own instance of the API and fetch from it. Currently the biggest problem of the app is slow API response time which kills load times. I plan to somehow integrate [this repo](https://github.com/jcnewell/ergast-f1-api) into one server with Next.js front-end.
* Expand [constructor colors database](https://github.com/kozlovvski/F1Hub/blob/master/util/getConstructorColor.js)
* Expand [circuit images directory](https://github.com/kozlovvski/F1Hub/tree/master/static/images/circuits)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have installed `npm` and preferably `yarn`

### Installing

First of all, fork the repository and clone it. Run terminal inside the cloned directory and run:

```
yarn
```

This will install necessary packages. When packages are installed, run a development server with:

```
yarn dev
```

Open `localhost:3000` in browser and app should be running.


## Deployment

I use [Now by ZEIT](https://zeit.co/home) to deploy the app. It is a free hosting for Next.js apps which integrates with GitHub and fires a deploy process whenever a commit is pushed to the `master` branch

## Built With

* [Next.js](https://github.com/zeit/next.js/) - React framework for Server Side Rendering
* [Material-UI](https://material-ui.com/) - React components framework based on Material Design
* [Ergast Developer API](https://ergast.com/mrd/) - API from which data is fetched

## Contributing

Currently contributions are disabled.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
