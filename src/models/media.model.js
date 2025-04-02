class Media {
    constructor(id, title, description, type, url, created_at) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.url = url;
        this.created_at = created_at;
    }
}

module.exports = Media;
