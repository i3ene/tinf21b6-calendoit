export class Event {
    startDate: Date;
    endDate: Date;

    // TODO: repeat
    // TODO: position

    title: string;
    description: string;

    color: string;
    textColor: string;

    constructor(obj: any) {
        this.startDate = obj.startDate ? obj.startDate : new Date();
        this.endDate = obj.endDate ? obj.endDate : new Date();

        this.title = obj.title ? obj.title : "";
        this.description = obj.description ? obj.description : "";

        this.color = obj.color ? obj.color : "";
        this.textColor = obj.textColor ? obj.textColor : "";
    }
    
}