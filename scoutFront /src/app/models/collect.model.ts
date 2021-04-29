export class Collect {

    constructor( 
      public id: number,
      public text: string,
      public gpsX: number,
      public gpsY: number,
      public audioURL: string,
      public videoURL: string,
      public status: boolean  = true,
      public idVisit: number,
      ){}
  }
  