// root namespace
var Eastbanc = Eastbanc || {};

// sub namespace
Eastbanc.Internship = Eastbanc.Internship || {};

// class
Eastbanc.Internship.Task5 = function(map)
{
    //makes the map
    var that = this;
    that.map = map;

    function placeMarker(data, markerImage, startSize, endSize)
    {
       place(data, markerImage, startSize, endSize);

        //places markers at each data point
        function place(data, markerImage, startSize, endSize)
        {
            var start = startSize;
            var end = endSize;
            var markers = [];
            var window;
            var size = startSize;
            var increment = (start - end)/data.length;

            for(var index = data.length-1; index >= 0; index--)
            {
                (function makeMarkers()
                {
                    var current = data[index];
                    var latlng = new google.maps.LatLng(current.Lat, current.Lon);

                    size *= increment;

                    //makes the image for the marker to use
                    var image =
                    {
                        url: markerImage,
                        size: new google.maps.Size(size, size),
                        origin: new google.maps.Point(size/2,size/2)
                    };

                    //makes the markers
                    var marker = new google.maps.Marker
                    (
                        {
                            map: that.map,
                            icon: image,
                            title: index+"",
                            position: latlng
                        }
                    );

                    var time = current.ReportDateUtc;
                    time = time.substring(time.indexOf("(")+1, time.indexOf(")"));
                    time = parseInt(time);

                    //information in the infoWindow
                    var content = '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading"></h1>' +
                        '<div id="bodyContent">' +
                        '<table>' +
                        '<tr>' +
                        '<th>Agency Id</th><td>' + current.AgencyId + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Device Id</th><td>' + current.DeviceId + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Is Standing</th><td>' + current.IsStanding + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Location</th><td>' + latlng.toString() + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Vehicle Id</th><td>' + current.VehicleId + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Time</th><td>' + time + '</td>' +
                        '</tr>' +
                        '</table>' +
                        '</div>' +
                        '</div>';

                    //makes the window when the marker is clicked
                    google.maps.event.addListener(marker, 'click', function makeWindows()
                    {
                        //closes window if one exists
                        if (window)
                            window.close();

                        //makes and opens a new window for the current marker
                        window = new google.maps.InfoWindow
                        (
                            {
                                content: content
                            }
                        );

                        //binds the window to the marker&map
                        window.open(that.map, marker);
                    });

                    //adds the markers
                    markers.push(marker);
                })();
            }

        }

    }

    // constructor
    return{
        placeMarkers: placeMarker(data, markerImage, startSize, endSize)
    };

};