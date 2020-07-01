function onLoaded () {

    $("#speakersForm").on("submit", refreshSpeakerConfigurationCards);

//    $("#numSpeakers").on("blur", refreshSpeakerConfigurationCards);

    $("#numSpeakers").on("enter", refreshSpeakerConfigurationCards);



	$("#speakersSubmit").on("click", runScript);

    $("#speakersSubmit").on("enter", runScript);

	$("#speakersSubmit").on("submit", runScript);


	loadJSX();


}




function refreshSpeakerConfigurationCards(evnt) {

   evnt.preventDefault();

   var numSpeakers = Number($("#numSpeakers").val());


   resetSpeakerConfigs();


    // TODO: list all available mono tracks form sdk. If less than numSpeakers are available, then print a warning rather than iterating over speakers.
    //


   for(speakerIdx=0;speakerIdx<numSpeakers;speakerIdx++) {
        var cardId = "speakerCard_"+speakerIdx;
        $("#speakerCards").append("<div id=\""+cardId+"\" class=\"mat-card\" />")
        $("#" + cardId).html("<div class=\"mat-card speaker-card\">"

+ "<p>Speaker At : " + speakerIdx + "</p>"
+ "<div><label>Select Mono Audio Track:</label><select class=\"audio-track\" /></div>"
+ "<div><label>Specify Name</label><input type=\"text\" class=\"name\" value=\"Adam\" /></div>"
+ "<div><label>Specify Cover Speaker Level Threshold</label><input type=\"number\" class=\"level-threshold\" max=\"100\" min=\"0\" value=\"50\" /></div>"
+ "<div><label>Select Target Video Track For Pan & Scan</label><select class=\"video-track\" /></div>"
+ "<div><label>Enter Coverage Zoom</label><input type=\"number\" class=\"zoom\" min=\"0\" value=\"200\" /></div>"
+ "<div><label>Enter Coverage Pan Anchor Left</label><input type=\"number\" class=\"pan-to\" value=\"540\"  /></div>"
+ "<div><label>Enter Coverage Scan Anchor Top</label><input type=\"number\" class=\"scan-to\" value=\"1819\" /></div>"


        + "</div>")

   }

      var csInterface = new CSInterface();

        //This function goes in and out of process and so the result has to be serialized on the other end
        //and deserialized here.
        csInterface.evalScript("$._ext.getActiveSequence()", (seq) => {

            var activeSequence = JSON.parse(seq);


            var audioTracksByNameSelects = "";
            $.each(activeSequence.audioTracksByName, (name, v) => {

                audioTracksByNameSelects = audioTracksByNameSelects + "<option name=\""+name+"\" value=\""+name+"\">"+name+"</option>";
            });

            $("#speakerCards").find("select.audio-track").html(audioTracksByNameSelects);
            
            
             var videoTracksByNameSelects = "";
            $.each(activeSequence.videoTracksByName, (name, v) => {

                videoTracksByNameSelects = videoTracksByNameSelects + "<option name=\""+name+"\" value=\""+name+"\">"+name+"</option>";
            });

            $("#speakerCards").find("select.video-track").html(videoTracksByNameSelects);

        });


}


function resetSpeakerConfigs() {
    // this isn't angular :( let'ts not have conflicting sources of truth. We'll iterate over the dom when it's time to read values.
   $("#speakerCards").empty();

}

function runScript(evnt) {

   evnt.preventDefault();
   var sender = evnt.target;

    var speakerConfigs = [];
    $(".speaker-card").each( function (index, card) {

        //configs are keyed off of audio track since it is the audio track level on enter frame
        //that would conditionally trigger evaluation of its associated config.
        //so for each frame, for each audio track, we load that tracks threshold by the audio track name
        //and if that threshold is exceeded we run the pan, scan and zoom to. And if this hits for multiple
        //tracks then the result is undefined. Last one processed wins.
        //which is good enough for now. i can clean it up in  post.
        var audioTrack = $(card).find(".audio-track").val()
        speakerConfigs[audioTrack] = {
            audioTrack: audioTrack,
            name: $(card).find(".name").val(),
            levelThreshold: $(card).find(".level-threshold").val(),
            videoTrack: $(card).find(".video-track").val(),
            zoom: $(card).find(".zoom").val(),
            panTo: $(card).find(".pan-to").val(),
            scanTo: $(card).find(".scan-to").val()
        };

        //console.log(audioTrack);


    } );






}


/**
* Load JSX file into the scripting context of the product. All the jsx files in
* folder [ExtensionRoot]/jsx & [ExtensionRoot]/jsx/[AppName] will be loaded.
*/
function loadJSX() {
	var csInterface = new CSInterface();

	// get the appName of the currently used app. For Premiere Pro it's "PPRO"
	var appName = csInterface.hostEnvironment.appName;
	var extensionPath = csInterface.getSystemPath(SystemPath.EXTENSION);

	// load general JSX script independent of appName
	var extensionRootGeneral = extensionPath + "/jsx/";
	csInterface.evalScript("$._ext.evalFiles(\"" + extensionRootGeneral + "\")");

	// load JSX scripts based on appName
	var extensionRootApp = extensionPath + "/jsx/" + appName + "/";
	csInterface.evalScript("$._ext.evalFiles(\"" + extensionRootApp + "\")");
}