const React = require('react');
const Rx = require('rx');
const ReactWinJS = require('react-winjs');
const _ = require('lodash');

let Story = React.createClass({
    disposable: null,
    getImageUrl: function (url) {
        let promise = WinJS.xhr({
            url: url
        })

        //TODO: move this out of the component perhaps
        return Rx.Observable.fromPromise(promise)
            .map((response) => response.responseText)            
            .map((doc) => {                
                try {
                    let parser = new DOMParser();
                    let document = parser.parseFromString(doc, "text/html");                    
                    var metaTags = document.getElementsByTagName('meta');                    
                    var imageMetaTag = _.find(metaTags, (x) => { return x.outerHTML.includes("og:image") });
                    var imageUrl = "";
                    if (imageMetaTag)
                        imageUrl = imageMetaTag.getAttribute('content');
                    console.log(imageUrl);
                    if (imageUrl) {
                        return imageUrl
                    }
                    else {
                        return "none";
                    }
                }
                catch (ex) {
                    console.log(ex);
                    return "exception";
                }
            });
                    
    },
    componentDidMount() {
        //get the inital values without waitng 300k-ms.  listener will detach
        if (this.props.observable) {
            this.disposable = this.props.observable
                .throttle(100)
                .do((data) => {
                    //pump in the story
                    this.setState({ storyData: data });
                })
                .flatMapObserver((data) => {
                    //if we set the image ignore it
                    if (this.state.imageUri != "")
                        return Rx.Observable.just(this.state.imageUri);
                    //else return the data url
                    if (data.url)
                        return this.getImageUrl(data.url)
                },
                () => Rx.Observable.just("nada"))
                .subscribe((data) => {
                    this.setState({ imageUri: data })
                });
        }
        //add throttled listener for changes every 300k ms        
    },
    componentWillUnmount() {        
    },
    //Todo: remove subscription on unmount
    getInitialState() {
        return {
            storyData: {
                title: "Loading..."
            },
            imageUri: ""
        };
    },
    render() {    
        var storyRow; 
        if (this.state.storyData.title) {
            storyRow =  <div className="smallListIconTextTemplate">
                            <div className="smallListIconTextItem">
                                <img src={this.state.imageUri} className="smallListIconTextItem-Image" />
                                <div className="smallListIconTextItem-Detail">
                                    <h4 className="win-h4">{this.state.storyData.title}</h4>
                                    <h6 className="win-h6">{this.state.storyData.author}</h6>
                                </div>
                            </div>
                        </div>;
        }
        else {
            storyRow = null;
        }
        return (
            
            <div>
                { this.state.storyData.title ? storyRow : null }
            </div>
                       
            
            );
    }
})

module.exports = Story;

