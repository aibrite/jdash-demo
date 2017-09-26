$(window).ready(function () {
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                intro: "Welcome! This is your first dashboard!"
            },
            {
                element: document.querySelectorAll('.row.dashlet-row').item(0),
                intro: "These are demo dashlets to try."
            },
            {
                element : document.querySelectorAll('.navbar.navbar-default.navbar-fixed').item(0),
                intro : 'Last word! Create a new dashboard or try different themes!.'
            }
        ], 
        exitOnOverlayClick: false,
        exitOnEsc: false,
        showProgress: true,
        hideNext: true,
        disableInteraction: true,
        doneLabel: 'Start!'
    });
    intro.start();   
});


function rightBarInitted(navbar, isResize) {
    if (!isResize) {
        app.loadThemes(navbar.querySelector('#themes'));
        app.dashboardListContainer = navbar.querySelector('#dashboard-list');
    }
}

function startNewDashboardIntro() {
    if (!startNewDashboardIntro.isNewDashboardIntroShown) {
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    intro: "Your new dashboard has been created and is ready to design!"
                },
                {
                    element : document.querySelector('#dashlet-list'),
                    intro : 'You can add any dashlet inside.'
                },
                {
                    element: document.querySelector('#layoutedit'),
                    intro: "Click design button to design dashboard layout."
                }
            ]
        });

        intro.start();
        startNewDashboardIntro.isNewDashboardIntroShown = true;
    }
}
