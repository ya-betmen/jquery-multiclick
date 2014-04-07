// @author Petr Zalyautdinov (Заляутдинов Пётр) <zalyautdinov.petr@gmail.com>
// based on tripleclick plugin by Rich Adams <rich@richadams.me>

// Implements a multi-click event. Click (or touch) three times within 1s on the element to trigger.

(function($)
{
    // Default options
    var defaults = {
        threshold: 1000, // ms
        clickCount: 3
    };

    function multiHandler(event)
    {
        var $elem = jQuery(this);

        // Merge the defaults and any user defined settings.
        settings = jQuery.extend({}, defaults, event.data);

        // Get current values, or 0 if they don't yet exist.
        var clicks = $elem.data("multiclick_clicks") || 0;
        var start = $elem.data("multiclick_start") || 0;

        // If first click, register start time.
        if (clicks === 0) {
            start = event.timeStamp;
        }

        // If we have a start time, check it's within limit
        if (start != 0
                && event.timeStamp > start + settings.threshold)
        {
            // Tri-click failed, took too long.
            clicks = 0;
            start = event.timeStamp;
        }

        // Increment counter, and do finish action.
        clicks += 1;
        if (clicks === settings.clickCount)
        {
            clicks = 0;
            start = 0;
            event.type = "multiclick";

            // Let jQuery handle the triggering of "multiclick" event handlers
            if (jQuery.event.handle === undefined) {
                jQuery.event.dispatch.apply(this, arguments);
            }
            else {
                // for jQuery before 1.9
                jQuery.event.handle.apply(this, arguments);
            }
        }

        // Update object data
        $elem.data("multiclick_clicks", clicks);
        $elem.data("multiclick_start", start);
    }

    var multiclick = $.event.special.multiclick =
            {
                setup: function(data, namespaces)
                {
                    $(this).bind("touchstart click.multi", data, multiHandler);
                },
                teardown: function(namespaces)
                {
                    $(this).unbind("touchstart click.multi", data, multiHandler);
                }
            };
})(jQuery);
