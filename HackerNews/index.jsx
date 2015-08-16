const React = require('react');
const Rx = require('rx');
const ReactWinJS = require('react-winjs');
const _ = require('lodash');
const HNFirebase = require('./data/HNFirebase.js');
const StoryGrid = require('./components/StoryGrid.jsx');

var App = React.createClass({
    getInitialState() {
        return null;
    },
    componentWillMount() {       
    },
    componentDidMount() {        
    },
    render() {            
        return ( <div>
                    <StoryGrid/>
                </div>)
    }
});

(function () {
    "use strict";

        React.render(<StoryGrid />, document.getElementById("app"));

        //var splitViewConfigs = {
        //    small: {
        //        closedDisplayMode: "none",
        //        openedDisplayMode: "overlay"
        //    },
        //    medium: {
        //        closedDisplayMode: "inline",
        //        openedDisplayMode: "overlay"
        //    },
        //    large: {
        //        closedDisplayMode: "inline",
        //        openedDisplayMode: "inline"
        //    }
        //};

        //function getMode() {
        //    return (
        //        window.innerWidth >= 1366 ? "large" :
        //        window.innerWidth >= 800 ? "medium" :
        //        "small"
        //    );
        //}
        //var app = WinJS.Application;
        //var activation = Windows.ApplicationModel.Activation;
        //console.log("hello");
        //app.onactivated = function (args) {
        //    if (args.detail.kind === activation.ActivationKind.launch) {
        //        if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        //            // TODO: This application has been newly launched. Initialize your application here.
        //        } else {
        //            // TODO: This application was suspended and then terminated.
        //            // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
        //        }
        //        args.setPromise(WinJS.UI.processAll());
        //    }
        //};

        //app.oncheckpoint = function (args) {
        //    // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
        //    // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
        //    // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
        //};

        //app.start();
    


})();
