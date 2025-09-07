const { json } = require("express");

class APIFeatures {
  constructor(data, queryParams) {
    this.dataObj = data;
    this.queryParams = queryParams;
  }

  searchBy() {
    let searchKey = this.queryParams.filterBy
      ? {
          name: {
            $regex: this.queryParams.filterBy,
            $options: "i",
          },
        }
      : {};

    this.dataObj.find({ ...searchKey });

    return this;
  }

  filter() {
    const filterQueryParams = { ...this.queryParams };
    const removeUnwantedQueryParamsAry = ["filterBy", "page", "limit"];
    removeUnwantedQueryParamsAry.forEach(
      (param) => delete filterQueryParams[param]
    );
    let queryStr = JSON.stringify(filterQueryParams);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.dataObj.find(JSON.parse(queryStr));
    return this;
  }

  pagenation(resultPerPage) {
    const currentPage = this.queryParams.page || 1;
    const skiprecords = resultPerPage * (currentPage - 1);
    this.dataObj.limit(resultPerPage).skip(skiprecords);
    return this;
  }
}

module.exports = APIFeatures;
