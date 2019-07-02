import dv from "./helpers/dateValidator";

export default class ConsumptionController {
  constructor(records) {
    this._records = records;
  }

  get_consumption(from, to) {
    if (dv.is_date_valid(from) === false || dv.is_date_valid(to) == false)
      return undefined;

    let sortedRecords = this._get_sorted_records();
    let recordFrom = this._find_starting_record(from, sortedRecords);
    let recordTo = this._find_record_obj(to, sortedRecords);

    let l = this._calculate_liters(recordFrom, recordTo, sortedRecords);
    let k = this._calculate_kilometers(recordFrom, recordTo);
    let result = (l * 100) / k;

    return result.toFixed(2);
  }

  _get_sorted_records() {
    return this._records.sort(function(a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.data) return 1;
      return 0;
    });
  }

  _find_starting_record(fromDate, records) {
    let recordObj = this._find_record_obj(fromDate, records);
    let record = recordObj.item;
    let i = recordObj.index;

    if (record.full) return { index: i, item: record };

    return this._find_previous_full_record(i, records);
  }

  _find_previous_full_record(record_index, records) {
    let j = record_index;
    while (j > 0) {
      const record = records[j];
      if (record.full) return { index: j, item: record };

      j--;
    }

    return { index: record_index, item: records[record_index] };
  }

  _find_record_obj(date, records) {
    for (let i = 0; i < records.length; i++) {
      const record = records[i];

      if (dv.are_equal(date, record.date)) {
        return { index: i, item: record };
      }
    }
  }

  _calculate_liters(from, to, records) {
    let i = from.index + 1;
    let liters = 0;

    while (i <= to.index) {
      let litersStr = records[i].amount;
      let result = Number.parseFloat(litersStr);
      //console.log("Adding " + result + " to liters.");
      liters += result;
      i++;
    }

    //console.log("Liters: " + liters);
    return liters;
  }

  _calculate_kilometers(from, to) {
    let fromKm = Number.parseFloat(from.item.km);
    let toKm = Number.parseFloat(to.item.km);
    let result = toKm - fromKm;
    //console.log("Kilometers: " + result);
    return result;
  }
}
