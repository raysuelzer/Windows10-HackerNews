const React = require('react');
const Rx = require('rx');
const ReactWinJS = require('react-winjs');
const _ = require('lodash');
const HNFirebase = require('../data/HNFirebase.js');
const Story = require('./Story.jsx')


var StoryGrid = React.createClass({    

    getInitialState() {
        return {
            stories: new Map()
        }
    },
    componentWillMount() {       
    },
    componentDidMount() {
        HNFirebase.storySubject.throttle(2000).subscribe((data) => {
            this.setState({ stories: data })
        })
    },
    render() {
        let stories = [];
        this.state.stories.forEach((val, key) => {
            stories.push({ id: key, observable: val });
        });

        let listBinding = new WinJS.Binding.List(stories);

        let listViewItemRenderer = ReactWinJS.reactRenderer((item) => {
            
            return( <Story observable={item.data.observable} key={item.id}/>)
});

let listViewLayout = { type: WinJS.UI.GridLayout };
return (            
        <div>                    
              <ReactWinJS.ListView ref="listView" 
                                    className="win-selectionstylefilled listView"                                            
                                    itemDataSource={listBinding.dataSource} 
                                    itemTemplate={listViewItemRenderer} 
                                    layout={listViewLayout} />                    
        </div>
                 
            );
}
});


module.exports = StoryGrid;