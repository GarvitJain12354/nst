{
	// <hyper-globe id="hologram-globe" data-location="13.0803 -84.6565" data-version="17" style="--preview-size:800px; --globe-scale:0.76; --globe-damping:0.5; --map-density:0.48; --map-height:0.55; --point-size:2.4; --point-color:#ffffff; --backside-opacity:0.32; --backside-transition:0.6; --marker-size:1.2; --text-color:#f0faff; --text-size:0.8; --line-color:#999999; --line-offset:0.5; --autorotate:true; --autorotate-speed:0.65; --autorotate-delay:4; --autorotate-latitude:10; --title-position:0 -1; --title-padding:1.2; --text-padding:0.5; --animation:offset; --animation-intensity:0.25; --animation-scale:0.75; --animation-speed:0.25; --globe-foreground:url(&quot;hologram-shine.svg&quot;); --point-opacity-map:url(&quot;light.jpg&quot;); --marker-image:url(&quot;hologram-marker.png&quot;); max-width: 880px; --preview-color:#000000; --text-height:1.1; --line-thickness:1; --point-color-blend:multiply; --point-image:url(&quot;hologram-point.png&quot;); --equator:true; --islands:true; --backside-color:#2eafff; --marker-offset:0.2;">
	// 	<a slot="markers" data-location="34 -118" title="Los Angeles" class="globe-marker">
	// </a>
	// <a slot="markers" data-location="-12 -77" title="Lima" class="globe-marker"></a>
	// <a slot="markers" data-location="40 -74" title="New York" class="globe-marker"></a>
	// <a slot="markers" data-location="52 4.8" title="Amsterdam" class="globe-marker"></a>
	// <a slot="markers" data-location="28 77" title="New Delhi" class="globe-marker"></a>
	// <a slot="markers" data-location="35.5 138.5" title="Tokyo" class="globe-marker"></a>
	// <a slot="markers" data-location="-41 174" title="Wellington" class="globe-marker">
	// </a></hyper-globe>
	
	let html = `
	<hyper-globe id="hologram-globe" data-location="13.0803 -84.6565" data-version="17" style="--preview-size:800px; --globe-scale:0.76; --globe-damping:0.5; --map-density:0.48; --map-height:0.55; --point-size:2.4; --point-color:#ffffff; --backside-opacity:0.32; --backside-transition:0.6; --marker-size:1.2; --text-color:#f0faff; --text-size:0.8; --line-color:#999999; --line-offset:0.5; --autorotate:true; --autorotate-speed:0.65; --autorotate-delay:4; --autorotate-latitude:10; --title-position:0 -1; --title-padding:1.2; --text-padding:0.5; --animation:offset; --animation-intensity:0.25; --animation-scale:0.75; --animation-speed:0.25; --globe-foreground:url(&quot;hologram-shine.svg&quot;); --point-opacity-map:url(&quot;light.jpg&quot;); --marker-image:url(&quot;hologram-marker.png&quot;); max-width: 880px; --preview-color:#000000; --text-height:1.1; --line-thickness:1; --point-color-blend:multiply; --point-image:url(&quot;hologram-point.png&quot;); --equator:true; --islands:true; --backside-color:#2eafff; --marker-offset:0.2;">
  
  <!-- Canadian Province and Territory Capitals -->
  <a slot="markers" data-location="45.4215 -75.6972" title="Ottawa, Ontario (Capital of Canada)" class="globe-marker"></a>
  <a slot="markers" data-location="53.9333 -116.5765" title="Edmonton, Alberta" class="globe-marker"></a>
  <a slot="markers" data-location="49.8951 -97.1384" title="Winnipeg, Manitoba" class="globe-marker"></a>
  <a slot="markers" data-location="47.5615 -52.7126" title="St. John's, Newfoundland and Labrador" class="globe-marker"></a>
  <a slot="markers" data-location="46.2382 -63.1311" title="Charlottetown, Prince Edward Island" class="globe-marker"></a>
  <a slot="markers" data-location="45.9636 -66.6431" title="Fredericton, New Brunswick" class="globe-marker"></a>
  <a slot="markers" data-location="44.6488 -63.5752" title="Halifax, Nova Scotia" class="globe-marker"></a>
  <a slot="markers" data-location="46.8139 -71.2082" title="Quebec City, Quebec" class="globe-marker"></a>
  <a slot="markers" data-location="43.65107 -79.347015" title="Natural Stone Traders" class="globe-marker"></a>
  <a slot="markers" data-location="49.2827 -123.1207" title="Victoria, British Columbia" class="globe-marker"></a>
  <a slot="markers" data-location="62.454 -114.369" title="Yellowknife, Northwest Territories" class="globe-marker"></a>
  <a slot="markers" data-location="63.7467 -68.5167" title="Iqaluit, Nunavut" class="globe-marker"></a>
  <a slot="markers" data-location="60.7212 -135.0568" title="Whitehorse, Yukon" class="globe-marker"></a>

</hyper-globe>


	`;
	
	let css = `
.globe-marker {
	opacity: 0.5;
}

.marker-hover {
	opacity: 0.8;
	--marker-size: 1.5;
}
`;
	
	let script = ``;
	
	
	if ( ! self.confGlobe ) {
		// get the script element
		let elem = document.currentScript;
		if ( elem && elem.isConnected && elem.closest('body') && elem.getAttribute('src') ) {
			
			// get baseurl from script src
			let url = new URL( elem.getAttribute('src'), self.location.href ).href;
			if ( url.startsWith('http') ) {		
				let baseurl = url.substr(0, url.lastIndexOf('/')+1);		
				
				// import hyper globe module once
				if ( ! self.hyperGlobe ) {
					self.hyperGlobe = true;
					import( baseurl + 'hyper-globe.min.js' );
				}			
				
				// inject html
				html = html.replace('<hyper-globe ', `<hyper-globe data-baseurl="${baseurl}" `);
				elem.insertAdjacentHTML('afterend', html);
				if (css)	elem.nextElementSibling.insertAdjacentHTML('afterend', `<style>${css}</style>`);
				if (script) elem.nextElementSibling.addEventListener('complete', new Function(script));
				
			} else {
				console.error('This script was used in the wrong way. It must be loaded via the https: or http: protocol.');
			}
			
		} else {
			console.error('This script was used in the wrong way. It must be a non-module script inside the body element.');
		}
	}	
	
}