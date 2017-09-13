function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}

(function (window) {

    function parseQuery(qstr) {
        var query = {};
        var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }

    var getDemoToken = function (email) {
        var url = 'https://app.jdash.io/api/v1';

        var instance = jdash.Http.default.create({
            baseURL: url
        });
        var posted = instance.post('/user/startdemo', {
            email: email
        });
        return posted.then(function (result) {
            return result.data.usertoken;
        });
    }

    var app = function App() {

    }
    app.prototype.init = function () {
        var self = this;
        this.query = parseQuery(window.location.search);
        this.username = 'my-user';
        this.dashboard = document.querySelector('#mydashboard');
        this.dashletModules = jdash.DashletModule.getModules();
        this.dashletList = document.querySelector('#dashlet-list');
        this.viewDashboardBtn = document.querySelector('#readonly');
        this.editDashletsBtn = document.querySelector('#dashletedit');
        this.editLayoutBtn = document.querySelector('#layoutedit');
        this.createDashboardBtn = document.querySelector('#create-dashboard-btn');
        this.dashboardListContainer = document.querySelector('#dashboard-list');
        this.dashboardListItemTemplate = document.querySelector('#dashboard-list-item-template');
        this.dashletListItemTemplate = document.querySelector('#dashlet-list-item-template');
        this.startEditBtn = document.querySelector('#startedit');
        this.themesEl = document.querySelector('#themes');
        this.toggleDashletsBtn = document.querySelector('#toggledashlets');
        this.dashboardTitleEl = document.querySelector('#dashboard-title');
        this.dashboardEditTools = document.querySelector('#dashboard-edit-tools');
        this.deleteDashboardBtn = document.querySelector('#delete-dashboard-btn');



        this.viewDashboardBtn.addEventListener('click', this.setEditMode.bind(this, 'readonly'));
        this.editDashletsBtn.addEventListener('click', this.setEditMode.bind(this, 'dashletedit'));
        this.startEditBtn.addEventListener('click', this.setEditMode.bind(this, 'dashletedit'));
        this.editLayoutBtn.addEventListener('click', this.setEditMode.bind(this, 'layoutedit'));
        this.createDashboardBtn.addEventListener('click', this.createDashboard.bind(this));
        this.toggleDashletsBtn.addEventListener('click', this.toggleCollapseDashlets.bind(this));
        this.dashboard.addEventListener('viewmode-change', function (event) { this.viewModeChangeHandler(event.detail.newVal) }.bind(this));
        this.dashboard.addEventListener('state-change', this.dashboardStateChangeHandler.bind(this));
        this.deleteDashboardBtn.addEventListener('click', this.deleteDashboard.bind(this));
        window.addEventListener('popstate', this.popStateHandler.bind(this));

        this.loadThemes();
        this.createDashletModuleEls();
        this.viewModeChangeHandler(this.dashboard.getAttribute('j-view-mode') || 'readonly');
        this.dashboard.layout.makeDroppable('[j-type="j-dashlet-module"]', true, this.dashletList);

        //removeIf(noprod)
        window.jdash.Provider.init({
            userToken: function (cb) {
                getDemoToken(self.query.mail).then(function (token) {
                    cb(null, token);
                }).catch(function (err) { cb(err) });
            }
        })
        //endRemoveIf(noprod)

        this.go();
    }

    app.prototype.openSidenav = function () {
        document.getElementById("mySidenav").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }

    app.prototype.closeSidenav = function () {
        document.getElementById("mySidenav").style.display = "none";
        document.getElementById("myOverlay").style = "none";
    }

    app.prototype.go = function () {
        var self = this;
        this.loadDashboards().then(function (dashboards) {

            var model;
            if (self.query.dashboard) {
                var model = dashboards.data.filter((function (item) {
                    return item.id == self.query.dashboard
                }))[0];

            }
            model = model || dashboards.data[0];
            if (model) {
                this.loadDashboard(model)
            }
            document.body.style.display = ''
        }.bind(this)).catch(function (err) {
            document.body.style.display = '';
            alert(err.message || err)
        });
    }

    app.prototype.popStateHandler = function (event) {
        var dashboard = event.state && event.state.dashboard;
        dashboard && setTimeout(function () {
            this.loadDashboard(dashboard, true);
        }.bind(this));
    }

    app.prototype.deleteDashboard = function () {
        if (!window.confirm('Continue?'))
            return;
        var id = this.dashboard.getAttribute('j-provider-id');
        var dashboardModel = this.listingDashboards ? this.listingDashboards.filter(function (item) {
            return item.id == id
        })[0] : null, dashboardIndex = this.listingDashboards ? this.listingDashboards.indexOf(dashboardModel) : -1;

        return this.dashboard.provider.deleteDashboard(id).then(function () {
            if (dashboardIndex >= 0)
                this.listingDashboards.splice(dashboardIndex, 1);
            this.listingDashboards && this.createDashboardList(this.listingDashboards);
            var currentDashboard = this.listingDashboards[dashboardIndex] || this.listingDashboards[0];
            if (currentDashboard)
                return this.loadDashboard(currentDashboard);
            else this.dashboard.unload();
        }.bind(this))
    }

    app.prototype.dashboardStateChangeHandler = function (state) {
        if (this.dashboard.state == 'loaded') {
            var selected = this.dashboardListContainer.querySelector('.j-theme');
            selected && selected.classList.remove('j-theme');
            a = this.dashboardListContainer.querySelector('[dashboard-id="' + this.dashboard.model.id + '"]');
            a && a.classList.add('j-theme');
            this.dashboardTitleEl.innerHTML = '<b>' + this.dashboard.title + '</b>';
            this.dashboardEditTools.style.display = '';
            this.dashboard.style.display = '';
        } else setTimeout(function () {
            if (this.dashboard.state != 'loaded') {
                this.dashboardEditTools.style.display = 'none';
                this.dashboard.style.display = 'none';
                this.dashboardTitleEl.textContent = 'JDash'
            }
        }.bind(this), 250);
    }

    app.prototype.createDashletModuleEls = function () {
        this.dashletModules.sort(function (a, b) {
            var firstOrder = parseInt(a.attributes["data-order"].value);
            var secondOrder = parseInt(b.attributes["data-order"].value);
            return firstOrder - secondOrder;
        })
        for (var i = 0; i < this.dashletModules.length; i++) {
            var module = this.dashletModules[i];
            var el = document.importNode(this.dashletListItemTemplate.content, true);
            var content = jdash.Helper.getFirstElementChild(el);
            content.setAttribute('j-type', 'j-dashlet-module')
            content.setAttribute('j-module-id', module.elementTag);
            content.classList.add('dashlet-module');
            var titleEl = content.querySelector('[dashlet-title-element]');
            if (titleEl) {
                titleEl.textContent = module.title || module.elementTag;
            }
            var addBtn = content.querySelector('[dashlet-add-btn]');
            if (addBtn) {
                addBtn.setAttribute('j-module-id', module.elementTag);
                addBtn.addEventListener('click', function (event) {
                    var moduleId = event.target.getAttribute('j-module-id');
                    this.dashboard.addDashlet(moduleId);
                }.bind(this))
            }
            var container = document.createElement('div');
            container.appendChild(el);

            this.dashletList.appendChild(container);
        }
    }

    app.prototype.loadThemes = function () {
        jdash.ThemeManager.getThemes().forEach(function (theme) {
            var op = document.createElement('a');
            op.textContent = theme.name;
            op.style.cursor = "pointer"
            this.themesEl.appendChild(op);
            op.addEventListener('click', this.changeTheme.bind(this, theme))
        }.bind(this))
    }

    app.prototype.viewModeChangeHandler = function (newMode) {
        var items = document.querySelectorAll('[btn-group="dashboard-view-mode"]');
        for (var i = 0; i < items.length; i++) {
            items[i].id == newMode ? items[i].classList.remove('j-white') : items[i].classList.add('j-white');
        }
        if (newMode == 'readonly') {
            this.startEditBtn.style.display = '';
            this.editDashletsBtn.style.display = 'none';
            this.editLayoutBtn.style.display = 'none';
            this.toggleDashletsBtn.style.display = 'none';
            this.deleteDashboardBtn.style.display = 'none';
            this.dashboard.hideDashlets(false);
            this.dashboard.collapseDashlets(false);
        } else {
            this.startEditBtn.style.display = 'none';
            this.editDashletsBtn.style.display = '';
            this.editLayoutBtn.style.display = '';
            this.toggleDashletsBtn.style.display = '';
            this.deleteDashboardBtn.style.display = '';
        }
        newMode == 'dashletedit' ? (this.dashletList.style.display = 'inline-block') : (this.dashletList.style.display = 'none')
    }

    app.prototype.changeTheme = function (theme) {
        jdash.ThemeManager.setCurrentTheme(theme.name)
    }

    // a check for different demo dashboards to suit for specified view
    function isDemoDashboardSuitable(dashboard) {
        if (dashboard.config && dashboard.config.demoDashboard) {
            if (window.demoDashboardType == "jdash" && dashboard.config.bootstrapDefault) {
                return false;
            }

            if (window.demoDashboardType == "bootstrap" && dashboard.config.jdashDefault) {
                return false;
            }
        }


        return true;
    }

    app.prototype.createDashboardList = function (dashboards) {
        this.dashboardListContainer.innerHTML = '';
        dashboards.forEach(function (dashboard) {

            var el = document.importNode(this.dashboardListItemTemplate.content, true);
            var a = jdash.Helper.getFirstElementChild(el);
            a.addEventListener('click', this.loadDashboard.bind(this, dashboard, null));

            a.textContent = dashboard.title;
            a.setAttribute('dashboard-id', dashboard.id);

            this.dashboardListContainer.appendChild(a);

        }.bind(this))
    }

    app.prototype.loadDashboards = function () {
        return this.dashboard.provider.getMyDashboards().then(function (result) {
            result.data = result.data.filter(function (dashboard) { return isDemoDashboardSuitable(dashboard); });

            this.createDashboardList(result.data);
            this.listingDashboards = result.data;
            return result;
        }.bind(this))
    }

    app.prototype.changeStyle = function (event) {
        var style = null;
        for (var i = 0; i < stylesEl.options.length; i++)
            if (stylesEl.options[i].selected)
                style = stylesEl.options[i].value;
        style && (this.dashboard.layout.layoutStyle = style);
    }



    app.prototype.createDashboard = function () {
        var title = window.prompt("Set Dashboard Title");
        if (title) {
            var model = {
                title: title,
                layout: {
                    module: 'grid-layout'
                },
                meta: {
                    owner: this.username
                }
            }
            this.dashboard.provider.createDashboard(model).then(function (result) {
                console.log('Dashboard created with id:' + result.id);
                model.id = result.id;
                result.meta && (model.meta = result.meta);

                this.loadDashboards();
                this.loadDashboard(model);
                startNewDashboardIntro && startNewDashboardIntro();
            }.bind(this)).catch(function (err) {
                alert('Unable to create dashboard:' + err.message)
            }.bind(this))
        }
    }

    app.prototype.loadDashboard = function (id, discardState) {
        var self = this;
        this.dashboard.load(id).then(function (model) {
            !discardState && history.pushState({ state: 'dashboard', dashboard: model }, model.title, "?dashboard=" + encodeURI(model.id) + "&mail=" + encodeURI(self.query.mail));
        }).catch(function (err) {
            alert(err.message);
        })
    }

    app.prototype.setEditMode = function (mode) {
        this.dashboard.setAttribute('j-view-mode', mode);
    }


    app.prototype.toggleDashlets = function (hide) {
        this.dashboard.toggleDashlets();
    }

    app.prototype.toggleCollapseDashlets = function (hide) {
        this.dashboard.toggleCollapseDashlets();
    }



    window.app = new app();
})(window)