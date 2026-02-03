export class Post {
    public id: number;
    public title: string;
    public content: string;
    public published: boolean;
    public forDelete: boolean;

    constructor(id: number, title: string, content: string, published: boolean = false) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.published = published;
        this.forDelete = false;
    }
}
