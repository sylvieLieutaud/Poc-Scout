export class Photo {

    constructor( 
      public id: number,
      public fileName:string, 
      public photoURL: string,
      public status: boolean  = true ,
      public idCollect: number,
      ){}
  }