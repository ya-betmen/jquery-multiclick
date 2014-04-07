A simple multiclick event for jQuery.

Click on an element three times within 1s to trigger the event.

Usage:

    $("#element").bind("multiclick", function()
    {
        // Actions
    });

    // or

    $("#element").on("multiclick", function()
    {
        // Actions
    });

You can also override the 1s time limit by passing in a new threshold,

    $("#element").on("multiclick", { threshold: 2000, clickCount: 5 }, function()
    {
        // Actions
    });
