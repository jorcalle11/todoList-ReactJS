var List = React.createClass({
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
      <span>
        <ul className="collection z-depth-3">
          {
            this.state.tasks.map(function(task,id) {
              return <Row key={id} id={task.id} row={task.row}/>
            })
          }
        </ul>
      </span>
    );
  }
});

var Row = React.createClass({
  render: function() {
    return (
      <a className="collection-item">
        {this.props.row}
        <span className="badge">{this.props.id}</span>
      </a>
    );
  }
});

ReactDOM.render(<List url="tasks.json"/>, document.getElementById('app'));
