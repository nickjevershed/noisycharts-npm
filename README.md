# Noisycharts chart sonification plugin #

This is the standalone javascript version of the noisycharts module. This has been released as an open source package so others can integrate it into their chart software to provide an audio alternative to visual charts that is accessible to people with a vision impairment.

See a live demo of noisycharts integrated into a chart tool [here](https://interactive.guim.co.uk/embed/superyacht-testing/index.html?key=1hxk6BFGjfsbTV8uRqlJWCvuiqZXUyqAgPrQXU08bVuk&location=docsdata), or check out the demo implementations in the /test folder.

## Installation ##

With npm:

`npm install noisycharts`

Or load from a CDN in a script element for vanilla Javascript:

`<script src="https://cdn.jsdelivr.net/npm/noisycharts/dist/index.js"></script>`

## Usage ##

Create a new noisychart instance using the constructor:

`let noisychart = new NoisyChart({settings:settings, data:data})`

Then add noisychart control buttons a specific element on your page:

`noisychart.addInteraction('audioControls')`

## Settings ##

Settings is an object specifying your noisychart settings. The default arguments for the NoisyChart object are:

`{data, dataKeys=[], chartID=null, controlsID=controlsID, settings=default_settings, animationID=null, x=null, y=null, colors=default_colors}`

### data (required) ###

The data object you want to turn into audio, usually 'wide' rather than 'long'.

### dataKeys (optional) ###

Optionally specify an array of data keys to be used when turning the data into audio, analagous to column headings in a wide dataset. This can be used to exclude columns or data series from the sonification

### chartID (optional) ###

The ID of the html element containing your chart

### controlsID (optional) ###

The ID of the element where you want the controls to be added to

### animationID (optional) ###

The ID of the SVG element you want to target for the noisycharts cursor animations, if you're using a <g> tag to reposition your chart elements with the d3 margin convention, then it should be the ID of the <g> tag. If you're not using a <g> tag for this, then use the ID of your SVG.

### x (optional) ###

The d3 x axis object for your chart, required if you want animations to work. 

### y (optional) ###

The d3 y axis object for your chart, required if you want animations to work.

### colors (optional) ###

A d3 color scale to use with the cursor animation. Defaults to red otherwise.

### settings (optional) ###

Optionally specify settings for the sonification.

```
const default_settings = {
  "xColumn": null,
  "audioRendering": null,
  "invertY":null,
  "type":null,
  "interval":null,
  "xFormat": {
      "date": null,
      "string": null,
      "number": null,
      "status": "",
      "type": null
  }
}
```

## Development and testing ##

You can run the test/demos from the /tests folder by running `npm install` then `npm start`.
