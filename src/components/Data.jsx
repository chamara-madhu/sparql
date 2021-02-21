import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

export default class Terms extends Component {

state = {
  data : []
}

componentDidMount = () => {
        const data = qs.stringify({
       query: `select * where { ?s ?p ?o }`,
     });

      axios
       .post("http://sparql.cancerdata.org/namespace/undefined/sparql", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;",
          },
       })
        .then((res) => {
        this.setState({data: res.data.results.bindings})
        })
        .catch((err) => {
          console.log(err);
        });
}



  render() {
    return (


      <table>
      <tr>
<td>O</td>
<td>P</td>
<td>S</td>
</tr>
      {this.state.data.map((el, i) => (

<tr>
<td>{el.o.value}</td>
<td>{el.p.value}</td>
<td>{el.s.value}</td>
</tr>))}

      </table>

    );
  }
}

