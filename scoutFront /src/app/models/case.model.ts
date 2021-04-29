export class Case {

  constructor( 
    public id: number,
    public caseName:string, 
    public caseNumber: string,
    public createdAt: Date,
    public updatedAt: Date, 
    public status: boolean = true,
    public idUser: number
    
    
    ){}
}
