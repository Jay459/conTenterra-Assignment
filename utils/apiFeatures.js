class APIFeatures {
    constructor(query,querystr){
        this.query = query
        this.querystr = querystr
    }
    filter(){
        const querycopy = {...this.querystr};
        const removefields = ['keyword','limit','page'];

        //removing fields 
        removefields.forEach(el => delete querycopy[el]);

        let querystr = JSON.stringify(querycopy);
        querystr = querystr.replace(/\b(gt|gte|lte|lt)\b/g, match=> `$${match}`);

        this.query = this.query.find(JSON.parse(querystr));
        return this
    }

    pagination(resPerPage){
        const currentPage = Number(this.querystr.page) || 4;
        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this;
    }
}

module.exports = APIFeatures