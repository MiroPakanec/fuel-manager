import { invalid } from "moment";

export default class LineGraph {
  constructor(data) {
    this._data = data;
  }

  is_date_valid(d) {
    return d instanceof Date && !isNaN(d);
  }

  get_graph_trace(from, to, fullYear, yType) {
    let data = this.compute_liter_data_year(from, to, fullYear, yType);

    let xValue = [];
    let yValue = [];

    data.forEach(element => {
      xValue.push(element[0]);
      yValue.push(element[1].toFixed(2));
    });

    return [
      {
        x: xValue,
        y: yValue,
        type: "bar",
        text: yValue.map(String),
        textfont: {
          size: 18
        },
        textposition: "auto",
        hoverinfo: "none",
        marker: {
          color: yType === "price" ? "#1A237E" : "#EC407A",
          opacity: 1
        }
      }
    ];
  }

  filter_data(from, to) {
    let filtered = [];
    this._data.forEach(function(element) {
      let date = new Date(element.date);

      if (date >= from && date <= to) {
        filtered.push(element);
      }
    });

    return filtered;
  }

  compute_liter_data_year(from, to, fullYear, yType) {
    let data = this.filter_data(from, to);
    let values = this.get_line_data_points(data, fullYear, yType);

    let items = [];
    values.forEach((k, v) => items.push([k, v]));

    items.sort((a, b) => a[1] - b[1]);
    items = items.map(a => {
      if (fullYear) {
        let month = this.get_month_names()[a[1]];
        return [month, a[0]];
      }

      return [a[1], a[0]];
    });

    return items;
  }

  get_line_data_points(data, fullYear, yType) {
    let values = new Map();
    let self = this;

    data.forEach(function(element) {
      let date = self.get_line_x_value(element, fullYear);
      let amount = self.get_line_y_value(element, yType);

      if (values.has(date)) {
        values.set(date, values.get(date) + amount);
      } else {
        values.set(date, amount);
      }
    });
    return values;
  }

  get_line_x_value(element, fullYear) {
    if (fullYear) {
      return new Date(element.date).getMonth();
    }

    return new Date(element.date).getDate();
  }

  get_line_y_value(element, yType) {
    if (yType === "price") return parseFloat(element.price);

    return parseFloat(element.amount);
  }

  get_month_names() {
    return [
      "Január",
      "Február",
      "Marec",
      "Apríl",
      "Máj",
      "Jún",
      "Júl",
      "August",
      "September",
      "Október",
      "November",
      "December"
    ];
  }
}
