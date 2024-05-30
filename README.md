# Noisycharts chart sonification plugin #

This is the standalone javascript version of the noisycharts module. This has been released as an open source package so others can integrate it into their chart software to provide an audio alternative to visual charts that is accessible to people with a vision impairment.

See a live demo of noisycharts in Guardian Australia's chart tool [here](https://interactive.guim.co.uk/embed/superyacht-testing/index.html?key=1hxk6BFGjfsbTV8uRqlJWCvuiqZXUyqAgPrQXU08bVuk&location=docsdata), or check out the demo implementation in the /test folder.

## Installation ##

`npm install noisycharts`

## Usage ##

Create a new noisychart instance:

`let noisychart = new NoisyCharts(settings)`

Load in your data so noisycharts can analyse it and set everything up:

`noisychart.setupSonicData(data)`

Add noisychart control buttons or hotkey interaction to specific elements on your page:

`noisychart.addInteraction('audioControls')`

## More documentation to come... ##
