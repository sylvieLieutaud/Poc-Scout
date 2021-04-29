export class Organisation {

    constructor( 
        public id: number,
        public orgName:string, 
        public orgCity: string,
        public status: boolean  = true ,
        public createdAt: Date,
        public updatedAt: Date, 
    ){}
  
}
