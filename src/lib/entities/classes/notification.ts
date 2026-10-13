export class UiNotification {

    constructor(
        public id: number,
        public image: string,
        public title: string,
        public titleUrl: string,
        public url: string,
        public createdAt: Date,
        public message: string,
        public idMal?: number
    ) {
    }
}