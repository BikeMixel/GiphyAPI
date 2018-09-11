
var topics = ["football", "baseball", "basketball", "hockey"]

function renderPage() {
    for (var i = 0; i < topics.length; i++) {
        $("#buttons").append("<button sport-name='" + topics[i] + "'>" + topics[i] + "</button>")
    }
    $("button").on("click", function () {
        $("#imageHolder").empty()

        var sportName = $(this).attr("sport-name")
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + sportName +
            "&api_key=X6XVEDUzCINKWL1WN2aTAwdXkBJVxn2j"

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var j = 0; j < 10; j++) {
                var imageDiv = $("#imageHolder")
                var p = $("<p>").text("Rating: " + results[i].rating)
                var sportImage = $("<img src='" + results[j].images.fixed_height_still.url + "' source-move='" + results[j].images.fixed_height.url + 
                                    "' source-still='" + results[j].images.fixed_height_still.url + "' img-state='still'>")
                imageDiv.prepend(p)
                imageDiv.prepend(sportImage)
            }
            $("img").on("click", function () {
                var state = $(this).attr("img-state")

                if (state === "still") {
                    $(this).attr("src", $(this).attr("source-move"))
                    $(this).attr("img-state", "animate")
                }
                else if (state === "animate") {
                    $(this).attr("src", $(this).attr("source-still"))
                    $(this).attr("img-state", "still")
                }

            })
        })
    })
}

$("#add-sport").on("click", function (event) {
    event.preventDefault();
    var newSport = $("#newInput").val().trim();
    topics.push(newSport);
    console.log(topics)
    $("#buttons").empty()
    renderPage();
})
renderPage();