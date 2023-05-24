class Task{
    id;
    enabled = true;
    channel;
    author;
    expiry_time = null;
    data;
    mainfunc;
    removed = false;
    constructor(){

        this.id;
        this.enabled = true;
        this.channel;
        this.author;
        this.expiry_time = null;
        this.data;
        this.mainfunc;
        this.removed = false;
        
    }
}



module.exports = {Task};