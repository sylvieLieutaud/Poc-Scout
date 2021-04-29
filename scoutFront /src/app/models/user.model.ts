export class User {

    constructor( 
      public id : number,
      public lastName: string,
      public firstName: string,
      public email: string,
      public password: string,
      public status: boolean  = true ,
      public createdAt: Date,
      public updatedAt: Date,   
      public idOrg: number
      ){}
  }
  

