/** @jsx React.DOM */
var CompanyApp = React.createClass({
  getInitialState: function() {
    return {companylist:this.props.companies};
  },
  handleNewRowSubmit: function( newcompany ) {
    this.setState( {companylist: this.state.companylist.concat([newcompany])} );
  },
  handleCompanyRemove: function( company ) {
    
    var index = -1; 
    var clength = this.state.companylist.length;
    for( var i = 0; i < clength; i++ ) {
      if( this.state.companylist[i].cname === company.cname ) {
        index = i;
        break;
      }
    }
    this.state.companylist.splice( index, 1 );  
    this.setState( {companylist: this.state.companylist} );
  },
  render: function() {
    var tableStyle = {width: '100%'};
    return ( 
      <table style={tableStyle}>
          <td style={tableStyle}>
            <CompanyList clist={this.state.companylist}  onCompanyRemove={this.handleCompanyRemove}/>
          </td>
      </table>
    );
  }
});

var CompanyList = React.createClass({

  handleCompanyRemove: function(company){
    this.props.onCompanyRemove( company );
  },
  render: function() {
    var companies = [];
    var that = this; // TODO: Needs to find out why that = this made it work; Was getting error that onCompanyDelete is not undefined
    this.props.clist.forEach(function(company) {
      companies.push(<Company company={company} onCompanyDelete={that.handleCompanyRemove} /> );
    });
    return ( 
      <div>
        <h3>List PIDORASS</h3>
        <table className="table">
          <tbody>{companies}</tbody>
        </table>
      </div>
      );
  }

});

var Company = React.createClass({
  handleRemoveCompany: function() {
    this.props.onCompanyDelete( this.props.company );
    return false;
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.company.cname}</td>
        <td>{this.props.company.ecount}</td>
        <td><input type="button"  className="btn btn-primary" value="Remove" onClick={this.handleRemoveCompany}/></td>
      </tr>
      );
  }
});

var NewRow = React.createClass({
  handleSubmit: function() {
    var cname = "test";
    var ecount = "test";
    var hoffice = "test";
    var newrow = {cname: cname, ecount: ecount, hoffice: hoffice };
    this.props.onRowSubmit( newrow );
    
    // this.refs.cname.getDOMNode().value = '';
    // this.refs.ecount.getDOMNode().value = '';
    // this.refs.hoffice.getDOMNode().value = '';
    return false;
  },

  render: function() {
    var inputStyle = {padding:'12px'}
    return ( 
      <div className="well">
        <h3>Add A Company</h3>
      <form onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg" style={inputStyle}>
          <input type="submit"  className="btn btn-primary" value="Add Company"/>
        </div>
      </form>
      </div>
      );
  }
});

var defCompanies = [{cname:"Infosys Technologies",ecount:150000,hoffice:"Bangalore"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"},
{cname:"TCS",ecount:140000,hoffice:"Mumbai"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"},
{cname:"TCS",ecount:140000,hoffice:"Mumbai"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"},{cname:"TCS",ecount:140000,hoffice:"Mumbai"}];
React.renderComponent( <CompanyApp companies={defCompanies}/>, document.getElementById( "companyApp" ) );