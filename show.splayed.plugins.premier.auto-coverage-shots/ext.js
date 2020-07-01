function onLoaded () {

	
}




function refreshSpeakerConfigurationCards(sender) {
//    $("#transcodeexternal")
   var numSpeakers = Number($(sender).attr("value"));


    // TODO: list all available mono tracks form sdk. If less than numSpeakers are available, then print a warning rather than iterating over speakers.
    //


   for(int speakerIdx=0;speakerIdx<numSpeakers;speakerIdx++) {
        $("#speakerCards").html("<div class=\"mat-card\">"

+ "<p>Speaker At : " + speakerIdx + "</p>"
+ "<div><label>Select Mono Audio Track:</label><input type=\"select\" /></div>"
+ "<div><label>Specify Name</label><input type=\"text\" /></div>"
+ "<div><label>Specify Cover Speaker Level Threshold</label><input type=\"number\" maxValue=\"100\" minValue=\"0\" /></div>"
+ "<div><label>Select Target Video Track For Pan & Scan</label><input type=\"select\" /></div>"
+ "<div><label>Enter Coverage Zoom</label><input type=\"number\" minValue=\"0\" /></div>"
+ "<div><label>Enter Coverage Pan Anchor Left</label><input type=\"number\" /></div>"
+ "<div><label>Enter Coverage Scan Anchor Top</label><input type=\"number\" /></div>"


        + "</div>")

   }



}


function resetSpeakerConfigs() {
    // this isn't angular :( let'ts not have conflicting sources of truth. We'll iterate over the dom when it's time to read values.
   $("#speakerCards").empty();

}

