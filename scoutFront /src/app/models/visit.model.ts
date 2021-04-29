export class Visit {
  constructor( 
    public id: number,
    public visitName: string,
    public createdAt: Date,
    public updatedAt: Date, 
    public status: boolean  = true,
    public idCase: string,
    ){}
  
}