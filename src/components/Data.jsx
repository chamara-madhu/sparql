import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

export default class Terms extends Component {
  state = {
    data: [],
    params: "",
  };

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
        this.setState({ data: res.data.results.bindings });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSearch = (e) => {
    e.preventDefault();

    if (this.state.params) {
      const data = qs.stringify({
        query: `select ${this.state.params} where { ?s ?p ?o }`,
      });

      axios
        .post("http://sparql.cancerdata.org/namespace/undefined/sparql", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;",
          },
        })
        .then((res) => {
          this.setState({ data: res.data.results.bindings });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="row m-0">
        <div className="col p-0">
          <form class="form-inline">
            <label class="sr-only" for="inlineFormInputName2">
              Name
            </label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2"
              id="inlineFormInputName2"
              placeholder="Params"
              value={this.state.params}
              onChange={(e) => this.setState({ params: e.target.value })}
            />

            <button
              type="submit"
              class="btn btn-primary mb-2"
              onClick={this.handleSearch}
            >
              Search
            </button>
          </form>
          <table className="table">
            <tbody>
              <tr>
                <td>O</td>
                <td>P</td>
                <td>S</td>
              </tr>
              {this.state.data.map((el, i) => (
                <tr key={i}>
                  {el.o && <td>{el.o.value}</td>}
                  {el.p && <td>{el.p.value}</td>}
                  {el.s && <td>{el.s.value}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
