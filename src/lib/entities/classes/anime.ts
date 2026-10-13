import {StatusClass} from "@/lib/entities/types";

type AnimeProps = {
    title: string;
    titleFull: string;
    id: number;
    idMal: number | null;
    entryId: number;
    nextMsg: string;
    nextTooltip: string;
    updateStatus: string;
    updateClass: StatusClass;
    behind: number;
    air: number;
    img: string | null;
    ep: number;
    status: "CANCELLED" | "FINISHED" | "HIATUS" | "NOT_YET_RELEASED" | "RELEASING" | "UNKNOWN";
    isCurrent: boolean;
    notes: any;
    nextAiringEpisode: { episode: number, timeUntilAiring: number } | null;
    offset: number | null;
    updatedAt: number | null;
}

export class Anime {
    public title: string;
    public titleFull: string;
    public id: number;
    public idMal: number | null;
    public entryId: number;
    public nextMsg: string ;
    public nextTooltip: string;
    public updateStatus: string;
    public updateClass: StatusClass;
    public behind: number;
    public air: number;
    public img: string | null;
    public ep: number;
    public status: "CANCELLED" | "FINISHED" | "HIATUS" | "NOT_YET_RELEASED" | "RELEASING" | "UNKNOWN";
    public isCurrent: boolean;
    public notes: any;
    public nextAiringEpisode: { episode: number, timeUntilAiring: number } | null;
    public offset: number | null;
    public updatedAt: number | null;

    constructor(
        {
            title,
            titleFull,
            id,
            idMal,
            entryId,
            nextMsg,
            nextTooltip,
            updateStatus,
            updateClass,
            behind,
            air,
            img,
            ep,
            status,
            isCurrent,
            notes,
            nextAiringEpisode,
            offset,
            updatedAt
        }: AnimeProps) {
        this.title = title;
        this.titleFull = titleFull;
        this.id = id;
        this.idMal = idMal;
        this.entryId = entryId;
        this.nextMsg = nextMsg;
        this.nextTooltip = nextTooltip;
        this.updateStatus = updateStatus;
        this.updateClass = updateClass;
        this.behind = behind;
        this.air = air;
        this.img = img;
        this.ep = ep;
        this.status = status;
        this.isCurrent = isCurrent;
        this.notes = notes;
        this.nextAiringEpisode = nextAiringEpisode;
        this.offset = offset;
        this.updatedAt = updatedAt;
    }
}