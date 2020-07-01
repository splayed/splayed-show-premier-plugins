function onLoaded () {

	
}




function refreshSpeakerConfigurationCards(sender) {
//    $("#transcodeexternal")
   var numSpeakers = Number($(sender).val());


    // TODO: list all available mono tracks form sdk. If less than numSpeakers are available, then print a warning rather than iterating over speakers.
    //


   for(speakerIdx=0;speakerIdx<numSpeakers;speakerIdx++) {
        var cardId = "speakerCard_"+speakerIdx;
        $("#speakerCards").append("<div id=\""+cardId+"\" class=\"mat-card\" />")
        $("#" + cardId).html("<div class=\"mat-card speaker-card\">"

+ "<p>Speaker At : " + speakerIdx + "</p>"
+ "<div><label>Select Mono Audio Track:</label><input type=\"select\" class=\"audio-track\" /></div>"
+ "<div><label>Specify Name</label><input type=\"text\" class=\"name\" /></div>"
+ "<div><label>Specify Cover Speaker Level Threshold</label><input type=\"number\" class=\"level-threshold\" max=\"100\" min=\"0\" /></div>"
+ "<div><label>Select Target Video Track For Pan & Scan</label><input type=\"select\" class=\"video-track\" /></div>"
+ "<div><label>Enter Coverage Zoom</label><input type=\"number\" class=\"zoom\" min=\"0\" /></div>"
+ "<div><label>Enter Coverage Pan Anchor Left</label><input type=\"number\" class=\"pan-to\" /></div>"
+ "<div><label>Enter Coverage Scan Anchor Top</label><input type=\"number\" class=\"scan-to\" /></div>"


        + "</div>")

   }



}


function resetSpeakerConfigs() {
    // this isn't angular :( let'ts not have conflicting sources of truth. We'll iterate over the dom when it's time to read values.
   $("#speakerCards").empty();

}

function runScript() {

    var speakerConfigs = [];
    $(".speaker-card").each( function (index, card) {

        //configs are keyed off of audio track since it is the audio track level on enter frame
        //that would conditionally trigger evaluation of its associated config.
        //so for each frame, for each audio track, we load that tracks threshold by the audio track name
        //and if that threshold is exceeded we run the pan, scan and zoom to. And if this hits for multiple
        //tracks then the result is undefined. Last one processed wins.
        //which is good enough for now. i can clean it up in  post.
        var audioTrack = $(card).$(".audio-track").val()
        speakerConfigs[audioTrack] = {
            audioTrack: audioTrack,
            name: $(card).$(".name").val(),
            levelThreshold: $(card).$(".level-threshold").val(),
            videoTrack: $(card).$(".video-track").val(),
            zoom: $(card).$(".zoom").val(),
            panTo: $(card).$(".pan-to").val(),
            scanTo: $(card).$(".scan-to").val()
        };


    } );

}

