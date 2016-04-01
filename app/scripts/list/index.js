var List = React.createClass({displayName: "List",
  getInitialState: function() {
    return {
      tasks: [
        {
          row: 'cargando....'
        }
      ]
    }
  },
  componentDidMount: function(){
    $.ajax({
      url: this.props.url,
      dataTYpe: 'json',
      success: function(data) {
        console.log(data);
        this.setState({tasks: data});
      }.bind(this),
      error: function(xhr,status,err) {
        console.log(this.props.url);
        console.log(status);
        console.log(err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return (
      React.createElement("span", null, 
        React.createElement("ul", null, 
          
            this.state.tasks.map(function(task,id) {
              return React.createElement(Row, {key: id, row: task.row})
            })
          
        )
      )
    );
  }
});

var Row = React.createClass({displayName: "Row",
  render: function() {
    return (
      React.createElement("li", null, 
        this.props.row
      )
    );
  }
});

ReactDOM.render(React.createElement(List, {url: "tasks.json"}), document.getElementById('app'));
