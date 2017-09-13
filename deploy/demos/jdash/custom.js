$(window).ready(function () {
    var introTut = introJs();
    introTut = introTut.setOptions({
        exitOnOverlayClick: false,
        exitOnEsc: false,
        showProgress: true,
        hideNext: true,
        disableInteraction: true,
        doneLabel: 'Start!'
    })

    introTut.start().oncomplete(function () { console.log('Done'); });
})

// sidenav was hidden after resizing window from mobile to full screen so i put this here
window.addEventListener('resize', function (event) {
    if (event && event.target.innerWidth > 850) {
        app && app.openSidenav();
    }

});

function startNewDashboardIntro() {
    if (!startNewDashboardIntro.isNewDashboardIntroShown) {
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    intro: "Your new dashboard has been created and is ready to design!"
                },
                {
                    element: document.querySelector('#layoutedit'),
                    intro: "Click design button to design dashboard layout."
                },
                {
                    element : document.querySelector('#dashlet-list'),
                    intro : 'You can add any dashlet inside.'
                }
            ]
        });

        intro.start();
        startNewDashboardIntro.isNewDashboardIntroShown = true;
    }
}
